import Image from "next/image";
import { cn } from "@/lib/utils";

export function WorkCard({
  name,
  kind,
  body,
  href,
  uptime,
  image,
  index,
  featured = false,
  className,
}: {
  name: string;
  kind: string;
  body: string;
  href: string;
  uptime: string;
  image: string;
  problem?: string;
  index?: string;
  featured?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn("group block focus-visible:outline-none", className)}
      aria-label={`${name} — visit live site`}
    >
      <div
        className={cn(
          "itq-media",
          featured ? "aspect-[16/10] md:aspect-[16/9]" : "aspect-[4/3]",
        )}
      >
        <Image
          src={image}
          alt=""
          fill
          sizes={featured ? "(min-width: 768px) 80rem, 100vw" : "(min-width: 768px) 40rem, 100vw"}
          className="object-cover object-top"
          priority={featured}
        />
      </div>
      <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {index ? (
          <span className="font-dm text-[12px] tabular-nums tracking-[0.18em] text-muted">{index}</span>
        ) : null}
        <h3
          className={cn(
            "font-semibold tracking-tight text-foreground",
            featured ? "text-[1.5rem] md:text-[1.75rem]" : "text-[1.35rem]",
          )}
        >
          {name}
        </h3>
        <span aria-hidden className="text-muted">
          —
        </span>
        <span className="text-[13px] text-muted">{kind}</span>
      </div>
      <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ink-soft">{body}</p>
      <span className="itq-link-arrow mt-3 text-[13px] font-medium text-forest dark:text-ember-bright">
        Visit live site · {uptime} uptime
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
    </a>
  );
}
