"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { departments } from "@/lib/ai-agents/departments";
import { industries } from "@/lib/ai-agents/industries";
import { departmentCounts } from "@/lib/ai-agents";
import type { AgentDepartmentSlug, AgentIndustrySlug } from "@/lib/ai-agents/types";

const industryOptions = industries.filter((i) => i.slug !== "general");

function parseIndustry(raw: string | null): AgentIndustrySlug | "all" {
  if (!raw) return "all";
  const ok = industryOptions.some((i) => i.slug === raw);
  return ok ? (raw as AgentIndustrySlug) : "all";
}

function parseDepartment(raw: string | null): AgentDepartmentSlug | "all" {
  if (!raw) return "all";
  const ok = departments.some((d) => d.slug === raw);
  return ok ? (raw as AgentDepartmentSlug) : "all";
}

export function useAgentFilters() {
  const searchParams = useSearchParams();
  const industry = parseIndustry(searchParams.get("industry"));
  const department = parseDepartment(searchParams.get("department"));
  return { industry, department };
}

export function AgentFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { industry, department } = useAgentFilters();

  const counts = useMemo(() => departmentCounts(industry), [industry]);

  const setParams = useCallback(
    (next: { industry?: AgentIndustrySlug | "all"; department?: AgentDepartmentSlug | "all" }) => {
      const params = new URLSearchParams(searchParams.toString());
      const ind = next.industry ?? industry;
      const dep = next.department ?? department;
      if (ind === "all") params.delete("industry");
      else params.set("industry", ind);
      if (dep === "all") params.delete("department");
      else params.set("department", dep);
      const q = params.toString();
      router.push(q ? `/ai/agents?${q}` : "/ai/agents", { scroll: false });
    },
    [router, searchParams, industry, department],
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Industry</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <FilterChip
            active={industry === "all"}
            onClick={() => setParams({ industry: "all" })}
            label="All"
          />
          {industryOptions.map((i) => (
            <FilterChip
              key={i.slug}
              active={industry === i.slug}
              onClick={() => setParams({ industry: i.slug })}
              label={`${i.label} · ${i.agentCount}`}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Department</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <FilterChip
            active={department === "all"}
            onClick={() => setParams({ department: "all" })}
            label="All"
          />
          {departments.map((d) => {
            const n = counts.get(d.slug) || 0;
            if (industry !== "all" && n === 0) return null;
            return (
              <FilterChip
                key={d.slug}
                active={department === d.slug}
                onClick={() => setParams({ department: d.slug })}
                label={`${d.label} · ${n}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3.5 py-2 text-[12px] transition-colors ${
        active
          ? "bg-forest text-white dark:bg-[#f5f5f6] dark:text-[#111214]"
          : "border border-line bg-card text-ink-soft hover:border-forest/30"
      }`}
    >
      {label}
    </button>
  );
}
