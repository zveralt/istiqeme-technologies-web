"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contactInfo } from "@/lib/bolt-home-data";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-white py-28 lg:py-40 dark:bg-ink-950">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-100 dark:opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-b from-transparent via-transparent to-ink-950 dark:block"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="mb-6 font-mono text-xs uppercase tracking-wide2 text-accent-500">Ready when you are</p>
          <h2
            className="font-display text-balance text-[clamp(3rem,8vw,6rem)] leading-[0.92] tracking-tightest text-ink-900 dark:text-ink-50"
          >
            Let&apos;s build the system
            <br />
            your business <span className="text-accent-500">actually needs.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-balance text-lg leading-relaxed text-ink-500 dark:text-ink-400">
            Whether you want to talk on WhatsApp or send a quick inquiry, our engineering team is here to help you
            find the right next step.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#inquiry"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
            >
              Start a project
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={contactInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-ink-200 bg-white px-7 py-3.5 text-sm font-semibold text-ink-900 transition-colors hover:border-accent-500 hover:text-accent-500 dark:border-ink-700 dark:bg-transparent dark:text-ink-200"
            >
              Discuss on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
