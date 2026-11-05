"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getLenis, scrollPageTo } from "@/lib/smooth-scroll";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.length > 1) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        // Instant jump on route change — do not animate through Lenis here.
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(el, { offset: -72, immediate: true });
        else el.scrollIntoView({ block: "start" });
        return;
      }
    }
    scrollPageTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
