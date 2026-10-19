import Image from "next/image";
import { cn } from "@/lib/utils";

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn("h-4 w-4", className)} fill="none" aria-hidden>
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

export function WorkCard({
  name,
  kind,
  body,
  href,
  uptime,
  image,
  plate,
  index,
  priority = false,
  className,
}: {
  name: string;
  kind: string;
  body: string;
  href: string;
  uptime: string;
  image: string;
  plate: string;
  problem?: string;
  index?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn("group flex h-full flex-col", className)}
      aria-label={`${name} — visit live site`}
    >
      <div className="itq-media itq-plate aspect-[16/10] border border-line/80 dark:border-white/10">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 26rem, (min-width: 768px) 40rem, 100vw"
          className="object-cover"
          priority={priority}
        />
        <span className="itq-plate-grid" aria-hidden />
        <span className="itq-plate-scrim" aria-hidden />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] line-clamp-2 px-4 pb-3.5 font-dm text-[12.5px] font-medium leading-snug tracking-[0.01em] text-white md:px-5 md:pb-4">
          {plate}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-baseline gap-3">
          {index ? <span className="itq-index shrink-0">{index}</span> : null}
          <h3 className="min-w-0 text-[1.45rem] text-foreground md:text-[1.65rem]">{name}</h3>
        </div>
        <span className="itq-micro mt-1 hidden max-w-[11rem] shrink-0 text-right leading-snug sm:block">{kind}</span>
      </div>
      <p className="mt-2.5 min-h-[4.4rem] max-w-xl text-[15px] leading-relaxed text-ink-soft line-clamp-3">{body}</p>
      <span className="itq-link-arrow mt-auto pt-3 text-[13px] font-medium text-forest dark:text-ember-bright">
        Visit live site
        <Arrow className="h-3.5 w-3.5" />
        <span className="ml-2 font-dm text-[12px] font-normal tabular-nums text-muted">{uptime} uptime</span>
      </span>
    </a>
  );
}
