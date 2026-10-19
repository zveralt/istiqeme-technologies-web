"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { leadFlow } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Scene timeline (ms from loop start).
   0 = customer typing · 1 = customer message · 2 = assistant reply · 3 = record logged */
const TIMELINE = [500, 2200, 4400, 7600];
const LOOP_PAUSE = 4200;

const customer = "Assalamualaikum — is the shop open? I want to order 40 units for Monday.";
const agent =
  "Walaikum assalam. Yes — I can take the order now. May I have the item codes and a delivery address? I’ll log it and the team will confirm on WhatsApp first thing.";

/* How far each pipeline step has got at each scene. */
const STEP_STATE: Record<number, Array<"idle" | "active" | "done">> = {
  0: ["active", "idle", "idle", "idle"],
  1: ["done", "active", "idle", "idle"],
  2: ["done", "done", "done", "active"],
  3: ["done", "done", "done", "done"],
};

const STEP_LABEL = ["Received", "Qualified", "Replied", "Handed off"] as const;

/**
 * The hero's visual object: a looping, DOM-built illustration of what ISTIQEME
 * ships — a WhatsApp inquiry at night, an assistant reply, and a logged lead.
 * It is explicitly labelled as an illustration; nothing here is live data.
 */
export function HeroSystemCard({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [loopScene, setLoopScene] = useState(0);
  /* Reduced-motion users see the finished state, no loop. */
  const scene = reduce ? 3 : loopScene;

  useEffect(() => {
    if (reduce) return;
    let timers: number[] = [];
    const run = () => {
      timers = [
        window.setTimeout(() => setLoopScene(0), 0),
        ...TIMELINE.map((t, i) => window.setTimeout(() => setLoopScene(i), t)),
        window.setTimeout(run, TIMELINE[TIMELINE.length - 1] + LOOP_PAUSE),
      ];
    };
    run();
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [reduce]);

  const states = STEP_STATE[scene] ?? STEP_STATE[3];

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[var(--radius-card)] border border-white/10 text-white",
        "bg-[linear-gradient(165deg,#0b2744_0%,#0e3a66_70%,#123f6f_100%)]",
        "shadow-[0_40px_100px_-40px_rgba(14,58,102,0.55)]",
        className,
      )}
      role="img"
      aria-label="Illustration: a late-night WhatsApp inquiry answered by an AI assistant and logged as a qualified lead for the team"
    >
      {/* top bar */}
      <div className="relative flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5 md:px-6">
        <p className="inline-flex items-center gap-2.5 whitespace-nowrap font-dm text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-whatsapp" aria-hidden />
          WhatsApp <span className="text-white/35">·</span>{" "}
          <span className="tabular-nums tracking-[0.1em] text-white/50">02:14 AM</span>
        </p>
        <p className="whitespace-nowrap font-dm text-[10.5px] uppercase tracking-[0.14em] text-white/45">
          Illustrative demo
        </p>
      </div>

      <div className="relative grid gap-6 px-5 pb-5 pt-5 md:grid-cols-[minmax(0,1fr)_9.5rem] md:gap-6 md:px-6 md:pb-6">
        {/* conversation */}
        <div className="flex min-h-[17.5rem] flex-col justify-end gap-2.5 md:min-h-[19.5rem]">
          <AnimatePresence initial={false}>
            {scene >= 1 && (
              <motion.div
                key="customer"
                layout="position"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.5, ease: EASE }}
                className="ml-auto max-w-[86%] rounded-[1rem] rounded-br-[0.3rem] bg-white/[0.09] px-4 py-3 text-[13.5px] leading-snug text-white/92 ring-1 ring-white/10"
              >
                {customer}
              </motion.div>
            )}
            {scene >= 2 && (
              <motion.div
                key="agent"
                layout="position"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.5, ease: EASE }}
                className="max-w-[92%] rounded-[1rem] rounded-bl-[0.3rem] bg-white px-4 py-3 text-[13.5px] leading-snug text-ink"
              >
                <span className="mb-1 block font-dm text-[10px] font-semibold uppercase tracking-[0.16em] text-forest/70">
                  ISTIQEME assistant
                </span>
                {agent}
              </motion.div>
            )}
            {scene === 0 && (
              <motion.div
                key="typing"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/[0.09] px-3 py-2 ring-1 ring-white/10"
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
            {scene >= 3 && (
              <motion.div
                key="crm"
                layout="position"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
                className="mt-1.5 rounded-[0.9rem] border border-ember-bright/20 bg-white/[0.05] p-3.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-dm text-[10px] font-semibold uppercase tracking-[0.18em] text-ember-bright">
                    CRM · new lead
                  </p>
                  <span className="rounded-full bg-whatsapp/20 px-2 py-0.5 font-dm text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9fe3d6]">
                    Qualified
                  </span>
                </div>
                <dl className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2 text-[12px]">
                  <div>
                    <dt className="text-white/45">Need</dt>
                    <dd className="mt-0.5 font-medium text-white">Wholesale order</dd>
                  </div>
                  <div>
                    <dt className="text-white/45">Timeline</dt>
                    <dd className="mt-0.5 font-medium text-white">Monday</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-white/45">Next</dt>
                    <dd className="mt-0.5 font-medium text-white">Team confirms at 9 AM</dd>
                  </div>
                </dl>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* pipeline rail */}
        <ol className="hidden md:block" aria-hidden>
          {leadFlow.map((s, i) => {
            const st = states[i];
            return (
              <li
                key={s.n}
                className={cn(
                  "relative border-l pl-4 pb-5 last:pb-0",
                  st === "idle" ? "border-white/12" : "border-ember-bright/60",
                  "transition-colors duration-500",
                )}
              >
                <span
                  className={cn(
                    "absolute -left-[4.5px] top-[0.3rem] h-2 w-2 rounded-full transition-colors duration-500",
                    st === "done" && "bg-ember-bright",
                    st === "active" && "bg-white ring-4 ring-white/15",
                    st === "idle" && "bg-white/20",
                  )}
                />
                <p className="itq-index !text-[10px] !tracking-[0.16em] text-white/40">{s.n}</p>
                <p
                  className={cn(
                    "mt-0.5 text-[12px] font-medium leading-tight transition-colors duration-500",
                    st === "idle" ? "text-white/40" : "text-white",
                  )}
                >
                  {s.title}
                </p>
                <p
                  className={cn(
                    "mt-1 font-dm text-[10px] uppercase tracking-[0.12em] transition-colors duration-500",
                    st === "done" && "text-ember-bright",
                    st === "active" && "text-white/70",
                    st === "idle" && "text-white/25",
                  )}
                >
                  {st === "idle" ? "Waiting" : st === "active" ? "In progress" : STEP_LABEL[i]}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
