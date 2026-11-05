import type { Metadata } from "next";
import Link from "next/link";
import { legalNav } from "@/lib/legal/meta";

export const metadata: Metadata = {
  title: "Legal",
  description: "Privacy, terms, cookies, and compliance information for ISTIQEME Technologies.",
  robots: { index: true, follow: true },
};

export default function LegalIndexPage() {
  return (
    <div className="itq-legal itq-container py-28 md:py-32">
      <header className="itq-legal__header max-w-2xl">
        <p className="itq-legal__eyebrow">Legal & compliance</p>
        <h1 className="itq-legal__title font-display">Policies & disclosures</h1>
        <p className="itq-legal__desc">
          Transparency about how we operate this website, handle inquiries, and present demonstrations — including AI
          features.
        </p>
      </header>
      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:max-w-3xl">
        {legalNav.map((item) => (
          <li key={item.slug}>
            <Link
              href={item.href}
              className="itq-legal__index-link block rounded-xl border border-ink-200/80 px-5 py-4 transition hover:border-accent-500/40 dark:border-white/10"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
