import { Reveal } from "@/components/ui/Reveal";
import { aiProcess } from "@/lib/ai-automation";
import { cn } from "@/lib/utils";

/**
 * Four numbered steps on a single hairline. One reveal for the row with a
 * short stagger — the steps arrive as a sequence, not four separate events.
 * On small screens the line runs vertically down the left edge.
 */
export function ProcessSteps({
  compact = false,
  onDark = false,
}: {
  compact?: boolean;
  onDark?: boolean;
}) {
  const line = onDark ? "bg-white/20" : "bg-line";
  return (
    <ol className={cn("relative grid gap-9 md:grid-cols-4", compact ? "md:gap-6" : "md:gap-8")}>
      {/* horizontal rail (desktop) */}
      <span aria-hidden className={cn("pointer-events-none absolute left-0 right-0 top-[0.6rem] hidden h-px md:block", line)} />
      {/* vertical rail (mobile) */}
      <span aria-hidden className={cn("pointer-events-none absolute bottom-2 left-[0.6rem] top-2 w-px md:hidden", line)} />
      {aiProcess.map((step, i) => (
        <Reveal as="li" key={step.step} delay={i * 90} className="relative pl-9 md:pl-0 md:pt-8">
          <span
            aria-hidden
            className={cn(
              "absolute left-0 top-0 grid h-[1.25rem] w-[1.25rem] place-items-center rounded-full border",
              onDark ? "border-white/25 bg-[#0e3a66]" : "border-line bg-background",
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", onDark ? "bg-ember-bright" : "bg-forest dark:bg-ember-bright")} />
          </span>
          <span className={cn("itq-index", onDark && "text-white/55")}>{step.step}</span>
          <h3
            className={cn(
              "mt-3 font-display leading-[1.1] tracking-[-0.02em]",
              compact ? "text-[1.35rem]" : "text-[1.6rem]",
              onDark ? "text-white" : "text-foreground",
            )}
          >
            {step.title}
          </h3>
          <p className={cn("mt-3 max-w-xs text-[15px] leading-relaxed", onDark ? "text-white/68" : "text-ink-soft")}>
            {step.body}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}
