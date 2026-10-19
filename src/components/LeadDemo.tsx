"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { leadFlow, waLink, site } from "@/lib/site";
import { Arrow } from "./Button";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const scenarios = [
  {
    id: "admission",
    label: "Midnight admission inquiry",
    customer: "Assalamualaikum — is admission still open? My son’s documents are ready but it’s 2 AM.",
    agent:
      "Walaikum assalam. Yes, we can take the inquiry now. May I have the student’s name and the programme you’re asking about? I’ll log this and a counsellor will follow up on WhatsApp first thing.",
  },
  {
    id: "quote",
    label: "Corporate quote",
    customer: "We need a custom dashboard for 40 field staff. Who can I speak to about scope and security?",
    agent:
      "I can take that. Are you looking at salesman, manager, and leadership views, or a single workspace? I’ll capture the brief and route a warm summary to the engineering team on WhatsApp.",
  },
  {
    id: "support",
    label: "After-hours support",
    customer: "Checkout is failing for a customer in DHA and our shop is closed. Can someone help tonight?",
    agent:
      "I’ve flagged this as after-hours support. Please share the order ID if you have it — I’ll notify the on-call team on WhatsApp so they can recover the sale.",
  },
] as const;

/**
 * Scripted conversation demo + the four-step flow it illustrates. The replies
 * are fixed examples (clearly labelled); the deployed assistant answers from
 * the client's own prices, rules and stock.
 */
export function LeadDemo() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [stage, setStage] = useState(0);
  const scene = scenarios[active];
  /* Reduced-motion users see the whole exchange at once. */
  const tick = reduce ? 2 : stage;

  function choose(i: number) {
    setActive(i);
    setStage(0);
  }

  useEffect(() => {
    if (reduce) return;
    const t1 = window.setTimeout(() => setStage(1), 260);
    const t2 = window.setTimeout(() => setStage(2), 1250);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [active, reduce]);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-20">
      {/* Demo panel */}
      <div className="itq-surface overflow-hidden">
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 md:px-6">
          <div>
            <p className="itq-micro">Scripted demo</p>
            <h3 className="itq-h3 mt-1.5 text-foreground">Try the assistant</h3>
          </div>
          <span className="mt-1 inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-1 font-dm text-[11px] font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" aria-hidden />
            WhatsApp
          </span>
        </div>

        <div
          role="group"
          aria-label="Example conversations"
          className="flex gap-2 overflow-x-auto px-5 py-3.5 [scrollbar-width:none] md:px-6 [&::-webkit-scrollbar]:hidden"
        >
          {scenarios.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={i === active}
              onClick={() => choose(i)}
              className="itq-seg shrink-0"
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex min-h-[15.5rem] flex-col justify-end gap-3 bg-paper-deep/60 px-5 pb-5 pt-4 md:px-6" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {tick >= 1 && (
              <motion.div
                key={`${scene.id}-c`}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                transition={{ duration: 0.45, ease: EASE }}
                className="ml-auto max-w-[85%] rounded-[1rem] rounded-br-[0.3rem] bg-ink px-4 py-3 text-[14px] leading-snug text-white"
              >
                {scene.customer}
              </motion.div>
            )}
            {tick === 1 && (
              <motion.div
                key={`${scene.id}-t`}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                className="inline-flex w-fit items-center gap-1 rounded-full border border-line bg-card px-3 py-2"
                aria-hidden
              >
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-forest/60 [animation:blink_1.2s_ease-in-out_infinite] dark:bg-ember-bright/70"
                    style={{ animationDelay: `${d * 0.18}s` }}
                  />
                ))}
              </motion.div>
            )}
            {tick >= 2 && (
              <motion.div
                key={`${scene.id}-a`}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                transition={{ duration: 0.45, ease: EASE }}
                className="max-w-[90%] rounded-[1rem] rounded-bl-[0.3rem] border border-line bg-card px-4 py-3 text-[14px] leading-relaxed text-ink-soft"
              >
                <span className="mb-1 block font-dm text-[10px] font-semibold uppercase tracking-[0.16em] text-forest/70 dark:text-ember-bright/80">
                  ISTIQEME assistant
                </span>
                {scene.agent}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="border-t border-line px-5 py-3.5 font-dm text-[12px] leading-relaxed text-muted md:px-6">
          Fixed example replies. The deployed assistant answers from your prices, rules and stock,
          then hands the conversation to your team on WhatsApp.
        </p>
      </div>

      {/* Flow */}
      <div className="lg:pt-2">
        <p className="itq-eyebrow">From first message to sale</p>
        <h3 className="itq-h2 mt-5 !text-[clamp(1.75rem,2.8vw,2.5rem)] text-foreground">
          A lead at 2 AM still becomes a conversation<span className="text-ember dark:text-ember-bright">.</span>
        </h3>

        <ol className="mt-8 border-t border-line">
          {leadFlow.map((step) => (
            <li
              key={step.n}
              className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-4 border-b border-line py-4"
            >
              <span className="itq-index pt-1">{step.n}</span>
              <span>
                <span className="block text-[15.5px] font-medium text-foreground">{step.title}</span>
                <span className="mt-0.5 block text-[13.5px] text-muted">{step.detail}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[var(--radius-media)] border border-dashed border-line p-4">
            <p className="itq-micro">Without a system</p>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
              The message waits for opening hours and may never be written down.
            </p>
          </div>
          <div className={cn("rounded-[var(--radius-media)] bg-forest p-4 text-white")}>
            <p className="itq-micro !text-white/60">With the assistant</p>
            <p className="mt-2 text-[14px] leading-relaxed text-white/90">
              Answered on the spot, qualified, and logged for the team to confirm.
            </p>
          </div>
        </div>

        <a
          href={waLink(site.whatsapp.discussText)}
          target="_blank"
          rel="noreferrer"
          className="itq-link-arrow mt-7 text-[14px] font-medium text-forest dark:text-ember-bright"
        >
          Discuss this for your business <Arrow />
        </a>
      </div>
    </div>
  );
}
