"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { DisplayTitle } from "@/components/ui/DisplayTitle";
import { PillLink } from "@/components/ui/Pill";
import { marqueeItems } from "@/lib/bolt-home-data";
import { site, waLink } from "@/lib/site";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const leadSteps = [
  { n: "1", label: "Customer activity", active: true },
  { n: "2", label: "AI evaluation", active: false },
  { n: "3", label: "Immediate outreach", active: false },
  { n: "4", label: "Revenue conversion", active: false },
] as const;

const heroStats = [
  { label: "Based in", value: site.city },
  { label: "Building since", value: String(site.since) },
  { label: "We speak", value: "English · اردو" },
  { label: "We reply", value: "Within one business day" },
] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <section id="top" data-header-theme="light" className="relative min-h-screen overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 itq-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-ink-950" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 lg:px-10 lg:pt-32">
        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-8 lg:gap-12">
          <div className="max-w-[46rem]">
            <motion.div {...fade(0.05)}>
              <p
                className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#d1d1d5] bg-white/80 px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#5a5b64] dark:border-white/15 dark:bg-transparent dark:text-[#a9aab0]"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2b63c8]" aria-hidden />
                Digital engineering studio · {site.city}
              </p>
            </motion.div>

            <DisplayTitle
              delay={0.08}
              dense
              className="itq-hero-title mt-6"
              lines={[
                { text: "Complex systems." },
                { text: "Beautifully", accent: true },
                { text: "Simplified." },
              ]}
            />

            <motion.p
              {...fade(0.5)}
              className="mt-8 max-w-xl text-pretty text-[16px] leading-[1.65] text-[#5a5b64] md:text-[17px] dark:text-[#a9aab0]"
            >
              Websites, online stores, mobile apps, AI assistants and marketing — scoped to how your business
              actually works, so visitors become customers and nothing slips through a private chat.
            </motion.p>

            <motion.div {...fade(0.6)} className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <PillLink href="/start" className="h-12 w-full justify-center px-5 text-[15px] sm:w-auto">
                Start a project
              </PillLink>
              <GlowButton href={waLink()} variant="outline" size="lg" className="w-full sm:w-auto">
                Message us on WhatsApp
              </GlowButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[34rem] md:max-w-none"
          >
            <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5 shadow-[0_24px_60px_-32px_rgba(10,10,12,0.18)] backdrop-blur-sm dark:border-ink-800 dark:bg-ink-900/90 dark:shadow-[0_28px_70px_-28px_rgba(0,0,0,0.55)]">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-accent-500 animate-pulse-dot" aria-hidden />
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500 dark:text-ink-400">
                    Lead flow · live
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] tabular-nums tracking-[0.04em] text-ink-400">
                  <Clock size={12} strokeWidth={2} aria-hidden />
                  <span suppressHydrationWarning>{time}</span>
                </div>
              </div>

              <div className="space-y-3">
                {leadSteps.map((step, i) => (
                  <div
                    key={step.n}
                    className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white/50 px-3 py-2.5 dark:border-ink-800/80 dark:bg-ink-950/50"
                    style={
                      reduce
                        ? undefined
                        : {
                            animation: `fade-in 0.5s ease ${0.4 + i * 0.15}s forwards`,
                            opacity: 0,
                          }
                    }
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-ink-100 font-mono text-[10px] text-ink-500 dark:bg-ink-800 dark:text-ink-200"
                    >
                      {step.n}
                    </span>
                    <span className="text-sm text-ink-700 dark:text-ink-200">{step.label}</span>
                    {step.active ? (
                      <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500 animate-pulse-dot" aria-hidden />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200 dark:border-ink-800 dark:bg-ink-800">
              {heroStats.map((stat) => (
                <div key={stat.label} className="bg-white px-4 py-3 dark:bg-ink-900">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">{stat.label}</dt>
                  <dd className="mt-1 text-sm font-medium leading-snug text-ink-700 dark:text-ink-200">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>

      <div className="relative overflow-hidden border-y border-ink-200/60 bg-white/40 py-4 dark:border-ink-800/60 dark:bg-ink-900/20">
        <div className="flex w-max animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-4 whitespace-nowrap px-6 font-mono text-sm uppercase tracking-wide2 text-ink-400 dark:text-ink-400"
            >
              {item}
              <span className="text-accent-500/40" aria-hidden>•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
