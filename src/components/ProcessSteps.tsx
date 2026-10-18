import { Reveal } from "@/components/ui/Reveal";
import { aiProcess } from "@/lib/ai-automation";
import { cn } from "@/lib/utils";

export function ProcessSteps({
  compact = false,
  onDark = false,
}: {
  compact?: boolean;
  onDark?: boolean;
}) {
  return (
    <ol className={cn("relative grid gap-10 md:grid-cols-4", compact ? "md:gap-6" : "md:gap-8")}>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-0 right-0 top-[0.65rem] hidden h-px md:block",
          onDark ? "bg-white/20" : "bg-line",
        )}
      />
      {aiProcess.map((step, i) => (
        <Reveal as="li" key={step.step} delay={i * 70} className="relative md:pt-8">
          <span
            aria-hidden
            className={cn(
              "absolute left-0 top-0 hidden h-[1.3rem] w-[1.3rem] rounded-full border md:grid md:place-items-center",
              onDark ? "border-white/25 bg-transparent" : "border-line bg-background",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                onDark ? "bg-ember-bright" : "bg-forest dark:bg-ember-bright",
              )}
            />
          </span>
          <span
            className={cn(
              "font-dm text-[12px] font-medium tabular-nums tracking-[0.18em]",
              onDark ? "text-white/55" : "text-muted",
            )}
          >
            {step.step}
          </span>
          <h3
            className={cn(
              "mt-3 leading-none",
              compact
                ? "text-[1.2rem] font-semibold"
                : "font-display text-[1.75rem]",
              onDark ? "text-white" : "text-foreground",
            )}
          >
            {step.title}
          </h3>
          <p
            className={cn(
              "mt-3 max-w-xs text-[15px] leading-relaxed",
              onDark ? "text-white/68" : "text-ink-soft",
            )}
          >
            {step.body}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}
