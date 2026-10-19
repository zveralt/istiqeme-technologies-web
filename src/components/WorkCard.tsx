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
          "itq-media border border-line/70",
          featured ? "aspect-[16/10] md:aspect-[21/10]" : "aspect-[4/3]",
        )}
      >
        <Image
          src={image}
          alt=""
          fill
          sizes={featured ? "(min-width: 1024px) 80rem, 100vw" : "(min-width: 768px) 40rem, 100vw"}
          className="object-cover object-top"
          priority={featured}
        />
        {/* hover affordance — purely decorative; the whole card is the link */}
        <span
          aria-hidden
          className="itq-circle absolute right-4 top-4 hidden border-white/40 bg-white/85 text-forest opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 md:grid md:translate-y-1"
        >
          <Arrow />
        </span>
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-6">
        <div className="flex min-w-0 items-baseline gap-3">
          {index ? <span className="itq-index shrink-0">{index}</span> : null}
          <h3
            className={cn(
              "font-display tracking-[-0.02em] text-foreground",
              featured ? "text-[1.75rem] md:text-[2.25rem]" : "text-[1.5rem] md:text-[1.7rem]",
            )}
          >
            {name}
          </h3>
        </div>
        <span className="itq-micro hidden shrink-0 text-right sm:block">{kind}</span>
      </div>
      <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-ink-soft">{body}</p>
      <span className="itq-link-arrow mt-3 text-[13px] font-medium text-forest dark:text-ember-bright">
        Visit live site
        <Arrow className="h-3.5 w-3.5" />
        <span className="ml-2 font-dm text-[12px] font-normal tabular-nums text-muted">{uptime} uptime</span>
      </span>
    </a>
  );
}
