"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { pillars, testimonials } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The one pinned scene on the homepage. A tall wrapper holds a sticky
 * viewport stage; scroll progress selects which pillar (and matching
 * testimonial) is active. On small screens and reduced-motion, the same
 * content stacks statically — no sticky, no progress coupling.
 */
export function WhyPinned() {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce === true) return;
    const next = Math.min(pillars.length - 1, Math.max(0, Math.floor(v * pillars.length)));
    setActive((prev) => (prev === next ? prev : next));
  });

  const pillar = pillars[active] ?? pillars[0];
  const quote = testimonials[active] ?? testimonials[0];

  return (
    <section
      data-header-theme="dark"
      className="itq-sheet itq-sheet--deep on-dark md:!pb-0"
      aria-label="Why ISTIQEME"
    >
      <div ref={wrap} className="itq-why-pin md:h-[220vh] motion-reduce:md:h-auto">
        <div className="itq-why-stage itq-container md:sticky md:top-0 md:flex md:h-svh md:flex-col md:justify-center md:pt-24 md:pb-10 motion-reduce:md:static motion-reduce:md:block motion-reduce:md:h-auto">
          <div className="hidden items-start justify-between gap-8 xl:flex">
            <p className="max-w-[13rem]">
              <span className="block font-dm text-[11px] font-semibold tracking-[0.22em] text-ember-bright">
                [ WITHOUT ]
              </span>
              <span className="mt-2 block text-[16px] font-medium leading-snug text-white/80">
                Spreadsheets &amp; private chats
              </span>
            </p>
            <p className="max-w-[13rem] text-right">
              <span className="block font-dm text-[11px] font-semibold tracking-[0.22em] text-ember-bright">
                [ WITH ISTIQEME ]
              </span>
              <span className="mt-2 block text-[16px] font-medium leading-snug text-white/80">
                One system
              </span>
            </p>
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <p className="itq-eyebrow justify-center">Why ISTIQEME</p>
            <h2 className="itq-h2 mt-4 text-white md:mt-5">
              Three things, done properly<span className="text-ember-bright">.</span>
            </h2>
          </div>

          {/* Mobile / reduced-motion: full stacked list */}
          <ol className="mx-auto mt-10 max-w-2xl md:hidden motion-reduce:md:block">
            {pillars.map((p, i) => (
              <li key={p.title} className="border-t border-white/15 py-5 last:border-b">
                <span className="font-dm text-[12px] tabular-nums tracking-[0.2em] text-ember-bright">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[1.35rem] font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/68">{p.body}</p>
              </li>
            ))}
          </ol>

          {/* Desktop pin: one pillar at a time */}
          <div className="mx-auto mt-10 hidden min-h-[9.5rem] max-w-xl text-center md:block motion-reduce:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-dm text-[12px] tabular-nums tracking-[0.22em] text-ember-bright">
                    {String(active + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-[1.65rem] font-semibold leading-snug text-white">{pillar.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/68">{pillar.body}</p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-8 flex justify-center gap-2" aria-hidden>
                {pillars.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1 w-8 rounded-full transition-colors duration-300",
                      i === active ? "bg-ember-bright" : "bg-white/20",
                    )}
                  />
                ))}
              </div>
            </div>

          <figure className="mx-auto mt-10 max-w-2xl border-t border-white/15 pt-6 md:mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={quote.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.35 }}
              >
                <blockquote className="font-display text-[clamp(1.35rem,2.8vw,2rem)] leading-[1.1] text-white">
                  “{quote.quote}”
                </blockquote>
                <figcaption className="mt-4 text-[13px] text-white/65">
                  <span className="font-medium text-white">{quote.name}</span>
                  <span aria-hidden> · </span>
                  {quote.org} · {quote.title}
                </figcaption>
              </motion.div>
            </AnimatePresence>
          </figure>
        </div>
      </div>
    </section>
  );
}
