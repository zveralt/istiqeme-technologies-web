"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Star, X } from "lucide-react";
import { testimonials } from "@/lib/site";
import { TiltParallax } from "@/components/ui/TiltParallax";
import { cn } from "@/lib/utils";

const LEN = testimonials.length;
const SETTLE_MS = 550;

type Testimonial = (typeof testimonials)[number];

function ringDistance(index: number, active: number) {
  let d = index - active;
  if (d > LEN / 2) d -= LEN;
  if (d < -LEN / 2) d += LEN;
  return d;
}

function posClass(distance: number) {
  if (distance === 0) return "itq-cf-pos-0";
  if (distance === 1) return "itq-cf-pos-1";
  if (distance === -1) return "itq-cf-pos-n1";
  if (distance === 2) return "itq-cf-pos-2";
  if (distance === -2) return "itq-cf-pos-n2";
  if (distance >= 3) return "itq-cf-pos-3";
  return "itq-cf-pos-n3";
}

function wrapIndex(index: number) {
  return ((index % LEN) + LEN) % LEN;
}

function StarRating({ value, size = "sm" }: { value: number; size?: "sm" | "md" }) {
  const full = Math.floor(value);
  const partial = value - full >= 0.5;
  const icon = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < full || (i === full && partial);
        return (
          <Star
            key={i}
            className={cn(icon, filled ? "fill-ember-bright text-ember-bright" : "text-white/25")}
            strokeWidth={1.75}
          />
        );
      })}
      <span
        className={cn(
          "ml-1.5 font-dm font-medium tabular-nums text-white/85",
          size === "md" ? "text-[14px]" : "text-[12px]",
        )}
      >
        {value.toFixed(1)}
      </span>
    </div>
  );
}

function TestimonialDetailPanel({
  item,
  onClose,
}: {
  item: Testimonial;
  onClose: () => void;
}) {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      className="fixed inset-0 z-[80] flex items-end justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`itq-testimonial-panel-title-${item.id}`}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-[#0a0a0c]/72 sm:bg-[#0a0a0c]/65"
        aria-label="Close"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        className="itq-cf-panel relative w-full max-w-lg max-h-[min(92dvh,100%)] overflow-y-auto rounded-2xl border border-white/10 bg-[#111214] shadow-[0_32px_80px_-24px_rgba(0,0,0,0.75)] sm:max-w-xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close note"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-[#111214]/90 text-white/90 transition hover:border-ember-bright/50 hover:text-ember-bright"
        >
          <X className="h-4 w-4" strokeWidth={2.25} />
        </button>

        <div className="p-6 pb-8 pt-7 sm:p-8 sm:pb-9">
          <p className="font-dm text-[12px] font-semibold text-ember-bright">{item.org}</p>
          <h4
            id={`itq-testimonial-panel-title-${item.id}`}
            className="mt-2 font-display text-[1.65rem] leading-[1.08] tracking-tight text-white sm:text-[1.85rem]"
          >
            {item.headline}
          </h4>
          <div className="mt-4">
            <StarRating value={item.rating} size="md" />
          </div>
          <blockquote className="mt-5 border-l-2 border-ember-bright/60 pl-4 font-dm text-[15px] italic leading-relaxed text-white/92 sm:text-[16px]">
            “{item.quote}”
          </blockquote>
          <p className="mt-5 font-dm text-[14px] leading-relaxed text-white/72">{item.detail}</p>
          <div className="mt-6 rounded-2xl bg-white/[0.06] px-4 py-3.5">
            <p className="font-dm text-[15px] font-semibold text-white">{item.name}</p>
            <p className="mt-1 font-dm text-[13px] text-white/65">{item.title}</p>
            <p className="mt-1 font-dm text-[12px] text-white/50">{item.date}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

type CardProps = {
  item: Testimonial;
  index: number;
  distance: number;
  settling: boolean;
  panelOpen: boolean;
  onSelect: (index: number) => void;
  onOpenPanel: () => void;
};

function CoverflowCard({
  item,
  index,
  distance,
  settling,
  panelOpen,
  onSelect,
  onOpenPanel,
}: CardProps) {
  const isActive = distance === 0;
  const selectable = Math.abs(distance) <= 2;
  const tiltLive = isActive && !settling && !panelOpen;

  const face = (
    <span className="itq-cf-face">
      <span className="itq-cf-sheen" aria-hidden />
      <span className="itq-cf-body">
        <span className="itq-cf-label">{item.org}</span>
        <span className="itq-cf-title">{item.headline}</span>
        <span className="itq-cf-summary">{item.summary}</span>
        <span className="itq-cf-hint" aria-hidden={!isActive}>
          <span className="itq-cf-hint-text">{isActive ? "Open full note" : "Bring forward"}</span>
          <ChevronDown
            className={cn("itq-cf-hint-icon", isActive && !panelOpen && "itq-cf-hint-icon-pulse")}
            strokeWidth={2.25}
          />
        </span>
      </span>
    </span>
  );

  return (
    <button
      type="button"
      id={`itq-cf-card-${index}`}
      role="option"
      aria-selected={isActive}
      tabIndex={selectable ? 0 : -1}
      className={cn("itq-cf-card", posClass(distance), !isActive && "itq-cf-card-side")}
      onClick={() => {
        if (!isActive) {
          onSelect(index);
          return;
        }
        onOpenPanel();
      }}
    >
      {isActive ? (
        <TiltParallax className="itq-cf-tilt" enabled={tiltLive} rotateAmplitude={9} scaleOnHover={1.025}>
          {face}
        </TiltParallax>
      ) : (
        face
      )}
    </button>
  );
}

export function Testimonials() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const [settling, setSettling] = useState(false);
  const activeRef = useRef(active);
  const settlingRef = useRef(false);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  activeRef.current = active;
  const current = testimonials[active] ?? testimonials[0];

  const closePanel = useCallback(() => setPanelOpen(false), []);

  const go = useCallback((index: number) => {
    const target = wrapIndex(index);
    if (target === activeRef.current && !settlingRef.current) return;
    setPanelOpen(false);
    if (target === activeRef.current) return;
    settlingRef.current = true;
    setSettling(true);
    setActive(target);
    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(() => {
      settlingRef.current = false;
      setSettling(false);
    }, SETTLE_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!panelOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [panelOpen, closePanel]);

  if (reduce) {
    return (
      <div className="itq-coverflow-block">
        <h3 className="text-center font-display text-[clamp(1.65rem,3.2vw,2.35rem)] font-normal leading-[1.05] tracking-tight text-white">
          Partner correspondence
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-center font-dm text-[15px] leading-relaxed text-white/70">
          Notes from operators across Karachi — open any note for the full quote and rating.
        </p>
        <ul className="mt-10 grid gap-3">
          {testimonials.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  setActive(i);
                  setPanelOpen(true);
                }}
                className={cn(
                  "w-full rounded-2xl px-5 py-4 text-left transition-colors",
                  active === i ? "bg-white/10 ring-1 ring-ember-bright/60" : "bg-white/5 ring-1 ring-white/10",
                )}
              >
                <p className="font-dm text-[13px] font-medium text-ember-bright">{item.org}</p>
                <p className="mt-2 font-display text-[1.15rem] leading-snug text-white">{item.headline}</p>
                <p className="mt-2 font-dm text-[14px] leading-relaxed text-white/70">{item.summary}</p>
              </button>
            </li>
          ))}
        </ul>
        <AnimatePresence>
          {panelOpen && <TestimonialDetailPanel item={testimonials[active] ?? testimonials[0]} onClose={closePanel} />}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="itq-coverflow-block">
      <h3 className="text-center font-display text-[clamp(1.65rem,3.2vw,2.35rem)] font-normal leading-[1.05] tracking-tight text-white">
        Partner correspondence
      </h3>
      <p className="mx-auto mt-4 max-w-lg text-center font-dm text-[15px] leading-relaxed text-white/70">
        Notes from operators across Karachi. Bring a card forward, then open it for the full quote, rating, and contact
        details.
      </p>

      <div
        className="itq-cf-bleed relative mt-12 motion-reduce:hidden"
        style={{
          opacity: panelOpen ? 0.32 : 1,
          pointerEvents: panelOpen ? "none" : "auto",
          transition: "opacity 0.35s ease",
        }}
      >
        <div className="itq-cf-grid" aria-hidden />
        <div className="itq-cf-shell">
          <div
            className={cn("itq-coverflow", settling && "itq-cf-settling")}
            role="listbox"
            aria-label="Partner correspondence"
            aria-activedescendant={`itq-cf-card-${active}`}
          >
            {testimonials.map((item, i) => (
              <CoverflowCard
                key={item.id}
                item={item}
                index={i}
                distance={ringDistance(i, active)}
                settling={settling}
                panelOpen={panelOpen}
                onSelect={go}
                onOpenPanel={() => setPanelOpen(true)}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className="mt-6 flex items-center justify-center gap-5 motion-reduce:hidden sm:mt-8"
        style={{ opacity: panelOpen ? 0.4 : 1, pointerEvents: panelOpen ? "none" : "auto" }}
      >
        <button type="button" className="itq-cf-nav" aria-label="Previous note" onClick={() => go(active - 1)}>
          <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
        </button>
        <div className="flex max-w-[min(100%,18rem)] flex-wrap items-center justify-center gap-2" role="tablist">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show note from ${item.name}`}
              onClick={() => go(i)}
              className={cn("itq-cf-dot", i === active && "itq-cf-dot-active")}
            />
          ))}
        </div>
        <button type="button" className="itq-cf-nav" aria-label="Next note" onClick={() => go(active + 1)}>
          <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
        </button>
      </div>

      <p className="mt-4 text-center font-dm text-[13px] text-white/55 motion-reduce:hidden">
        {current.name} · {current.org}
      </p>

      <AnimatePresence>
        {panelOpen && <TestimonialDetailPanel item={current} onClose={closePanel} />}
      </AnimatePresence>
    </div>
  );
}
