"use client";

import { cn } from "@/lib/utils";

export type TitleLine = { text: string; accent?: boolean };

export function DisplayTitle({
  lines,
  className,
  underlineAccent = false,
  fade = false,
  tight = false,
}: {
  lines: TitleLine[];
  className?: string;
  delay?: number;
  underlineAccent?: boolean;
  fade?: boolean;
  tight?: boolean;
}) {
  return (
    <h1 className={cn("font-display text-foreground", className)}>
      {lines.map((line, i) => (
        <span key={`${line.text}-${i}`} className="block">
          <span className={cn("block", tight ? "pb-[0.06em] pt-[0.16em]" : "py-[0.04em]")}>
            <span className={cn("block", fade && "itq-hero-fade", line.accent && "text-forest")}>
              {line.text}
            </span>
          </span>
          {underlineAccent && line.accent ? (
            <span
              aria-hidden
              className="mt-1 block h-[3px] w-[min(12rem,46%)] origin-left rounded-full bg-forest shadow-[0_0_18px_rgba(14,58,102,0.75)] dark:bg-ember-bright dark:shadow-[0_0_22px_rgba(214,230,255,0.85)]"
            />
          ) : null}
        </span>
      ))}
    </h1>
  );
}
