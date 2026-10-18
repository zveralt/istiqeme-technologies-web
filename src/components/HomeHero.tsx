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
      {/* Background — brand navy only, fades toward the sheet seam */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 bottom-0 h-[55%] itq-dotfield opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_85%_30%,color-mix(in_srgb,var(--color-ember-bright)_55%,transparent),transparent_70%)] dark:bg-[radial-gradient(ellipse_70%_50%_at_85%_30%,color-mix(in_srgb,var(--color-forest)_70%,transparent),transparent_70%)]" />
      </div>

      <Recede target={stageRef} className="relative flex flex-1 flex-col">
        <div className="itq-container flex flex-1 flex-col justify-center pb-6 pt-24 md:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-8 lg:gap-12">
            {/* Copy */}
            <div className="max-w-[46rem]">
              <motion.p {...fade(0.05)} className="itq-eyebrow">
                Digital engineering studio · {site.city}
              </motion.p>

              <DisplayTitle
                delay={0.08}
                tight
                className="mt-7 text-[length:var(--fs-display)] leading-[0.9]"
                lines={[
                  { text: "Complex systems." },
                  { text: "Beautifully simplified.", accent: true },
                ]}
              />

              <motion.p {...fade(0.5)} className="itq-lead mt-8 max-w-xl text-pretty">
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
