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
    <div className="relative mt-12 overflow-hidden sm:mt-16" aria-hidden="true">
      <div
        ref={trackRef}
        className="itq-footer-marquee font-display text-5xl leading-none tracking-tighter text-accent-500/[0.14] dark:text-accent-500/[0.16] sm:text-7xl md:text-[9.5vw]"
      >
        <span className="whitespace-nowrap pr-10 sm:pr-14">{FOOTER_MARQUEE_PHRASE}</span>
        <span className="whitespace-nowrap pr-10 sm:pr-14">{FOOTER_MARQUEE_PHRASE}</span>
      </div>
    </div>
  );
}
