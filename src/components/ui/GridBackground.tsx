"use client";

import { useEffect, useRef } from "react";

export function GridBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const root = document.documentElement;
    const spots = () =>
      document.querySelectorAll<HTMLElement>(".itq-sheet, .band-deep, footer");
    const tick = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      root.style.setProperty("--mouse-x", `${cx}px`);
      root.style.setProperty("--mouse-y", `${cy}px`);
      spots().forEach((node) => {
        const rect = node.getBoundingClientRect();
        node.style.setProperty("--spot-x", `${cx - rect.left}px`);
        node.style.setProperty("--spot-y", `${cy - rect.top}px`);
      });
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onVisibility = () => {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    tick();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(43,99,200,0.05), transparent 60%), radial-gradient(ellipse at bottom right, rgba(74,129,222,0.04), transparent 55%)",
        }}
      />
      <div className="absolute inset-0 itq-grid-faint" />
      <div
        className="absolute inset-0 itq-grid-bright max-md:hidden motion-reduce:hidden [@media(hover:none)]:hidden"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle 220px at var(--mouse-x) var(--mouse-y), black 0%, transparent 78%)",
          maskImage:
            "radial-gradient(circle 220px at var(--mouse-x) var(--mouse-y), black 0%, transparent 78%)",
        }}
      />
      <div
        className="absolute inset-0 max-md:hidden motion-reduce:hidden [@media(hover:none)]:hidden"
        style={{
          background:
            "radial-gradient(circle 220px at var(--mouse-x) var(--mouse-y), var(--glow-cursor), transparent 78%)",
        }}
      />
    </div>
  );
}
