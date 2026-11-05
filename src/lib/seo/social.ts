import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo/site";

/** Primary Open Graph image — 1200×630 for WhatsApp, Facebook, LinkedIn, X. */
export const DEFAULT_OG_IMAGE = {
  path: "/og/istiqeme-home.jpg",
  width: 1200,
  height: 630,
  alt: "ISTIQEME Technologies — Premium digital engineering in Karachi",
  type: "image/jpeg" as const,
};

export function ogImageUrl(path: string = DEFAULT_OG_IMAGE.path) {
  return absoluteUrl(path);
}

export function openGraphImages(
  overrides?: Partial<typeof DEFAULT_OG_IMAGE>,
): NonNullable<Metadata["openGraph"]>["images"] {
  const img = { ...DEFAULT_OG_IMAGE, ...overrides };
  return [
    {
      url: img.path,
      width: img.width,
      height: img.height,
      alt: img.alt,
      type: img.type,
    },
  ];
}

export const siteIcons: Metadata["icons"] = {
  icon: [
    { url: "/brand/favicon.svg", type: "image/svg+xml" },
    { url: "/brand/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/brand/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  ],
  apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  shortcut: "/brand/favicon-32x32.png",
};
