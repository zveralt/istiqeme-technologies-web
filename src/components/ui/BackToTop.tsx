"use client";

import { useEffect, useState } from "react";
import { scrollPageTo } from "@/lib/smooth-scroll";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const next = window.scrollY > 520;
      setVisible((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => scrollPageTo(0, { duration: 1.05 })}
      className="fixed bottom-24 right-5 z-40 grid h-11 w-11 place-items-center rounded-lg border border-line bg-card/95 text-foreground backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-ember/40 md:bottom-8"
    >
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-none stroke-current stroke-[1.75]">
        <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
