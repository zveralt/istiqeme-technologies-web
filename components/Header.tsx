"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { nav, problems, serviceMenu, work, workMenu } from "@/lib/site";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";

type MenuKey = "home" | "services" | "work" | "problems";

const homeLinks = [
  { href: "/#top", title: "Opening", line: "The standard for technology inquiries." },
  { href: "/#services", title: "What we build", line: "Websites, apps, AI, and marketing." },
  { href: "/#work", title: "Live work", line: "Sites and systems already running." },
  { href: "/#problems", title: "Problems", line: "Market gaps and the systems that close them." },
  { href: "/start", title: "Intake", line: "A few taps to the right next step." },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [mobileGroup, setMobileGroup] = useState<MenuKey | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
    setMobileGroup(null);
  }, [pathname]);

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
    if (href.includes("problems")) return "problems";
    return "home";
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 bg-[#07182c] text-white"
      onMouseLeave={() => schedule(null, 180)}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <Logo />
        <nav className="relative hidden items-center gap-8 text-[13px] text-white/75 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const key = keyFor(item.href);
            const base = item.href.split("#")[0];
            const active = item.href === "/" ? pathname === "/" : base !== "/" && pathname.startsWith(base);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 tracking-wide transition-colors delay-75 duration-300 hover:text-white ${
                  active || menu === key ? "text-white" : ""
                }`}
                onMouseEnter={() => schedule(key, 120)}
              >
                {item.label}
                {(active || menu === key) && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-white/80" />
                )}
              </Link>
            );
          })}
          {menu && (
            <div
              className="absolute top-full left-0 z-50 hidden pt-2 md:block"
              onMouseEnter={() => {
                clearTimer();
              }}
            >
              <div className="w-[40rem] max-w-[80vw] rounded-2xl border border-line bg-white p-8 text-ink shadow-xl">
                <MenuColumns menu={menu} />
              </div>
            </div>
          )}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <Link href="/login" className="text-[13px] text-white/80 hover:text-white">
            Login
          </Link>
          <ButtonLink href="/start" variant="ink">
            Start a project
          </ButtonLink>
        </div>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/20 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex h-3.5 w-4 flex-col justify-between">
            <span className={`h-[1.5px] w-4 origin-center bg-white transition-transform ${open ? "translate-y-[5.5px] rotate-45" : ""}`} />
            <span className={`h-[1.5px] w-4 bg-white transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`h-[1.5px] w-4 origin-center bg-white transition-transform ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#07182c] px-5 py-6 md:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {nav.map((item) => {
              const key = keyFor(item.href);
              const expanded = mobileGroup === key;
              const rows =
                key === "services"
                  ? serviceMenu.map((entry) => ({ href: `/services#${entry.id}`, title: entry.title, line: entry.problem }))
                  : key === "work"
                    ? workMenu.map((entry) => ({ href: `/work#${entry.id}`, title: entry.title, line: entry.problem }))
                    : key === "problems"
                      ? problems.map((entry) => ({ href: entry.href, title: entry.problem, line: entry.solution }))
                      : homeLinks;
              return (
                <div key={item.href}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between text-white"
                    aria-expanded={expanded}
                    onClick={() => setMobileGroup((current) => (current === key ? null : key))}
                  >
                    {item.label}
                    <span className="text-sm text-white/50">{expanded ? "−" : "+"}</span>
                  </button>
                  {expanded && (
                    <div className="mt-3 flex flex-col gap-2">
                      {rows.map((entry) => (
                        <Link key={entry.href + entry.title} href={entry.href} className="block py-1 text-[14px] text-white/90">
                          {entry.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <Link href="/login" className="text-white/80">
              Login
            </Link>
            <ButtonLink href="/start" variant="ink">
              Start a project
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
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
    <div className={`min-w-0 flex-1 ${divided ? "border-l border-line pl-8" : ""}`}>
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{title}</p>
      <div className="mt-3 flex flex-col gap-1">
        {items.map((item) =>
          item.href.startsWith("http") ? (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="rounded-lg px-2 py-2 text-[15px] text-forest hover:bg-[#eef3f9]">
              {item.title}
            </a>
          ) : (
            <Link key={item.href} href={item.href} className="rounded-lg px-2 py-2 text-[15px] text-forest hover:bg-[#eef3f9]">
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
    return (
      <Column
        title="Problems"
        items={problems.map((item) => ({ href: item.href, title: item.problem }))}
      />
    );
  }
  return <Column title="On this site" items={homeLinks.map((item) => ({ href: item.href, title: item.title }))} />;
}
