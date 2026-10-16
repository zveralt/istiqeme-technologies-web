import Link from "next/link";
import { waLink } from "@/lib/site";

export function ButtonLink({
  href,
  children,
  variant = "ember",
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "ember" | "ink" | "ghost" | "whatsapp";
  external?: boolean;
}) {
  const styles = {
    ember:
      "bg-forest text-white hover:bg-forest-mid shadow-[0_10px_30px_-12px_rgba(14,58,102,0.55)]",
    ink: "bg-ember text-white hover:bg-ember-bright",
    ghost:
      "bg-transparent text-ink border border-ink/15 hover:border-ember/60 hover:bg-paper-deep",
    whatsapp: "bg-whatsapp text-white hover:brightness-110",
  }[variant];

  const className = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[13px] font-medium tracking-wide transition-all duration-300 ${styles}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function WhatsAppLink({
  text,
  children,
  variant = "whatsapp",
}: {
  text?: string;
  children: React.ReactNode;
  variant?: "ember" | "ink" | "ghost" | "whatsapp";
}) {
  return (
    <ButtonLink href={waLink(text)} variant={variant} external>
      {children}
      <Arrow />
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
