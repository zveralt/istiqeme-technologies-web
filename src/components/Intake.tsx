"use client";

import { useMemo, useState } from "react";
import { intakeSteps, site, waLink } from "@/lib/site";
import { Arrow } from "./Button";

type Answers = {
  need?: string;
  stage?: string;
  when?: string;
  phone: string;
};

export function Intake({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ phone: "" });

  const current = intakeSteps[step];
  const isContact = step === intakeSteps.length;

  const message = useMemo(() => {
    const need = intakeSteps[0].options.find((o) => o.id === answers.need)?.title;
    const stage = intakeSteps[1].options.find((o) => o.id === answers.stage)?.title;
    const when = intakeSteps[2].options.find((o) => o.id === answers.when)?.title;
    return `Hi ISTIQEME Technologies — I filled the quick intake.

Need: ${need ?? "—"}
Stage: ${stage ?? "—"}
Timeline: ${when ?? "—"}
WhatsApp: ${answers.phone || "—"}`;
  }, [answers]);

  function pick(id: string) {
    const key = current.id as "need" | "stage" | "when";
    setAnswers((prev) => ({ ...prev, [key]: id }));
    setStep((s) => s + 1);
  }

  return (
    <div
      className={`rounded-[28px] border border-line bg-white text-[#102033] shadow-[0_30px_80px_-40px_rgba(14,58,102,0.45)] ${
        compact ? "" : "h-full w-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted">
            Qualify in 4 taps
          </p>
          <h3 className="font-display text-2xl">Find your fit</h3>
        </div>
        <span className="rounded-full bg-sand px-3 py-1 text-[12px] text-ink-soft">
          {Math.min(step + 1, 4)} / 4
        </span>
      </div>
      <div className="h-1 bg-sand">
        <div
          className="h-full bg-ember transition-all duration-500"
          style={{ width: `${((Math.min(step, 3) + (isContact ? 1 : 0)) / 4) * 100}%` }}
        />
      </div>
      <div className="px-6 py-7">
        {!isContact ? (
          <>
            <p className="mb-5 text-[15px] text-ink-soft">{current.prompt}</p>
            <div className="grid gap-3">
              {current.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => pick(opt.id)}
                  className="group flex w-full items-center justify-between rounded-2xl border border-line bg-paper px-4 py-4 text-left transition hover:border-ember/50 hover:bg-card"
                >
                  <span>
                    <span className="block text-[15px] font-medium">{opt.title}</span>
                    <span className="block text-[13px] text-muted">{opt.hint}</span>
                  </span>
                  <span className="text-ember opacity-0 transition group-hover:opacity-100">
                    <Arrow />
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(waLink(message), "_blank", "noreferrer");
            }}
          >
            <p className="text-[15px] text-ink-soft">
              Leave a WhatsApp number. We reply within one business day.
            </p>
            <label className="grid gap-2 text-[13px] text-muted">
              WhatsApp number
              <input
                required
                type="tel"
                inputMode="tel"
                placeholder="03xx xxx xxxx"
                value={answers.phone}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="rounded-2xl border border-line bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-ember"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-[13px] font-medium text-white"
            >
              Send on WhatsApp
              <Arrow />
            </button>
          </form>
        )}
        {step > 0 && (
          <button
            type="button"
            className="mt-5 text-[13px] text-muted hover:text-ink"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            ← Back
          </button>
        )}
        <p className="mt-6 text-[12px] leading-relaxed text-muted">
          Prefer a live conversation? Speak directly with our engineering team
          to figure out the right solution for your business.{" "}
          <a
            className="text-ember underline-offset-2 hover:underline"
            href={waLink(site.whatsapp.discussText)}
            target="_blank"
            rel="noreferrer"
          >
            Discuss on WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}
