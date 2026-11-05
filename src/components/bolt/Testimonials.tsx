"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { boltTestimonials as testimonials } from "@/lib/bolt-home-data";
import { useFinePointer } from "@/lib/use-fine-pointer";
import { cn } from "@/lib/utils";
import { TiltParallax } from "@/components/ui/TiltParallax";
import { Reveal } from "./Reveal";

const LEN = testimonials.length;
const SETTLE_MS = 580;

function ringDistance(index: number, active: number) {
  let d = index - active;
  if (d > LEN / 2) d -= LEN;
  if (d < -LEN / 2) d += LEN;
  return d;
}

function posClass(distance: number) {
  if (distance === 0) return "itq-cf-pos-0";
  if (distance === 1) return "itq-cf-pos-1";
  if (distance === 2) return "itq-cf-pos-2";
  if (distance >= 3) return "itq-cf-pos-3";
  if (distance === -1) return "itq-cf-pos-n1";
  if (distance === -2) return "itq-cf-pos-n2";
  return "itq-cf-pos-n3";
}

function wrapIndex(index: number) {
  return ((index % LEN) + LEN) % LEN;
}

type CardProps = {
  item: (typeof testimonials)[number];
  index: number;
  distance: number;
  settling: boolean;
  tiltEnabled: boolean;
  onSelect: (index: number) => void;
};

function TestimonialCoverflowCard({
  item,
  index,
  distance,
  settling,
  tiltEnabled,
  onSelect,
}: CardProps) {
  const isActive = distance === 0;
  const selectable = Math.abs(distance) === 1;
  const tiltLive = tiltEnabled && !settling && isActive;

  return (
    <button
      type="button"
      id={`testimonial-card-${item.company}`}
      role="option"
      aria-selected={isActive}
      tabIndex={isActive || selectable ? 0 : -1}
      className={cn("itq-cf-card", posClass(distance), !isActive && "itq-cf-card-side")}
      onClick={() => {
        if (isActive) return;
        onSelect(index);
      }}
    >
      <TiltParallax
        className="itq-cf-tilt"
        enabled={tiltLive}
        rotateAmplitude={10}
        scaleOnHover={1}
        perspective={800}
      >
        <span className="itq-cf-face">
          <span className="itq-cf-sheen" aria-hidden />
          <span className="itq-cf-body">
            <span className="itq-cf-eyebrow">
              {String(index + 1).padStart(2, "0")} · {item.name}
            </span>
            <span className="itq-cf-title">{item.quote}</span>
            <span className="itq-cf-desc">{item.detail}</span>
            <span className="itq-cf-meta">{item.company}</span>
          </span>
        </span>
      </TiltParallax>
    </button>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [settling, setSettling] = useState(false);
  const reduce = useReducedMotion() ?? false;
  const fine = useFinePointer();
  const labelId = useId();
  const current = testimonials[active] ?? testimonials[0];
  const activeRef = useRef(active);
  const settlingRef = useRef(false);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<number | null>(null);

  activeRef.current = active;

  const commit = useCallback((next: number) => {
    const target = wrapIndex(next);
    if (target === activeRef.current) {
      pendingRef.current = null;
      return;
    }

    settlingRef.current = true;
    setActive(target);
    setSettling(true);
    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(() => {
      settleTimerRef.current = null;
      settlingRef.current = false;
      setSettling(false);
      const pending = pendingRef.current;
      pendingRef.current = null;
      if (pending !== null && pending !== activeRef.current) {
        commit(pending);
      }
    }, SETTLE_MS);
  }, []);

  const go = useCallback(
    (index: number) => {
      const target = wrapIndex(index);
      if (target === activeRef.current) return;
      if (settlingRef.current) {
        pendingRef.current = target;
        return;
      }
      commit(target);
    },
    [commit],
  );

  useEffect(() => {
    return () => {
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;
      const section = document.getElementById("testimonials");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(activeRef.current + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(activeRef.current - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const header = (
    <div className="mx-auto max-w-2xl text-center">
      <p className="mb-3 text-xs font-mono uppercase tracking-wide2 text-accent-500">
        Partner correspondence
      </p>
      <h2
        id={labelId}
        className="itq-section-title text-ink-900 dark:text-ink-50"
      >
        Systems people actually use.
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink-500 dark:text-ink-400 sm:text-base">
        Notes from operators across Karachi. Bring a card forward, then open it for the full story.
      </p>
    </div>
  );

  if (reduce) {
    return (
      <section
        id="testimonials"
        className="relative overflow-x-clip border-y border-ink-200/70 bg-ink-50 py-[clamp(4.5rem,11vw,9rem)] dark:border-ink-800/80 dark:bg-ink-950"
        aria-labelledby={labelId}
      >
        <div className="absolute inset-0 grid-faint pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal>{header}</Reveal>
          <ul className="mt-14 space-y-3">
            {testimonials.map((item, i) => (
              <li key={item.company}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  className={cn(
                    "w-full rounded-2xl border px-5 py-4 text-left transition-colors",
                    active === i
                      ? "border-accent-500 bg-white shadow-[0_18px_50px_rgba(17,28,49,0.1)] dark:bg-ink-900"
                      : "border-ink-200 bg-white/90 hover:border-accent-500/50 dark:border-ink-800 dark:bg-ink-900/90",
                  )}
                >
                  <p className="font-mono text-[10px] uppercase tracking-wide2 text-accent-500">
                    {item.name} · {item.company}
                  </p>
                  <p className="mt-2 font-display text-xl text-ink-900 dark:text-ink-50">
                    {item.quote}
                  </p>
                  {active === i ? (
                    <p className="mt-3 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                      {item.detail}
                    </p>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      id="testimonials"
      className="itq-coverflow-section relative overflow-x-clip border-y border-ink-200/70 bg-ink-50 py-[clamp(4.5rem,11vw,9rem)] dark:border-ink-800/80 dark:bg-ink-950"
      aria-labelledby={labelId}
    >
      <div className="absolute inset-0 grid-faint pointer-events-none" />
      <div className="relative z-10 itq-container text-center">
        <Reveal>{header}</Reveal>

        <Reveal delay={120} className="relative mx-auto mt-14 max-w-5xl sm:mt-20">
          <div
            className="pointer-events-none absolute inset-x-0 bottom-16 mx-auto h-20 max-w-xl rounded-[100%] bg-accent-500/10 blur-3xl"
            aria-hidden
          />

          <div className="itq-coverflow-shell">
            <div
              className={cn("itq-coverflow", settling && "itq-cf-is-settling")}
              role="listbox"
              aria-label="Partner testimonials"
              aria-activedescendant={`testimonial-card-${current.company}`}
            >
              {testimonials.map((item, i) => (
                <TestimonialCoverflowCard
                  key={item.company}
                  item={item}
                  index={i}
                  distance={ringDistance(i, active)}
                  settling={settling}
                  tiltEnabled={fine}
                  onSelect={go}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-5 sm:mt-9">
            <div className="flex items-center justify-center gap-5 sm:gap-6">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(active - 1)}
                className="itq-cf-nav-btn"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
              </button>
              <div className="flex items-center gap-2.5" role="tablist" aria-label="Testimonial slides">
                {testimonials.map((item, i) => (
                  <button
                    key={item.company}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Show testimonial ${i + 1}`}
                    onClick={() => go(i)}
                    className={cn("itq-cf-dot", i === active && "itq-cf-dot-active")}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(active + 1)}
                className="itq-cf-nav-btn"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
              </button>
            </div>
            <p className="text-xs font-mono text-ink-400">
              {current.name} <span className="mx-2 text-ink-300 dark:text-ink-600">·</span>{" "}
              {current.company}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
