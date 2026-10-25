import { useEffect, type RefObject } from "react";

/** Marks a root with data-inview so off-screen infinite CSS animations can pause. */
export function useAnimInView(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.dataset.animRoot = "true";

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.dataset.inview = entry?.isIntersecting ? "true" : "false";
      },
      { rootMargin: "80px 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}
