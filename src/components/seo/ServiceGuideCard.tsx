"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useGuideCardHot } from "@/components/seo/useGuideCardHot";

type ServiceGuideCardProps = {
  href: string;
  title: string;
  description: string;
  kicker?: string;
  cta?: string;
  external?: boolean;
  className?: string;
  /** Taller padding for proof tiles */
  size?: "default" | "proof";
};

/**
 * Premium interactive tile — same hover language for service guides,
 * proof previews, and keep-exploring links.
 */
export function ServiceGuideCard({
  href,
  title,
  description,
  kicker,
  cta,
  external = false,
  className,
  size = "default",
}: ServiceGuideCardProps) {
  const { ref, onEnter, onMove, onLeave } = useGuideCardHot<HTMLAnchorElement>();

  const classes = cn(
    "itq-service-guide-card group",
    size === "proof" && "itq-service-guide-card--proof",
    className,
  );

  const inner = (
    <>
      <span className="itq-service-guide-card__glow" aria-hidden />
      <span className="itq-service-guide-card__inner" aria-hidden />
      {kicker ? (
        <p className="itq-service-guide-card__kicker relative z-[1] font-mono text-[11px] uppercase tracking-[0.16em]">
          {kicker}
        </p>
      ) : null}
      <p
        className={cn(
          "itq-service-guide-card__title relative z-[1] font-display leading-none",
          size === "proof" ? "mt-3 text-[1.85rem]" : "text-[1.4rem]",
          kicker ? "mt-3" : null,
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "itq-service-guide-card__body relative z-[1] mt-3 leading-relaxed",
          size === "proof" ? "text-[15px]" : "line-clamp-3 text-[14px]",
        )}
      >
        {description}
      </p>
      {cta ? (
        <span className="itq-service-guide-card__cta relative z-[1] mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium">
          {cta}
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
            <path
              d="M4 12L12 4M12 4H5M12 4V11"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noreferrer"
        onPointerEnter={onEnter}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={classes}
        style={{ ["--guide-x" as string]: "50%", ["--guide-y" as string]: "40%" }}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={classes}
      style={{ ["--guide-x" as string]: "50%", ["--guide-y" as string]: "40%" }}
    >
      {inner}
    </Link>
  );
}
