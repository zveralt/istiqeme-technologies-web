import Link from "next/link";
import type { AiIndustry } from "@/lib/ai-agents/types";

export function AiIndustryGrid({ items }: { items: AiIndustry[] }) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((ind) => (
        <Link
          key={ind.slug}
          href={`/ai/agents?industry=${ind.slug}`}
          className="group rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-ember/40"
        >
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
            {ind.agentCount} agents
          </p>
          <h3 className="mt-2 font-display text-xl text-foreground">{ind.label}</h3>
          <ul className="mt-4 space-y-1 text-[13px] text-ink-soft">
            {ind.featuredNames.slice(0, 3).map((name) => (
              <li key={name} className="truncate">· {name}</li>
            ))}
          </ul>
          <span className="mt-4 inline-block text-[13px] font-medium text-foreground group-hover:underline">
            Open {ind.label} →
          </span>
        </Link>
      ))}
    </div>
  );
}
