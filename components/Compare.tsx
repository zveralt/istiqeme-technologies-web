"use client";

import { useRef, useState } from "react";

export function Compare() {
  const wrap = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(54);

  function move(clientX: number) {
    const el = wrap.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(92, Math.max(8, next)));
  }

  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.24em] text-muted">
        The ISTIQEME difference
      </p>
      <h2 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05]">
        Slide to see a template become a storefront people trust.
      </h2>
      <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
        ISTIQEME corporate hub — from a generic template site to a
        precision-engineered institutional platform.
      </p>
      <div
        ref={wrap}
        className="relative mt-8 h-[420px] cursor-ew-resize overflow-hidden rounded-[28px] border border-line select-none md:h-[520px]"
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) move(e.clientX);
        }}
      >
        <div className="absolute inset-0 bg-[#1b3a6e] p-6 text-white">
          <p className="text-[10px] tracking-[0.3em] text-white/50">
            SPECIMEN A · LEGACY TEMPLATE
          </p>
          <div className="mt-6 font-serif text-3xl">Welcome to our Website!!!</div>
          <p className="mt-3 max-w-sm font-serif text-sm text-cyan-100">
            Click here for more information. Home | About | Contact | Sitemap
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {["Blue buttons", "Stock banners", "Unclear next step"].map((x) => (
              <div key={x} className="rounded bg-white/10 p-4 font-serif text-sm">
                {x}
              </div>
            ))}
          </div>
        </div>
        <div
          className="absolute inset-0 overflow-hidden bg-paper"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <div className="h-full p-6 md:p-10">
            <p className="text-[10px] tracking-[0.3em] text-muted">
              SPECIMEN B · ARCHITECTURAL REFRAME
            </p>
            <h3 className="mt-6 font-display text-4xl leading-[1.05] md:text-5xl">
              Data, mapped.
              <br />
              Decisions, clear.
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
              Corporate platform for clear data tracking, clean information
              mapping, and direct executive communication.
            </p>
            <div className="mt-8 flex gap-6 text-[12px] uppercase tracking-[0.18em] text-muted">
              <span>Uptime 99.9%</span>
              <span>Karachi</span>
              <span>Live</span>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-y-0 z-10 w-px bg-ember"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ember text-cream shadow-lg">
            ↔
          </div>
        </div>
        <input
          type="range"
          min={8}
          max={92}
          value={pos}
          aria-label="Drag to compare specimens"
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 z-20 cursor-ew-resize opacity-0"
        />
      </div>
      <p className="mt-3 text-center text-[12px] text-muted">
        Drag the handle to compare · Template left, ISTIQEME right
      </p>
    </div>
  );
}
