"use client";

import { cn } from "@/lib/utils";

export type TitleLine = { text: string; accent?: boolean };

export function DisplayTitle({
  lines,
  className,
  underlineAccent = false,
  fade = false,
  tight = false,
  dense = false,
}: {
  lines: TitleLine[];
  className?: string;
  delay?: number;
  underlineAccent?: boolean;
  fade?: boolean;
  tight?: boolean;
  dense?: boolean;
}) {
  return (
    <h1 className={cn("font-display text-foreground", className)}>
      {lines.map((line, i) => (
        <span key={`${line.text}-${i}`} className="block">
          <span className={cn("block", dense ? "py-0" : tight ? "pb-[0.06em] pt-[0.16em]" : "py-[0.04em]")}>
            <span className={cn("block", fade && "itq-hero-fade", line.accent && "text-ember")}>
              {line.text}
            </span>
          </span>
          {underlineAccent && line.accent ? (
            <span
              aria-hidden
              className="mt-1 block h-[2px] w-[min(12rem,46%)] origin-left bg-ember"
            />
          ) : null}
        </span>
      ))}
    </h1>
  );
}
