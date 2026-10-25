"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Eases wheel scrolling on fine pointers. Touch, keyboard, and the scrollbar
 * stay native. Reduced motion skips Lenis entirely.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.82,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true,
    });

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.includes("#")) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname || url.hash.length < 2) return;
      const id = decodeURIComponent(url.hash.slice(1));
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -72, duration: 1.05 });
      history.pushState(null, "", `#${id}`);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
