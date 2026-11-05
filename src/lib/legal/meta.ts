import { site } from "@/lib/site";

/** ISO date shown on legal pages — update when policy text changes materially. */
export const LEGAL_LAST_UPDATED = "2026-11-06";

export const legalEntity = {
  /** Trading / brand name used on this website (see confirmation note in legal report). */
  name: site.name,
  email: site.emails[0].label,
  emailHref: site.emails[0].href,
  phone: site.phones[0].label,
  address: site.address,
  city: site.city,
  country: "Pakistan",
  website: "https://www.istiqeme.net",
  /**
   * [CONFIRM WITH COUNSEL] Registered legal name, entity type (e.g. sole proprietorship, private limited),
   * NTN/SECP registration — not verified in the repository.
   */
  registrationNote:
    "The operating legal entity name, registration number, and tax identifiers should be confirmed with your accountant or counsel and inserted here when verified.",
} as const;

export type LegalSlug =
  | "privacy-policy"
  | "terms"
  | "cookie-policy"
  | "ai-disclosure"
  | "intellectual-property"
  | "disclaimer"
  | "accessibility"
  | "cookie-preferences";

export const legalNav: { slug: LegalSlug; label: string; href: string }[] = [
  { slug: "privacy-policy", label: "Privacy Policy", href: "/legal/privacy-policy" },
  { slug: "terms", label: "Terms & Conditions", href: "/legal/terms" },
  { slug: "cookie-policy", label: "Cookie Policy", href: "/legal/cookie-policy" },
  { slug: "ai-disclosure", label: "AI Disclosure", href: "/legal/ai-disclosure" },
  { slug: "intellectual-property", label: "Intellectual Property", href: "/legal/intellectual-property" },
  { slug: "disclaimer", label: "Disclaimer", href: "/legal/disclaimer" },
  { slug: "accessibility", label: "Accessibility", href: "/legal/accessibility" },
  { slug: "cookie-preferences", label: "Cookie Preferences", href: "/legal/cookie-preferences" },
];

export type LegalSection = { id: string; title: string; paragraphs: string[]; bullets?: string[] };

export type LegalDocument = {
  slug: LegalSlug;
  title: string;
  description: string;
  sections: LegalSection[];
};
