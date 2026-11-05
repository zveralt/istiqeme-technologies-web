# ISTIQEME Technologies — SEO / AEO Phase 1 Report

**Date:** 2026-10-31  
**Scope:** Foundations + dedicated service pages inside the existing design system  
**Domain canonical:** `https://www.istiqeme.net`

## Architecture decision

The brief suggested a `/technologies/...` tree. That would orphan working routes (`/services`, `/work`, `/ai`, `/contact`) and break navigation. Phase 1 **adapts** the intent to existing conventions:

| Brief idea | Implemented URL |
|---|---|
| `/technologies/services/...` | `/services/...` |
| `/technologies/portfolio/` | `/work` (existing) |
| `/technologies/contact/` | `/contact` (existing) |
| `/technologies/about/` | Deferred — `/team` currently redirects; no fabricated about page |
| `/technologies/resources/` | Deferred — no blog yet |

## Pages audited

| Route | Notes |
|---|---|
| `/` | Strong visual home; weak unique metadata before Phase 1 |
| `/services` | Catalogue only; hash anchors, no dedicated keyword pages |
| `/work` | Portfolio + demos |
| `/ai`, `/ai/products`, `/ai/agents` | AI hub already rich |
| `/contact`, `/start` | Conversion paths |
| `/login`, `/signup` | Auth — excluded from sitemap |
| `/team` | Redirect only |

**Services confirmed from product copy (not invented):** landing pages, corporate websites, e-commerce stores, custom mobile apps, custom software / CRM-style systems, social & digital marketing, AI voice agents, WhatsApp chatbots, custom AI agents.

## New pages created

1. `/services/web-design-development`
2. `/services/ecommerce-development`
3. `/services/custom-software-development`
4. `/services/mobile-app-development`
5. `/services/ai-solutions`
6. `/services/digital-marketing`

Each includes: hero + H1, intro, capabilities, problems, process, related work, why ISTIQEME, internal links, FAQ, CTA — using existing `PageHero`, `Sheet`, `SectionHeading`, `ClosingCta`, Reveal motion.

## Keyword → page mapping

Volumes / difficulty were **not** verified with a live SEO tool. Mapping is research-based from Istiqeme’s real services and public Karachi/Pakistan search language.

| Path | Primary keyword | Intent |
|---|---|---|
| `/` | digital engineering studio Karachi | navigational |
| `/services` | digital services Karachi ISTIQEME | commercial |
| `/services/web-design-development` | website design company in Karachi | commercial |
| `/services/ecommerce-development` | ecommerce website development Pakistan | commercial |
| `/services/custom-software-development` | custom software development Pakistan | commercial |
| `/services/mobile-app-development` | mobile app development company Pakistan | commercial |
| `/services/ai-solutions` | AI automation services Pakistan | commercial |
| `/services/digital-marketing` | digital marketing agency Karachi | commercial |
| `/work` | ISTIQEME portfolio Karachi | commercial |
| `/contact` | contact ISTIQEME Technologies Karachi | transactional |
| `/ai` | AI assistants for business Pakistan | commercial |

Secondary keywords, titles, descriptions, H2 topics, and internal links live in `src/lib/seo/keywords.ts`.

## SEO improvements implemented

- Unique titles + meta descriptions + canonicals via `pageMetadata()`
- Open Graph + Twitter cards on mapped pages
- Root layout: richer defaults, index/follow robots, locale `en_PK`
- One H1 per service page (via `PageHero` / `DisplayTitle`)
- Logical H2/H3 sections on service landings
- Breadcrumb UI + `BreadcrumbList` JSON-LD
- Internal links: header service menu, services hub grid, catalogue CTAs, home bolt service cards, problem links
- FAQ copy structured for AEO (question headings + concise answers)
- No keyword stuffing; no fabricated ratings, case metrics, or certifications

## Structured data added

- `Organization` + `WebSite` (sitewide in root layout)
- `Service` + `FAQPage` per service landing
- `BreadcrumbList` on service + services hub breadcrumbs
- **Not added:** `LocalBusiness` with reviews/ratings (eligibility + no review dataset); `Article` (no resources/blog yet)

## Technical SEO

- `src/app/sitemap.ts` → `/sitemap.xml` (canonical indexable routes only)
- `src/app/robots.ts` → allows `/`, disallows `/login`, `/signup`, `/api/`, points to sitemap
- Login/signup omitted from sitemap
- Existing URLs preserved; no forced `/technologies` migration

## Remaining / manual next steps

1. Submit sitemap in Google Search Console / Bing Webmaster (requires owner access).
2. Verify JSON-LD in [Google Rich Results Test](https://search.google.com/test/rich-results).
3. Optional Phase 2: `/about` from real team/company facts; `/resources` articles; LocalBusiness only if you confirm storefront/office visit policy.
4. Optional: Search Console keyword volume pull to refine secondary terms (do not invent numbers).
5. Image SEO pass: rename hero files with descriptive slugs where safe (cache-bust carefully).
6. Confirm production `metadataBase` matches the live hostname you want indexed (`www.istiqeme.net` vs apex).

## Design preservation

No redesign of home, work, or AI hubs. Service pages reuse Istiqeme sheets, display type, accent blue, grid heroes, and existing CTA patterns.
