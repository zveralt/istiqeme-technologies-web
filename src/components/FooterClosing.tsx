"use client";

import { GlowButton } from "@/components/ui/GlowButton";
import { site, waLink } from "@/lib/site";

/** Compact invite integrated into the footer (above nav + marquee). */
export function FooterClosing() {
  return (
    <div
      className="itq-footer__invite"
      role="region"
      aria-labelledby="footer-closing-heading"
    >
      <div className="itq-footer__invite-inner">
        <div className="min-w-0 flex-1">
          <p className="itq-footer__eyebrow">Next step</p>
          <h2
            id="footer-closing-heading"
            className="itq-footer__invite-title font-display text-[clamp(1.75rem,3.8vw,2.75rem)] leading-[0.96] tracking-tight text-ink-900 dark:text-[#f3f4f6]"
          >
            Ready to build something that <span className="text-accent-500">actually works</span>?
          </h2>
          <p className="mt-2 max-w-md text-pretty text-[14px] leading-snug text-ink-500 dark:text-white/50">
            Scoped to how you work — reply within one business day.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
          <GlowButton href="/contact" size="sm" className="w-full sm:w-auto">
            Start a project
          </GlowButton>
          <GlowButton
            href={waLink(site.whatsapp.discussText)}
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </GlowButton>
        </div>
      </div>
    </div>
  );
}
