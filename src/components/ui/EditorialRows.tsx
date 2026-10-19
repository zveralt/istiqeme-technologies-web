import Link from "next/link";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export type EditorialRow = {
  id: string;
  index: string;
  title: string;
  kicker?: string;
  body: string;
  href: string;
  cta?: string;
  external?: boolean;
};

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d="M4 12L12 4M12 4H5M12 4V11"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Numbered, hairline-divided rows. Colour-agnostic: inherits `currentColor`
 * so it works on light surfaces and inside `.band-deep`.
 */
export function EditorialRows({
  items,
  className,
  titleAs: TitleTag = "h3",
  variant = "lines",
}: {
  items: EditorialRow[];
  className?: string;
  titleAs?: "h2" | "h3";
  variant?: "lines" | "padded";
}) {
  return (
    <ul
      className={cn(
        variant === "lines" ? "divide-y divide-line border-y border-line" : "divide-y divide-line",
        className,
      )}
    >
      {items.map((row, i) => {
        const inner = (
          <>
            <span className="itq-index !text-current opacity-50 md:pt-2">{row.index}</span>
            <div className="min-w-0">
              <TitleTag className="font-display text-[clamp(1.4rem,2.2vw,1.85rem)] leading-[1.1] tracking-[-0.02em]">
                {row.title}
              </TitleTag>
              {row.kicker ? (
                <p className="mt-2.5 font-dm text-[11px] font-semibold uppercase tracking-[0.18em] opacity-55">
                  {row.kicker}
                </p>
              ) : null}
            </div>
            <p className="max-w-md text-[15px] leading-relaxed opacity-75 md:pt-1">{row.body}</p>
            <span className="itq-circle hidden md:grid" aria-hidden>
              <Arrow />
            </span>
            <span className="itq-link-arrow text-[13px] font-medium md:hidden">
              {row.cta ?? "Explore"}
              <Arrow />
            </span>
          </>
        );

        const rowClass =
          "group grid gap-4 py-7 transition-colors duration-300 md:grid-cols-[3rem_minmax(0,1.05fr)_minmax(0,1fr)_auto] md:items-start md:gap-8 md:py-8 lg:gap-12";

        return (
          <Reveal as="li" key={row.id} delay={Math.min(i * 50, 200)}>
            {row.external ? (
              <a href={row.href} target="_blank" rel="noreferrer" className={rowClass}>
                {inner}
              </a>
            ) : (
              <Link href={row.href} className={rowClass}>
                {inner}
              </Link>
            )}
          </Reveal>
        );
      })}
    </ul>
  );
}
