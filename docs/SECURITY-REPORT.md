# Istiqeme Technologies Website — Security Report

**Date:** 2026-11-06  
**Scope:** `istiqeme-technologies` marketing site (Next.js 16 on Vercel)  
**Method:** Architecture review, code hardening, dependency audit, automated unit checks. **Not** a third-party penetration test.

---

## 1. Architecture & trust boundaries

| Layer | Technology | Notes |
|--------|------------|--------|
| Frontend | Next.js App Router, React 19, static/SSR pages | Public marketing content; no admin UI in-repo |
| Hosting | Vercel (inferred from `@vercel/analytics`, `vercel.json`) | HTTPS terminated at edge |
| Auth | Supabase Auth (`/login`, `/signup`) | Browser uses anon key; session cookies via `@supabase/ssr` middleware |
| Database | Supabase Postgres | Server `SUPABASE_SERVICE_ROLE_KEY` only in `/api/cron` |
| Email | Resend (`RESEND_*`) | Server-only; contact/inquiry forms |
| Public APIs | `POST /api/contact`, `GET /api/cron`, `GET /api/showcase-proxy`, `GET /api/showcase-placeholder` | Primary abuse surface |
| Third parties | Vercel Analytics/Speed Insights, Google fonts (self-hosted by Next), WhatsApp links | No client-side LLM keys |

**Trust boundaries:** Browser (untrusted) → Next server routes → Resend / Supabase / allowlisted HTTPS fetches (showcase proxy).

---

## 2. Findings (pre-hardening) & severity

| ID | Issue | Severity | Status |
|----|--------|----------|--------|
| F1 | Missing baseline security headers (CSP, HSTS, etc.) | Medium | **Fixed** — middleware |
| F2 | Contact API: no rate limit, origin check, or honeypot | High | **Fixed** |
| F3 | Contact API: unbounded JSON body | Medium | **Fixed** — size cap |
| F4 | Cron: non–constant-time secret compare; DB errors leaked | Medium | **Fixed** |
| F5 | Email subjects: header injection via newlines | Low | **Fixed** — sanitization |
| F6 | Open public `/signup` (Supabase) | Medium | **Mitigated in app** — set `SIGNUP_DISABLED=true`; also restrict in Supabase Auth |
| F7 | Client `profiles` upsert on signup | Medium | **Mitigate in Supabase RLS** (not in repo) |
| F8 | In-memory rate limits (per serverless instance) | Low | **Accepted** — document; use Vercel Firewall/KV for strict global limits |
| F9 | Showcase proxy fetches third-party HTML | Low | **Accepted** — HTTPS host allowlist; scripts stripped for SSR hosts |
| F10 | CSP uses `'unsafe-inline'` for theme bootstrap | Low | **Accepted** — required for current theme flash prevention |

No committed secrets were found in tracked source (`.env*` gitignored).

---

## 3. Improvements implemented

- **`src/lib/security/*`:** Rate limiting, origin validation, sanitization, timing-safe secrets, security logging, CSP/header builder.
- **`middleware.ts`:** Security headers on responses; rate limits for contact + showcase proxy; hardened Supabase cookie defaults in production.
- **`POST /api/contact`:** JSON content-type, body size limit, trusted Origin/Referer, honeypot field, generic production errors, structured logs.
- **`GET /api/cron`:** Timing-safe bearer check; no Supabase error text in responses; admin client fails closed if misconfigured.
- **Forms:** Honeypot field + `credentials: "same-origin"` on fetch.
- **`contact-schemas`:** Honeypot + subject sanitization.
- **`createAdminClient`:** Requires env vars; throws if missing.
- **CI:** `.github/workflows/security.yml` — `npm audit`, security unit tests, secret pattern scan.
- **Dependencies:** Bumped `next` / `eslint-config-next` to **16.4.5** to address published high/critical advisories in the prior 16.2.x line.
- **Signup:** Server-gated when `SIGNUP_DISABLED=true` (see `.env.example`).

---

## 4. Verification performed

| Check | Result |
|--------|--------|
| `npm run build` | **Pass** (Next.js 16.4.5) |
| `npm run test:security` | **Pass** — 6 unit tests |
| `npm run security:check` | Secret pattern scan + `npm audit --audit-level=high` |
| `npm audit` (post-fix) | Critical Next/sharp issues addressed via 16.4.5; remaining items mostly ESLint toolchain (dev-only) |

**Not performed:** External penetration test, DAST against production, Supabase RLS policy audit in dashboard.

---

## 5. Remaining risks

1. **Public signup** — Anyone can register if Supabase project allows it. Restrict via Supabase Auth settings or `SIGNUP_DISABLED=true` on the server (optional follow-up: server-gated signup page).
2. **Supabase RLS** — Policies for `profiles` and `cron_runs` must be correct in the Supabase project; service role bypasses RLS by design on cron route.
3. **Distributed rate limiting** — In-memory limits do not sync across Vercel instances; sustained abuse may need Vercel WAF / Upstash rate limiting.
4. **CSP** — `'unsafe-inline'` reduces XSS mitigation; migrating theme init to a nonce-based CSP would be a future hardening step.
5. **Email abuse** — Honeypot + rate limit reduce spam; Resend domain reputation still depends on monitoring bounces/abuse.

---

## 6. External / operator actions

1. **Vercel:** Set `CRON_SECRET`, `RESEND_*`, Supabase keys; enable **Deployment Protection** / WAF if available.
2. **Supabase:** Review RLS on `profiles`, `cron_runs`; disable public signup if accounts are invite-only; enable leaked-password protection and MFA for admins.
3. **Resend:** Verify sending domain; rotate API key if ever exposed.
4. **Production:** Set `SIGNUP_DISABLED=true` in Vercel if public registration is not required.
5. **HSTS preload:** Optional submission to browser preload lists after stable HTTPS on canonical domain.

---

## 7. Ongoing recommendations

- Run `npm run security:audit` on a schedule (CI already on push/PR).
- Rotate `CRON_SECRET` and `SUPABASE_SERVICE_ROLE_KEY` on a documented cadence.
- Monitor `[security]` structured logs in Vercel for rate-limit and honeypot spikes.
- Re-run dependency audits after major Next/React upgrades.
- Before claiming compliance: map controls to OWASP ASVS L1/L2 intentionally; this project has **not** been ASVS-certified.

---

## 8. Rollback

Security changes are isolated to middleware, API routes, `src/lib/security/*`, forms, and CI. Revert the security commit(s) to restore prior behavior if any header or CSP blocks a required integration.
