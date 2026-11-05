import { site } from "@/lib/site";

/** Canonical site origin used for metadata, sitemap, and JSON-LD. */
export const SITE_URL = "https://www.istiqeme.net" as const;

export const organization = {
  name: site.name,
  legalName: site.name,
  url: SITE_URL,
  email: site.emails[0].label,
  telephone: ["+92-332-3407131", "+92-21-37124242"],
  address: {
    streetAddress: "Office # E-17, 5th Floor, Descon Plaza, Main Shahrah-e-Faisal, Near KFC Nursery",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    addressCountry: "PK",
  },
  sameAs: [] as string[],
  description: site.tagline,
  foundingDate: String(site.since),
  areaServed: ["Karachi", "Pakistan"],
} as const;

export function absoluteUrl(path: string) {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
