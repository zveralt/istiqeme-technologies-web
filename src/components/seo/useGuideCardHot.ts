"use client";

import { useCallback, useRef, type PointerEvent } from "react";

/** Shared pointer tracking for premium guide / proof / explore cards. */
export function useGuideCardHot<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  const setFromEvent = useCallback((event: PointerEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--guide-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--guide-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }, []);

  const onEnter = useCallback(
    (event: PointerEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      el.dataset.hot = "true";
      setFromEvent(event);
    },
    [setFromEvent],
  );

  const onMove = useCallback(
    (event: PointerEvent<T>) => {
      setFromEvent(event);
    },
    [setFromEvent],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    delete el.dataset.hot;
    el.style.setProperty("--guide-x", "50%");
    el.style.setProperty("--guide-y", "40%");
  }, []);

  return { ref, onEnter, onMove, onLeave };
}
