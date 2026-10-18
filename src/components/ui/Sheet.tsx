"use client";

import { useRef, type ReactNode } from "react";
import { Recede } from "@/components/ui/Recede";
import { cn } from "@/lib/utils";

type Tone = "paper" | "tint" | "deep" | "ember";

const toneClass: Record<Tone, string> = {
  paper: "",
  tint: "itq-sheet--tint",
  deep: "itq-sheet--deep on-dark",
  ember: "itq-sheet--ember on-dark",
};

/**
 * A page "sheet": a section with a rounded top edge that rides over the
 * section before it (negative margin + z-index). The header reads
 * `data-header-theme` to flip its colours as the sheet passes underneath.
 *
 * `recede` applies the scroll-linked sink on this sheet's contents as the
 * next sheet covers it. Use on at most the first two seams.
 */
export function Sheet({
  id,
  tone = "paper",
  flush = false,
  recede = false,
  className,
  children,
  as: Tag = "section",
  ...rest
}: {
  id?: string;
  tone?: Tone;
  flush?: boolean;
  recede?: boolean;
  className?: string;
  children: ReactNode;
  as?: "section" | "div";
} & Omit<React.HTMLAttributes<HTMLElement>, "children" | "className" | "id">) {
  const ref = useRef<HTMLElement | null>(null);
  const dark = tone === "deep" || tone === "ember";

  return (
    <Tag
      id={id}
      ref={(node) => {
        ref.current = node;
      }}
      data-header-theme={dark ? "dark" : "light"}
      className={cn("itq-sheet scroll-mt-20", toneClass[tone], flush && "itq-sheet--flush", className)}
      {...rest}
    >
      {recede ? <Recede target={ref}>{children}</Recede> : children}
    </Tag>
  );
}
