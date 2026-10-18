export type AgentIndustrySlug =
  | "general"
  | "construction"
  | "architecture"
  | "real-estate"
  | "legal"
  | "accounting"
  | "e-commerce"
  | "hospitality"
  | "logistics"
  | "manufacturing"
  | "yacht-charter"
  | "insurance"
  | "education";

export type AgentDepartmentSlug =
  | "sales"
  | "quotes-tenders"
  | "enquiries-support"
  | "operations"
  | "finance-admin"
  | "reporting"
  | "compliance"
  | "marketing-content"
  | "people";

export type AgentStatus = "ready" | "running";

export type AiAgent = {
  slug: string;
  name: string;
  tagline: string;
  industry: AgentIndustrySlug;
  department: AgentDepartmentSlug;
  reads: string;
  does: string;
  comesToYou: string;
  status: AgentStatus;
  proof?: string;
};

export type AiIndustry = {
  slug: AgentIndustrySlug;
  label: string;
  agentCount: number;
  featuredNames: string[];
};

export type AiDepartment = {
  slug: AgentDepartmentSlug;
  label: string;
};
