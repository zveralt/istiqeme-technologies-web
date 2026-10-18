import catalogJson from "./catalog.data.json";
import type { AgentIndustrySlug, AiAgent, AiIndustry } from "./types";

const rawAgents = catalogJson as AiAgent[];

function count(slug: AgentIndustrySlug) {
  return rawAgents.filter((a) => a.industry === slug).length;
}

function featured(slug: AgentIndustrySlug, n = 3) {
  return rawAgents.filter((a) => a.industry === slug).slice(0, n).map((a) => a.name);
}

export const industries: AiIndustry[] = [
  { slug: "general", label: "For every business", agentCount: count("general"), featuredNames: featured("general") },
  { slug: "construction", label: "Construction", agentCount: count("construction"), featuredNames: featured("construction") },
  { slug: "architecture", label: "Architecture", agentCount: count("architecture"), featuredNames: featured("architecture") },
  { slug: "real-estate", label: "Real estate", agentCount: count("real-estate"), featuredNames: featured("real-estate") },
  { slug: "legal", label: "Legal", agentCount: count("legal"), featuredNames: featured("legal") },
  { slug: "accounting", label: "Accounting", agentCount: count("accounting"), featuredNames: featured("accounting") },
  { slug: "e-commerce", label: "E-commerce", agentCount: count("e-commerce"), featuredNames: featured("e-commerce") },
  { slug: "hospitality", label: "Hospitality", agentCount: count("hospitality"), featuredNames: featured("hospitality") },
  { slug: "logistics", label: "Logistics", agentCount: count("logistics"), featuredNames: featured("logistics") },
  { slug: "manufacturing", label: "Manufacturing", agentCount: count("manufacturing"), featuredNames: featured("manufacturing") },
  { slug: "yacht-charter", label: "Yacht charter", agentCount: count("yacht-charter"), featuredNames: featured("yacht-charter") },
  { slug: "insurance", label: "Insurance", agentCount: count("insurance"), featuredNames: featured("insurance") },
  { slug: "education", label: "Education", agentCount: count("education"), featuredNames: featured("education") },
];

export const industryLabel: Record<AgentIndustrySlug, string> =
  Object.fromEntries(industries.map((i) => [i.slug, i.label])) as Record<
    AgentIndustrySlug,
    string
  >;
