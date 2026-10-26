"use client";

import { processSteps } from "@/lib/bolt-home-data";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <section id="process" className="relative py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="mb-16">
            <p className="text-xs font-mono uppercase tracking-wide2 text-accent-500 mb-3">How we close them</p>
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] tracking-tightest text-ink-900 dark:text-ink-50">
              From a short interview to a system that runs.
            </h2>
          </div>
        </Reveal>

        {/* Process steps — horizontal on desktop, vertical on mobile */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl border border-ink-200 dark:border-ink-800 overflow-hidden bg-ink-200 dark:bg-ink-800">
          {processSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 100}>
              <div className="itq-surface group relative h-full bg-white p-8 dark:bg-ink-900">
                <div className="relative flex items-center gap-3 mb-6">
                  {/* Lead-in from cell edge up to the icon (never under it) */}
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-8 -translate-x-full -translate-y-1/2 bg-ink-200 dark:bg-ink-800 lg:block"
                    />
                  )}
                  <span className="relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink-200 bg-white text-ink-500 transition-colors group-hover:border-accent-500/50 group-hover:text-accent-500 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-400">
                    <step.icon size={20} />
                  </span>
                  <span className="relative z-[1] shrink-0 bg-white px-1 font-display text-4xl tracking-wide text-ink-200 transition-colors group-hover:text-accent-500/30 dark:bg-ink-900 dark:text-ink-400">
                    {step.number}
                  </span>
                  {/* Trail after the number to the next cell */}
                  {i < processSteps.length - 1 && (
                    <span
                      aria-hidden
                      className="ml-1 hidden h-px min-w-4 flex-1 self-center bg-ink-200 dark:bg-ink-800 lg:-mr-8 lg:block"
                    />
                  )}
                </div>

                <h3 className="font-display text-2xl tracking-wide text-ink-900 dark:text-ink-50 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
