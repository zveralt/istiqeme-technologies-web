import { showcaseScrollBridge } from "@/lib/showcase/scrollBridge";
import { z } from "zod";

const ALLOWED_HOSTS = new Set([
  "college.credo.edu.pk",
  "credo-lumina-framework.lovable.app",
  "istiqeme.net",
  "www.istiqeme.net",
  "offduty-apparel.com",
  "www.offduty-apparel.com",
  "pascaleagency.org",
  "www.pascaleagency.org",
]);

const querySchema = z.object({
  url: z
    .string()
    .url()
    .refine((value) => {
      try {
        const parsed = new URL(value);
        return parsed.protocol === "https:" && ALLOWED_HOSTS.has(parsed.hostname);
      } catch {
        return false;
      }
    }, "Host not allowed."),
});

const SHOWCASE_OVERRIDES = `
<style id="istiqeme-showcase-overrides">
  html, body {
    overflow-y: auto !important;
    overflow-x: hidden !important;
    height: auto !important;
    min-height: 100%;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }
</style>`;

/** Next.js SPAs crash when HTML is proxied from another origin; keep SSR markup only. */
const STATIC_SSR_HOSTS = new Set([
  "offduty-apparel.com",
  "www.offduty-apparel.com",
]);

const STATIC_SSR_OVERRIDES = `
<style id="istiqeme-showcase-static-ssr">
  /* Intro splash / cookie bars that never dismiss without client JS */
  body > .fixed.inset-0,
  [aria-hidden="true"].fixed.inset-0,
  #__next > .fixed.inset-0 {
    display: none !important;
  }
  html, body, #__next {
    opacity: 1 !important;
    visibility: visible !important;
    height: auto !important;
    min-height: 100% !important;
    overflow: visible !important;
  }
  /* App Router has no #__next — force entrance-animated SSR nodes to paint */
  body *,
  body *::before,
  body *::after {
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
    animation: none !important;
    transition: none !important;
  }
</style>`;

/** Neutralize inline entrance styles that stay invisible without hydration. */
function neutralizeEntranceStyles(html: string) {
  return html.replace(/\sstyle=(["'])(.*?)\1/gi, (full, quote: string, value: string) => {
    const next = value
      .replace(/(?:^|;)\s*opacity\s*:\s*[^;]+/gi, "")
      .replace(/(?:^|;)\s*transform\s*:\s*[^;]+/gi, "")
      .replace(/(?:^|;)\s*visibility\s*:\s*hidden\b[^;]*/gi, "")
      .replace(/^[;\s]+|[;\s]+$/g, "")
      .replace(/;;+/g, ";");
    if (!next.trim()) return "";
    return ` style=${quote}${next}${quote}`;
  });
}

function injectIntoHead(html: string, injection: string) {
  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head([^>]*)>/i, `<head$1>${injection}`);
  }
  return `${injection}${html}`;
}

function injectBeforeBodyEnd(html: string, injection: string) {
  if (/<\/body>/i.test(html)) {
    return html.replace(/<\/body>/i, `${injection}</body>`);
  }
  return `${html}${injection}`;
}

/** Strip app scripts so Next.js never hydrates (and crashes) inside the showcase iframe. */
function stripAppScripts(html: string) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link[^>]+rel=["']modulepreload["'][^>]*>/gi, "")
    .replace(/<link[^>]+as=["']script["'][^>]*>/gi, "");
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const parsed = querySchema.safeParse({
    url: requestUrl.searchParams.get("url") ?? "",
  });

  if (!parsed.success) {
    const issue = parsed.error.issues[0]?.message ?? "Invalid request.";
    const status = issue === "Host not allowed." ? 403 : 400;
    return new Response(issue, { status });
  }

  const target = new URL(parsed.data.url);
  if (!ALLOWED_HOSTS.has(target.hostname)) {
    return new Response("Host not allowed.", { status: 403 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(target.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ISTIQEME-Technologies-Showcase/1.0; +https://istiqeme.net)",
        Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
    });
  } catch {
    return new Response("Upstream fetch failed.", { status: 502 });
  }

  if (!upstream.ok) {
    return new Response("Upstream error.", { status: 502 });
  }

  const contentType = upstream.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) {
    return Response.redirect(target.toString(), 302);
  }

  let html = await upstream.text();
  html = html.replace(/<meta[^>]+http-equiv=["']content-security-policy["'][^>]*>/gi, "");

  const useStaticSsr = STATIC_SSR_HOSTS.has(target.hostname);
  if (useStaticSsr) {
    // Live OFFDUTY is a Next.js app: client hydration fails under proxy framing.
    // Serve the actual SSR HTML (real markup/assets) without app JS.
    html = stripAppScripts(html);
    html = neutralizeEntranceStyles(html);
  }

  const baseTag = `<base href="${target.origin}/">`;
  if (!/<base\s/i.test(html)) {
    html = injectIntoHead(html, baseTag);
  }

  html = injectIntoHead(html, SHOWCASE_OVERRIDES);
  if (useStaticSsr) {
    html = injectIntoHead(html, STATIC_SSR_OVERRIDES);
  }
  html = injectBeforeBodyEnd(html, showcaseScrollBridge(target.hostname));

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Static SSR markup is transformed; avoid long caches of broken frames.
      "Cache-Control": useStaticSsr
        ? "private, no-store"
        : "public, max-age=600",
      "X-Frame-Options": "SAMEORIGIN",
      "Content-Security-Policy": "frame-ancestors 'self'",
    },
  });
}
