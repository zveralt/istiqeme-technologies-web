"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import { clientSites, type ClientSite } from "@/lib/bolt-home-data";
import { Reveal } from "./Reveal";

export function Projects() {
  return (
    <section id="work" className="relative overflow-hidden py-28 lg:py-40">
      <div className="absolute inset-0 grid-faint pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="mb-14 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-wide2 text-accent-500">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                Selected work
              </p>
              <h2 className="font-display text-5xl leading-[0.95] tracking-tightest text-ink-900 dark:text-ink-50 sm:text-6xl lg:text-7xl">
                Live client sites.
              </h2>
            </div>
            <div className="flex max-w-md flex-col gap-5">
              <p className="text-base leading-relaxed text-ink-500 dark:text-ink-400 text-balance">
                Real websites and systems we build and run — designed for speed, clarity, and trust.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {clientSites.map((site, index) => (
            <Reveal key={site.id} delay={index * 80} className={index === 0 ? 'lg:col-span-2' : ''}>
              <ClientSiteCard site={site} featured={index === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientSiteCard({ site, featured }: { site: ClientSite; featured: boolean }) {
  const linked = site.url.length > 0;
  const frame = (
      <article className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white/80 shadow-[0_18px_60px_rgba(17,28,49,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-accent-500/50 hover:shadow-[0_24px_80px_rgba(43,99,200,0.14)] dark:border-ink-800/90 dark:bg-ink-900/70 dark:shadow-[0_18px_60px_rgba(0,0,0,0.18)] dark:hover:border-accent-400/50">
        <div className={`relative overflow-hidden bg-ink-100 dark:bg-ink-950 ${featured ? 'h-[300px] sm:h-[420px] lg:h-[520px]' : 'h-[260px] sm:h-[320px]'}`}>
          <div className="absolute inset-x-0 top-0 z-20 flex h-9 items-center gap-1.5 border-b border-ink-200/70 bg-white/90 px-3 backdrop-blur-md dark:border-ink-800/80 dark:bg-ink-900/90">
            <span className="h-2 w-2 rounded-full bg-ink-300 dark:bg-ink-700" />
            <span className="h-2 w-2 rounded-full bg-ink-300 dark:bg-ink-700" />
            <span className="h-2 w-2 rounded-full bg-ink-300 dark:bg-ink-700" />
            {site.domain ? (
              <span className="ml-2 truncate rounded bg-ink-100 px-2 py-1 text-[9px] font-mono text-ink-400 dark:bg-ink-800 dark:text-ink-400">
                {site.domain}
              </span>
            ) : null}
            {linked ? <ExternalLink size={12} className="ml-auto text-ink-400 transition-colors group-hover:text-accent-500" /> : null}
          </div>

          <img
            src={site.image}
            alt=""
            className="pointer-events-none absolute inset-x-0 top-9 bottom-0 h-[calc(100%-2.25rem)] w-full object-cover object-center"
          />
        </div>

        <div className="p-5 sm:p-6 lg:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="mb-2 flex items-center gap-3 text-xs font-mono text-ink-400">
                <span>{site.number}</span>
                <span className="h-px w-8 bg-ink-200 dark:bg-ink-700" />
                <span className="uppercase tracking-wide2">{site.category}</span>
              </div>
              <h3 className="font-display text-3xl tracking-wide text-ink-900 transition-colors duration-300 group-hover:text-accent-500 dark:text-ink-50 sm:text-4xl">
                {site.title}
              </h3>
              {site.domain ? <p className="mt-1 font-mono text-xs text-ink-400">{site.domain}</p> : null}
            </div>
            {linked ? (
            <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-all duration-300 group-hover:border-accent-500 group-hover:bg-accent-500 group-hover:text-white dark:border-ink-700 dark:text-ink-300">
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            ) : null}
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-500 dark:text-ink-400">{site.description}</p>
        </div>
      </article>
  );

  if (!linked) return <div className="block">{frame}</div>;

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      aria-label={`Open ${site.title} in a new tab`}
    >
      {frame}
    </a>
  );
}
