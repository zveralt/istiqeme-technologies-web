"use client";

import { GlowButton } from "@/components/ui/GlowButton";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ButtonLink({
  href,
  children,
  variant = "ember",
  external,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "ember" | "ink" | "ghost" | "whatsapp" | "light";
  external?: boolean;
  className?: string;
}) {
  if (variant === "whatsapp") {
    const styles =
      "inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-5 py-3 text-[13px] font-medium tracking-wide text-white transition hover:brightness-110";
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cn(styles, className)}>
        {children}
      </a>
    );
  }

  return (
    <GlowButton
      href={href}
      variant={variant === "ghost" || variant === "light" ? "outline" : "primary"}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={className}
    >
      {children}
    </GlowButton>
  );
}

export function WhatsAppLink({
  text,
  children,
  variant = "whatsapp",
  className,
}: {
  text?: string;
  children: React.ReactNode;
  variant?: "ember" | "ink" | "ghost" | "whatsapp" | "light";
  className?: string;
}) {
  return (
    <ButtonLink href={waLink(text)} variant={variant} external className={className}>
      {children}
    </ButtonLink>
  );
}

export function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3 11L11 3M11 3H4.5M11 3V9.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
