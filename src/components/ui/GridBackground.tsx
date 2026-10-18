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

    const tick = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      el.style.setProperty("--mouse-x", `${cx}px`);
      el.style.setProperty("--mouse-y", `${cy}px`);
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
    const onVisibility = () => {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0"
      style={
        {
          "--mouse-x": "50vw",
          "--mouse-y": "50vh",
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, color-mix(in srgb, var(--color-forest) 8%, transparent), transparent 60%), radial-gradient(ellipse at bottom right, color-mix(in srgb, var(--color-ember) 6%, transparent), transparent 55%)",
        }}
      />
      <div className="absolute inset-0 itq-grid opacity-40" />
      <div
        className="absolute inset-0 itq-grid-bright max-md:hidden [@media(hover:none)]:hidden"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle 220px at var(--mouse-x) var(--mouse-y), black 0%, transparent 78%)",
          maskImage:
            "radial-gradient(circle 220px at var(--mouse-x) var(--mouse-y), black 0%, transparent 78%)",
        }}
      />
      <div
        className="absolute inset-0 max-md:hidden [@media(hover:none)]:hidden"
        style={{
          background:
            "radial-gradient(circle 220px at var(--mouse-x) var(--mouse-y), var(--glow-cursor), transparent 78%)",
        }}
      />
    </div>
  );
}
