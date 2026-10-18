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
 * Services list with a sticky, hover-driven glyph panel (desktop) and
 * the same editorial rows on smaller screens. One visual at a time —
 * not a repeated card grid.
 */
export function ServiceRows({ items }: { items: Item[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_18rem] xl:gap-14">
      <ul>
        {items.map((row, i) => (
          <Reveal as="li" key={row.id} delay={Math.min(i * 50, 180)}>
            <Link
              href={row.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={cn(
                "group grid gap-3 border-t border-line py-7 transition-colors duration-300 md:grid-cols-[3.5rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] md:items-start md:gap-8 md:py-8",
                i === items.length - 1 && "border-b",
                i === active && "text-foreground",
              )}
            >
              <span className="font-dm text-[12px] font-medium tabular-nums tracking-[0.18em] text-muted md:pt-1">
                {row.index}
              </span>
              <div className="min-w-0">
                <h3 className="text-[1.35rem] font-semibold leading-snug tracking-tight text-foreground md:text-[1.5rem]">
                  {row.title}
                </h3>
                {row.kicker ? (
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                    {row.kicker}
                  </p>
                ) : null}
              </div>
              <p className="max-w-md text-[15px] leading-relaxed text-ink-soft md:pt-1">{row.body}</p>
              <span className="itq-circle hidden md:grid" aria-hidden>
                <Arrow />
              </span>
              <span className="itq-link-arrow text-[13px] font-medium text-forest md:hidden dark:text-ember-bright">
                {row.cta ?? "Explore"}
                <Arrow />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>

      <div className="hidden lg:block">
        <div className="sticky top-28">
          <div className="relative overflow-hidden rounded-[var(--radius-media)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8, transition: { duration: 0.18 } }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ServiceGlyph id={current.glyph} />
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-4 font-dm text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            {current.kicker}
          </p>
          <p className="mt-1.5 text-[15px] font-medium text-foreground">{current.title}</p>
        </div>
      </div>
    </div>
  );
}
