"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceGlyph, type ServiceGlyphId } from "@/components/ui/ServiceGlyph";
import type { EditorialRow } from "@/components/ui/EditorialRows";
import { cn } from "@/lib/utils";

type Item = EditorialRow & { glyph: ServiceGlyphId };

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d="M4 12L12 4M12 4H5M12 4V11"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Editorial service list: numbered hairline rows with large, light display
 * titles. On desktop the hovered row stays sharp while its siblings soften,
 * and a sticky panel shows the matching brand diagram. On touch the rows
 * read as a plain, fully-opaque list.
 */
export function ServiceRows({ items }: { items: Item[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const current = items[active] ?? items[0];

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_26rem] xl:gap-20">
      <ul
        className="border-t border-line"
        onMouseLeave={() => setHovering(false)}
      >
        {items.map((row, i) => {
          const dim = hovering && i !== active;
          return (
            <Reveal as="li" key={row.id} delay={Math.min(i * 60, 240)} className="border-b border-line">
              <Link
                href={row.href}
                onMouseEnter={() => {
                  setActive(i);
                  setHovering(true);
                }}
                onFocus={() => setActive(i)}
                className={cn(
                  "group grid gap-4 py-7 transition-[opacity,background-color] duration-500 ease-out md:grid-cols-[3rem_minmax(0,1.05fr)_minmax(0,1fr)_auto] md:items-center md:gap-8 md:rounded-xl md:px-3 md:py-9 lg:gap-10 lg:hover:bg-paper-deep/70",
                  dim ? "lg:opacity-40" : "opacity-100",
                )}
              >
                <span className="itq-index md:pt-1 md:self-start">{row.index}</span>
                <div className="min-w-0">
                  <h3 className="font-display text-[1.75rem] leading-[1.05] tracking-[-0.025em] text-foreground md:text-[2.1rem] xl:text-[2.4rem]">
                    {row.title}
                  </h3>
                  {row.kicker ? <p className="itq-micro mt-3">{row.kicker}</p> : null}
                </div>
                <p className="max-w-md text-[15px] leading-relaxed text-ink-soft">{row.body}</p>
                <span className="itq-circle hidden md:grid" aria-hidden>
                  <Arrow />
                </span>
                <span className="itq-link-arrow text-[13px] font-medium text-forest md:hidden dark:text-ember-bright">
                  {row.cta ?? "Explore"}
                  <Arrow />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>

      <div className="hidden lg:block">
        <div className="sticky top-28">
          <div className="relative overflow-hidden rounded-[var(--radius-media)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6, transition: { duration: 0.16 } }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <ServiceGlyph id={current.glyph} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-5 flex items-end justify-between gap-6 border-t border-line pt-4">
            <div>
              <p className="itq-micro">{current.kicker}</p>
              <p className="mt-1.5 text-[15px] font-medium text-foreground">{current.title}</p>
            </div>
            <span className="itq-index">{current.index} / {String(items.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
