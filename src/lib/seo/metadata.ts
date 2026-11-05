import type { Metadata } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/seo/site";
import { keywordForPath } from "@/lib/seo/keywords";

export function pageMetadata(
  path: string,
  overrides?: Partial<Metadata> & { title?: string; description?: string },
): Metadata {
  const mapped = keywordForPath(path);
  const title = overrides?.title ?? mapped?.title;
  const description = overrides?.description ?? mapped?.description;
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title ?? undefined,
      description: description ?? undefined,
      url,
      siteName: "ISTIQEME Technologies",
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? undefined,
      description: description ?? undefined,
    },
    ...overrides,
  };
}

export { SITE_URL, absoluteUrl };
