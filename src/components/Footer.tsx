"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { FooterClosing } from "@/components/FooterClosing";
import { FooterMarquee } from "@/components/FooterMarquee";
import { useTheme } from "@/components/ui/ThemeProvider";
import { aiMenu, nav, site } from "@/lib/site";
import { scrollPageTo } from "@/lib/smooth-scroll";

const explore = [
  ...nav.map((item) => ({ href: item.href, label: item.label })),
  { href: "/start", label: "Start a project" },
  { href: "/login", label: "Login" },
];

export function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer
      data-header-theme={isDark ? "dark" : "light"}
      className="itq-blueprint relative z-10 overflow-hidden border-t border-ink-200/80 bg-white text-ink-900 dark:border-transparent dark:bg-[#0a0a0c] dark:text-[#e8e8ea]"
    >
      <FooterClosing />

      <div className="itq-container relative z-[1]">
        <div className="grid gap-10 py-12 md:grid-cols-12 md:py-16">
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-400 dark:text-white/45">
              Explore
            </p>
            <ul className="mt-5 space-y-2.5 text-[15px]">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-700 transition-colors hover:text-ink-900 dark:text-white/85 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-400 dark:text-white/45">
              AI & automation
            </p>
            <ul className="mt-5 space-y-2.5 text-[15px]">
              {aiMenu.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-700 transition-colors hover:text-ink-900 dark:text-white/85 dark:hover:text-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-400 dark:text-white/45">
              Contact
            </p>
            <ul className="mt-5 space-y-2.5 text-[15px]">
              {site.phones.map((p) => (
                <li key={p.href}>
                  <a
                    href={p.href}
                    className="text-ink-700 transition-colors hover:text-ink-900 dark:text-white/85 dark:hover:text-white"
                  >
                    {p.label}
                  </a>
                </li>
              ))}
              {site.emails.map((e) => (
                <li key={e.href}>
                  <a
                    href={e.href}
                    className="text-ink-700 transition-colors hover:text-ink-900 dark:text-white/85 dark:hover:text-white"
                  >
                    {e.label}
                  </a>
                </li>
              ))}
            </ul>
            <address className="mt-6 max-w-sm text-[13px] not-italic leading-relaxed text-ink-500 dark:text-white/60">
              {site.address}
            </address>
          </div>
        </div>

        <FooterMarquee />

        <div className="mt-10 flex flex-col gap-6 border-t border-ink-200/80 py-6 text-[12px] text-ink-400 dark:border-white/10 dark:text-white/50 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p>
              © {new Date().getFullYear()} {site.name}
            </p>
            <p>Engineered in {site.city} · Premium digital systems</p>
          </div>
          <button
            type="button"
            onClick={() => {
              const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
              scrollPageTo(0, { immediate: !fine, duration: 1.05 });
            }}
            className="group inline-flex items-center gap-2 self-start font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400 transition-colors hover:text-accent-500 dark:text-white/50 dark:hover:text-accent-300 md:self-auto"
          >
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full border border-ink-200 bg-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:border-accent-500/40 dark:border-white/15 dark:bg-transparent">
              <ArrowUp className="h-3.5 w-3.5" aria-hidden />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
