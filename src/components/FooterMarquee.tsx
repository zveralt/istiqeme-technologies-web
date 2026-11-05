"use client";

import { useEffect, useRef } from "react";

/** One sequence — duplicated in the DOM so translateX(-50%) loops without a gap. */
export const FOOTER_MARQUEE_PHRASE =
  "STRATEGY · DESIGN · TECHNOLOGY · DIGITAL EXPERIENCES · BUILT TO PERFORM · ";

/**
 * Large decorative typographic marquee (SKH-style seamless loop, Istiqeme type).
 * Hidden from assistive tech; paused off-screen and under prefers-reduced-motion.
 */
export function FooterMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-paused");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("is-paused", !entry?.isIntersecting);
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="itq-footer-marquee-band" aria-hidden="true">
      <div className="itq-footer-marquee-band__fade itq-footer-marquee-band__fade--left" />
      <div className="itq-footer-marquee-band__fade itq-footer-marquee-band__fade--right" />
      <div className="itq-footer-marquee-band__inner overflow-hidden">
        <div
          ref={trackRef}
          className="itq-footer-marquee font-display text-[clamp(3.25rem,11vw,7.5rem)] leading-[0.88] tracking-[-0.02em] text-accent-500/[0.12] dark:text-accent-400/[0.18]"
        >
          <span className="whitespace-nowrap pr-12 sm:pr-16">{FOOTER_MARQUEE_PHRASE}</span>
          <span className="whitespace-nowrap pr-12 sm:pr-16">{FOOTER_MARQUEE_PHRASE}</span>
        </div>
      </div>
    </div>
  );
}
