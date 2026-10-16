import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { WhatsAppLink } from "./Button";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest text-cream">
      <div className="ajrak pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-5">
          <Logo inverted />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-cream/75">
            {site.tagline}
          </p>
          <div className="mt-8">
            <WhatsAppLink>Message us on WhatsApp</WhatsAppLink>
          </div>
        </div>
        <div className="md:col-span-2">
          <p className="text-[11px] uppercase tracking-[0.22em] text-cream/45">
            Navigate
          </p>
          <ul className="mt-4 space-y-2 text-[15px]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/start" className="hover:text-white">
                Start
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-cream/45">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-[15px]">
            {site.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="hover:text-white">
                  {p.label}
                </a>
              </li>
            ))}
            {site.emails.map((e) => (
              <li key={e.href}>
                <a href={e.href} className="hover:text-white">
                  {e.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-cream/60">
            {site.address}
          </p>
        </div>
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 px-5 py-6 text-[12px] text-cream/50 md:flex-row md:items-center md:justify-between md:px-8">
        <p>© {new Date().getFullYear()} ISTIQEME Technologies</p>
        <p>Engineered in Karachi · Premium digital systems</p>
        <a
          href={site.parent}
          className="hover:text-cream"
          target="_blank"
          rel="noreferrer"
        >
          Return to ISTIQEME.net
        </a>
      </div>
    </footer>
  );
}
