"use client";

import { useEffect, useState } from "react";
import { leadFlow, waLink, site } from "@/lib/site";
import { Arrow } from "./Button";

const scenarios = [
  {
    id: "admission",
    label: "Midnight admission inquiry",
    customer:
      "Assalamualaikum — is admission still open? My son’s documents are ready but it’s 2 AM.",
    agent:
      "Walaikum assalam. Yes, we can take the inquiry now. May I have the student’s name and the programme you’re asking about? I’ll log this and a counsellor will follow up on WhatsApp first thing.",
  },
  {
    id: "quote",
    label: "High-ticket corporate quote",
    customer:
      "We need a custom dashboard for 40 field staff. Who can I speak to about scope and security?",
    agent:
      "I can take that. Are you looking at salesman, manager, and leadership views, or a single workspace? I’ll capture the brief and route a warm summary to the engineering team on WhatsApp.",
  },
  {
    id: "support",
    label: "After-hours support escalation",
    customer:
      "Checkout is failing for a customer in DHA and our shop is closed. Can someone help tonight?",
    agent:
      "I’ve flagged this as after-hours support. Please share the order ID if you have it — I’ll notify the on-call team on WhatsApp so they can recover the sale.",
  },
];

export function LeadDemo() {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);
  const scene = scenarios[active];

  useEffect(() => {
    setTick(0);
    const t1 = window.setTimeout(() => setTick(1), 280);
    const t2 = window.setTimeout(() => setTick(2), 1100);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [active]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="overflow-hidden rounded-[28px] border border-line bg-cream">
        <div className="border-b border-line px-6 py-4">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted">
            Live intercept
          </p>
          <h3 className="font-display text-2xl">Test our AI assistant</h3>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 py-3">
          {scenarios.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-[12px] ${
                i === active ? "bg-ink text-cream" : "bg-sand text-ink-soft"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="space-y-3 px-6 py-5">
          {tick >= 1 && (
            <div className="rise-in ml-auto max-w-[85%] rounded-2xl bg-ink px-4 py-3 text-[14px] text-cream">
              {scene.customer}
            </div>
          )}
          {tick >= 2 && (
            <div className="rise-in max-w-[90%] rounded-2xl bg-paper px-4 py-3 text-[14px] leading-relaxed text-ink-soft">
              {scene.agent}
            </div>
          )}
          {tick < 2 && (
            <p className="text-[13px] text-muted">
              Late-night inquiries, quote requests, and support messages —
              handled automatically and routed to your team on WhatsApp.
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-muted">
          From first message to sale
        </p>
        <h3 className="mt-2 font-display text-3xl leading-tight">
          A lead at 2 AM still becomes a conversation.
        </h3>
        <ol className="mt-6 space-y-4">
          {leadFlow.map((step, i) => (
            <li key={step.n} className="flex gap-4">
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12px] ${
                  i === 0 ? "bg-ember text-white" : "bg-sand text-ink"
                }`}
              >
                {step.n}
              </span>
              <span>
                <span className="block font-medium">{step.title}</span>
                <span className="text-[13px] text-muted">{step.detail}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-line bg-cream p-4">
            <p className="text-[12px] text-muted">Without AI</p>
            <p className="font-display text-3xl">14 hours</p>
          </div>
          <div className="theme-preserve rounded-2xl bg-forest p-4 text-[#f5f5f6]">
            <p className="text-[12px] text-white/60">With our AI</p>
            <p className="font-display text-3xl">Instant</p>
          </div>
        </div>
        <a
          href={waLink(site.whatsapp.discussText)}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-ember"
        >
          Discuss this for your business <Arrow />
        </a>
      </div>
    </div>
  );
}
