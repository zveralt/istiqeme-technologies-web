"use client";

import { useRef, useState } from "react";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [drag, setDrag] = useState(0);
  const startX = useRef<number | null>(null);
  const t = testimonials[i];

  const [nudge, setNudge] = useState(0);

  function go(nextIndex: number, direction: number) {
    setNudge(direction * 48);
    window.setTimeout(() => {
      setI(nextIndex);
      setNudge(direction * -48);
      window.setTimeout(() => setNudge(0), 40);
    }, 180);
  }

  function next() {
    go((i + 1) % testimonials.length, -1);
  }
  function prev() {
    go((i - 1 + testimonials.length) % testimonials.length, 1);
  }

  return (
    <div className="relative overflow-hidden">
      <p className="itq-eyebrow">Correspondence from partners across Karachi</p>
      <blockquote
        className="mt-8 max-w-5xl cursor-grab touch-pan-y font-display text-[clamp(2.1rem,5.4vw,4.8rem)] leading-[0.98] tracking-tight text-foreground transition-transform duration-200 active:cursor-grabbing md:mt-10"
        style={{ transform: `translateX(${drag + nudge}px)` }}
        onPointerDown={(event) => {
          startX.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (startX.current == null) return;
          setDrag(event.clientX - startX.current);
        }}
        onPointerUp={() => {
          if (drag < -48) next();
          else if (drag > 48) prev();
          setDrag(0);
          startX.current = null;
        }}
        onPointerCancel={() => {
          setDrag(0);
          startX.current = null;
        }}
      >
        “{t.quote}”
      </blockquote>
      <div className="mt-10 flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[16px] font-medium text-foreground">
            {t.name} · {t.org}
          </p>
          <p className="mt-1 text-[13px] text-muted">
            {t.title} · {t.date}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous testimonial"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              prev();
            }}
            className="itq-circle"
          >
            ←
          </button>
          <span className="font-dm text-[12px] tabular-nums tracking-[0.12em] text-muted">
            {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label="Next testimonial"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              next();
            }}
            className="itq-circle"
          >
            →
          </button>
        </div>
      </div>
      <div className="mt-6 flex gap-2">
        {testimonials.map((item, idx) => (
          <button
            key={item.name}
            type="button"
            aria-label={`View testimonial from ${item.name}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              go(idx, idx > i ? -1 : 1);
            }}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${idx === i ? "bg-forest dark:bg-ember-bright" : "bg-line"}`}
          />
        ))}
      </div>
    </div>
  );
}
