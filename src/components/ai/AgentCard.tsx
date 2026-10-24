import { departmentLabel } from "@/lib/ai-agents/departments";
import type { AiAgent } from "@/lib/ai-agents/types";
import { waLink } from "@/lib/site";

export function AgentCard({ agent }: { agent: AiAgent }) {
  const cta = waLink(
    `Hi ISTIQEME — I'd like to ask about the "${agent.name}" agent for my business.`,
  );

  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-card p-6 text-card-foreground shadow-sm transition duration-300 [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-display text-[1.35rem] leading-snug text-forest">{agent.name}</h3>
        <span
          className={`shrink-0 rounded-md px-2.5 py-1 text-[10px] uppercase tracking-wider ${
            agent.status === "running"
              ? "bg-forest/10 text-forest"
              : "bg-paper-deep text-muted"
          }`}
        >
          {agent.status === "running" ? "Running now" : "Ready to install"}
        </span>
      </div>
      {agent.tagline ? (
        <p className="mt-2 text-[14px] text-ink-soft">{agent.tagline}</p>
      ) : null}
      <span className="mt-4 inline-flex w-fit rounded-md bg-paper px-3 py-1 font-mono text-[11px] text-muted">
        {departmentLabel[agent.department]}
      </span>
      <dl className="mt-5 flex flex-1 flex-col gap-3 text-[13px] leading-relaxed">
        <div>
          <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">Reads</dt>
          <dd className="mt-1 text-ink-soft">{agent.reads}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">Does</dt>
          <dd className="mt-1 text-ink-soft">{agent.does}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">Comes to you</dt>
          <dd className="mt-1 text-ink-soft">{agent.comesToYou}</dd>
        </div>
      </dl>
      {agent.proof ? (
        <p className="mt-4 font-accent text-[13px] text-muted">{agent.proof}</p>
      ) : null}
      <a
        href={cta}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center justify-center rounded-xl border border-line px-4 py-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-forest hover:text-white dark:hover:bg-[#f5f5f6] dark:hover:text-[#111214]"
      >
        Ask about this
      </a>
    </article>
  );
}
