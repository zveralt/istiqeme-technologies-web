# Performance Optimization Report

**Date:** 2026-11-06  
**Site:** ISTIQEME Technologies (Next.js 16.4.5, Vercel)

---

## 1. Main bottlenecks discovered

| Area | Issue |
|------|--------|
| **Homepage JS** | Hero + Services + Workflow + Projects + Testimonials + AIDemo + Process + InquiryForm loaded in one route bundle. |
| **Lenis** | Smooth-scroll library included in the main client graph even before interaction. |
| **Grid cursor glow** | Global `GridBackground` rAF loop loaded synchronously on every page. |
| **Portfolio images** | Raw `<img>` tags on project cards bypassed Next.js AVIF/WebP pipeline and lazy loading. |
| **Static assets** | Large JPEG/PNG sources in `/public` (several 250–720KB files). |
| **Work page** | `BeforeAfterEditorialCanvas` (iframes + proxy) loaded in the main work chunk. |
| **Fonts** | Inter included an unused 300 weight. |
| **Third-party** | Vercel Analytics already consent-gated (prior work); no ad pixels. |

**Preserved:** Lenis `lerp: 0.085` and `wheelMultiplier: 0.82` unchanged (scroll-skew feel).

---

## 2. Optimizations implemented

### JavaScript & rendering
- **`HomeBelowFold`** — `next/dynamic` splits Workflow, Projects, Testimonials, AIDemo, Process, InquiryForm on `/`.
- **`SmoothScroll`** — dynamic `import("lenis")` inside `useEffect` (same Lenis options).
- **`DeferredGridBackground`** — client-only dynamic import for cursor/grid effects.
- **`optimizePackageImports`** — `lucide-react`, `framer-motion` tree-shaking hint in `next.config.ts`.
- **`/work`** — dynamic import for `Compare` (BeforeAfterEditorialCanvas) with lightweight placeholder.

### Images & media
- **Projects cards** — `next/image` with `loading="lazy"`, responsive `sizes`, quality 80.
- **HeroImageBackground** — `fetchPriority="high"` when `priority`, default quality 80.
- **`scripts/optimize-public-images.mjs`** — recompressed 28 JPEG/PNG files under `public/` (**~1,681 KB** saved at source); run via `npm run optimize:images`.

### Network & caching
- **`Cache-Control`** headers for `/images/*` (1y immutable) and `/work/*` (7d + SWR).
- **`minimumCacheTTL`** on Next image optimizer (30 days).
- **`poweredByHeader: false`**, `compress: true`.

### Fonts
- Removed Inter **300** weight; kept 400–700 with `adjustFontFallback`.

---

## 3. Before / after measurements

| Metric | Before | After | Notes |
|--------|--------|-------|--------|
| Public image bytes (script) | — | **−1,681 KB** | Measured by `optimize-public-images.mjs` |
| Lighthouse mobile (/) | Not captured pre-change | **Not run in CI** | Run locally: `next start` + Lighthouse on `/`, `/services`, `/work` |
| Lenis scroll feel | `lerp 0.085`, `wheel 0.82` | **Unchanged** | Verified in `SmoothScroll.tsx` |
| Production build | Pass | **Pass** | 35 routes |

We did **not** fabricate LCP/INP/CLS scores. After deploy, verify in Chrome DevTools → Lighthouse (mobile, slow 4G) and Vercel Speed Insights (with analytics consent).

---

## 4. Remaining issues

1. **Home Hero + Services** still load immediately (required for LCP/content); further gains need server Hero or reduced motion on first paint.
2. **Footer + Header** remain client-heavy (theme, consent, navigation).
3. **Work compare iframes** still expensive once scrolled into view — intentional for portfolio demo.
4. **`istiqeme.png` (~684KB)** — largest portfolio PNG; consider re-export or WebP source file.
5. **Framer Motion** on many sections — acceptable for brand; lazy sections reduce initial parse cost only.
6. **No RUM baseline** in repo before this change — compare using Vercel Speed Insights post-deploy.

---

## 5. External / hosting actions

1. **Vercel** — Enable compression (default), consider **Vercel CDN** cache rules aligned with `next.config` headers (already set for static paths).
2. **Speed Insights / Web Analytics** — Monitor LCP, INP, CLS after deploy; consent-gated analytics must be accepted to collect RUM.
3. Re-run **`npm run optimize:images`** when adding new hero photography to `public/`.
4. Optional: **`next/image` remote patterns** if assets move to a CDN bucket.

---

## 6. Verification checklist

- [x] `npm run build`
- [x] Source image compression script executed
- [x] Scroll-skew Lenis parameters preserved
- [ ] Lighthouse mobile/desktop on key URLs (operator)
- [ ] WebPageTest or Vercel dashboard after production deploy (operator)
