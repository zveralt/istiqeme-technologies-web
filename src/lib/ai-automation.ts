import { industries } from "./ai-agents/industries";

export const aiHero = {
  eyebrow: "AI & automation",
  title: "Intelligence that works while your team rests.",
  subtitle:
    "Done-for-you AI agents and operations systems for growing businesses in Karachi — wired to WhatsApp, your data, and the way you already work.",
  body:
    "We connect capable models to your real business: prices, scripts, CRM, and dashboards. Systems that do not just answer — they run the work and hand you the exceptions.",
};

export const aiStats = [
  { value: "7", label: "Days from call to first agent live" },
  { value: "24/7", label: "Coverage on WhatsApp and voice" },
  { value: "100%", label: "You own prompts, workflows, and code" },
];

export const aiProductsFull = [
  {
    id: "p1",
    num: "01",
    label: "Agent library",
    title: "AI Agents",
    summary:
      "A library of ready-to-deploy agents, built per industry. Each one reads your systems, does one job end to end, and hands exceptions to a human.",
    bullets: [
      "Built per industry, named by outcome",
      "Reads your tools, does the job, flags exceptions",
      "Audit first, then deployed in order",
      "Kept running by ISTIQEME after go-live",
    ],
    showIndustryGrid: true,
  },
  {
    id: "p2",
    num: "02",
    label: "Executive brief",
    title: "Owner brief agent",
    summary:
      "A personal AI layer for the owner: morning digest on WhatsApp, lead summaries, and prep before key calls — proactive, always on.",
    bullets: [
      "Lead and inbox triage in plain language",
      "Daily brief before your team stand-up",
      "Meeting prep from CRM and chat history",
      "English and Urdu where you need it",
    ],
  },
  {
    id: "p3",
    num: "03",
    label: "Operations",
    title: "Operations agent",
    summary:
      "Runs enquiries, bookings, scheduling, reminders, and reporting end to end — built around your business and handed off on WhatsApp.",
    bullets: [
      "24/7 enquiry and WhatsApp handling",
      "Bookings and reminders on your rules",
      "Reporting that writes itself",
      "Human approval where judgment matters",
    ],
  },
  {
    id: "p4",
    num: "04",
    label: "Knowledge",
    title: "Business memory",
    summary:
      "Your company written down: procedures, prices, and answers with sources — so staff stop asking you the same question twice.",
    bullets: [
      "Answers from your files with citations",
      "Feeds CRM and Command Center context",
      "Logs gaps so documents get written",
      "You own every file and export",
    ],
  },
  {
    id: "p5",
    num: "05",
    label: "Consulting",
    title: "Audit & bespoke builds",
    summary:
      "From AI audits to full builds. We review your business, rank fixes by ROI, and ship voice agents, automations, and dashboards.",
    bullets: [
      "Sites, voice agents, and automations",
      "Audit ranks every fix by impact",
      "You own code, prompts, and workflows",
      "Bilingual scripts for Karachi teams",
    ],
  },
  {
    id: "p6",
    num: "06",
    label: "Partnership",
    title: "Done-with-you partnership",
    summary:
      "We audit your busywork, optimize the process, then automate it live with your team — weekly rhythm plus async WhatsApp between calls.",
    bullets: [
      "Starts with a free assessment on /start",
      "Weekly working session with engineers",
      "Async WhatsApp for quick decisions",
      "Skills that keep admin off your plate",
    ],
  },
  {
    id: "p7",
    num: "07",
    label: "Web",
    title: "Websites & shops",
    summary:
      "Conversion-first websites and stores — designed, built, and wired to WhatsApp. See our five software tiers on the Services page.",
    bullets: [
      "Landing pages through full e-commerce",
      "SEO-ready structure and fast mobile",
      "Enquiry flows into your agents",
      "You own code, repo, and domain",
    ],
    href: "/services",
  },
  {
    id: "p8",
    num: "08",
    label: "Growth",
    title: "Content & social pipeline",
    summary:
      "Content written in your voice, quality checks before publish, and social drafts aligned to campaigns — often paired with Tier 05 marketing.",
    bullets: [
      "Posts and captions in brand voice",
      "Scheduled publishing rhythm",
      "Quality gates before anything ships",
      "Tied to paid campaigns when needed",
    ],
    href: "/services#marketing",
  },
] as const;

export const aiProductIntro = {
  eyebrow: "Our products",
  title: "Eight ways we run your business.",
  body:
    "Each product stands alone. Wired together they become one operator: agents do industry work, the brief keeps you informed, operations runs WhatsApp, memory holds truth, consulting fills gaps, partnership keeps you ahead, websites sell, and content feeds the funnel.",
};

export const industryGrid = industries.filter((i) => i.slug !== "general");

export const aiCaseStudies = [
  {
    meta: "Karachi · Field sales",
    title: "Command Center for a sales team",
    body: "Staff, managers, and leadership each see the pipeline they need — leads, performance, and risk in one secure place.",
    href: "/work#dashboards",
  },
  {
    meta: "After hours · WhatsApp",
    title: "AI receptionist that hands off warm leads",
    body: "English and Urdu intake, qualification, and a summary to your team before the first human reply.",
    href: "/#top",
  },
  {
    meta: "Education · Admissions",
    title: "School enquiries on WhatsApp",
    body: "Parents get instant answers, visit slots, and fee context — exceptions route to admissions staff.",
    href: "/ai/agents?industry=education",
  },
];

export const aiPainStats = [
  { value: "10+ hrs", label: "Typical admin time lost per week" },
  { value: "5 min", label: "Reply window before leads go cold" },
  { value: "Free", label: "Assessment via intake — no pitch required" },
];

export const aiProcess = [
  { step: "01", title: "Assess", body: "A short interview finds where time and money leak — priced in plain language." },
  { step: "02", title: "Architect", body: "You approve the blueprint before we build anything." },
  { step: "03", title: "Build & deploy", body: "First system live in weeks, on your stack, with your data." },
  { step: "04", title: "Run & improve", body: "We keep it alive; every month it gets sharper." },
];

export const aiBuildingBlocks = [
  "Inbox triage that drafts replies",
  "Bookings and scheduling end to end",
  "Quotes from your price book",
  "Reports that write themselves",
  "Voice agents that answer 24/7",
  "Knowledge answers with sources",
  "Weekly digest of what changed",
  "Approval gates where judgment matters",
];

export const aiProfiles = [
  { id: "01", title: "Retail & wholesale operators", body: "Teams whose orders live in WhatsApp and spreadsheets." },
  { id: "02", title: "Field sales organizations", body: "Managers who need one picture of pipeline and performance." },
  { id: "03", title: "Schools & coaching institutes", body: "Admissions-heavy businesses that cannot miss after-hours parents." },
];

export const aiFaqs = [
  {
    q: "What is done-for-you AI automation?",
    a: "Software that owns a process end to end. We build it, deploy it, and keep it running — with approval gates where your judgment matters.",
  },
  {
    q: "Who owns the code and the data?",
    a: "You do. Workflows and prompts ship in your name. If we disappeared tomorrow, your systems would keep running.",
  },
  {
    q: "How fast is the first system live?",
    a: "Weeks, not quarters. A first win often lands within days of assessment; a full agent is typically live inside a few weeks.",
  },
  {
    q: "We already use ChatGPT — why is this different?",
    a: "Context. Our agents read your prices, clients, and processes — not the open internet. They answer from your company, with sources.",
  },
  {
    q: "English and Urdu?",
    a: "Yes. Voice and WhatsApp agents are built for how Karachi teams and customers actually talk.",
  },
  {
    q: "How do I start?",
    a: "Browse the agent library, pick an industry, or complete the four-step intake. We reply on WhatsApp within one business day.",
  },
];
