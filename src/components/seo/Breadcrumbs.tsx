import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({
  items,
  className,
  contained = true,
}: {
  items: Crumb[];
  className?: string;
  /** Wrap in `itq-container` (default). Set false when nested inside an existing container. */
  contained?: boolean;
}) {
  if (items.length < 2) return null;

  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav
        aria-label="Breadcrumb"
        className={cn(contained && "itq-container relative z-[1]", className)}
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500 dark:text-white/45">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.path} className="inline-flex items-center gap-2">
                {index > 0 ? <span aria-hidden className="text-ink-300 dark:text-white/25">/</span> : null}
                {last ? (
                  <span aria-current="page" className="text-ink-700 dark:text-white/70">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="transition-colors hover:text-accent-500 dark:hover:text-accent-300">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
