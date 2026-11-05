"use client";

import Link from "next/link";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { FooterClosing } from "@/components/FooterClosing";
import { FooterMarquee } from "@/components/FooterMarquee";
import { Logo } from "@/components/Logo";
import { useConsent } from "@/components/legal/ConsentProvider";
import { useTheme } from "@/components/ui/ThemeProvider";
import { aiMenu, nav, site, waLink } from "@/lib/site";
import { scrollPageTo } from "@/lib/smooth-scroll";

const explore = [
  ...nav.map((item) => ({ href: item.href, label: item.label })),
  { href: "/start", label: "Start a project" },
  { href: "/login", label: "Login" },
];

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="itq-footer__col">
      <p className="itq-footer__col-title">{title}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function FooterNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  const className = "itq-footer__link";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px] fill-current">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function Footer() {
  const { theme } = useTheme();
  const { setShowPreferences } = useConsent();
  const isDark = theme === "dark";

  return (
    <footer
      id="footer"
      data-header-theme={isDark ? "dark" : "light"}
      className="itq-footer itq-blueprint relative z-10 overflow-hidden border-t border-ink-200/80 bg-white text-ink-900 dark:border-white/[0.06] dark:bg-[#07080a] dark:text-[#e8e8ea]"
    >
      <div className="itq-footer__ambient pointer-events-none" aria-hidden />

      <div className="itq-container relative z-[1]">
        <FooterClosing />

        <div className="itq-footer__main grid gap-12 pb-10 pt-10 md:grid-cols-12 md:gap-x-8 md:gap-y-10 md:pb-12 md:pt-12 lg:gap-x-10">
          <div className="md:col-span-12 lg:col-span-4">
            <Logo inverted={isDark} />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ink-500 dark:text-white/55">
              {site.tagline}
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400 dark:text-white/35">
              Engineering studio · {site.city} · Since {site.since}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="itq-footer__social"
              >
                <WhatsAppIcon />
              </a>
              <a href={site.emails[0].href} aria-label="Email" className="itq-footer__social">
                <Mail size={17} strokeWidth={1.75} aria-hidden />
              </a>
              <a href={site.phones[0].href} aria-label="Call" className="itq-footer__social">
                <Phone size={17} strokeWidth={1.75} aria-hidden />
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:col-span-12 lg:col-span-8 lg:grid-cols-4 lg:gap-8">
            <FooterColumn title="Explore">
              <ul className="itq-footer__list">
                {explore.map((item) => (
                  <li key={item.href + item.label}>
                    <FooterNavLink href={item.href}>{item.label}</FooterNavLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="AI & automation">
              <ul className="itq-footer__list">
                {aiMenu.map((item) => (
                  <li key={item.href}>
                    <FooterNavLink href={item.href}>{item.title}</FooterNavLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="Legal">
              <ul className="itq-footer__list">
                <li>
                  <FooterNavLink href="/legal/privacy-policy">Privacy Policy</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="/legal/terms">Terms & Conditions</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="/legal/cookie-policy">Cookie Policy</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="/legal/ai-disclosure">AI Disclosure</FooterNavLink>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setShowPreferences(true)}
                    className="itq-footer__link itq-footer__link--static w-full cursor-pointer text-left"
                  >
                    Cookie preferences
                  </button>
                </li>
              </ul>
            </FooterColumn>

            <FooterColumn title="Contact">
              <ul className="itq-footer__list itq-footer__list--contact">
                {site.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="itq-footer__link itq-footer__link--contact">
                      <Phone size={14} strokeWidth={1.75} className="shrink-0 opacity-50" aria-hidden />
                      <span>{p.label}</span>
                    </a>
                  </li>
                ))}
                {site.emails.map((e) => (
                  <li key={e.href}>
                    <a href={e.href} className="itq-footer__link itq-footer__link--contact">
                      <Mail size={14} strokeWidth={1.75} className="shrink-0 opacity-50" aria-hidden />
                      <span>{e.label}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <p className="itq-footer__link itq-footer__link--contact itq-footer__link--static">
                    <MapPin size={14} strokeWidth={1.75} className="mt-0.5 shrink-0 opacity-50" aria-hidden />
                    <span>{site.address}</span>
                  </p>
                </li>
              </ul>
            </FooterColumn>
          </div>
        </div>
      </div>

      <FooterMarquee />

      <div className="itq-container relative z-[1]">
        <div className="itq-footer__legal">
          <div className="min-w-0 space-y-1">
            <p>
              © {new Date().getFullYear()} {site.name}
            </p>
            <p className="text-ink-400 dark:text-white/40">
              Engineered in {site.city} · Premium digital systems
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px]">
            <Link href="/legal/privacy-policy" className="itq-footer__legal-link">
              Privacy
            </Link>
            <Link href="/legal/terms" className="itq-footer__legal-link">
              Terms
            </Link>
            <Link href="/contact" className="itq-footer__legal-link">
              Contact
            </Link>
            <Link href="/start" className="itq-footer__legal-link">
              Start a project
            </Link>
            <button
              type="button"
              onClick={() => {
                const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
                scrollPageTo(0, { immediate: !fine, duration: 1.05 });
              }}
              className="itq-footer__top group"
            >
              Back to top
              <span className="itq-footer__top-icon" aria-hidden>
                <ArrowUp className="h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
