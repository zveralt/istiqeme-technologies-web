"use client";

import { cn } from "@/lib/utils";

export type TitleLine = { text: string; accent?: boolean };

export function DisplayTitle({
  lines,
  className,
  underlineAccent = false,
  fade = false,
}: {
  lines: TitleLine[];
  className?: string;
  delay?: number;
  underlineAccent?: boolean;
  fade?: boolean;
  tight?: boolean;
}) {
  return (
    <h1 className={cn("itq-display text-foreground", className)}>
      {lines.map((line, i) => (
        <span key={`${line.text}-${i}`} className="block">
          <span className={cn("block", fade && "itq-hero-fade", line.accent && "text-forest")}>{line.text}</span>
          {underlineAccent && line.accent ? (
            <span
              aria-hidden
              className="mt-3 block h-[2px] w-[min(10rem,40%)] origin-left rounded-full bg-forest dark:bg-ember-bright"
            />
          ) : null}
        </span>
      ))}
    </h1>
  );
}
