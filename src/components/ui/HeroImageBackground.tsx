"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type HeroImageBackgroundProps = {
  src: string;
  alt: string;
  /** CSS object-position, e.g. "center top" for portrait-safe crops */
  objectPosition?: string;
  className?: string;
  priority?: boolean;
};

/**
 * Interior hero photography — SKH-style full-bleed image + soft washes for type.
 * No video. Home page does not use this.
 */
export function HeroImageBackground({
  src,
  alt,
  objectPosition = "center center",
  className,
  priority = true,
}: HeroImageBackgroundProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-ink-100 dark:bg-ink-950", className)}
      aria-hidden={alt ? undefined : true}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition }}
      />
      {/* Legibility washes — light/dark, matching skh layering without their brand cyan */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/78 to-white dark:from-[#0a0a0c]/92 dark:via-[#0a0a0c]/80 dark:to-[#0a0a0c]" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/35 to-transparent dark:from-[#0a0a0c]/75 dark:via-[#0a0a0c]/30 dark:to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--color-ember)_12%,transparent),transparent_55%)]" />
      <div className="absolute inset-0 itq-grid opacity-35 dark:opacity-45" />
    </div>
  );
}
