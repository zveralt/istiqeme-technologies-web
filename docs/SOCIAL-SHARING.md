# Social sharing & favicon

Production canonical origin: **https://www.istiqeme.net** (see `src/lib/seo/site.ts`).

## Assets

| Asset | Path | Purpose |
|-------|------|---------|
| SVG favicon | `public/brand/favicon.svg` | Modern vector tab icon |
| PNG favicons | `public/brand/favicon-16x16.png`, `favicon-32x32.png` | Legacy browsers |
| Apple Touch Icon | `public/brand/apple-touch-icon.png` (180×180) | iOS home screen |
| Web manifest | `public/brand/site.webmanifest` | PWA / mobile theme |
| Open Graph image | `public/og/istiqeme-home.jpg` (1200×630) | WhatsApp, Facebook, LinkedIn, X |

Regenerate raster assets after editing `public/brand/favicon.svg` or replacing the OG art source:

```bash
npm run generate:brand
```

The OG JPEG is exported from `assets/istiqeme-home-og-draft.jpg` when present; otherwise the script builds a logo-on-grid fallback.

## Metadata

- Root defaults: `src/app/layout.tsx` (`metadataBase`, `openGraph`, `twitter`, `icons`, `manifest`, canonical).
- Interior pages: `pageMetadata()` in `src/lib/seo/metadata.ts` — unique **title** and **description** per route from `src/lib/seo/keywords.ts`, shared **og:image** for brand consistency.
- Helpers: `src/lib/seo/social.ts` (`DEFAULT_OG_IMAGE`, `openGraphImages()`).

Absolute image URL in HTML: `https://www.istiqeme.net/og/istiqeme-home.jpg` (via `metadataBase` + relative path).

Tags emitted server-side in the initial HTML (Next.js `Metadata` API) — no client-only injection.

## WhatsApp preview cache

WhatsApp caches link previews aggressively. After deploying:

1. Confirm production HTML includes `og:image` pointing at **www.istiqeme.net**, not a `*.vercel.app` preview URL.
2. Open `https://www.istiqeme.net/og/istiqeme-home.jpg` in a browser (must return `image/jpeg`, no auth).
3. To force a refresh, append a query string when testing (e.g. share `https://www.istiqeme.net/?v=2`) or use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) (WhatsApp uses the same crawler stack) — enter the URL and click **Scrape Again**.

## Verification checklist

- [ ] `npm run build` succeeds
- [ ] View page source on `/` — `og:title`, `og:description`, `og:image`, `og:image:width`, `og:image:height`, `og:url`, `twitter:card`
- [ ] Image dimensions exactly 1200×630
- [ ] Deploy to production, then re-scrape as above

## Deployment

Commit `public/brand/*`, `public/og/istiqeme-home.jpg`, and metadata changes, then deploy to Vercel (or your host). No environment variables required for static OG assets.
