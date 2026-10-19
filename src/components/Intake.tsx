"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { intakeSteps, site, waLink } from "@/lib/site";
import { Arrow } from "./Button";
import { cn } from "@/lib/utils";

type Answers = {
  need?: string;
  stage?: string;
  when?: string;
  phone: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const TOTAL = intakeSteps.length + 1;

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Intake({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ phone: "" });
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const current = intakeSteps[Math.min(step, intakeSteps.length - 1)];
  const isContact = step === intakeSteps.length;

  const picked = useMemo(
    () => ({
      need: intakeSteps[0].options.find((o) => o.id === answers.need)?.title,
      stage: intakeSteps[1].options.find((o) => o.id === answers.stage)?.title,
      when: intakeSteps[2].options.find((o) => o.id === answers.when)?.title,
    }),
    [answers],
  );

  const message = useMemo(() => {
    return `Hi ISTIQEME Technologies — I filled the quick intake.

Need: ${picked.need ?? "—"}
Stage: ${picked.stage ?? "—"}
Timeline: ${picked.when ?? "—"}
WhatsApp: ${answers.phone || "—"}`;
  }, [picked, answers.phone]);

  const href = waLink(message);

  function pick(id: string) {
    const key = current.id as "need" | "stage" | "when";
    setAnswers((prev) => ({ ...prev, [key]: id }));
    setStep((s) => s + 1);
  }

  function back() {
    setError(null);
    setSent(false);
    setStep((s) => Math.max(0, s - 1));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const digits = answers.phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Please enter a WhatsApp number with at least 10 digits.");
      return;
    }
    setError(null);
    window.open(href, "_blank", "noreferrer");
    setSent(true);
  }

  const motionProps = {
    initial: reduce ? false : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? undefined : { opacity: 0, y: -6, transition: { duration: 0.14 } },
    transition: { duration: 0.28, ease: EASE },
  };

  return (
    <div className={cn("itq-surface text-foreground", compact ? "" : "h-full w-full")}>
      {/* header */}
      <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 md:px-6">
        <div>
          <p className="itq-micro">Quick intake · {TOTAL} steps</p>
          <h3 className="itq-h3 mt-1.5">Find your fit</h3>
        </div>
        <p className="itq-index mt-1 whitespace-nowrap">
          Step {Math.min(step + 1, TOTAL)} <span className="text-line">/</span> {TOTAL}
        </p>
      </div>

      {/* segmented progress */}
      <div className="flex gap-1.5 px-5 pt-4 md:px-6" aria-hidden>
        {Array.from({ length: TOTAL }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-500",
              i <= step ? "bg-ember dark:bg-ember-bright" : "bg-sand",
            )}
          />
        ))}
      </div>

      <div className="px-5 pb-6 pt-6 md:px-6">
        <AnimatePresence mode="wait" initial={false}>
          {!isContact ? (
            <motion.div key={current.id} {...motionProps}>
              <p className="text-[17px] font-medium leading-snug text-foreground">{current.prompt}</p>
              <div className="mt-4 grid gap-2.5" role="group" aria-label={current.prompt}>
                {current.options.map((opt) => {
                  const key = current.id as "need" | "stage" | "when";
                  const selected = answers[key] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => pick(opt.id)}
                      aria-pressed={selected}
                      className="itq-option"
                    >
                      <span className="min-w-0">
                        <span className="block text-[15px] font-medium leading-tight">{opt.title}</span>
                        <span className="mt-1 block text-[13px] text-muted">{opt.hint}</span>
                      </span>
                      <span className={cn("itq-option-arrow shrink-0", selected && "!opacity-100")}>
                        {selected ? <CheckIcon /> : <Arrow />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.form key="contact" {...motionProps} className="grid gap-4" onSubmit={submit} noValidate>
              {/* summary of choices */}
              <dl className="grid grid-cols-3 gap-3 rounded-[0.875rem] bg-paper-deep p-3.5 text-[12.5px]">
                {(
                  [
                    ["Need", picked.need],
                    ["Stage", picked.stage],
                    ["Timeline", picked.when],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="min-w-0">
                    <dt className="itq-micro !text-[10px]">{k}</dt>
                    <dd className="mt-1 truncate font-medium text-foreground">{v ?? "—"}</dd>
                  </div>
                ))}
              </dl>

              <p className="text-[17px] font-medium leading-snug text-foreground">
                Leave a WhatsApp number.
                <span className="block text-[14px] font-normal text-muted">We reply within one business day.</span>
              </p>

              <label className="grid gap-2 text-[13px] font-medium text-ink-soft">
                WhatsApp number
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="03xx xxx xxxx"
                  value={answers.phone}
                  aria-invalid={error ? "true" : undefined}
                  aria-describedby={error ? "intake-phone-error" : undefined}
                  onChange={(e) => {
                    setError(null);
                    setSent(false);
                    setAnswers((prev) => ({ ...prev, phone: e.target.value }));
                  }}
                  className="itq-input font-normal"
                />
              </label>
              {error ? (
                <p id="intake-phone-error" role="alert" className="-mt-1 text-[13px] text-[#b4402e] dark:text-[#f0a89c]">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-[14px] font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-[#0f7a6e] active:scale-[0.985]"
              >
                Send on WhatsApp
                <Arrow />
              </button>

              {sent ? (
                <p className="text-[13px] leading-relaxed text-muted" role="status">
                  WhatsApp should have opened in a new tab. If it didn’t,{" "}
                  <a href={href} target="_blank" rel="noreferrer" className="itq-ulink text-forest dark:text-ember-bright">
                    open it here
                  </a>
                  .
                </p>
              ) : null}
            </motion.form>
          )}
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          {step > 0 ? (
            <button type="button" className="itq-ulink text-[13px] font-medium text-muted hover:text-foreground" onClick={back}>
              ← Back
            </button>
          ) : (
            <span />
          )}
          <p className="text-[12.5px] leading-relaxed text-muted">
            Prefer to talk?{" "}
            <a
              className="itq-ulink text-forest dark:text-ember-bright"
              href={waLink(site.whatsapp.discussText)}
              target="_blank"
              rel="noreferrer"
            >
              Discuss on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
