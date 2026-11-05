import type Lenis from "lenis";

/**
 * Shared Lenis handle so programmatic scrolls (anchors, back-to-top) stay on
 * the same easing path as wheel scrolling — no competing native smooth scroll.
 *
 * The wheel “scroll-skew” feel lives in SmoothScroll’s Lenis config
 * (lerp / wheelMultiplier). Do not change those values from here.
 */
let lenis: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

export function scrollPageTo(
  target: number | string | HTMLElement,
  options?: { offset?: number; duration?: number; immediate?: boolean },
) {
  const instance = lenis;
  if (instance) {
    instance.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.immediate ? 0 : (options?.duration ?? 1.05),
      immediate: options?.immediate,
    });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({
      top: target,
      left: 0,
      behavior: options?.immediate ? "auto" : "smooth",
    });
    return;
  }

  const el =
    typeof target === "string"
      ? document.getElementById(target.replace(/^#/, ""))
      : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + (options?.offset ?? 0);
  window.scrollTo({
    top,
    left: 0,
    behavior: options?.immediate ? "auto" : "smooth",
  });
}
