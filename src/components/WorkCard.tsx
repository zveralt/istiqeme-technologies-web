import Image from "next/image";
import { cn } from "@/lib/utils";

function hostLabel(href: string) {
  try {
    return new URL(href).host.replace(/^www\./, "");
  } catch {
    return href;
  }
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
      className={cn(
        "group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b63c8]/40",
        className,
      )}
      aria-label={`${name} — visit live site`}
    >
      <div className="itq-browser">
        <div className="itq-browser-bar">
          <span className="itq-browser-dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="itq-browser-url">{hostLabel(href)}</span>
          <span aria-hidden />
        </div>
        <div className="itq-browser-screen">
          <Image
            src={image}
            alt=""
            fill
            sizes={featured ? "(min-width: 768px) 72rem, 100vw" : "(min-width: 768px) 36rem, 100vw"}
            className="object-cover"
            priority={featured}
          />
        </div>
      </div>
      <div className="mt-5 md:mt-6">
        <div className="flex items-center gap-3">
          {index ? (
            <span className="font-mono text-[11px] tabular-nums tracking-[0.16em] text-muted">{index}</span>
          ) : null}
          <span className="text-[13px] text-muted">{kind}</span>
        </div>
        <h3
          className={cn(
            "mt-2 font-semibold tracking-tight text-foreground",
            featured ? "text-[1.6rem] md:text-[1.85rem]" : "text-[1.3rem]",
          )}
        >
          {name}
        </h3>
        <p className={cn("mt-2 text-[15px] leading-relaxed text-ink-soft", featured && "max-w-2xl")}>{body}</p>
        <span className="itq-link-arrow mt-4 text-[13px] font-medium text-forest dark:text-ember-bright">
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
      </div>
    </a>
  );
}
