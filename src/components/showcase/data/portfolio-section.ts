export const portfolioCopy = {
  pageMeta: "Portfolio",
  pageTitleLines: ["OUR WORK"],
  pageIntro:
    "See real sites we have built, try our live demos, and reach our team directly when you are ready to talk.",
  beforeAfterTitle: "The ISTIQEME Difference.",
  beforeAfterSubtitle:
    "Slide to see how we upgrade standard templates into premium, high-converting digital storefronts that make your brand stand out.",
  beforeAfterSpecimenA: "SPECIMEN A // LEGACY TEMPLATE",
  beforeAfterSpecimenB: "SPECIMEN B // ARCHITECTURAL REFRAME",
  beforeAfterDragHint: "DRAG HANDLE TO COMPARE · SCROLL INSIDE EACH SITE",
  beforeAfterToggleA: "VIEW LEGACY",
  beforeAfterToggleB: "VIEW REFRAME",
  beforeAfterComparisons: [
    {
      id: "offduty",
      tabLabel: "OFFDUTY",
      subtitle:
        "Apparel storefront — from a cluttered template shop page to OFFDUTY, a clothing brand we designed.",
      legacyKind: "placeholder" as const,
      legacyPlaceholderId: "offduty-legacy",
      legacyHostId: "placeholder-offduty-legacy",
      // Live site sends X-Frame-Options: DENY — load via showcase-proxy.
      reframeUrl: "https://offduty-apparel.com/",
      reframeHostId: "offduty-apparel.com",
      reframeEmbed: "proxy" as const,
    },
    {
      id: "credo",
      tabLabel: "Credo",
      subtitle:
        "Credo College — the same institution, reframed from legacy template to ISTIQEME architectural standard.",
      legacyKind: "proxy" as const,
      legacyUrl: "https://college.credo.edu.pk/",
      legacyHostId: "college.credo.edu.pk",
      reframeUrl: "https://credo-lumina-framework.lovable.app/",
      reframeHostId: "credo-lumina-framework.lovable.app",
      reframeEmbed: "direct" as const,
    },
    {
      id: "pascale",
      tabLabel: "Pascale Agency",
      subtitle:
        "Pascale Agency — from a stock creative template to a high-velocity digital media showcase.",
      legacyKind: "placeholder" as const,
      legacyPlaceholderId: "pascale",
      legacyHostId: "placeholder-pascale",
      reframeUrl: "https://pascaleagency.org",
      reframeHostId: "pascaleagency.org",
      reframeEmbed: "direct" as const,
    },
  ],
  frameworksTitle: "LIVE CLIENT SITES",
  frameworksIntro:
    "Real websites we build and operate — designed for speed, clarity, and results:",
  frameworks: [
    {
      name: "istiqeme.net",
      url: "https://istiqeme.net",
      label: "Enterprise Telemetry Corporate Hub",
      description:
        "Corporate platform for clear data tracking, clean information mapping, and direct executive communication.",
      status: "STATUS: OPERATIONAL // UPTIME: 99.9%",
    },
    {
      name: "Credo",
      url: "https://credo-lumina-framework.lovable.app",
      label: "Interactive Workflow Business Framework",
      description:
        "Multi-page corporate layout presenting complex operational workflows smoothly on any mobile screen.",
      status: "STATUS: OPERATIONAL // UPTIME: 99.8%",
    },
    {
      name: "Pascale Agency",
      url: "https://pascaleagency.org",
      label: "High-Velocity Digital Media Showcase",
      description:
        "Fast digital media showcase for high-end brand assets and portfolios without local network lag.",
      status: "STATUS: OPERATIONAL // UPTIME: 99.7%",
    },
  ],
  auditTitle: "READY TO GET STARTED?",
  auditBody:
    "Stop losing customers to slow websites, missed messages, and messy spreadsheets. Chat with our team — we will help you find the right solution.",
  auditCta: "[ DISCUSS YOUR PROJECT ON WHATSAPP ]",
  auditWhatsAppMessage:
    "Hi ISTIQEME Technologies — I'd like to discuss the right digital solution for my business.",
  floatingAuditText:
    "Ready to talk? Message us on WhatsApp.",
  contact: {
    address:
      "Office # E-17, 5th Floor, Descon Plaza, Main Shahrah-e-Faisal, Near KFC Nursery, Karachi, Pakistan",
    phones: ["+92 332 3407131", "+92 21 34167709"],
    emails: ["tech@istiqeme.net", "kamran@istiqeme.net"],
  },
};

export const aiReceptionistCopy = {
  meta: "Live Demo",
  title: "Your AI Voice Agent. Always On.",
  subtitle:
    "Watch a real demo: our AI receptionist answers customers, asks the right questions, and hands warm leads to your team — day or night.",
  body:
    "This is the same class of voice agent we deploy for businesses that lose calls after hours. It sounds natural, follows your script, and never sleeps — so every inquiry gets a reply.",
  systemLabel: "AI_RECEPTIONIST // VOICE_AGENT_DEMO",
  videoAriaLabel: "AI receptionist demo — how our voice agent handles a live customer call",
  featuresMeta: "What this agent does",
  features: [
    {
      title: "Answers 24/7",
      detail: "Picks up when your team cannot — nights, weekends, busy hours.",
    },
    {
      title: "English + Urdu",
      detail: "Speaks the language your customers actually use.",
    },
    {
      title: "Qualifies every lead",
      detail: "Asks smart questions so you only chase serious inquiries.",
    },
    {
      title: "Never miss a call",
      detail: "Turns missed rings into captured conversations and follow-ups.",
    },
    {
      title: "WhatsApp handoff",
      detail: "Sends warm leads straight to your team with a clear summary.",
    },
    {
      title: "Your brand voice",
      detail: "Trained on your tone, services, and rules — not a generic bot.",
    },
  ],
  ctaLabel: "[ DISCUSS AI RECEPTIONIST ON WHATSAPP ]",
  whatsappMessage:
    "Hi ISTIQEME Technologies — I watched your AI receptionist demo and would like to discuss it for my business.",
  sources: {
    webm: "/technologies/videos/ai-receptionist.webm",
    mp4: "/technologies/videos/ai-receptionist.mp4",
    poster: "/technologies/videos/ai-receptionist-poster.webp",
  },
};

export type SovereignPanelId = "telemetry";

export type IstiqemeLiveLayerId = "salesman" | "manager" | "ceo";

export const sovereignLedgerCopy = {
  meta: "Live Demo",
  title: "The Command Center: Track Every Lead and Sale.",
  subtitle:
    "No more lost messages or messy spreadsheets. See exactly how we build customized dashboards that keep your entire business organized in one place.",
  systemLabel: "istiqeme.live // COMMAND_CENTER",
  applicationIntroMeta: "Built by ISTIQEME Technologies",
  applicationIntroTitle: "A Real Business Dashboard We Built",
  applicationIntroBody:
    "This is istiqeme.live — a custom system we designed for field sales teams. Sales staff, managers, and leadership each see the information they need in one secure place.",
  applicationIntroDetail:
    "Tap through the roles below to see how we organize leads, track performance, and give owners a clear picture of the business.",
  livePreviewMeta: "Panel 01 // Interface Snapshot",
  livePreviewHeader: "ISTIQEME.LIVE",
  readOnlyBadge: "INTERFACE SNAPSHOT",
  architectureMeta: "Application Layer Map",
  architectureHeader: "ROLE ARCHITECTURE",
  architectureTooltip: "Select a layer to inspect the secured interface scope.",
  layers: {
    salesman: {
      id: "salesman" as const,
      label: "SALESMAN",
      sublabel: "Field Operations",
      layerCode: "L01",
      deepDiveTitle: "The Salesman Layer",
      deepDiveBody:
        "Front-line operators capture merchant activity, policy inquiries, and supply-chain touchpoints in the field — every action timestamped and routed upward without editable drift or data loss.",
    },
    manager: {
      id: "manager" as const,
      label: "MANAGER",
      sublabel: "Operations Command",
      layerCode: "L02",
      deepDiveTitle: "The Manager Layer",
      deepDiveBody:
        "Regional managers oversee team performance, approval queues, and compliance checkpoints. Oversight is read-structured — escalations flow upward with full audit context, never through informal channels.",
    },
    ceo: {
      id: "ceo" as const,
      label: "CEO",
      sublabel: "Executive Intelligence",
      layerCode: "L03",
      deepDiveTitle: "The CEO Layer",
      deepDiveBody:
        "Executive leadership receives institutional snapshots — national pipeline health, compliance indices, and board-ready digests — distilled from encrypted upstream layers without exposing raw field-level noise.",
    },
  },
  panels: {
    telemetry: {
      id: "telemetry" as const,
      meta: "Panel 02 // Operational Scale",
      header: "TELEMETRY PULSE",
      deepDiveTitle: "The Telemetry Pulse",
      deepDiveBody:
        "High-availability infrastructure is not a marketing claim — it is measured. Sub-millisecond latency, sovereign data residency, and continuous uptime readouts give risk officers and CIOs the confidence to scale without compromising compliance posture.",
      metrics: [
        { label: "LATENCY", value: "12ms" },
        { label: "SYSTEM_UPTIME", value: "99.99%" },
        { label: "DATA_SOVEREIGNTY", value: "SECURED" },
      ],
    },
  },
  deepDiveDefaultTitle: "Select an Application Layer",
  deepDiveDefaultBody:
    "Choose Salesman, Manager, or CEO below the live preview to inspect how istiqeme.live scopes secure, read-only interfaces for each institutional role.",
  commandPrompt: "[ DISCUSS YOUR PROJECT ON WHATSAPP ]",
  whatsappMessage:
    "Hi ISTIQEME Technologies — I reviewed your Command Center demo and would like to discuss a custom dashboard for my business.",
};

