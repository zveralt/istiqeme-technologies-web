export const site = {
  name: "ISTIQEME Technologies",
  shortName: "ISTIQEME",
  tagline: "Premium digital engineering for growing businesses in Karachi and beyond.",
  since: 2026,
  city: "Karachi",
  phones: [
    { label: "+92 332 3407131", href: "tel:+923323407131" },
    { label: "+92 21 37124242", href: "tel:+922137124242" },
  ],
  emails: [
    { label: "tech@istiqeme.net", href: "mailto:tech@istiqeme.net" },
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
  { href: "/work", label: "Work", menu: "work" },
  { href: "/services", label: "Services", menu: "services" },
  { href: "/ai", label: "AI", menu: "ai" },
  { href: "/#process", label: "Problems" },
] as const;

export const aiMenu = [
  { href: "/ai", title: "Hub", line: "AI narrative, process, and proof." },
  { href: "/ai/products", title: "Products", line: "Eight product lines from agents to content." },
  { href: "/ai/agents", title: "Agent library", line: "Filter by industry and department." },
  { href: "/start", title: "Assessment", line: "Four-step intake — reply on WhatsApp." },
] as const;

export const serviceMenu = [
  {
    id: "website-development",
    title: "Website development",
    problem: "Visitors arrive and leave without becoming customers.",
    solution:
      "A high-speed landing page or corporate site that captures attention, routes buyers to WhatsApp, and builds trust.",
    source: "landing",
  },
  {
    id: "custom-app-frameworks",
    title: "Custom app frameworks",
    problem: "Your team needs a mobile layer built around how you actually work.",
    solution:
      "A custom mobile app with a secure cloud backend, staff roles, and data that stays under your control.",
    source: "app",
  },
  {
    id: "software-development",
    title: "Software development",
    problem: "Off-the-shelf tools do not match daily operations.",
    solution:
      "Custom software scoped to your business — not a one-size-fits-all template.",
    source: "app",
  },
  {
    id: "social-media-marketing",
    title: "Social media marketing",
    problem: "The brand goes quiet and customers forget you.",
    solution:
      "End-to-end management of social profiles, content, and a posting rhythm that keeps the business active.",
    source: "marketing",
  },
  {
    id: "brand-awareness",
    title: "Brand awareness",
    problem: "People do not yet recognize the business when they are ready to buy.",
    solution:
      "Written posts, graphics, and short-form video that present the brand clearly and consistently.",
    source: "marketing",
  },
  {
    id: "digital-marketing",
    title: "Digital marketing",
    problem: "Likes do not turn into leads or sales.",
    solution:
      "Targeted paid campaigns and monthly reports so you can see the return, not only the reach.",
    source: "marketing",
  },
  {
    id: "ai-voice-agents",
    title: "AI voice agents",
    problem: "Calls and inquiries arrive when the team cannot pick up.",
    solution:
      "An AI receptionist in English or Urdu that qualifies the lead and hands a summary to WhatsApp.",
    source: "shop",
  },
  {
    id: "ai-chatbot-systems",
    title: "AI chatbot systems",
    problem: "Product and order questions sit unanswered after hours.",
    solution:
      "A chatbot on WhatsApp that answers questions, checks context, and logs the conversation for your team.",
    source: "shop",
  },
  {
    id: "crm-systems",
    title: "CRM systems",
    problem: "Follow-ups slip through chats and spreadsheets.",
    solution:
      "One workspace for customers, sales, and team activity so nothing sits in a private chat.",
    source: "app",
  },
  {
    id: "erp-systems",
    title: "ERP systems",
    problem: "Orders, staff, and sales live in separate tools.",
    solution:
      "An operational workspace where orders, staff activity, and sales sit in one system your team can run every day.",
    source: "app",
  },
  {
    id: "custom-ai-agents",
    title: "Custom AI agents",
    problem: "Repetitive questions and lead sorting eat the day.",
    solution:
      "Agents trained on your services and rules — they qualify leads, answer in simple words, and continue on WhatsApp.",
    source: "landing",
  },
] as const;

export const workMenu = [
  {
    id: "websites",
    title: "Websites",
    problem: "A business has no clear site that converts visitors.",
    solution:
      "Landing pages and corporate sites built for speed, clarity, and trust — including istiqeme.net, Credo, and Pascale Agency.",
  },
  {
    id: "crm-systems",
    title: "CRM systems",
    problem: "Manual order tracking lets sales follow-ups slip through.",
    solution:
      "A clean dashboard staff actually use every day, so customers and follow-ups stay in one place.",
  },
  {
    id: "chatbots",
    title: "Chatbots",
    problem: "Inquiries arrive at night and nobody is at the desk.",
    solution:
      "WhatsApp chatbots that answer questions, capture the lead, and route a summary to the team.",
  },
  {
    id: "ai-agents",
    title: "AI agents",
    problem: "Staff repeat the same answers instead of closing sales.",
    solution:
      "Custom agents connected to your database that qualify leads, check stock, and log sales around the clock.",
  },
  {
    id: "ai-voice-agents",
    title: "AI voice agents",
    problem: "Missed calls become missed customers.",
    solution:
      "A voice receptionist that picks up in English or Urdu, asks the right questions, and hands the lead to WhatsApp.",
  },
  {
    id: "dashboards",
    title: "Dashboards",
    problem: "Leadership cannot see sales without wading through spreadsheets.",
    solution:
      "The Command Center: salesman, manager, and CEO each see the picture they need in one secure place.",
  },
] as const;

export const problems = [
  {
    problem: "Visitors never become customers.",
    solution: "Landing pages and corporate websites with WhatsApp routing and overnight lead capture.",
    href: "/services#website-development",
  },
  {
    problem: "After-hours inquiries go unanswered.",
    solution: "AI voice agents and chatbots that qualify the lead and continue on WhatsApp.",
    href: "/services#ai-voice-agents",
  },
  {
    problem: "Orders live in spreadsheets and private chats.",
    solution: "CRM and dashboard systems so staff, managers, and leadership share one workspace.",
    href: "/work#crm-systems",
  },
  {
    problem: "Follow-ups slip through the cracks.",
    solution: "A clean operational view of customers, sales, and team activity — the same reliability we bring from larger networks to local businesses.",
    href: "/work#dashboards",
  },
] as const;

export const services = [
  {
    id: "landing",
    tier: "01",
    category: "Web design",
    title: "Landing page & lead capture",
    problem: "Casual visitors leave without becoming customers.",
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
    problem: "Clients and partners cannot see a clear, trustworthy presence.",
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
    problem: "Customers cannot browse, cart, and buy in one place.",
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
    problem: "Spreadsheets and generic apps do not match how the team works.",
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
    problem: "The brand goes quiet, and attention never turns into leads.",
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
    plate: "Clear data, direct to leadership",
    problem: "Leadership needs a clear view of data and a direct line to the business.",
    kind: "Enterprise telemetry corporate hub",
    body: "Corporate platform for clear data tracking, clean information mapping, and direct executive communication.",
    image: "/work/istiqeme-net.jpg",
    href: "https://istiqeme.net/",
    uptime: "99.9%",
  },
  {
    name: "Credo",
    plate: "Workflows that hold on a phone",
    problem: "Complex workflows fall apart on a phone screen.",
    kind: "Interactive workflow business framework",
    body: "Multi-page corporate layout presenting complex operational workflows smoothly on any mobile screen.",
    image: "/work/credo.png",
    href: "https://credo-lumina-framework.lovable.app/",
    uptime: "99.8%",
  },
  {
    name: "Pascale Agency",
    plate: "High-end media without the lag",
    problem: "High-end work needs a fast showcase that does not lag.",
    kind: "High-velocity digital media showcase",
    body: "Fast digital media showcase for high-end brand assets and portfolios without local network lag.",
    image: "/work/pascale.jpg",
    href: "https://pascaleagency.org/",
    uptime: "99.7%",
  },
  {
    name: "SKH Solutions",
    plate: "Subjects, practice, five campuses",
    problem: "Students need one institute for subjects, practice, and a campus close to home.",
    kind: "O and A Level coaching",
    body: "O and A Level coaching across five Karachi campuses, with subject specialists and weekly written practice.",
    image: "/work/skh.jpg",
    href: "https://www.skh.com.pk/",
    uptime: "99.8%",
  },
  {
    name: "Veritas Schooling System",
    plate: "Early years through A Levels",
    problem: "Families want one school journey from early years through A Levels.",
    kind: "Karachi school",
    body: "A Karachi school from Early Years to A Levels, with Gulshan and Jauhar campuses and admissions on WhatsApp.",
    image: "/work/veritas.jpg",
    href: "https://www.veritas.edu.pk/",
    uptime: "99.8%",
  },
  {
    name: "OFFDUTY",
    plate: "Vol. 002 Soundwave",
    problem: "The drop needs a homepage that shows the product, not a catalogue wall.",
    kind: "Apparel",
    body: "OFFDUTY Vol. 002 Soundwave — oversized tees and mark essentials.",
    image: "/work/offduty.png",
    href: "",
    uptime: "",
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
    id: "ahmed",
    headline: "Systems we actually rely on",
    summary:
      "Wholesale orders, night leads, and manager roll-ups finally live in one workspace instead of six WhatsApp threads.",
    quote: "Some systems we install. Others we rely on.",
    detail:
      "We replaced spreadsheet trackers with a single dashboard. Field staff log visits on mobile; leadership sees the same numbers by morning.",
    rating: 5,
    name: "Ahmed R.",
    org: "Karachi Wholesale Group",
    title: "Retail Operations Director",
    date: "March 12, 2025",
  },
  {
    id: "sana",
    headline: "Growth without the chaos",
    summary:
      "A new storefront and WhatsApp intake went live in weeks — our team answers from one queue, not three phones.",
    quote: "Growth should feel simple — not overwhelming.",
    detail:
      "ISTIQEME scoped the shop, payment handoff, and after-hours bot together. Conversion improved because nothing waits until opening hours.",
    rating: 5,
    name: "Sana K.",
    org: "Urban Commerce Collective",
    title: "Founder",
    date: "August 3, 2025",
  },
  {
    id: "bilal",
    headline: "Security that staff will use",
    summary:
      "Role-based access and audit trails without the enterprise software bill or month-long training.",
    quote: "Security without the enterprise headache.",
    detail:
      "Sales, warehouse, and finance each see what they need. We passed our distributor audit with clear logs — no more shared passwords.",
    rating: 4.9,
    name: "Bilal M.",
    org: "Faisal District Traders",
    title: "Managing Partner",
    date: "January 4, 2026",
  },
  {
    id: "hira",
    headline: "After-hours leads answered",
    summary:
      "Medical supply inquiries at 11 PM now get a qualified WhatsApp handoff before our desk opens.",
    quote: "Patients' families message at odd hours. We still respond like we were awake.",
    detail:
      "The voice and chat assistant knows our stock rules and routes urgent cases to the on-call manager with a short summary.",
    rating: 5,
    name: "Hira N.",
    org: "MedEquip Karachi",
    title: "Operations Lead",
    date: "November 18, 2025",
  },
  {
    id: "omar",
    headline: "Menu clarity that converts",
    summary:
      "Corporate catering quotes used to stall in email. Now prospects pick a package and book a call in one flow.",
    quote: "Our site finally explains what we sell to offices — not just what we post on Instagram.",
    detail:
      "Photography, bilingual copy, and a simple CRM mean we know which company opened the menu and who to call back.",
    rating: 4.8,
    name: "Omar T.",
    org: "Clifton Fine Foods",
    title: "Head of B2B Sales",
    date: "June 9, 2025",
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
    a: "ISTIQEME Technologies builds websites, online stores, mobile apps, AI assistants, and marketing systems for growing businesses — scoped to how you actually work, not a one-size-fits-all template.",
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
