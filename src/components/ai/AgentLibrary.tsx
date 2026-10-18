"use client";

import { Suspense, useMemo } from "react";
import { agents, getAgentsFiltered } from "@/lib/ai-agents";
import { AgentCard } from "./AgentCard";
import { AgentFilters, useAgentFilters } from "./AgentFilters";

function AgentGrid() {
  const { industry, department } = useAgentFilters();
  const filtered = useMemo(
    () => getAgentsFiltered(industry, department),
    [industry, department],
  );

  return (
    <>
      <p className="mt-8 text-[14px] text-muted">
        Showing {filtered.length} of {agents.length} agents
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((agent) => (
          <AgentCard key={agent.slug} agent={agent} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-12 text-center text-ink-soft">No agents match these filters.</p>
      )}
    </>
  );
}

export function AgentLibrary() {
  return (
    <div>
      <Suspense fallback={<p className="text-muted">Loading filters…</p>}>
        <AgentFilters />
      </Suspense>
      <Suspense fallback={<p className="mt-8 text-muted">Loading agents…</p>}>
        <AgentGrid />
      </Suspense>
    </div>
  );
}
