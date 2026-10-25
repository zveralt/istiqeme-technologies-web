import { useEffect, type RefObject } from "react";

/**
 * IO-gate `.heritage-reveal`. Elements should start with data-reveal="pending"
 * in JSX; this upgrades to "ready" when they enter the viewport.
 */
export function useGatedHeritageReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.reveal = "ready";
      return;
    }

    // Already visible (e.g. above the fold) — reveal immediately without waiting a frame.
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (inView) {
      el.dataset.reveal = "ready";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.dataset.reveal = "ready";
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}
