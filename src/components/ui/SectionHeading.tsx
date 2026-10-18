import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
  onDark = false,
  align = "split",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  onDark?: boolean;
  /** `split` puts children on the right; `stack` keeps everything in one column. */
  align?: "split" | "stack";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "split" && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-3xl">
        <p className="itq-eyebrow">{eyebrow}</p>
        <h2 className={cn("itq-h2 mt-5", onDark ? "text-white" : "text-foreground")}>
          {title}
          <span className={onDark ? "text-ember-bright" : "text-ember"}>.</span>
        </h2>
        {description ? (
          <p className={cn("itq-lead mt-5 max-w-2xl", onDark && "text-white/68")}>{description}</p>
        ) : null}
      </div>
      {children ? <div className="shrink-0">{children}</div> : null}
    </div>
  );
}
