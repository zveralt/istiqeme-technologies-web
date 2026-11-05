"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenisInstance } from "@/lib/smooth-scroll";

/**
 * Eases wheel scrolling on fine pointers. Touch, keyboard, and the scrollbar
 * stay native. Reduced motion skips Lenis entirely.
 *
 * CRITICAL — scroll-skew feel: `lerp: 0.085` and `wheelMultiplier: 0.82` are
 * the established wheel inertia. Do not change intensity, direction, or timing.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduceMq.matches || !fineMq.matches) return;

    const root = document.documentElement;
    // Lenis + CSS scroll-behavior:smooth fight each other and cause jitter.
    const prevScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const lenis = new Lenis({
      // --- scroll-skew feel (do not change) ---
      lerp: 0.085,
      wheelMultiplier: 0.82,
      // ---------------------------------------
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true,
      // Built-in reduced-motion handling if preference flips mid-session.
      respectReducedMotion: true,
    });

    setLenisInstance(lenis);

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

    const onPreferenceChange = () => {
      // Tear down if the user enables reduced motion while browsing.
      if (reduceMq.matches) {
        document.removeEventListener("click", onClick);
        setLenisInstance(null);
        lenis.destroy();
        root.style.scrollBehavior = prevScrollBehavior;
      }
    };
    reduceMq.addEventListener?.("change", onPreferenceChange);

    return () => {
      reduceMq.removeEventListener?.("change", onPreferenceChange);
      document.removeEventListener("click", onClick);
      setLenisInstance(null);
      lenis.destroy();
      root.style.scrollBehavior = prevScrollBehavior;
    };
  }, []);

  return null;
}
