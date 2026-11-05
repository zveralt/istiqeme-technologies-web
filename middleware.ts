import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { applySecurityHeaders } from "@/lib/security/headers";
import { clientIpFromHeaders, rateLimit } from "@/lib/security/rate-limit";
import { logSecurityEvent } from "@/lib/security/log";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const method = request.method;
  const ip = clientIpFromHeaders(request.headers.get("x-forwarded-for"));

  if (pathname === "/api/contact" && method === "POST") {
    const limited = rateLimit(`contact:${ip}`, 10, 15 * 60_000);
    if (!limited.ok) {
      logSecurityEvent("contact_rate_limited", { ip: ip.slice(0, 64) });
      const res = NextResponse.json(
        { ok: false, error: "Too many submissions. Please try again later or contact us on WhatsApp." },
        { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
      );
      return applySecurityHeaders(res);
    }
  }

  if (pathname.startsWith("/api/showcase-proxy") && method === "GET") {
    const limited = rateLimit(`showcase:${ip}`, 120, 60_000);
    if (!limited.ok) {
      logSecurityEvent("showcase_rate_limited", { ip: ip.slice(0, 64) });
      const res = new NextResponse("Too many requests.", {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      });
      return applySecurityHeaders(res);
    }
  }

  if (pathname.startsWith("/api/showcase-placeholder") && method === "GET") {
    const limited = rateLimit(`showcase-ph:${ip}`, 120, 60_000);
    if (!limited.ok) {
      const res = new NextResponse("Too many requests.", {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      });
      return applySecurityHeaders(res);
    }
  }

  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key) {
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, {
              ...options,
              secure: process.env.NODE_ENV === "production" ? true : options.secure,
              sameSite: options.sameSite ?? "lax",
              httpOnly: options.httpOnly ?? true,
            });
          });
        },
      },
    });

    await supabase.auth.getUser();
  }

  return applySecurityHeaders(response);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
