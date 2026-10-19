"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import { PillLink } from "@/components/ui/Pill";
import { Recede } from "@/components/ui/Recede";
import { HeroSystemCard } from "@/components/HeroSystemCard";
import { site, waLink } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const facts = [
  { label: "Based in", value: site.city },
  { label: "Building since", value: String(site.since) },
  { label: "We speak", value: "English · اردو" },
  { label: "We reply", value: "Within one business day" },
] as const;

export function HomeHero() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLElement>(null);
  const off = reduce === true;

  /* One stagger for the whole opening: label → headline lines → copy → actions → card → facts. */
  const rise = (step: number, distance = 16) => ({
    initial: off ? false : { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: { duration: off ? 0 : 0.75, delay: off ? 0 : 0.08 + step * 0.09, ease: EASE },
  });

  return (
    <section
      id="top"
      ref={stageRef}
      data-header-theme="light"
      className="itq-stage flex min-h-svh flex-col overflow-x-clip"
    >
      {/* Quiet background: a single brand-blue wash and a dot field that fades toward the seam. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_82%_18%,color-mix(in_srgb,var(--color-ember-bright)_48%,transparent),transparent_70%)] dark:bg-[radial-gradient(60%_55%_at_82%_18%,color-mix(in_srgb,var(--color-forest)_70%,transparent),transparent_70%)]" />
        <div className="itq-dotfield absolute inset-x-0 bottom-0 h-[46%] opacity-60" />
      </div>

      <Recede target={stageRef} className="relative flex flex-1 flex-col">
        <div className="itq-container flex flex-1 flex-col justify-center pb-6 pt-24 md:pt-28 lg:pb-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Copy */}
            <div className="itq-fill-type lg:col-span-7">
              <motion.p {...rise(0, 10)} className="itq-eyebrow">
                Digital engineering studio · {site.city}
              </motion.p>

              <h1 className="itq-display mt-6 w-full max-w-none text-foreground md:mt-7">
                <motion.span {...rise(1, 22)} className="block md:whitespace-nowrap">
                  Complex systems.
                </motion.span>
                <motion.span {...rise(2, 22)} className="block text-forest md:whitespace-nowrap">
                  Beautifully simplified<span className="text-ember dark:text-ember-bright">.</span>
                </motion.span>
              </h1>

              <motion.p {...rise(4)} className="itq-lead mt-8 max-w-[34rem] md:mt-9">
                Websites, online stores, mobile apps, AI assistants and marketing — scoped to how your
                business actually works, so visitors become customers and nothing slips through a
                private chat.
              </motion.p>

              <motion.div
                {...rise(5)}
                className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center md:mt-10"
              >
                <PillLink href="/start" className="h-12 w-full justify-between px-5 text-[15px] sm:w-auto sm:justify-center">
                  Start a project
                </PillLink>
                <GlowButton href={waLink()} variant="outline" size="lg" className="w-full sm:w-auto">
                  Message us on WhatsApp
                </GlowButton>
              </motion.div>
            </div>

            {/* Visual object */}
            <motion.div
              initial={off ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: off ? 0 : 1, delay: off ? 0 : 0.42, ease: EASE }}
              className="relative mx-auto w-full max-w-[32rem] lg:col-span-5 lg:max-w-none"
            >
              <HeroSystemCard />
            </motion.div>
          </div>

          {/* Fact bar */}
          <motion.div {...rise(7, 10)} className="mt-10 border-t border-line pt-5 lg:mt-12">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 md:gap-x-10">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="itq-micro">{f.label}</dt>
                  <dd className="mt-2 text-[15px] font-medium leading-snug text-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </Recede>
    </section>
  );
}
