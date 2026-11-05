import type { NextResponse } from "next/server";

const isProd = process.env.NODE_ENV === "production";

/**
 * OWASP-aligned baseline headers. CSP allows inline scripts required by Next.js
 * theme bootstrap and Vercel Analytics / Speed Insights.
 */
export function buildContentSecurityPolicy(): string {
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "form-action 'self'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    [
      "script-src 'self' 'unsafe-inline'",
      "https://va.vercel-scripts.com",
      "https://vitals.vercel-insights.com",
    ].join(" "),
    [
      "connect-src 'self'",
      "https://*.supabase.co",
      "wss://*.supabase.co",
      "https://vitals.vercel-insights.com",
      "https://va.vercel-scripts.com",
    ].join(" "),
    "frame-src 'self'",
    "upgrade-insecure-requests",
  ];

  if (!isProd) {
    return directives.filter((d) => !d.startsWith("upgrade-insecure-requests")).join("; ");
  }

  return directives.join("; ");
}

export function applySecurityHeaders(response: NextResponse): NextResponse {
  const headers = response.headers;

  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Resource-Policy", "same-site");
  headers.set("Content-Security-Policy", buildContentSecurityPolicy());

  if (isProd) {
    headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }

  headers.set("X-DNS-Prefetch-Control", "off");

  return response;
}
