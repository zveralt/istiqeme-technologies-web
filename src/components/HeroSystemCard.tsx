"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { leadFlow } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Step timeline (ms from loop start). 0 = idle/typing, 1 = customer, 2 = AI reply, 3 = CRM row. */
const TIMELINE = [600, 2400, 4600, 8200];

const customer = "Assalamualaikum — is the shop open? I want to order 40 units for Monday.";
const agent =
  "Walaikum assalam. Yes — I can take the order now. May I have the item codes and a delivery address? I’ll log it and the team will confirm on WhatsApp first thing.";

/**
 * The hero's visual object: a looping, DOM-built illustration of what ISTIQEME
 * actually ships — a WhatsApp inquiry at night, an AI reply, and a CRM record.
 * Not an image, not a screenshot of a client, no fabricated client data.
 */
export function HeroSystemCard({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStep(3);
      return;
    }
    let timers: number[] = [];
    const run = () => {
      setStep(0);
      timers = TIMELINE.map((t, i) => window.setTimeout(() => setStep(i), t));
      timers.push(window.setTimeout(run, TIMELINE[TIMELINE.length - 1] + 3200));
    };
    run();
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [reduce]);

  const active = Math.min(step, 3);

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[var(--radius-card)] border border-white/10 text-white",
        "bg-[linear-gradient(170deg,#1b1c20_0%,#111214_62%,#0a0a0c_100%)]",
        "shadow-[0_40px_80px_-36px_rgba(10,10,12,0.55)]",
        className,
      )}
      aria-label="Illustration: a late-night WhatsApp inquiry answered by an AI assistant and logged as a lead"
      role="img"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
      />

      {/* top bar */}
      <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-3.5 md:px-6">
        <p className="inline-flex items-center gap-2 font-dm text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
          <span className="relative grid h-2 w-2 place-items-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-whatsapp pulse-ring" />
            <span className="relative h-2 w-2 rounded-full bg-whatsapp" />
          </span>
          Lead flow · live
        </p>
        <p className="font-dm text-[11px] tabular-nums tracking-[0.2em] text-white/45">02:14 AM</p>
      </div>

      <div className="relative grid gap-6 px-5 pb-5 pt-5 md:grid-cols-[1fr_8.5rem] md:gap-7 md:px-6 md:pb-6">
        {/* chat column */}
        <div className="flex min-h-[17rem] flex-col justify-end gap-3 md:min-h-[19rem]">
          <AnimatePresence initial={false}>
            {active >= 1 && (
              <motion.div
                key="customer"
                layout
                initial={reduce ? false : { opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.55, ease: EASE }}
                className="ml-auto max-w-[88%] rounded-[1.1rem] rounded-br-[0.35rem] bg-white/10 px-4 py-3 text-[13.5px] leading-snug text-white/92 ring-1 ring-white/10"
              >
                {customer}
              </motion.div>
            )}
            {active >= 2 && (
              <motion.div
                key="agent"
                layout
                initial={reduce ? false : { opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.55, ease: EASE }}
                className="max-w-[92%] rounded-xl rounded-bl-md bg-white px-4 py-3 text-[13.5px] leading-snug text-[#111214]"
              >
                <span className="mb-1 block font-dm text-[10px] font-medium uppercase tracking-[0.12em] text-[#2b63c8]">
                  ISTIQEME assistant
                </span>
                {agent}
              </motion.div>
            )}
            {active === 0 && (
              <motion.div
                key="typing"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-2"
                aria-hidden
              >
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-white/70 [animation:blink_1.2s_ease-in-out_infinite]"
                    style={{ animationDelay: `${d * 0.18}s` }}
                  />
                ))}
              </motion.div>
            )}
            {active >= 3 && (
              <motion.div
                key="crm"
                layout
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                className="mt-2 rounded-[1rem] border border-ember-bright/25 bg-forest/40 p-3.5"
              >
                <div className="flex items-center justify-between">
                  <p className="font-dm text-[10px] font-semibold uppercase tracking-[0.2em] text-ember-bright">
                    CRM · new lead
                  </p>
                  <span className="rounded-full bg-whatsapp/20 px-2 py-0.5 font-dm text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9fe3d6]">
                    Qualified
                  </span>
                </div>
                <div className="mt-2.5 grid grid-cols-3 gap-3 text-[12px]">
                  <div>
                    <p className="text-white/45">Need</p>
                    <p className="mt-0.5 font-medium text-white">Wholesale order</p>
                  </div>
                  <div>
                    <p className="text-white/45">Timeline</p>
                    <p className="mt-0.5 font-medium text-white">Monday</p>
                  </div>
                  <div>
                    <p className="text-white/45">Next</p>
                    <p className="mt-0.5 font-medium text-white">Team confirms · 9 AM</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* flow rail */}
        <ol className="hidden border-l border-white/10 pl-4 md:block" aria-hidden>
          {leadFlow.map((s, i) => {
            const on = i <= active && active > 0;
            return (
              <li key={s.n} className="relative py-2.5">
                <span
                  className={cn(
                    "absolute -left-[1.3rem] top-[0.95rem] h-2 w-2 rounded-full transition-colors duration-500",
                    on ? "bg-ember-bright" : "bg-white/20",
                  )}
                />
                <p
                  className={cn(
                    "font-dm text-[10px] tabular-nums tracking-[0.18em] transition-colors duration-500",
                    on ? "text-ember-bright" : "text-white/35",
                  )}
                >
                  {s.n}
                </p>
                <p
                  className={cn(
                    "mt-0.5 text-[12px] font-medium leading-tight transition-colors duration-500",
                    on ? "text-white" : "text-white/40",
                  )}
                >
                  {s.title}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
