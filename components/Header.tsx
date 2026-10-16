"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled || open
          ? "bg-paper/88 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Logo />
        <nav
          className="hidden items-center gap-8 text-[13px] text-ink-soft md:flex"
          aria-label="Primary"
        >
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative tracking-wide transition-colors hover:text-ink ${
                  active ? "text-ink" : ""
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-ember" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="hidden md:block">
          <ButtonLink href="/start" variant="ember">
            Start a project
          </ButtonLink>
        </div>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex h-3.5 w-4 flex-col justify-between">
            <span
              className={`h-[1.5px] w-4 origin-center bg-ink transition-transform ${
                open ? "translate-y-[5.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-4 bg-ink transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-[1.5px] w-4 origin-center bg-ink transition-transform ${
                open ? "-translate-y-[5.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-paper px-5 py-6 md:hidden">
          <nav className="flex flex-col gap-4 text-lg" aria-label="Mobile">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="font-display">
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/start" variant="ember">
              Start a project
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
