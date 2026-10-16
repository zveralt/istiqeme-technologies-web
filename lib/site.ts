export const site = {
  name: "ISTIQEME Technologies",
  shortName: "ISTIQEME",
  tagline: "Premium digital engineering for growing businesses in Karachi and beyond.",
  parent: "https://istiqeme.net/",
  since: 2019,
  city: "Karachi",
  phones: [
    { label: "+92 332 3407131", href: "tel:+923323407131" },
    { label: "+92 21 34167709", href: "tel:+922134167709" },
  ],
  emails: [
    { label: "tech@istiqeme.net", href: "mailto:tech@istiqeme.net" },
    { label: "kamran@istiqeme.net", href: "mailto:kamran@istiqeme.net" },
  ],
  address:
    "Office # E-17, 5th Floor, Descon Plaza, Main Shahrah-e-Faisal, Near KFC Nursery, Karachi, Pakistan",
  whatsapp: {
    number: "923323407131",
    defaultText:
      "Hi ISTIQEME Technologies — I'd like to learn more about your digital solutions for my business.",
    discussText:
      "Hi ISTIQEME Technologies — I'd like to discuss the right digital solution for my business.",
    voiceText:
      "Hi ISTIQEME Technologies — I spoke with your website voice assistant and would like to discuss a digital solution for my business.",
    receptionistText:
      "Hi ISTIQEME Technologies — I'd like to discuss an AI receptionist for my business.",
  },
} as const;

export function waLink(text: string = site.whatsapp.defaultText) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(text)}`;
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
] as const;

export const services = [
  {
    id: "landing",
    tier: "01",
    category: "Web design",
    title: "Landing page & lead capture",
    summary:
      "A high-speed, professional single-page website designed to capture attention and turn casual visitors into paying customers.",
    points: [
      "A high-speed, professional single-page website meticulously designed to capture attention and turn casual visitors into paying customers.",
      "Strategically placed, direct WhatsApp integration that routes high-intent buyers straight to your phone for immediate conversation.",
      "Automated lead capture forms that collect customer details and inquiries 24/7, even when you are away from the desk.",
      "Integrated mapping and clear contact sections so local clients can locate your physical business instantly.",
      "Lightning-fast mobile optimization so your page loads flawlessly on any connection, reducing customer drop-off.",
    ],
  },
  {
    id: "corporate",
    tier: "02",
    category: "Web design",
    title: "Corporate website",
    summary:
      "A premium, multi-page web presence designed to build instant trust with your clients and partners.",
    points: [
      "A premium, multi-page web presence designed to build instant trust with your clients and partners.",
      "Dedicated pages for your services, company history, and team to clearly showcase your full expertise.",
      "Built-in contact forms and lead routing so customer inquiries go straight to your email or WhatsApp.",
      "Fully optimized for mobile devices, ensuring it looks flawless on any phone, tablet, or computer.",
      "Fast loading speeds and basic SEO setup so local customers can easily find your business on Google.",
    ],
  },
  {
    id: "shop",
    tier: "03",
    category: "Online shop",
    title: "E-commerce store",
    summary:
      "A complete, fully functional online storefront where customers can browse your catalog, add items to their cart, and purchase.",
    points: [
      "A complete, fully functional online storefront where customers can seamlessly browse your catalog, add items to their cart, and purchase.",
      "A frictionless, one-page checkout process heavily optimized to prevent buyers from abandoning their carts at the last minute.",
      "Bank-grade secure payment gateways and localized shipping integrations tailored specifically for seamless retail operations.",
      "An intuitive backend dashboard allowing you to easily track inventory, update product pricing, and fulfill orders without needing any technical skills.",
      "An optional intelligent AI shopping assistant built-in to guide buyers, answer product questions, and manage order updates automatically.",
    ],
    addons: ["AI voice / chatbot add-on"],
  },
  {
    id: "app",
    tier: "04",
    category: "Custom software",
    title: "Custom mobile app",
    summary: "A custom mobile app built around your exact business needs.",
    points: [
      "A custom mobile app built around your exact business needs.",
      "Secure cloud backend with staff login roles and data protection.",
      "Your business data stays private and under your control.",
    ],
    architecture: ["Database layer", "User permissions", "Encryption"],
  },
  {
    id: "marketing",
    tier: "05",
    category: "Growth",
    title: "Social media & marketing",
    summary:
      "End-to-end management of your brand's social profiles to keep your business active and relevant.",
    points: [
      "End-to-end management of your brand's social profiles to keep your business active and relevant.",
      "High-quality content creation, including written posts, graphics, and short-form video strategies.",
      "Targeted paid ad campaigns designed to generate direct leads and sales, not just vanity likes.",
      "AI-enhanced media production to scale your content output without the massive traditional agency costs.",
      "Transparent monthly performance reports so you can clearly see the return on your marketing investment.",
    ],
  },
] as const;

export const pillars = [
  {
    title: "Websites & online stores",
    body: "Clean, fast websites and e-commerce stores with clear layouts, reliable uptime, and features your staff can use without training.",
  },
  {
    title: "AI that works for you",
    body: "Smart assistants connected to your WhatsApp and database. They answer questions, qualify leads, check stock, and log sales around the clock.",
  },
  {
    title: "One place for your business",
    body: "Custom dashboards that replace messy spreadsheets. See customers, sales, and team activity in one organized workspace.",
  },
] as const;

export const work = [
  {
    name: "istiqeme.net",
    kind: "Enterprise telemetry corporate hub",
    body: "Corporate platform for clear data tracking, clean information mapping, and direct executive communication.",
    href: "https://istiqeme.net/",
    uptime: "99.9%",
  },
  {
    name: "Credo",
    kind: "Interactive workflow business framework",
    body: "Multi-page corporate layout presenting complex operational workflows smoothly on any mobile screen.",
    href: "https://credo-lumina-framework.lovable.app/",
    uptime: "99.8%",
  },
  {
    name: "Pascale Agency",
    kind: "High-velocity digital media showcase",
    body: "Fast digital media showcase for high-end brand assets and portfolios without local network lag.",
    href: "https://pascaleagency.org/",
    uptime: "99.7%",
  },
] as const;

export const team = [
  {
    name: "Muhammad Ehsan Khan",
    role: "Managing Director & Technology Architect",
    initials: "EK",
    sections: [
      {
        label: "Background",
        body: "Full-stack developer, systems engineer, and AI automation architect.",
      },
      {
        label: "Focus area",
        body: "Lead architect who designs and tailors secure database structures, custom app setups, and automated cloud systems directly for local companies.",
      },
    ],
  },
  {
    name: "Hammad Naqvi",
    role: "Social Media Manager & Growth Specialist",
    initials: "HN",
    sections: [
      {
        label: "SMMA management",
        body: "Oversees complete social media marketing operations for both ISTIQEME Technologies and our client portfolios.",
      },
      {
        label: "Content & campaigns",
        body: "Handles high-impact content creation, regular posting schedules, and daily optimization of paid ad campaigns.",
      },
      {
        label: "Lead generation",
        body: "Drives outbound market acquisition, qualifies incoming buyer intent, and handles direct cold-calling pipelines to bring in high-value business leads.",
      },
    ],
  },
  {
    name: "Shayan Kashif",
    role: "UI/UX Designer & Co-Developer",
    initials: "SK",
    sections: [
      {
        label: "Interface design",
        body: "Conceptualizes and builds clean, modern, and high-speed visual layouts optimized for mobile responsiveness.",
      },
      {
        label: "Web development",
        body: "Works directly alongside the Lead Developer to write front-end code, integrate user interfaces, and deploy functional custom web frameworks.",
      },
    ],
  },
] as const;

export const testimonials = [
  {
    quote: "Some systems we install. Others we rely on.",
    name: "Ahmed R.",
    org: "Karachi Wholesale Group",
    title: "Retail Operations Director",
    date: "March 12, 2025",
  },
  {
    quote: "Growth should feel simple — not overwhelming.",
    name: "Sana K.",
    org: "Urban Commerce Collective",
    title: "Founder",
    date: "August 3, 2025",
  },
  {
    quote: "Security without the enterprise headache.",
    name: "Bilal M.",
    org: "Faisal District Traders",
    title: "Managing Partner",
    date: "January 4, 2026",
  },
] as const;

export const intakeSteps = [
  {
    id: "need",
    prompt: "What do you need?",
    options: [
      {
        id: "website",
        title: "Website / landing",
        hint: "A clear site that converts visitors",
      },
      {
        id: "ai",
        title: "AI & automation",
        hint: "WhatsApp agents, intake, ops helpers",
      },
      {
        id: "shop",
        title: "Shop / app",
        hint: "Orders, catalog, or a mobile layer",
      },
    ],
  },
  {
    id: "stage",
    prompt: "Where is the business today?",
    options: [
      { id: "starting", title: "Just starting", hint: "Idea or early ops" },
      {
        id: "running",
        title: "Running — needs better systems",
        hint: "Spreadsheets & manual work",
      },
      {
        id: "scaling",
        title: "Scaling fast",
        hint: "Volume is outgrowing tools",
      },
    ],
  },
  {
    id: "when",
    prompt: "When do you want to move?",
    options: [
      { id: "week", title: "This week", hint: "Ready to talk now" },
      { id: "month", title: "This month", hint: "Planning the next sprint" },
      {
        id: "explore",
        title: "Just exploring",
        hint: "No rush — sizing options",
      },
    ],
  },
] as const;

export const leadFlow = [
  {
    n: "01",
    title: "Customer activity",
    detail: "Form submitted at 2:00 AM",
  },
  {
    n: "02",
    title: "AI evaluation",
    detail: "Instant context & data enrichment",
  },
  {
    n: "03",
    title: "Immediate outreach",
    detail: "Personalized WhatsApp dispatched",
  },
  {
    n: "04",
    title: "Revenue conversion",
    detail: "Calendar consultation secured",
  },
] as const;

export const voiceCapabilities = [
  {
    title: "Answers 24/7",
    body: "Picks up when your team cannot — nights, weekends, busy hours.",
  },
  {
    title: "English + Urdu",
    body: "Speaks the language your customers actually use.",
  },
  {
    title: "Qualifies every lead",
    body: "Asks smart questions so you only chase serious inquiries.",
  },
  {
    title: "Never miss a call",
    body: "Turns missed rings into captured conversations and follow-ups.",
  },
  {
    title: "WhatsApp handoff",
    body: "Sends warm leads straight to your team with a clear summary.",
  },
  {
    title: "Your brand voice",
    body: "Trained on your tone, services, and rules — not a generic bot.",
  },
] as const;

export const dashboardRoles = [
  {
    id: "salesman",
    label: "Salesman",
    title: "The salesman layer",
    subtitle: "Field operations",
    body: "Front-line operators capture merchant activity, policy inquiries, and supply-chain touchpoints in the field — every action timestamped and routed upward without editable drift or data loss.",
  },
  {
    id: "manager",
    label: "Manager",
    title: "The manager layer",
    subtitle: "Operations command",
    body: "Managers see team activity, pending follow-ups, and conversion in one view — so nothing sits in a private chat or a forgotten spreadsheet.",
  },
  {
    id: "ceo",
    label: "CEO",
    title: "The CEO layer",
    subtitle: "Executive intelligence",
    body: "Leadership gets a clean picture of pipeline, revenue, and risk — without wading through operational noise.",
  },
] as const;

export const faqs = [
  {
    q: "What does ISTIQEME do?",
    a: "ISTIQEME Technologies is the software arm of the ISTIQEME group. We build websites, online stores, mobile apps, AI assistants, and marketing systems for growing businesses — scoped to how you actually work, not a one-size-fits-all template.",
  },
  {
    q: "Which service fits my business?",
    a: "If you need visitors to become customers, start with a landing page or corporate site. If you sell products, an e-commerce store. If your team lives in spreadsheets, a custom app or dashboard. If leads come in after hours, an AI receptionist on WhatsApp. Answer three questions in the intake and we’ll point you.",
  },
  {
    q: "How do I get a quote?",
    a: "Every project is quoted individually. Tap through the four-step intake, or message us on WhatsApp — we reply within one business day.",
  },
  {
    q: "I need a website that gets leads",
    a: "That’s our landing page & lead capture work: a fast single page, WhatsApp routing, forms that collect inquiries overnight, maps for local clients, and mobile performance so people don’t bounce.",
  },
  {
    q: "We want an online store",
    a: "We build complete storefronts with catalog, cart, one-page checkout, secure payments, local shipping, and a dashboard your staff can run. An AI shopping assistant is optional.",
  },
  {
    q: "Mujhe kaun sa package chahiye?",
    a: "Aap ke business ke hisaab se. Leads chahiye to landing page. Trust aur company story ke liye corporate website. Product bechna hai to e-commerce. Team ke liye app ya dashboard. Raat ko calls miss hoti hain to AI receptionist. WhatsApp par bataiye — hum recommend kar denge.",
  },
  {
    q: "Show me proof for my industry",
    a: "We build for retailers, wholesalers, agencies, and field sales teams in Karachi. See istiqeme.net, Credo, and Pascale Agency live — plus the Command Center dashboard and AI receptionist demos on this site. Message us with your industry and we’ll walk you through the closest match.",
  },
  {
    q: "What is the Command Center?",
    a: "istiqeme.live is a custom dashboard we built for field sales teams. Sales staff, managers, and leadership each see the information they need in one secure place — leads, performance, and a clear picture of the business.",
  },
  {
    q: "How does the AI receptionist work?",
    a: "It answers in English or Urdu, follows your script, qualifies the lead, and hands a warm summary to your team on WhatsApp. Same class of agent we deploy for businesses that lose calls after hours.",
  },
] as const;

export const marquee = [
  "Websites",
  "Online stores",
  "Mobile apps",
  "AI receptionists",
  "WhatsApp agents",
  "Dashboards",
  "Lead capture",
  "Social & ads",
] as const;
