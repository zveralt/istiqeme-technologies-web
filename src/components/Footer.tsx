import Link from "next/link";
import { aiMenu, nav, site, waLink } from "@/lib/site";
import { Logo } from "./Logo";
import { PillLink } from "@/components/ui/Pill";

const explore = [
  ...nav.map((item) => ({ href: item.href, label: item.label })),
  { href: "/start", label: "Start a project" },
  { href: "/login", label: "Login" },
];

export function Footer() {
  return (
    <footer
      data-header-theme="dark"
      className="relative z-10 overflow-hidden bg-ink text-white dark:bg-[#05090f]"
    >
      <div className="itq-container relative">
        <div className="grid gap-10 border-b border-white/10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-8">
            <Logo inverted />
            <p className="mt-10 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.92] text-white">
              Complex systems.
              <br />
              <span className="text-ember-bright">Beautifully simplified.</span>
            </p>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">{site.tagline}</p>
          </div>
          <div className="flex flex-col justify-end gap-5 md:col-span-4 md:items-end">
            <p className="inline-flex items-center gap-2 text-[13px] text-white/75">
              <span className="h-2 w-2 rounded-full bg-whatsapp" aria-hidden />
              Replies within one business day
            </p>
            <PillLink href={waLink()} external className="!bg-white !text-forest">
              Message us on WhatsApp
            </PillLink>
          </div>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-12 md:py-16">
          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Explore</p>
            <ul className="mt-5 space-y-2.5 text-[15px]">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/85 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">AI & automation</p>
            <ul className="mt-5 space-y-2.5 text-[15px]">
              {aiMenu.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/85 transition-colors hover:text-white">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Contact</p>
            <ul className="mt-5 space-y-2.5 text-[15px]">
              {site.phones.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="text-white/85 transition-colors hover:text-white">
                    {p.label}
                  </a>
                </li>
              ))}
              {site.emails.map((e) => (
                <li key={e.href}>
                  <a href={e.href} className="text-white/85 transition-colors hover:text-white">
                    {e.label}
                  </a>
                </li>
              ))}
            </ul>
            <address className="mt-6 max-w-sm text-[13px] not-italic leading-relaxed text-white/60">
              {site.address}
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-[12px] text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>
            Engineered in {site.city} · Premium digital systems
          </p>
        </div>
      </div>
    </footer>
  );
}
