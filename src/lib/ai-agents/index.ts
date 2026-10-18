/**
 * Agent catalog structure adapted from Luup Agency's public library.
 * Deployed and supported by ISTIQEME Technologies for Karachi operators.
 */
import catalogJson from "./catalog.data.json";
import type { AiAgent, AgentDepartmentSlug, AgentIndustrySlug } from "./types";

function cleanName(name: string) {
  const m = name.match(/([A-Z][a-z]+(?: [A-Za-z&'/-]+)+)$/);
  return m ? m[1] : name.replace(/^[a-zäöüõ]+/i, "").trim() || name;
}

function cleanReads(text: string) {
  const idx = text.indexOf("Your ");
  if (idx >= 0) return text.slice(idx);
  const idx2 = text.indexOf("Sent ");
  if (idx2 >= 0) return text.slice(idx2);
  return text.replace(/^Reads/i, "").trim();
}

export const agents: AiAgent[] = (catalogJson as AiAgent[]).map((a) => ({
  ...a,
  name: cleanName(a.name),
  tagline: a.tagline || "",
  reads: cleanReads(a.reads),
}));

export function getAgentsByIndustry(industry: AgentIndustrySlug | "all") {
  if (industry === "all") return agents;
  return agents.filter((a) => a.industry === industry);
}

export function getAgentsFiltered(
  industry: AgentIndustrySlug | "all",
  department: AgentDepartmentSlug | "all",
) {
  return agents.filter((a) => {
    if (industry !== "all" && a.industry !== industry) return false;
    if (department !== "all" && a.department !== department) return false;
    return true;
  });
}

export function departmentCounts(industry: AgentIndustrySlug | "all") {
  const pool =
    industry === "all" ? agents : agents.filter((a) => a.industry === industry);
  const counts = new Map<AgentDepartmentSlug, number>();
  for (const a of pool) {
    counts.set(a.department, (counts.get(a.department) || 0) + 1);
  }
  return counts;
}
