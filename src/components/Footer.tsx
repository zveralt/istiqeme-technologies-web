import Link from "next/link";
import { aiMenu, nav, site, waLink } from "@/lib/site";
import { Logo } from "./Logo";
import { PillLink } from "@/components/ui/Pill";

const explore = [
  ...nav.map((item) => ({ href: item.href, label: item.label })),
  { href: "/start", label: "Start a project" },
  { href: "/login", label: "Login" },
];

const linkClass = "itq-ulink text-[15px] text-white/80 hover:text-white";

export function Footer() {
  return (
    <footer
      data-header-theme="dark"
      className="relative z-10 overflow-hidden bg-ink text-white dark:bg-[#05090f] dark:shadow-[inset_0_1px_0_rgba(214,230,255,0.12)]"
    >
      <div className="itq-container relative">
        {/* Statement */}
        <div className="grid gap-10 border-b border-white/10 py-16 md:py-20 lg:grid-cols-12 lg:gap-8">
          <div className="itq-fill-type lg:col-span-8">
            <Logo inverted />
            <p className="itq-display mt-10 w-full max-w-none text-white">
              <span className="block md:whitespace-nowrap">Complex systems.</span>
              <span className="block text-ember-bright md:whitespace-nowrap">Beautifully simplified.</span>
            </p>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">{site.tagline}</p>
          </div>
          <div className="flex flex-col justify-end gap-5 lg:col-span-4 lg:items-end">
            <p className="inline-flex items-center gap-2 text-[13px] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" aria-hidden />
              Replies within one business day
            </p>
            <PillLink href={waLink()} external className="!bg-white !text-[#0e3a66] hover:!bg-ember-bright">
              Message us on WhatsApp
            </PillLink>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-10 py-12 md:grid-cols-12 md:py-14">
          <nav className="md:col-span-3" aria-label="Explore">
            <p className="itq-micro !text-white/45">Explore</p>
            <ul className="mt-5 space-y-2.5">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="md:col-span-3" aria-label="AI and automation">
            <p className="itq-micro !text-white/45">AI &amp; automation</p>
            <ul className="mt-5 space-y-2.5">
              {aiMenu.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
            <p className="itq-micro !text-white/45">Contact</p>
            <ul className="mt-5 space-y-2.5">
              {site.phones.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className={`${linkClass} tabular-nums`}>
                    {p.label}
                  </a>
                </li>
              ))}
              {site.emails.map((e) => (
                <li key={e.href}>
                  <a href={e.href} className={linkClass}>
                    {e.label}
                  </a>
                </li>
              ))}
            </ul>
            <address className="mt-6 max-w-sm text-[13.5px] not-italic leading-relaxed text-white/55">
              {site.address}
            </address>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 font-dm text-[12.5px] text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex items-center gap-6">
            <p>Engineered in {site.city}</p>
            <a href="#top" className="itq-ulink text-white/70 hover:text-white">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
