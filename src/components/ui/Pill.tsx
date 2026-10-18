import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

function Tail() {
  return (
    <span className="itq-pill-tail" aria-hidden>
      <svg viewBox="0 0 16 16" fill="none">
        <path
          d="M4 12L12 4M12 4H5.5M12 4V10.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Pill with a circular arrow tail. The site's primary call-to-action shape;
 * colours come from `.itq-pill` and flip with the header theme / dark mode.
 */
export function PillLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = cn("itq-pill", className);
  if (external || /^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        <span>{children}</span>
        <Tail />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      <span>{children}</span>
      <Tail />
    </Link>
  );
}
