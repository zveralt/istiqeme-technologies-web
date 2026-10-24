"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { aiMenu, nav, problems, serviceMenu, site, waLink, work, workMenu } from "@/lib/site";
import { Logo } from "./Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PillLink } from "@/components/ui/Pill";
import { cn } from "@/lib/utils";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const HEADER_H = 72;
const THEME_PROBE = 88;

type MenuKey = "home" | "services" | "work" | "ai" | "problems";
type Theme = "light" | "dark";

const homeLinks = [
  { href: "/#top", title: "Opening", line: "The standard for technology inquiries." },
  { href: "/#services", title: "What we build", line: "Websites, apps, AI, and marketing." },
  { href: "/#work", title: "Live work", line: "Sites and systems already running." },
  { href: "/#problems", title: "Problems", line: "Market gaps and the systems that close them." },
  { href: "/start", title: "Intake", line: "A few taps to the right next step." },
];

/** Which `[data-header-theme]` section currently sits under the header bar. */
function readTheme(): Theme {
  const probeY = THEME_PROBE;
  const nodes = document.querySelectorAll<HTMLElement>("[data-header-theme]");
  let theme: Theme = "light";
  for (const node of nodes) {
    const r = node.getBoundingClientRect();
    if (r.top <= probeY && r.bottom > probeY) {
      theme = (node.dataset.headerTheme as Theme) ?? "light";
    }
  }
  return theme;
}

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [mobileGroup, setMobileGroup] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const timer = useRef<number | null>(null);

  // Scroll state + section theme (rAF-throttled, passive).
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
      setTheme(readTheme());
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    // Fonts/images can shift section heights after first paint.
    const settle = window.setTimeout(update, 400);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.clearTimeout(settle);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape closes everything.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close every menu when the route changes (state adjusted during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setMenu(null);
    setMobileGroup(null);
  }

  function clearTimer() {
    if (timer.current) window.clearTimeout(timer.current);
  }

  function schedule(next: MenuKey | null, delay: number) {
    clearTimer();
    timer.current = window.setTimeout(() => setMenu(next), delay);
  }

  function keyFor(href: string): MenuKey {
    if (href.startsWith("/work")) return "work";
    if (href.startsWith("/services")) return "services";
    if (href.startsWith("/ai")) return "ai";
    if (href.includes("problems")) return "problems";
    return "home";
  }

  return (
    <header
      className="itq-header fixed inset-x-0 top-0 z-40"
      data-theme={theme}
      data-scrolled={scrolled}
      data-open={open}
      onMouseLeave={() => schedule(null, 180)}
    >
      <div
        className="itq-container relative grid grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[1fr_auto_1fr]"
        style={{ height: HEADER_H }}
      >
        <Logo compact />

        <nav className="relative hidden justify-self-center md:block" aria-label="Primary">
          <ul className="flex items-center">
            {nav.map((item) => {
              const key = keyFor(item.href);
              const base = item.href.split("#")[0];
              const active =
                item.href === "/" ? pathname === "/" : base !== "/" && pathname.startsWith(base);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="itq-nav-link block"
                    aria-current={active ? "page" : undefined}
                    data-active={menu === key || undefined}
                    onMouseEnter={() => schedule(key, 140)}
                    onFocus={() => schedule(key, 0)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <AnimatePresence>
            {menu && (
              <motion.div
                key={menu}
                initial={reduce ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6, transition: { duration: 0.15 } }}
                transition={{ duration: 0.22, ease: EASE }}
                className="absolute top-full left-1/2 z-50 hidden -translate-x-1/2 pt-2 md:block"
                onMouseEnter={clearTimer}
              >
                <div className="w-[40rem] max-w-[80vw] rounded-2xl border border-line bg-card p-7 text-foreground shadow-[0_24px_60px_-28px_rgba(10,10,12,0.35)]">
                  <MenuColumns menu={menu} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <div className="hidden items-center justify-end gap-3 md:flex">
          <ThemeToggle />
          <PillLink href="/start">Start a project</PillLink>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border md:hidden"
          style={{ borderColor: "var(--hdr-line)" }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex h-3.5 w-4 flex-col justify-between">
            <span
              className={cn(
                "h-[1.5px] w-4 origin-center bg-current transition-transform duration-300",
                open && "translate-y-[6px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-[1.5px] w-4 bg-current transition-opacity duration-200",
                open ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={cn(
                "h-[1.5px] w-4 origin-center bg-current transition-transform duration-300",
                open && "-translate-y-[6px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8, transition: { duration: 0.18 } }}
            transition={{ duration: 0.28, ease: EASE }}
            className="fixed inset-x-0 bottom-0 bg-background text-foreground md:hidden"
            style={{ top: HEADER_H }}
          >
            <nav
              className="itq-container flex h-full flex-col overflow-y-auto pb-8 pt-2"
              aria-label="Mobile"
            >
              {nav.map((item, idx) => {
                const key = keyFor(item.href);
                const expanded = mobileGroup === key;
                const rows =
                  key === "services"
                    ? serviceMenu.map((entry) => ({ href: `/services#${entry.id}`, title: entry.title }))
                    : key === "work"
                      ? workMenu.map((entry) => ({ href: `/work#${entry.id}`, title: entry.title }))
                      : key === "ai"
                        ? aiMenu.map((entry) => ({ href: entry.href, title: entry.title }))
                        : key === "problems"
                          ? problems.map((entry) => ({ href: entry.href, title: entry.problem }))
                          : homeLinks;
                return (
                  <motion.div
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 + idx * 0.04, ease: EASE }}
                    className="border-b border-line"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="flex-1 py-4 font-display text-[2rem] leading-none text-foreground"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        className="itq-circle h-10 w-10"
                        aria-expanded={expanded}
                        aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
                        onClick={() => setMobileGroup((current) => (current === key ? null : key))}
                      >
                        <span
                          className={cn(
                            "inline-block text-lg leading-none transition-transform duration-300",
                            expanded && "rotate-45",
                          )}
                        >
                          +
                        </span>
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col pb-4">
                            {rows.map((entry) => (
                              <Link
                                key={entry.href + entry.title}
                                href={entry.href}
                                className="block py-2 text-[15px] text-ink-soft"
                              >
                                {entry.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}

              <div className="mt-auto pt-8">
                <PillLink href="/start" className="w-full justify-between">
                  Start a project
                </PillLink>
                <div className="mt-5 flex items-center gap-2">
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                    className="itq-circle"
                  >
                    <WhatsAppIcon />
                  </a>
                  <a href={site.emails[0].href} aria-label="Email" className="itq-circle">
                    <MailIcon />
                  </a>
                  <a href={site.phones[0].href} aria-label="Call" className="itq-circle">
                    <PhoneIcon />
                  </a>
                  <ThemeToggle />
                  <Link
                    href="/login"
                    className="ml-auto font-dm text-[14px] font-medium text-muted-foreground"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px] fill-current">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px] fill-current">
      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px] fill-current">
      <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  );
}

function Column({
  title,
  items,
  divided = false,
}: {
  title: string;
  items: { href: string; title: string }[];
  divided?: boolean;
}) {
  return (
    <div className={cn("min-w-0 flex-1", divided && "border-l border-line pl-8")}>
      <p className="itq-micro">{title}</p>
      <div className="mt-3 flex flex-col">
        {items.map((item) =>
          item.href.startsWith("http") ? (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg px-2 py-1.5 text-[14.5px] text-foreground/80 transition-colors hover:bg-paper-deep hover:text-foreground"
            >
              {item.title}
            </a>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-2 py-1.5 text-[14.5px] text-foreground/80 transition-colors hover:bg-paper-deep hover:text-foreground"
            >
              {item.title}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}

function MenuColumns({ menu }: { menu: MenuKey }) {
  if (menu === "services") {
    const mid = Math.ceil(serviceMenu.length / 2);
    const left = serviceMenu.slice(0, mid).map((item) => ({ href: `/services#${item.id}`, title: item.title }));
    const right = serviceMenu.slice(mid).map((item) => ({ href: `/services#${item.id}`, title: item.title }));
    return (
      <div className="flex gap-10">
        <Column title="Services" items={left} />
        <Column title="More" items={right} divided />
      </div>
    );
  }
  if (menu === "work") {
    return (
      <div className="flex gap-10">
        <Column title="Solutions" items={workMenu.map((item) => ({ href: `/work#${item.id}`, title: item.title }))} />
        <Column title="Live sites" items={work.map((item) => ({ href: item.href, title: item.name }))} divided />
      </div>
    );
  }
  if (menu === "problems") {
    return <Column title="Problems" items={problems.map((item) => ({ href: item.href, title: item.problem }))} />;
  }
  if (menu === "ai") {
    return <Column title="AI & automation" items={aiMenu.map((item) => ({ href: item.href, title: item.title }))} />;
  }
  return <Column title="On this site" items={homeLinks.map((item) => ({ href: item.href, title: item.title }))} />;
}
