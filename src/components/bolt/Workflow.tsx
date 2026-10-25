"use client";

import { ArrowRight } from "lucide-react";
import { workflowNodes } from "@/lib/bolt-home-data";
import { Reveal } from "./Reveal";

export function Workflow() {
  return (
    <section id="workflow" className="relative py-28 lg:py-40 border-y border-ink-200/60 dark:border-ink-800/60 dot-bg overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-xs font-mono uppercase tracking-wide2 text-accent-500 mb-3">Why ISTIQEME</p>
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] tracking-tightest text-ink-900 dark:text-ink-50">
              One system, not spreadsheets.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-ink-500 dark:text-ink-400 text-balance">
              Every touchpoint connects. A visitor arrives, the AI qualifies them, the dashboard
              logs it, and your team gets the lead on WhatsApp — automatically.
            </p>
          </div>
        </Reveal>

        {/* Workflow visualization */}
        <Reveal delay={100}>
          <div className="relative">
            {/* Desktop: horizontal flow */}
            <div className="hidden lg:flex items-stretch justify-center gap-0">
              {workflowNodes.map((node, i) => (
                <div key={node.id} className="flex items-center">
                  {/* Node */}
                  <div className="group relative flex flex-col items-center w-56">
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 transition-all duration-300 group-hover:border-accent-500/60 group-hover:shadow-lg group-hover:shadow-accent-500/10">
                      <node.icon size={28} className="text-ink-600 dark:text-ink-300 group-hover:text-accent-500 transition-colors" />
                      {/* Pulse ring */}
                      <span className="absolute inset-0 rounded-2xl border border-accent-500/0 group-hover:border-accent-500/20 animate-flow" style={{ animationDelay: `${i * 0.3}s` }} />
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm font-semibold text-ink-800 dark:text-ink-100">{node.label}</p>
                      <p className="mt-1 text-xs text-ink-400 dark:text-ink-400 font-mono">{node.sublabel}</p>
                    </div>
                  </div>

                  {/* Connector */}
                  {i < workflowNodes.length - 1 && (
                    <div className="relative flex items-center px-2">
                      <div className="h-px w-16 bg-ink-200 dark:bg-ink-700" />
                      <div className="absolute h-px w-8 bg-accent-500/60 animate-flow" style={{ animationDelay: `${i * 0.4}s` }} />
                      <ArrowRight size={14} className="absolute right-0 text-ink-300 dark:text-ink-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile: vertical flow */}
            <div className="lg:hidden flex flex-col items-center gap-0">
              {workflowNodes.map((node, i) => (
                <div key={node.id} className="flex flex-col items-center">
                  <div className="group relative flex h-16 w-16 items-center justify-center rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 transition-all group-hover:border-accent-500/60">
                    <node.icon size={22} className="text-ink-600 dark:text-ink-300 group-hover:text-accent-500 transition-colors" />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-semibold text-ink-800 dark:text-ink-100">{node.label}</p>
                    <p className="mt-0.5 text-xs text-ink-400 dark:text-ink-400 font-mono">{node.sublabel}</p>
                  </div>
                  {i < workflowNodes.length - 1 && (
                    <div className="my-3 flex flex-col items-center">
                      <div className="h-8 w-px bg-ink-200 dark:bg-ink-700" />
                      <div className="h-4 w-px bg-accent-500/60 animate-flow" style={{ animationDelay: `${i * 0.4}s` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Comparison */}
        <Reveal delay={200}>
          <div className="mt-20 grid sm:grid-cols-2 gap-px rounded-2xl border border-ink-200 dark:border-ink-800 overflow-hidden bg-ink-200 dark:bg-ink-800 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-ink-900 p-8">
              <p className="text-xs font-mono uppercase tracking-wide2 text-ink-400 mb-4">Without ISTIQEME</p>
              <p className="font-display text-3xl tracking-wide text-ink-400 dark:text-ink-400 line-through decoration-ink-300 dark:decoration-ink-500">
                Spreadsheets & private chats
              </p>
              <p className="mt-3 text-sm text-ink-400 dark:text-ink-400">
                Leads lost. Follow-ups forgotten. No one sees the full picture.
              </p>
            </div>
            <div className="bg-accent-500/5 dark:bg-accent-500/10 p-8 border-l-2 border-accent-500">
              <p className="text-xs font-mono uppercase tracking-wide2 text-accent-500 mb-4">With ISTIQEME</p>
              <p className="font-display text-3xl tracking-wide text-ink-900 dark:text-ink-50">
                One system
              </p>
              <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">
                Every lead captured, qualified, and routed — automatically, day or night.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
