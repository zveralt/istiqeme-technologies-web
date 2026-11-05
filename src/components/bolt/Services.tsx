"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { boltServices } from "@/lib/bolt-home-data";
import { Reveal } from "./Reveal";

export function Services() {
  return (
    <section id="services" className="itq-bolt-section relative overflow-x-clip">
      <div className="itq-container">
        {/* Section header */}
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <p className="text-xs font-mono uppercase tracking-wide2 text-accent-500 mb-3">Our services</p>
              <h2 className="itq-section-title text-ink-900 dark:text-ink-50">
                What we build.
              </h2>
            </div>
            <p className="max-w-md text-base text-ink-500 dark:text-ink-400 text-balance">
              Websites, online stores, mobile apps, AI assistants, and marketing — scoped to your
              business, not a one-size-fits-all template.
            </p>
          </div>
        </Reveal>

        {/* Services list — editorial style, not cards */}
        <div className="border-t border-ink-200 dark:border-ink-800">
          {boltServices.map((service, i) => (
            <Reveal key={service.id} delay={i * 60}>
              <Link
                href={service.href}
                className="itq-touch-surface group relative flex items-center gap-4 border-b border-ink-200 py-5 transition-colors dark:border-ink-800 sm:gap-6 lg:gap-8 lg:py-8 lg:hover:bg-ink-50/50 dark:lg:hover:bg-ink-900/30"
              >
                {/* Number */}
                <span className="hidden sm:block w-12 shrink-0 font-mono text-sm text-ink-300 dark:text-ink-400 group-hover:text-accent-500 transition-colors">
                  {service.number}
                </span>

                {/* Icon */}
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink-200 dark:border-ink-800 text-ink-500 dark:text-ink-400 group-hover:border-accent-500/50 group-hover:text-accent-500 transition-colors">
                  <service.icon size={20} />
                </span>

                {/* Title + category */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                    <h3 className="font-display text-[clamp(1.35rem,4.5vw,1.875rem)] tracking-wide text-ink-900 dark:text-ink-50 lg:text-3xl lg:group-hover:text-accent-500 transition-colors">
                      {service.title}
                    </h3>
                    <span className="text-xs font-mono uppercase tracking-wide2 text-ink-400">{service.category}</span>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm lg:text-base text-ink-500 dark:text-ink-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-ink-300 dark:text-ink-400 group-hover:text-accent-500 group-hover:rotate-45 transition-all duration-300"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
