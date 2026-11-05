import { SITE_URL } from "@/lib/seo/site";

function normalizeOrigin(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

/** Origins allowed to call browser-initiated JSON APIs (contact forms). */
export function getTrustedFormOrigins(): Set<string> {
  const origins = new Set<string>();

  const canonical = normalizeOrigin(SITE_URL);
  if (canonical) origins.add(canonical);

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    origins.add(`https://${host}`);
  }

  if (process.env.NODE_ENV !== "production") {
    origins.add("http://localhost:3000");
    origins.add("http://localhost:3001");
    origins.add("http://localhost:3002");
    origins.add("http://localhost:3100");
    origins.add("http://localhost:3101");
    origins.add("http://127.0.0.1:3000");
  }

  return origins;
}

/**
 * Validates Origin/Referer for same-site form POSTs.
 * Missing Origin is allowed only when Referer matches a trusted origin (older browsers).
 */
export function isTrustedBrowserRequest(request: Request): boolean {
  const trusted = getTrustedFormOrigins();
  const origin = request.headers.get("origin");
  if (origin) {
    const normalized = normalizeOrigin(origin);
    return normalized !== null && trusted.has(normalized);
  }

  const referer = request.headers.get("referer");
  if (!referer) return process.env.NODE_ENV !== "production";

  const refOrigin = normalizeOrigin(referer);
  return refOrigin !== null && trusted.has(refOrigin);
}
