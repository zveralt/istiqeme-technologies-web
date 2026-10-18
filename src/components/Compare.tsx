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
        <div className="absolute inset-0 bg-[#e7eef8] text-[#1a2740]">
          <div className="flex items-center justify-between gap-3 border-b border-[#c5d4e8] bg-[#f7fbff] px-4 py-3 md:px-6">
            <span className="font-serif text-[15px] text-[#1d4f91]">My Website</span>
            <span className="hidden font-serif text-[11px] text-[#5c6b80] sm:block">
              Home | About | Products | Contact | Sitemap
            </span>
            <span className="rounded bg-[#1d4f91] px-2 py-1 font-serif text-[10px] text-white">
              CLICK HERE
            </span>
          </div>
          <div className="mx-4 mt-4 rounded-lg bg-gradient-to-r from-[#1d4f91] to-[#3d7ec9] px-4 py-5 text-white md:mx-6">
            <p className="font-serif text-[11px] tracking-wide text-white/70">WELCOME TO OUR WEBSITE!!!</p>
            <p className="mt-1 max-w-sm font-serif text-lg leading-snug">Best products at lowest prices. Buy now!!!</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 px-4 md:gap-3 md:px-6">
            {[
              ["#f4c542", "Sale item"],
              ["#d4564e", "New item"],
              ["#3aa36a", "Hot item"],
            ].map(([color, label]) => (
              <div key={label} className="rounded-md border border-[#c5d4e8] bg-white p-2 md:p-3">
                <div className="h-10 rounded-sm md:h-16" style={{ background: color }} />
                <p className="mt-2 font-serif text-[11px] md:text-xs">{label}</p>
                <span className="mt-2 inline-block rounded bg-[#1d4f91] px-2 py-0.5 font-serif text-[10px] text-white">
                  Buy
                </span>
              </div>
            ))}
          </div>
          <p className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
            Template
          </p>
        </div>
        <div
          className="absolute inset-0 overflow-hidden bg-[#f6f8fb]"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <div className="flex h-full flex-col bg-[#f6f8fb] text-[#102033]">
            <div className="flex items-center justify-between border-b border-[#d7e0ea] bg-white px-5 py-3.5 md:px-8">
              <span className="text-[13px] font-semibold tracking-[0.14em]">ISTIQEME</span>
              <span className="hidden text-[11px] tracking-[0.16em] text-[#5c6b80] uppercase sm:block">
                Work · Services · Start
              </span>
              <span className="rounded-full bg-[#0e3a66] px-3 py-1.5 text-[10px] font-semibold tracking-wide text-white">
                Start a project
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center px-5 py-6 md:px-10">
              <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c6b80] uppercase">
                Storefront
              </p>
              <h3 className="mt-3 max-w-md font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.02] text-[#0e3a66]">
                A shop people trust at first glance.
              </h3>
              <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-[#24344a]">
                Clear products, a direct next step, and a name that holds up.
              </p>
              <div className="mt-6 grid max-w-lg grid-cols-3 gap-2 md:gap-3">
                {["Credo", "Veritas", "SKH"].map((name) => (
                  <div
                    key={name}
                    className="rounded-2xl border border-[#d7e0ea] bg-white p-3 shadow-[0_12px_30px_-18px_rgba(14,58,102,0.45)]"
                  >
                    <div className="h-8 rounded-lg bg-[#e8eef6] md:h-12" />
                    <p className="mt-2 text-[12px] font-medium">{name}</p>
                    <p className="text-[10px] tracking-[0.14em] text-[#5c6b80] uppercase">Live</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="absolute right-4 bottom-4 rounded-full bg-[#0e3a66] px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-white uppercase">
            ISTIQEME
          </p>
        </div>
        <div
          className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_0_1px_rgba(16,32,51,0.25)]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#0e3a66] shadow-[0_8px_24px_-8px_rgba(16,32,51,0.55)] ring-2 ring-white">
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
