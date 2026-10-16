"use client";

import { useState } from "react";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];

  return (
    <div className="relative overflow-hidden rounded-[32px] bg-ink px-6 py-12 text-cream md:px-14 md:py-16">
      <p className="text-[11px] uppercase tracking-[0.28em] text-cream/40">
        Verified correspondence from partners across Karachi
      </p>
      <blockquote className="mt-8 max-w-4xl font-display text-[clamp(2rem,5vw,4.4rem)] leading-[1.05] tracking-tight">
        “{t.quote}”
      </blockquote>
      <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[16px]">
            {t.name} · {t.org}
          </p>
          <p className="text-[13px] text-cream/55">
            {t.title} · {t.date}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => setI((n) => (n - 1 + testimonials.length) % testimonials.length)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 hover:bg-white/10"
          >
            ←
          </button>
          <span className="text-[12px] tabular-nums text-cream/50">
            {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setI((n) => (n + 1) % testimonials.length)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 hover:bg-white/10"
          >
            →
          </button>
        </div>
      </div>
      <div className="mt-8 flex gap-2">
        {testimonials.map((item, idx) => (
          <button
            key={item.name}
            type="button"
            aria-label={`View testimonial from ${item.name}`}
            onClick={() => setI(idx)}
            className={`h-1.5 flex-1 rounded-full ${idx === i ? "bg-ember" : "bg-white/15"}`}
          />
        ))}
      </div>
    </div>
  );
}
