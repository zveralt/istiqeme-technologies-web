"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="itq-glow-arrow h-4 w-4 shrink-0" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

type GlowButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
};

/**
 * Solid / outline pill button. The name is historical — the cursor-tracking
 * glow was retired in favour of a calmer colour + arrow transition.
 */
export function GlowButton({
  children,
  href,
  variant = "primary",
  size = "md",
  arrow = true,
  className,
  type = "button",
  disabled,
  onClick,
  target,
  rel,
}: GlowButtonProps) {
  const classes = cn(
    "itq-glow-btn",
    variant === "outline" && "itq-glow-btn-outline",
    size === "sm" && "itq-glow-btn-sm",
    size === "lg" && "itq-glow-btn-lg",
    className,
  );

  const inner = (
    <span className="inline-flex items-center justify-center gap-2">
      {children}
      {arrow ? <ArrowIcon /> : null}
    </span>
  );

  if (href && !disabled) {
    if (isExternal(href) || target) {
      return (
        <a href={href} target={target} rel={rel} onClick={onClick} className={classes}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
