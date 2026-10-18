import type { AiDepartment, AgentDepartmentSlug } from "./types";

export const departments: AiDepartment[] = [
  { slug: "sales", label: "Sales" },
  { slug: "quotes-tenders", label: "Quotes & tenders" },
  { slug: "enquiries-support", label: "Enquiries & support" },
  { slug: "operations", label: "Operations" },
  { slug: "finance-admin", label: "Finance & admin" },
  { slug: "reporting", label: "Reporting" },
  { slug: "compliance", label: "Compliance" },
  { slug: "marketing-content", label: "Marketing & content" },
  { slug: "people", label: "People" },
];

export const departmentLabel: Record<AgentDepartmentSlug, string> =
  Object.fromEntries(departments.map((d) => [d.slug, d.label])) as Record<
    AgentDepartmentSlug,
    string
  >;
