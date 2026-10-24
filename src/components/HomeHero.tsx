"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import { PillLink } from "@/components/ui/Pill";
import { DisplayTitle } from "@/components/ui/DisplayTitle";
import { Recede } from "@/components/ui/Recede";
import { HeroSystemCard } from "@/components/HeroSystemCard";
import { ServiceTickerScroll } from "@/components/ServiceTickerScroll";
import { site, waLink } from "@/lib/site";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const facts = [
  { label: "Based in", value: site.city },
  { label: "Building since", value: String(site.since) },
  { label: "We speak", value: "English · اردو" },
  { label: "We reply", value: "Within one business day" },
] as const;

export function HomeHero() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLElement>(null);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce === true ? 0 : 0.6, delay: reduce === true ? 0 : delay, ease: EASE },
  });

  return (
    <section
      id="top"
      ref={stageRef}
      data-header-theme="light"
      className="itq-stage flex min-h-svh flex-col overflow-x-clip"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 itq-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-[#0a0a0c]" />
      </div>

      <Recede target={stageRef} className="relative flex flex-1 flex-col">
        <div className="itq-container flex flex-1 flex-col justify-center pb-6 pt-24 md:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-8 lg:gap-12">
            {/* Copy */}
            <div className="max-w-[46rem]">
              <motion.p
                {...fade(0.05)}
                className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#d1d1d5] bg-white/80 px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#5a5b64] dark:border-white/15 dark:bg-transparent dark:text-[#a9aab0]"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2b63c8]" aria-hidden />
                Digital engineering studio · {site.city}
              </motion.p>

              <DisplayTitle
                delay={0.08}
                dense
                className="itq-hero-title mt-6 text-[clamp(3.35rem,7.2vw,6.35rem)] leading-[0.84] !tracking-[-0.03em]"
                lines={[
                  { text: "Complex systems." },
                  { text: "Beautifully", accent: true },
                  { text: "Simplified." },
                ]}
              />

              <motion.p {...fade(0.5)} className="mt-8 max-w-xl text-pretty text-[16px] leading-[1.65] text-[#5a5b64] md:text-[17px] dark:text-[#a9aab0]">
                Websites, online stores, mobile apps, AI assistants and marketing — scoped to how your
                business actually works, so visitors become customers and nothing slips through a
                private chat.
              </motion.p>

              <motion.div
                {...fade(0.6)}
                className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
              >
                <PillLink href="/start" className="h-12 w-full justify-center px-5 text-[15px] sm:w-auto">
                  Start a project
                </PillLink>
                <GlowButton href={waLink()} variant="outline" size="lg" className="w-full sm:w-auto">
                  Message us on WhatsApp
                </GlowButton>
              </motion.div>
            </div>

            {/* Visual object */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: reduce === true ? 0 : 1.1, delay: reduce === true ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto w-full max-w-[34rem] max-md:mt-2 md:max-w-none"
            >
              <HeroSystemCard />
            </motion.div>
          </div>

          {/* Fact bar */}
          <motion.div {...fade(0.8)} className="mt-12 border-t border-line pt-6 lg:mt-14">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 md:gap-x-10">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="itq-micro">{f.label}</dt>
                  <dd className="mt-2 text-[15px] font-medium leading-snug text-foreground md:text-[16px]">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        <ServiceTickerScroll className="pb-4" />
      </Recede>
    </section>
  );
}
