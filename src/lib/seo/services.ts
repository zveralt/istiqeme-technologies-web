import type { ServiceMediaSlug } from "@/lib/service-media";
import { work } from "@/lib/site";

export type ServiceFaq = { question: string; answer: string };

export type ServicePageContent = {
  slug: string;
  path: string;
  eyebrow: string;
  relatedServiceIds: string[];
  /** Key into `serviceMedia` — unique hero + overview photos per service. */
  mediaKey: ServiceMediaSlug;
  intro: string;
  features: { title: string; body: string }[];
  problems: { title: string; body: string }[];
  process: { step: string; title: string; body: string }[];
  whyLead: string;
  whyUs: { title: string; body: string }[];
  faqs: ServiceFaq[];
  portfolioNames: string[];
  relatedPaths: { href: string; label: string; line: string }[];
};

const portfolioByName = Object.fromEntries(work.map((w) => [w.name, w]));

export function portfolioFor(names: string[]) {
  return names
    .map((name) => portfolioByName[name])
    .filter(Boolean)
    .map((w) => ({
      name: w.name,
      body: w.body,
      href: w.href,
      kind: w.kind,
      relation: w.relation,
      image: w.image,
    }));
}

export const servicePages: ServicePageContent[] = [
  {
    slug: "web-design-development",
    path: "/services/web-design-development",
    eyebrow: "Web design & development",
    relatedServiceIds: ["landing", "corporate"],
    mediaKey: "web-design-development",
    intro:
      "ISTIQEME designs and builds landing pages and corporate websites for businesses in Karachi and across Pakistan. Each site is scoped to how you win customers — clear structure, fast mobile performance, and a direct path to WhatsApp or a form — not a decorative brochure that sits unused.",
    features: [
      {
        title: "Landing pages built for lead capture",
        body: "Single-page sites that explain the offer quickly, route high-intent visitors to WhatsApp, and collect inquiries when your team is offline.",
      },
      {
        title: "Corporate multi-page websites",
        body: "Service, about, and contact pages that present the business clearly to clients and partners, with forms that reach your inbox or WhatsApp.",
      },
      {
        title: "Mobile-first performance",
        body: "Layouts that hold up on phone networks common in Karachi, so visitors are not bounced by slow loads or broken sections.",
      },
      {
        title: "Practical on-page foundations",
        body: "Sensible titles, headings, and contact paths so local customers can find and trust the business — without promising rankings we have not earned yet.",
      },
    ],
    problems: [
      {
        title: "Visitors leave without contacting you",
        body: "A vague homepage and buried contact details waste paid and organic traffic. We place a clear next step where intent is highest.",
      },
      {
        title: "The site does not match how you sell",
        body: "Template layouts rarely match your services or sales conversation. We write and structure pages around the questions buyers already ask.",
      },
      {
        title: "Partners cannot verify the business online",
        body: "A thin or outdated presence weakens trust. A calm corporate site shows services, location, and how to reach a real person.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Assess",
        body: "A short conversation on goals, offers, and where leads are lost today — priced in plain language.",
      },
      {
        step: "02",
        title: "Architect",
        body: "You approve structure and key pages before build work starts.",
      },
      {
        step: "03",
        title: "Build & launch",
        body: "Design and development on a stack your team can maintain, with WhatsApp or form routing wired in.",
      },
      {
        step: "04",
        title: "Hand over & improve",
        body: "You get a clear next step after launch — content edits, measurement, or marketing when you are ready.",
      },
    ],
    whyLead:
      "We build sites that match how you sell — clear structure, fast mobile performance, and a direct path to contact — not decorative brochures.",
    whyUs: [
      {
        title: "Karachi-rooted, bilingual",
        body: "Based in Karachi with English and Urdu support for local buyers who need a clear next step.",
      },
      {
        title: "Built for lead paths",
        body: "Websites tied to WhatsApp, forms, and follow-up — so traffic becomes conversations, not vanity pageviews.",
      },
      {
        title: "Ready for systems later",
        body: "Same studio that builds AI assistants and software, so the site can connect to operations when you grow.",
      },
      {
        title: "Scoped before we build",
        body: "Quoted per project with a clear scope before build — no vague retainers disguised as web design.",
      },
    ],
    faqs: [
      {
        question: "Do you build websites for businesses outside Karachi?",
        answer:
          "Yes. We are based in Karachi and work with clients across Pakistan, and with teams that sell beyond Pakistan when the engagement fits.",
      },
      {
        question: "What is the difference between a landing page and a corporate website?",
        answer:
          "A landing page is usually one focused page for a campaign or offer. A corporate website has multiple pages — services, about, contact — for ongoing trust and discovery.",
      },
      {
        question: "Will my site work on mobile?",
        answer:
          "Yes. Mobile layout and load performance are part of every website engagement, because most visitors browse on phones.",
      },
      {
        question: "How do we start?",
        answer:
          "Message us on WhatsApp or use the contact form with a short brief. We reply within one business day with a clear next step.",
      },
    ],
    portfolioNames: ["istiqeme.net", "Credo", "Pascale Agency", "SKH Solutions", "Veritas Schooling System"],
    relatedPaths: [
      {
        href: "/services/ecommerce-development",
        label: "E-commerce development",
        line: "When you need catalog, cart, and checkout — not only a brochure site.",
      },
      {
        href: "/services/digital-marketing",
        label: "Digital marketing",
        line: "Content and paid campaigns once the site is ready to receive traffic.",
      },
      {
        href: "/services/ai-solutions",
        label: "AI solutions",
        line: "Chat and voice assistants that catch leads when the team is offline.",
      },
    ],
  },
  {
    slug: "ecommerce-development",
    path: "/services/ecommerce-development",
    eyebrow: "E-commerce",
    relatedServiceIds: ["shop"],
    mediaKey: "ecommerce-development",
    intro:
      "We build online storefronts for Pakistani retailers and brands that need customers to browse, add to cart, and pay in one flow. Optional AI assistants can answer product questions and keep the order conversation moving on WhatsApp.",
    features: [
      {
        title: "Full catalog and cart experience",
        body: "Product browsing, cart, and a checkout path designed to reduce last-step abandonment.",
      },
      {
        title: "Operations-friendly admin",
        body: "A backend your team can use to update prices, inventory, and fulfill orders without a developer for every change.",
      },
      {
        title: "Payments and shipping integrations",
        body: "Secure payment and shipping setups scoped to how you sell — discussed case by case, not promised as a one-size package.",
      },
      {
        title: "Optional AI shopping help",
        body: "Add-on chat or voice assistance for product questions and order updates when you want coverage after hours.",
      },
    ],
    problems: [
      {
        title: "Customers cannot buy in one place",
        body: "Spreadsheets, Instagram DMs, and partial catalogs break the purchase path. A storefront keeps browse-to-buy in one system.",
      },
      {
        title: "Cart abandonment at checkout",
        body: "Friction at payment loses sales. We focus the checkout on the few steps that matter.",
      },
      {
        title: "Staff cannot update the catalog safely",
        body: "If only a developer can change products, the store goes stale. Admin access and roles are part of the build.",
      },
    ],
    process: [
      { step: "01", title: "Assess", body: "Catalog size, payment needs, fulfillment, and whether AI help is required." },
      { step: "02", title: "Architect", body: "You approve store structure, key flows, and integrations before development." },
      { step: "03", title: "Build & launch", body: "Storefront, admin, and launch checklist with your team trained on day-to-day updates." },
      { step: "04", title: "Run & improve", body: "Optional follow-on for AI assistants, marketing, or feature expansion." },
    ],
    whyLead:
      "We design storefronts around browse-to-buy — catalog, cart, checkout, and the ops your team actually runs day to day.",
    whyUs: [
      {
        title: "One studio as you scale",
        body: "Commerce sits next to our website, software, and AI work — one team if you grow beyond a simple store.",
      },
      {
        title: "Local buying fluency",
        body: "Karachi-based team that understands buying conversations that start on WhatsApp and finish in checkout.",
      },
      {
        title: "AI when it earns its place",
        body: "Clear scope before build; shopping assistants and other add-ons stay optional, not forced into every quote.",
      },
      {
        title: "Mobile-first delivery",
        body: "Portfolio experience shipping live client sites that have to hold up on phone networks and real retail traffic.",
      },
    ],
    faqs: [
      {
        question: "Do you only build Shopify stores?",
        answer:
          "No. We choose the stack based on catalog size, payments, and how your team will operate the store. The right tool is the one your staff can run.",
      },
      {
        question: "Can you connect JazzCash, EasyPaisa, or bank gateways?",
        answer:
          "Payment options are planned during scoping for your market and platform. We do not claim every gateway on every stack — we confirm what fits your project.",
      },
      {
        question: "Is AI required for an online store?",
        answer:
          "No. AI shopping assistance is an optional add-on. Many stores launch cleanly first, then add assistants when volume justifies it.",
      },
    ],
    portfolioNames: ["OFFDUTY", "Pascale Agency"],
    relatedPaths: [
      {
        href: "/services/web-design-development",
        label: "Web design & development",
        line: "Corporate or landing sites when you are not ready for full commerce.",
      },
      {
        href: "/services/ai-solutions",
        label: "AI solutions",
        line: "Chat and voice agents for product questions and after-hours orders.",
      },
      {
        href: "/services/digital-marketing",
        label: "Digital marketing",
        line: "Paid and social campaigns once the store can convert traffic.",
      },
    ],
  },
  {
    slug: "custom-software-development",
    path: "/services/custom-software-development",
    eyebrow: "Custom software",
    relatedServiceIds: ["app", "crm-systems", "erp-systems"],
    mediaKey: "custom-software-development",
    intro:
      "When spreadsheets and off-the-shelf tools fight your daily operations, we design custom software — CRM-style workspaces, dashboards, and operational systems — so staff, managers, and leadership share one reliable picture.",
    features: [
      {
        title: "CRM and customer workspaces",
        body: "One place for customers, follow-ups, and team activity instead of private chats and lost threads.",
      },
      {
        title: "Role-based dashboards",
        body: "Views tuned for field staff, managers, and leadership — each sees what they need without editable chaos.",
      },
      {
        title: "Secure data under your control",
        body: "Permissions, structured data, and hosting choices discussed openly so business information stays protected.",
      },
      {
        title: "Built to connect later",
        body: "Software that can sit beside your website, WhatsApp agents, and reporting as you grow.",
      },
    ],
    problems: [
      {
        title: "Follow-ups slip through chats",
        body: "Sales and support live in WhatsApp and sheets. A shared workspace keeps ownership and history visible.",
      },
      {
        title: "Leadership cannot see the real picture",
        body: "Manual rollups arrive late and incomplete. Dashboards show activity without waiting on a weekly export.",
      },
      {
        title: "Generic tools do not match the workflow",
        body: "Forced fields and unused modules slow the team. We scope to how you already sell and deliver.",
      },
    ],
    process: [
      { step: "01", title: "Assess", body: "Map roles, data, and where work currently breaks." },
      { step: "02", title: "Architect", body: "Blueprint of screens, permissions, and integrations for your approval." },
      { step: "03", title: "Build & deploy", body: "Iterative delivery with training for the people who will run it daily." },
      { step: "04", title: "Run & improve", body: "Stabilise, then sharpen monthly based on real usage." },
    ],
    whyLead:
      "Custom software scoped to how your team works — roles, data, and workflows — not a generic template with unused modules.",
    whyUs: [
      {
        title: "Built for daily use",
        body: "We design systems people will actually run — not shelfware packed with modules nobody opens.",
      },
      {
        title: "Operational proof",
        body: "Experience presenting operational demos such as the Command Center for sales hierarchies and rollups.",
      },
      {
        title: "Fast local decisions",
        body: "Karachi team that can continue on WhatsApp when something needs a clear decision the same day.",
      },
      {
        title: "Fewer handoff gaps",
        body: "Software, websites, and AI from one studio — so the system, site, and assistants stay aligned.",
      },
    ],
    faqs: [
      {
        question: "Is this the same as buying a SaaS CRM?",
        answer:
          "Not always. Some businesses fit a standard CRM. Others need a custom workspace because roles, approvals, or field work do not match generic tools. We help you decide which path is honest for your case.",
      },
      {
        question: "Who owns the data?",
        answer:
          "Your business data should remain under your control. Access, hosting, and handover are part of the engagement conversation.",
      },
      {
        question: "How long does a custom system take?",
        answer:
          "Timelines depend on scope. We share a clear plan after the assessment — not a one-size estimate for every project.",
      },
    ],
    portfolioNames: ["istiqeme.net", "Credo"],
    relatedPaths: [
      {
        href: "/services/mobile-app-development",
        label: "Mobile app development",
        line: "When field staff need a mobile layer on top of the system.",
      },
      {
        href: "/work",
        label: "Work & demos",
        line: "See the Command Center and live client platforms.",
      },
      {
        href: "/services/ai-solutions",
        label: "AI solutions",
        line: "Agents that write into the same operational picture.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    path: "/services/mobile-app-development",
    eyebrow: "Mobile apps",
    relatedServiceIds: ["app", "custom-app-frameworks"],
    mediaKey: "mobile-app-development",
    intro:
      "We build custom mobile apps around your exact business needs — with secure cloud backends, staff login roles, and data that stays private under your control.",
    features: [
      {
        title: "Workflow-first app design",
        body: "Screens follow how your team already works in the field or on the floor — not a generic template.",
      },
      {
        title: "Secure cloud backend",
        body: "Authentication, roles, and encrypted data paths planned as part of the architecture.",
      },
      {
        title: "Staff permissions",
        body: "Different people see different actions so sensitive data is not open to everyone.",
      },
      {
        title: "Room to connect AI and web",
        body: "Apps can sit beside WhatsApp agents and dashboards when those are in scope.",
      },
    ],
    problems: [
      {
        title: "Spreadsheets break on the go",
        body: "Field teams need a phone-friendly flow that still lands cleanly in a central system.",
      },
      {
        title: "Generic apps fight your process",
        body: "Forced steps and unused features slow adoption. Custom apps remove that friction.",
      },
      {
        title: "Data leaves uncontrolled chats",
        body: "Orders and notes in private messages disappear. An app with roles keeps a recoverable history.",
      },
    ],
    process: [
      { step: "01", title: "Assess", body: "Users, devices, offline needs, and the data that must stay accurate." },
      { step: "02", title: "Architect", body: "Approved blueprint for screens, roles, and backend before build." },
      { step: "03", title: "Build & deploy", body: "Delivery with testing on the devices your staff actually use." },
      { step: "04", title: "Run & improve", body: "Support and iteration based on real field feedback." },
    ],
    whyLead:
      "Apps designed around the workflows your staff run in the field — with secure backends, roles, and data under your control.",
    whyUs: [
      {
        title: "Full-stack conversation",
        body: "Mobile work ties into our software and AI practice — one conversation for the app, backend, and assistants.",
      },
      {
        title: "Security as product",
        body: "Permissions and access control are treated as product requirements, not afterthoughts bolted on late.",
      },
      {
        title: "Close collaboration",
        body: "Karachi-based collaboration with clear WhatsApp follow-up while the app is in build and after launch.",
      },
      {
        title: "Quoted from the workflow",
        body: "We quote after understanding the workflow — not a vague per-screen guess that breaks mid-build.",
      },
    ],
    faqs: [
      {
        question: "iOS, Android, or both?",
        answer:
          "We confirm target platforms during scoping based on your users and budget. Many business apps start where your staff already work day to day.",
      },
      {
        question: "Do you rebuild our entire business in an app?",
        answer:
          "No. We scope the smallest useful mobile layer that removes the real bottleneck, then expand if needed.",
      },
      {
        question: "Can the app talk to our website or WhatsApp flow?",
        answer:
          "Yes, when those systems are in scope. Integrations are planned explicitly so expectations stay clear.",
      },
    ],
    portfolioNames: ["Credo", "istiqeme.net"],
    relatedPaths: [
      {
        href: "/services/custom-software-development",
        label: "Custom software",
        line: "Dashboards and CRM workspaces that pair with the app.",
      },
      {
        href: "/services/ai-solutions",
        label: "AI solutions",
        line: "Assistants that feed the same operational data.",
      },
      {
        href: "/start",
        label: "Assessment",
        line: "A short intake if you are still defining the problem.",
      },
    ],
  },
  {
    slug: "ai-solutions",
    path: "/services/ai-solutions",
    eyebrow: "AI solutions",
    relatedServiceIds: ["ai-voice-agents", "ai-chatbot-systems", "custom-ai-agents"],
    mediaKey: "ai-solutions",
    intro:
      "ISTIQEME builds AI assistants Pakistani businesses can run — WhatsApp chatbots, voice receptionists in English or Urdu, and custom agents that qualify leads and hand a clear summary to your team.",
    features: [
      {
        title: "WhatsApp chatbot systems",
        body: "Answer product and order questions, capture context, and log the conversation for follow-up.",
      },
      {
        title: "AI voice receptionists",
        body: "Pick up when the desk cannot — qualify the caller and continue on WhatsApp with a summary.",
      },
      {
        title: "Custom agents on your rules",
        body: "Trained on your services and boundaries so replies stay in plain language and on-brand.",
      },
      {
        title: "Tied to real operations",
        body: "Agents that can sit beside CRM dashboards and websites instead of floating as a demo chat.",
      },
    ],
    problems: [
      {
        title: "Night and weekend inquiries go cold",
        body: "Buyers message when nobody is at the desk. Assistants keep the conversation alive until a human continues.",
      },
      {
        title: "Staff repeat the same answers",
        body: "Repetitive FAQs steal selling time. Agents handle the routine path and escalate the rest.",
      },
      {
        title: "Leads arrive without context",
        body: "A bare phone number is not enough. Qualification questions produce a usable handoff.",
      },
    ],
    process: [
      { step: "01", title: "Assess", body: "Channels, languages, and which questions are safe to automate." },
      { step: "02", title: "Architect", body: "Scripts, escalation rules, and data destinations you approve." },
      { step: "03", title: "Build & deploy", body: "Launch with monitoring so weak answers get corrected quickly." },
      { step: "04", title: "Run & improve", body: "Monthly sharpening from real transcripts and outcomes." },
    ],
    whyLead:
      "Practical automation your team can run — WhatsApp, voice, and agents that qualify leads and hand off with context.",
    whyUs: [
      {
        title: "AI as a core practice",
        body: "See the AI hub, products, and agent library for depth — this is not a side experiment on our site.",
      },
      {
        title: "English and Urdu",
        body: "Support for how Karachi customers actually speak — not English-only demos that fail in the field.",
      },
      {
        title: "WhatsApp designed in",
        body: "Handoff to WhatsApp and your team is designed into the flow, not bolted on after a pretty chat demo.",
      },
      {
        title: "Honest scope",
        body: "No fake accuracy claims — we define what the agent should and should not answer before launch.",
      },
    ],
    faqs: [
      {
        question: "Will AI replace our sales team?",
        answer:
          "No. Our assistants qualify and route. Humans close and handle exceptions. That boundary is part of the design.",
      },
      {
        question: "Do you support Urdu?",
        answer:
          "Yes. Voice and chat experiences can be scoped for English, Urdu, or both depending on your customers.",
      },
      {
        question: "Where can I see more AI detail?",
        answer:
          "Visit the AI hub for products, industry agents, and process — then talk to us about your specific workflow.",
      },
    ],
    portfolioNames: ["istiqeme.net"],
    relatedPaths: [
      { href: "/ai", label: "AI hub", line: "Narrative, products, and proof in one place." },
      { href: "/ai/agents", label: "Agent library", line: "Browse agents by industry and department." },
      { href: "/ai/products", label: "AI products", line: "Eight product lines from agents to content." },
    ],
  },
  {
    slug: "digital-marketing",
    path: "/services/digital-marketing",
    eyebrow: "Digital marketing",
    relatedServiceIds: ["marketing", "social-media-marketing", "digital-marketing", "brand-awareness"],
    mediaKey: "digital-marketing",
    intro:
      "We manage social profiles, create content, and run paid campaigns aimed at leads and sales — with monthly reporting so you see return, not only reach. Marketing works best when the website or store can actually convert the traffic.",
    features: [
      {
        title: "Social media management",
        body: "Consistent posting and profile care so the brand does not go quiet between campaigns.",
      },
      {
        title: "Content that presents the offer clearly",
        body: "Written posts, graphics, and short-form video that explain what you sell without empty hype.",
      },
      {
        title: "Paid campaigns for demand",
        body: "Targeted ads designed for inquiries and sales conversations, not vanity metrics alone.",
      },
      {
        title: "Transparent monthly reporting",
        body: "Plain-language reports on what ran, what responded, and what we recommend next.",
      },
    ],
    problems: [
      {
        title: "The brand goes silent",
        body: "Irregular posting makes you disappear from customer feeds. A rhythm keeps the business present.",
      },
      {
        title: "Likes do not become leads",
        body: "Engagement without a path to WhatsApp or a form wastes spend. We connect creative to a next step.",
      },
      {
        title: "No clear view of return",
        body: "If nobody reports honestly, budget drifts. Monthly reporting keeps decisions grounded.",
      },
    ],
    process: [
      { step: "01", title: "Assess", body: "Offers, audiences, channels, and whether the site is ready for traffic." },
      { step: "02", title: "Plan", body: "Content themes, campaign goals, and reporting cadence you approve." },
      { step: "03", title: "Execute", body: "Publishing and paid activity with creative that matches the brand." },
      { step: "04", title: "Report & refine", body: "Monthly review — keep what works, cut what does not." },
    ],
    whyLead:
      "Marketing aimed at leads and sales — content, social, and paid campaigns with reporting you can act on each month.",
    whyUs: [
      {
        title: "Upstream when needed",
        body: "Growth sits next to website and AI delivery — one team when the funnel needs a fix before more spend.",
      },
      {
        title: "Owned campaign work",
        body: "Dedicated social and campaign ownership on the ISTIQEME team — not a revolving freelance queue.",
      },
      {
        title: "Local market fluency",
        body: "Karachi market familiarity with bilingual customer conversations and how attention becomes contact.",
      },
      {
        title: "Honest readiness calls",
        body: "We will say when a site or offer is not ready for paid spend — protecting budget before it burns.",
      },
    ],
    faqs: [
      {
        question: "Do I need a new website before marketing?",
        answer:
          "Not always — but if the site cannot capture leads, paid traffic will underperform. We flag that early.",
      },
      {
        question: "Which platforms do you run?",
        answer:
          "Channel mix depends on where your buyers are. We confirm platforms during planning rather than forcing every network.",
      },
      {
        question: "Are results guaranteed?",
        answer:
          "No honest agency can guarantee rankings or lead volume. We commit to clear reporting and iteration, not inflated promises.",
      },
    ],
    portfolioNames: ["Pascale Agency", "SKH Solutions"],
    relatedPaths: [
      {
        href: "/services/web-design-development",
        label: "Web design & development",
        line: "Strengthen the page that receives your traffic.",
      },
      {
        href: "/services/ecommerce-development",
        label: "E-commerce development",
        line: "When ads should land on a store, not a static page.",
      },
      {
        href: "/contact",
        label: "Contact",
        line: "Tell us about the offer and the audience you want to reach.",
      },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}
