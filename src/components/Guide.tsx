"use client";

import { useEffect, useRef, useState } from "react";
import { faqs, site, waLink } from "@/lib/site";
import { AiInteractionNotice } from "@/components/legal/AiInteractionNotice";
import { Arrow } from "./Button";

function matchAnswer(query: string) {
  const q = query.toLowerCase();
  const scored = faqs
    .map((item) => {
      const hay = `${item.q} ${item.a}`.toLowerCase();
      const words = q.split(/\s+/).filter((w) => w.length > 2);
      const score = words.reduce(
        (acc, word) => acc + (hay.includes(word) ? 1 : 0),
        item.q.toLowerCase().includes(q) ? 4 : 0,
      );
      return { item, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored[0]?.score
    ? scored[0].item.a
    : "I can help with services, quotes, the Command Center, or the AI receptionist. Ask in English or Urdu — or continue on WhatsApp and the team will pick it up.";
}

type Msg = { from: "you" | "istiqeme"; text: string };

const defaultSuggestions = [
  "What does ISTIQEME do?",
  "Which service fits my business?",
  "How do I get a quote?",
];

export function Guide({
  suggestions = defaultSuggestions,
  title = "Talk to ISTIQEME",
  intro = "Ask anything about our company. I explain in simple words — English or Urdu — and can connect you on WhatsApp when you are ready.",
}: {
  suggestions?: readonly string[];
  title?: string;
  intro?: string;
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "istiqeme",
      text: intro,
    },
  ]);

  const shown = suggestions;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const reply = matchAnswer(trimmed);
    setMessages((prev) => [
      ...prev,
      { from: "you", text: trimmed },
      { from: "istiqeme", text: reply },
    ]);
    setInput("");
  }

  return (
    <div className="grid overflow-hidden rounded-2xl border border-line bg-cream lg:grid-cols-[1.1fr_0.9fr]">
      <div className="flex h-[520px] min-h-0 flex-col">
        <div className="flex shrink-0 items-center justify-between border-b border-line px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-muted">
              English · اردو
            </p>
            <h3 className="font-display text-2xl">{title}</h3>
          </div>
          <span className="flex items-center gap-2 rounded-md bg-sand px-3 py-1 font-mono text-[12px] text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" />
            Ready
          </span>
        </div>
        <AiInteractionNotice className="mx-6 mt-4 shrink-0" />
        <div
          ref={scrollRef}
          data-lenis-prevent
          className="itq-inquiry-select-menu min-h-0 flex-1 space-y-3 overscroll-contain px-6 py-5"
        >
          {messages.map((m, i) => (
            <div
              key={`${m.from}-${i}`}
              className={`rise-in max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
                m.from === "you"
                  ? "ml-auto bg-ink text-cream"
                  : "bg-paper text-ink-soft"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>
        <form
          className="flex shrink-0 gap-2 border-t border-line p-4"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask in English or Urdu…"
            className="flex-1 rounded-xl border border-line bg-paper px-4 py-3 text-[14px] outline-none focus:border-ember"
          />
          <button
            type="submit"
            className="rounded-xl bg-ink px-4 text-[13px] text-cream"
          >
            Send
          </button>
        </form>
      </div>
      <div className="border-t border-line bg-paper p-6 lg:border-l lg:border-t-0">
        <p className="text-[11px] uppercase tracking-[0.24em] text-muted">
          Try asking
        </p>
        <ul className="mt-4 grid gap-2">
          {shown.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => send(s)}
                className="w-full rounded-2xl border border-line bg-cream px-4 py-3 text-left text-[14px] hover:border-ember/40"
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[13px] leading-relaxed text-muted">
          Short answers work best. When you are ready, continue with the
          engineering team.
        </p>
        <a
          href={waLink(site.whatsapp.voiceText)}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-ember"
        >
          Continue on WhatsApp <Arrow />
        </a>
      </div>
    </div>
  );
}
