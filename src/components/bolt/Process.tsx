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
              <div className="group relative h-full bg-white dark:bg-ink-900 p-8 hover:bg-ink-50/50 dark:hover:bg-ink-800/30 transition-colors">
                {/* Connecting line on desktop */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 right-0 h-px w-full bg-ink-200 dark:bg-ink-800 -translate-y-1/2" />
                )}

                <div className="relative flex items-center gap-3 mb-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-400 group-hover:border-accent-500/50 group-hover:text-accent-500 transition-colors">
                    <step.icon size={20} />
                  </span>
                  <span className="font-display text-4xl tracking-wide text-ink-200 dark:text-ink-700 group-hover:text-accent-500/30 transition-colors">
                    {step.number}
                  </span>
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
