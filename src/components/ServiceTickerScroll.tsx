"use client";

import { marquee } from "@/lib/site";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type Ref } from "react";

const ROW =
  "font-display flex w-max items-center py-[0.12em] text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.1]";

function Track({
  trackRef,
  tone,
}: {
  trackRef?: Ref<HTMLDivElement>;
  tone: string;
}) {
  return (
    <div ref={trackRef} className={`${ROW} ${tone}`}>
      {marquee.map((item) => (
        <span key={item} className="flex shrink-0 items-center">
          <span aria-hidden className="px-[0.35em]">
            •
          </span>
          <span className="whitespace-nowrap">{item}</span>
        </span>
      ))}
    </div>
  );
}

function MarqueeRow({
  tone,
  reverse = false,
  labelled = false,
}: {
  tone: string;
  reverse?: boolean;
  labelled?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setTravel(track.scrollWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const duration = travel > 0 ? Math.max(travel / 70, 36) : 42;

  return (
    <div className="ticker-fade-edges overflow-clip py-[0.08em]">
      {labelled ? <span className="sr-only">{marquee.join(", ")}</span> : null}
      {reduce || travel === 0 ? (
        <Track trackRef={trackRef} tone={tone} />
      ) : (
        <motion.div
          className="flex w-max"
          animate={{ x: reverse ? [-travel, 0] : [0, -travel] }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          <Track trackRef={trackRef} tone={tone} />
          <Track tone={tone} />
        </motion.div>
      )}
    </div>
  );
}

/**
 * Quiet single-row ticker of service names. Sits at the foot of the hero so
 * the first sheet rides over its lower edge.
 */
export function ServiceTickerScroll({ className }: { className?: string }) {
  return (
    <div className={`service-ticker-scroll relative overflow-clip ${className ?? ""}`} aria-label="Services ticker">
      <MarqueeRow tone="text-foreground/[0.14] dark:text-white/[0.16]" labelled />
    </div>
  );
}
