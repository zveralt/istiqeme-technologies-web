import { pillars } from "@/lib/site";

export function WhyCompare() {
  return (
    <section data-header-theme="dark" className="itq-sheet itq-sheet--deep on-dark" aria-label="Why ISTIQEME">
      <div className="itq-container">
        <p className="itq-eyebrow">Why ISTIQEME</p>
        <h2 className="itq-h2 mt-5 max-w-3xl text-foreground">
          Three things, done properly<span className="text-ember">.</span>
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <li key={pillar.title} className="border-t border-line pt-6">
              <p className="font-dm text-[12px] tabular-nums tracking-[0.2em] text-ember">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-[1.35rem] font-semibold text-foreground">{pillar.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{pillar.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
