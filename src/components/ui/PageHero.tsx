"use client";

import type { ReactNode } from "react";
import { DisplayTitle, type TitleLine } from "@/components/ui/DisplayTitle";

export function PageHero({
  id,
  eyebrow,
  title,
  accent,
  description,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  children?: ReactNode;
}) {
  const lines: TitleLine[] = accent
    ? [
        { text: title },
        { text: accent, accent: true },
      ]
    : [{ text: title }];

  return (
    <section
      id={id}
      data-header-theme="light"
      className="itq-stage relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 itq-dotfield opacity-60" aria-hidden />
      <div className="itq-container relative">
        <p className="itq-eyebrow">{eyebrow}</p>
        <DisplayTitle
          lines={lines}
          className="mt-6 max-w-5xl text-[clamp(2.6rem,7.5vw,6.5rem)] leading-[0.9] tracking-tight"
        />
        {description ? <p className="itq-lead mt-7 max-w-2xl text-balance">{description}</p> : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
