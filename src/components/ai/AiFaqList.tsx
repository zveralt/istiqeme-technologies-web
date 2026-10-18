"use client";

import { useState } from "react";

export function AiFaqList({
  title,
  items,
}: {
  title: string;
  items: readonly { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] text-forest">{title}</h2>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {items.map((item, i) => {
          const expanded = open === i;
          return (
            <li key={item.q}>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 py-5 text-left"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : i)}
              >
                <span className="font-medium text-forest">{item.q}</span>
                <span className="text-muted">{expanded ? "−" : "+"}</span>
              </button>
              {expanded && (
                <p className="pb-5 text-[15px] leading-relaxed text-ink-soft">{item.a}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
