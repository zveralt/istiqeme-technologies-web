"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/**
 * Premium closing statement — sits above the footer link grid.
 * Contact is primary; Work is a quiet secondary path.
 */
export function FooterClosing() {
  return (
    <section
      aria-labelledby="footer-closing-heading"
      className="relative border-b border-ink-200/80 dark:border-white/10"
    >
      <div className="pointer-events-none absolute inset-0 itq-grid opacity-40 dark:opacity-35" aria-hidden />
      <div className="itq-container relative py-16 md:py-24 lg:py-28">
        <p className="itq-eyebrow">Next step</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-6">
          <div className="lg:col-span-9">
            <h2
              id="footer-closing-heading"
              className="font-display max-w-[18ch] text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.92] tracking-tight text-ink-900 dark:text-[#f5f5f6] sm:max-w-none"
            >
              Ready to build something
              <br />
              that <span className="text-accent-500">actually works</span>
              <span className="text-ink-900 dark:text-[#f5f5f6]">?</span>
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-[16px] leading-relaxed text-ink-500 dark:text-white/55 md:text-[17px]">
              Websites, software, and AI systems scoped to how your business runs — then handed to you
              with a clear next step, not a pitch deck.
            </p>
          </div>

          {/* Action stack: far-right, vertically centered with the copy block */}
          <div className="flex flex-col items-start gap-3.5 lg:col-span-3 lg:items-end">
            <Link
              href="/contact"
              className="group inline-flex min-h-11 items-center gap-2.5 rounded-md bg-accent-500 px-6 py-3 text-[13px] font-semibold tracking-wide text-white transition-[background-color,transform] duration-200 hover:bg-accent-600 active:translate-y-px motion-reduce:transition-colors motion-reduce:active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper dark:focus-visible:ring-offset-[#111214]"
            >
              Talk to the team
              <ArrowRight
                size={15}
                strokeWidth={2.25}
                className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                aria-hidden
              />
            </Link>
            <Link
              href="/work"
              className="group inline-flex min-h-10 items-center gap-1.5 border-b border-ink-300/80 pb-0.5 text-[13px] font-medium text-ink-700 transition-[color,border-color] duration-200 hover:border-accent-500 hover:text-accent-600 dark:border-white/25 dark:text-white/70 dark:hover:border-accent-400 dark:hover:text-accent-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper dark:focus-visible:ring-offset-[#111214]"
            >
              See selected work
              <ArrowUpRight
                size={14}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
