"use client";

import { useEffect, useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { aiDemoSteps } from "@/lib/bolt-home-data";
import { Reveal } from "./Reveal";

type Message = {
  role: 'user' | 'ai';
  text: string;
};

const conversation: Message[] = [
  { role: 'user', text: 'Hi, do you have the stainless steel water bottle in 750ml?' },
  { role: 'ai', text: 'Yes, we have it in stock — PKR 2,450. Would you like to place an order or see other colors?' },
  { role: 'user', text: 'Can I get it delivered to Clifton, Karachi?' },
  { role: 'ai', text: 'Absolutely. Delivery to Clifton is PKR 200, estimated 1-2 days. Shall I log this as an order? Your team will confirm on WhatsApp.' },
];

export function AIDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (visibleCount >= conversation.length) {
      const reset = setTimeout(() => setVisibleCount(0), 6000);
      return () => clearTimeout(reset);
    }

    if (conversation[visibleCount].role === 'ai') {
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setVisibleCount((c) => c + 1);
      }, 1600);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setVisibleCount((c) => c + 1), 1200);
    return () => clearTimeout(t);
  }, [visibleCount]);

  return (
    <section id="ai-demo" className="relative py-28 lg:py-40 border-y border-ink-200/60 dark:border-ink-800/60">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left — explanation */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-mono uppercase tracking-wide2 text-accent-500 mb-3">AI & automation</p>
              <h2 className="font-display text-5xl lg:text-6xl leading-[0.95] tracking-tightest text-ink-900 dark:text-ink-50">
                A lead at 2 AM still becomes a conversation.
              </h2>
              <p className="mt-6 text-base text-ink-500 dark:text-ink-400 leading-relaxed text-balance">
                Late-night inquiries, quote requests, and support messages — handled automatically
                and routed to your team on WhatsApp.
              </p>
            </Reveal>

            {/* Steps timeline */}
            <Reveal delay={150}>
              <div className="mt-10 space-y-1">
                {aiDemoSteps.map((step, i) => (
                  <div
                    key={step.number}
                    className="flex gap-4 py-3 border-l-2 pl-5 border-ink-200 dark:border-ink-800 relative"
                    style={{
                      borderColor: i < (visibleCount > 0 ? 2 : 0) ? 'rgb(42 157 88 / 0.4)' : undefined,
                    }}
                  >
                    <span className="absolute -left-[9px] top-4 h-4 w-4 rounded-full border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-950" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-accent-500">{step.number}</span>
                        <span className="text-sm font-semibold text-ink-800 dark:text-ink-100">{step.title}</span>
                      </div>
                      <p className="mt-0.5 text-xs text-ink-400 dark:text-ink-500 font-mono">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Without / With comparison */}
            <Reveal delay={250}>
              <div className="mt-8 flex items-center gap-6">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wide2 text-ink-400">Without AI</p>
                  <p className="font-display text-3xl tracking-wide text-ink-400 dark:text-ink-600">14 hours</p>
                </div>
                <div className="h-10 w-px bg-ink-200 dark:bg-ink-700" />
                <div>
                  <p className="text-xs font-mono uppercase tracking-wide2 text-accent-500">With our AI</p>
                  <p className="font-display text-3xl tracking-wide text-accent-500">Instant</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — chat demo */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="rounded-2xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 overflow-hidden shadow-xl shadow-ink-900/5">
                {/* Chat header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-ink-100 dark:border-ink-800">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/10 text-accent-500">
                      <Bot size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink-800 dark:text-ink-100">ISTIQEME Assistant</p>
                      <p className="text-xs text-accent-500 font-mono flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-pulse-dot" />
                        Online · typically replies instantly
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-ink-400">Live intercept</span>
                </div>

                {/* Chat messages */}
                <div className="min-h-[340px] max-h-[400px] overflow-y-auto p-5 space-y-3 dot-bg">
                  {conversation.slice(0, visibleCount).map((msg, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      style={{ animation: 'slideIn 0.4s ease forwards' }}
                    >
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${msg.role === 'user' ? 'bg-ink-100 dark:bg-ink-800 text-ink-500' : 'bg-accent-500/10 text-accent-500'}`}>
                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                      </div>
                      <div className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-ink-900 dark:bg-ink-50 text-white dark:text-ink-950' : 'bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-200'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {typing && (
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-500/10 text-accent-500">
                        <Bot size={14} />
                      </div>
                      <div className="rounded-xl bg-ink-100 dark:bg-ink-800 px-4 py-3 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-ink-400 animate-pulse-dot" style={{ animationDelay: '0s' }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-ink-400 animate-pulse-dot" style={{ animationDelay: '0.2s' }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-ink-400 animate-pulse-dot" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat input — decorative */}
                <div className="flex items-center gap-2 px-4 py-3 border-t border-ink-100 dark:border-ink-800">
                  <div className="flex-1 h-9 rounded-lg bg-ink-50 dark:bg-ink-800/50 px-3 flex items-center text-sm text-ink-400 dark:text-ink-500">
                    Type a message...
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500 text-white">
                    <Send size={15} />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
