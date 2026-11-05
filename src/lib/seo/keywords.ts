/**
 * Keyword-to-page mapping for ISTIQEME Technologies.
 *
 * Method: mapped from services Istiqeme actually offers (see `lib/site.ts`)
 * and public search language used by Karachi / Pakistan web-service queries.
 * Search volumes and keyword difficulty are NOT claimed here — figures were
 * not verified with a live SEO tool in this pass.
 *
 * One primary keyword per indexable URL to avoid cannibalization.
 */

export type KeywordMapEntry = {
  path: string;
  primary: string;
  secondary: string[];
  intent: "commercial" | "transactional" | "informational" | "navigational";
  title: string;
  description: string;
  h1: string;
  h1Accent?: string;
  supportingH2: string[];
  internalLinks: { href: string; label: string }[];
};

export const keywordMap: KeywordMapEntry[] = [
  {
    path: "/",
    primary: "digital engineering studio Karachi",
    secondary: [
      "website and AI systems Karachi",
      "business websites Pakistan",
      "ISTIQEME Technologies",
    ],
    intent: "navigational",
    title: "ISTIQEME Technologies — Websites, Software & AI in Karachi",
    description:
      "Karachi digital engineering studio for websites, online stores, custom software, mobile apps, AI assistants, and marketing — scoped to how your business runs.",
    h1: "Complex systems.",
    h1Accent: "Beautifully Simplified.",
    supportingH2: ["What we build", "Live client sites", "Systems people actually use"],
    internalLinks: [
      { href: "/services", label: "Services" },
      { href: "/work", label: "Work" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    path: "/services",
    primary: "digital services Karachi ISTIQEME",
    secondary: [
      "website development options Pakistan",
      "custom software and AI Karachi",
    ],
    intent: "commercial",
    title: "Digital Services in Karachi — Web, Software, AI & Marketing",
    description:
      "Explore ISTIQEME services: landing pages, corporate websites, e-commerce, custom apps, AI assistants, and digital marketing for businesses in Karachi and Pakistan.",
    h1: "Five ways to get",
    h1Accent: "your business online.",
    supportingH2: ["Catalogue", "Problems we close", "How engagement starts"],
    internalLinks: [
      { href: "/services/web-design-development", label: "Web design & development" },
      { href: "/services/ecommerce-development", label: "E-commerce development" },
      { href: "/services/ai-solutions", label: "AI solutions" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    path: "/services/web-design-development",
    primary: "website design company in Karachi",
    secondary: [
      "website development company in Karachi",
      "website development company in Pakistan",
      "business website design",
      "landing page design Pakistan",
      "corporate website Karachi",
    ],
    intent: "commercial",
    title: "Website Design Company in Karachi",
    description:
      "Website design and development in Karachi — landing pages and corporate sites built for speed, WhatsApp lead routing, and trust. Serving businesses across Pakistan.",
    h1: "Website design & development",
    h1Accent: "in Karachi.",
    supportingH2: [
      "What we build for your web presence",
      "Problems a weak website creates",
      "How we deliver a site you can run",
      "Related work",
      "Why businesses choose ISTIQEME",
      "Website design FAQs",
    ],
    internalLinks: [
      { href: "/services/ecommerce-development", label: "E-commerce development" },
      { href: "/services/digital-marketing", label: "Digital marketing" },
      { href: "/work", label: "Portfolio" },
      { href: "/contact", label: "Talk to the team" },
    ],
  },
  {
    path: "/services/ecommerce-development",
    primary: "ecommerce website development Pakistan",
    secondary: [
      "online store development Karachi",
      "e-commerce website Pakistan",
      "Shopify WooCommerce Pakistan",
    ],
    intent: "commercial",
    title: "E-commerce Website Development Pakistan",
    description:
      "E-commerce website development for Pakistani businesses — catalog, cart, checkout, and optional AI shopping assistance. Built in Karachi for real retail operations.",
    h1: "E-commerce development",
    h1Accent: "for Pakistan.",
    supportingH2: [
      "What your online store includes",
      "Retail problems we solve",
      "Store delivery process",
      "Related work",
      "Why ISTIQEME for commerce",
      "E-commerce FAQs",
    ],
    internalLinks: [
      { href: "/services/web-design-development", label: "Web design & development" },
      { href: "/services/ai-solutions", label: "AI solutions" },
      { href: "/work", label: "Portfolio" },
      { href: "/contact", label: "Start a project" },
    ],
  },
  {
    path: "/services/custom-software-development",
    primary: "custom software development Pakistan",
    secondary: [
      "custom business software Karachi",
      "CRM systems Pakistan",
      "operational dashboards Karachi",
    ],
    intent: "commercial",
    title: "Custom Software Development Pakistan",
    description:
      "Custom software development in Pakistan — CRM, dashboards, and operational systems scoped to how your team works, not a generic template.",
    h1: "Custom software",
    h1Accent: "for how you operate.",
    supportingH2: [
      "Software we design and build",
      "When off-the-shelf tools fall short",
      "How we scope and deliver",
      "Related work",
      "Why ISTIQEME for software",
      "Custom software FAQs",
    ],
    internalLinks: [
      { href: "/services/mobile-app-development", label: "Mobile app development" },
      { href: "/services/ai-solutions", label: "AI solutions" },
      { href: "/work", label: "Command Center demos" },
      { href: "/contact", label: "Discuss software" },
    ],
  },
  {
    path: "/services/mobile-app-development",
    primary: "mobile app development company Pakistan",
    secondary: [
      "custom mobile app Karachi",
      "business mobile app Pakistan",
      "staff mobile apps with roles",
    ],
    intent: "commercial",
    title: "Mobile App Development Company Pakistan",
    description:
      "Custom mobile app development in Pakistan — apps built around your workflows, with secure cloud backends, staff roles, and data under your control.",
    h1: "Mobile app development",
    h1Accent: "around your workflows.",
    supportingH2: [
      "What a custom app includes",
      "Problems generic apps create",
      "App delivery process",
      "Related capabilities",
      "Why ISTIQEME for mobile",
      "Mobile app FAQs",
    ],
    internalLinks: [
      { href: "/services/custom-software-development", label: "Custom software" },
      { href: "/services/ai-solutions", label: "AI solutions" },
      { href: "/start", label: "Assessment" },
      { href: "/contact", label: "Talk to the team" },
    ],
  },
  {
    path: "/services/ai-solutions",
    primary: "AI automation services Pakistan",
    secondary: [
      "AI chatbot WhatsApp Pakistan",
      "AI voice agents Karachi",
      "AI receptionist English Urdu",
      "business AI assistants Pakistan",
    ],
    intent: "commercial",
    title: "AI Automation Services Pakistan",
    description:
      "AI automation for Pakistani businesses — WhatsApp chatbots, voice receptionists in English or Urdu, and custom agents that qualify leads and hand off to your team.",
    h1: "AI automation",
    h1Accent: "that your team can use.",
    supportingH2: [
      "AI systems we build",
      "After-hours and lead-loss problems",
      "How we introduce AI safely",
      "Explore the AI hub",
      "Why ISTIQEME for AI",
      "AI automation FAQs",
    ],
    internalLinks: [
      { href: "/ai", label: "AI hub" },
      { href: "/ai/agents", label: "Agent library" },
      { href: "/ai/products", label: "AI products" },
      { href: "/contact", label: "Discuss AI" },
    ],
  },
  {
    path: "/services/digital-marketing",
    primary: "digital marketing agency Karachi",
    secondary: [
      "social media marketing Karachi",
      "paid ads Pakistan",
      "brand awareness Karachi",
      "lead generation marketing Pakistan",
    ],
    intent: "commercial",
    title: "Digital Marketing Agency Karachi",
    description:
      "Digital marketing in Karachi — social media management, content, and paid campaigns aimed at leads and sales, with clear monthly reporting.",
    h1: "Digital marketing",
    h1Accent: "that turns attention into leads.",
    supportingH2: [
      "Marketing services we run",
      "When likes do not become sales",
      "How we work month to month",
      "Pair marketing with a stronger site",
      "Why ISTIQEME for growth",
      "Digital marketing FAQs",
    ],
    internalLinks: [
      { href: "/services/web-design-development", label: "Web design & development" },
      { href: "/services/ecommerce-development", label: "E-commerce" },
      { href: "/work", label: "Portfolio" },
      { href: "/contact", label: "Discuss marketing" },
    ],
  },
  {
    path: "/work",
    primary: "ISTIQEME portfolio Karachi",
    secondary: ["live client websites Pakistan", "before after web design Karachi"],
    intent: "commercial",
    title: "Our Work — Live Client Sites & Systems",
    description:
      "See live client websites and systems from ISTIQEME Technologies in Karachi — corporate sites, schooling platforms, and product demos you can explore.",
    h1: "Our work.",
    supportingH2: ["Live client sites", "The ISTIQEME difference", "Command center"],
    internalLinks: [
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    path: "/contact",
    primary: "contact ISTIQEME Technologies Karachi",
    secondary: ["website company Karachi contact", "WhatsApp ISTIQEME"],
    intent: "transactional",
    title: "Contact Us in Karachi",
    description:
      "Contact ISTIQEME Technologies in Karachi by WhatsApp, phone, or email. Share a short brief — we reply within one business day.",
    h1: "Talk to the team",
    h1Accent: "that builds the system.",
    supportingH2: ["Project inquiry", "Office"],
    internalLinks: [
      { href: "/services", label: "Services" },
      { href: "/start", label: "Quick intake" },
    ],
  },
  {
    path: "/ai",
    primary: "AI assistants for business Pakistan",
    secondary: ["AI hub ISTIQEME", "WhatsApp AI agents Karachi"],
    intent: "commercial",
    title: "AI & Automation for Business",
    description:
      "AI and automation from ISTIQEME — product lines, industry agents, and a clear process for introducing assistants your team will actually use.",
    h1: "AI & automation",
    supportingH2: ["Products", "Industries", "Process", "FAQs"],
    internalLinks: [
      { href: "/services/ai-solutions", label: "AI solutions service" },
      { href: "/ai/agents", label: "Agent library" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function keywordForPath(path: string) {
  return keywordMap.find((entry) => entry.path === path);
}
