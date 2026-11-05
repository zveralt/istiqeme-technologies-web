import type { EcoNodeId } from "@/components/TechEcosystem";

/** Per-service framing for the AI implementation section. */
export const serviceAi: Record<
  string,
  { title: string; lead: string; focus: EcoNodeId[]; problems: string; proof: string }
> = {
  "web-design-development": {
    title: "Where AI fits on your website",
    lead: "The site captures the inquiry; an assistant answers the first questions from your own content and hands a qualified lead to WhatsApp or your CRM.",
    focus: ["website", "ai", "crm"],
    problems: "What usually stops a website from producing inquiries — and what we change first.",
    proof: "Sites we have built and launched. Each card says whether it is client work or our own platform.",
  },
  "ecommerce-development": {
    title: "Where AI fits in your store",
    lead: "Product, size, and delivery questions get answered at any hour, and abandoned conversations come back through a WhatsApp follow-up.",
    focus: ["website", "ai", "automation"],
    problems: "Where online stores lose orders between the product page and the payment.",
    proof: "Storefront and catalog work, labelled as client work, our own platform, or a concept build.",
  },
  "custom-software-development": {
    title: "Where AI fits in your operations",
    lead: "Leads and requests arrive as structured records, rules assign and remind, and managers see the same pipeline the team works from.",
    focus: ["crm", "automation", "team"],
    problems: "The signs that spreadsheets and chat groups have stopped scaling.",
    proof: "Systems and sites we have shipped, with each card labelled by who it was built for.",
  },
  "mobile-app-development": {
    title: "Where AI fits in your app",
    lead: "The app is the team's window into the same data: assigned leads, alerts from automations, and assistant summaries on the phone.",
    focus: ["team", "crm", "automation"],
    problems: "Why field and floor teams outgrow WhatsApp groups and shared sheets.",
    proof: "Related builds, labelled as client work, our own platform, or a concept build.",
  },
  "ai-solutions": {
    title: "How an assistant connects to the business",
    lead: "An assistant is only useful when it is wired to your channels, your data, and a human handoff. This is the path we build.",
    focus: ["whatsapp", "ai", "crm", "automation"],
    problems: "Where inquiries slip today — and which of those an assistant can realistically take on.",
    proof: "Work that shows the systems around an assistant, labelled by who it was built for.",
  },
  "digital-marketing": {
    title: "Where AI fits after the click",
    lead: "Campaigns bring the traffic; an assistant and simple follow-up rules make sure late-night and weekend leads are not lost.",
    focus: ["customers", "whatsapp", "ai"],
    problems: "Why campaigns spend budget without turning into sales.",
    proof: "Sites that campaigns can point to, labelled as client work, our own platform, or a concept build.",
  },
};
