import { useEffect, type RefObject } from "react";

export function useScrollParallax(ref: RefObject<HTMLElement | null>, maxPx = 6) {
  useEffect(() => {
    if (maxPx <= 0) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (center - window.innerHeight / 2) / window.innerHeight;
      el.style.transform = `translateX(${offset * maxPx}px)`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [ref, maxPx]);
}
