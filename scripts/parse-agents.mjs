import fs from "fs";
import path from "path";

const mdPath =
  process.argv[2] ||
  path.join(
    process.env.USERPROFILE || "",
    ".cursor/projects/c-Users-Lenovo-projects-Istiqeme-Technologies-website/uploads/agents-0.md",
  );

const raw = fs.readFileSync(mdPath, "utf8");
const lines = raw.split(/\r?\n/);

const industryMap = {
  "Igale ettevõtteleFor every business": "general",
  EhitusConstruction: "construction",
  "ArhitektuurArchitecture": "architecture",
  "KinnisvaraReal estate": "real-estate",
  "ÕigusLegal": "legal",
  "RaamatupidamineAccounting": "accounting",
  "E-kaubandusE-commerce": "e-commerce",
  "Majutus ja toitlustusHospitality": "hospitality",
  LogistikaLogistics: "logistics",
  "TootmineManufacturing": "manufacturing",
  "JahitšarterYacht charter": "yacht-charter",
  KindlustusInsurance: "insurance",
};

const deptMap = {
  "MüükSales": "sales",
  "Pakkumised ja hankedQuotes & tenders": "quotes-tenders",
  "Päringud ja tugiEnquiries & support": "enquiries-support",
  "TöökorraldusOperations": "operations",
  "Finants ja haldusFinance & admin": "finance-admin",
  AruandlusReporting: "reporting",
  "Nõuded ja tähtajadCompliance": "compliance",
  "Turundus ja sisuMarketing & content": "marketing-content",
  InimesedPeople: "people",
};

function englishTitle(text) {
  const m = text.match(/([A-Z][a-z]+(?: [A-Za-z&'/-]+)+)$/);
  return m ? m[1].trim() : text.trim();
}

function englishBody(text) {
  const markers = [
    "Your ", "Every ", "Anything ", "A form ", "Staff ", "It ", "Nothing ",
    "Applicants ", "Enquiries ", "Questions ", "Quantity ", "All ",
    "Rejections ", "Something ", "Watches ", "Reads ", "Follows ", "Reminds ",
    "One ", "Sales,", "Pulls ", "Sends ", "Each ", "Thirty ", "A reply ",
    "At the ", "Below ", "When ", "Nobody ", "Positive ", "Weekly, ",
    "luupagency", "Our own ",
  ];
  let best = -1;
  for (const marker of markers) {
    const idx = text.indexOf(marker);
    if (idx >= 0 && (best < 0 || idx < best)) best = idx;
  }
  if (best >= 0) return text.slice(best).replace(/^Reads/, "").replace(/^Does/, "").trim();
  const cap = text.search(/[a-zäöüõ]([A-Z])/);
  if (cap >= 0) return text.slice(cap + 1).trim();
  return text
    .replace(/^Reads/, "")
    .replace(/^Does/, "")
    .replace(/.*Comes to you/i, "")
    .trim();
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

let industry = "general";
const agents = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith("## ")) {
    const key = line.slice(3).trim();
    if (industryMap[key]) industry = industryMap[key];
    continue;
  }
  if (!line.startsWith("### ")) continue;

  const name = englishTitle(line.slice(4).trim());
  const tagline = englishBody(lines[i + 1] || "");
  let deptLine = "";
  let j = i + 2;
  for (; j < i + 6 && j < lines.length; j++) {
    const l = lines[j].trim();
    if (deptMap[l]) {
      deptLine = l;
      break;
    }
  }
  const department = deptMap[deptLine] || "operations";

  let reads = "";
  let does = "";
  let comesToYou = "";
  let status = "ready";
  let proof;

  for (j = i + 2; j < i + 22 && j < lines.length; j++) {
    const l = lines[j];
    if (l.startsWith("### ") || l.startsWith("## ")) break;
    if (l.includes("LoebReads") || (l.startsWith("*") && l.includes("Reads"))) {
      reads = englishBody(l);
    }
    if (l.includes("TeebDoes") || (l.startsWith("*") && l.includes("Does"))) {
      does = englishBody(l);
    }
    if (l.includes("Comes to you") || l.includes("Tuleb sinuni")) {
      comesToYou = englishBody(l.replace(/.*Comes to you/i, "Comes to you "));
    }
    if (l.includes("Running now")) status = "running";
    if (
      (l.includes("Our own") || l.includes("luupagency")) &&
      !l.includes("Ask about")
    ) {
      proof = englishBody(l).replace(/Ask about this.*$/i, "").trim();
    }
  }

  if (!reads || !does || !comesToYou) continue;

  const slug = slugify(name);
  agents.push({
    slug: `${industry}-${slug}`.slice(0, 96),
    name,
    tagline,
    industry,
    department,
    reads,
    does,
    comesToYou,
    status,
    ...(proof ? { proof } : {}),
  });
}

const educationAgents = [
  {
    slug: "education-admissions-enquiry-agent",
    name: "Admissions Enquiry Agent",
    tagline:
      "Answers parent questions on WhatsApp in English or Urdu, qualifies the intake, and books a campus visit.",
    industry: "education",
    department: "enquiries-support",
    reads: "Your website, fee sheet, campus list, admissions calendar, CRM",
    does:
      "Replies within minutes on WhatsApp, asks grade and campus preference, sends the right brochure, and offers visit slots from your calendar.",
    comesToYou:
      "Discount requests, sibling concessions, or complaints are routed to you with full thread history.",
    status: "running",
    proof: "Built for Karachi schools and coaching institutes",
  },
  {
    slug: "education-fee-reminder-agent",
    name: "Fee Reminder Agent",
    tagline:
      "Polite fee reminders before due date, firmer follow-ups after, with payment matched from your ledger.",
    industry: "education",
    department: "finance-admin",
    reads: "Fee ledger, WhatsApp, bank feed, student records",
    does:
      "Sends scheduled reminders in the parent's language, logs replies, and marks paid students so nobody is chased twice.",
    comesToYou:
      "Disputes, write-offs, or partial payments pause for your approval with full payment history.",
    status: "ready",
  },
];

agents.push(...educationAgents);

const outPath = path.join(process.cwd(), "src/lib/ai-agents/catalog.data.json");
fs.writeFileSync(outPath, JSON.stringify(agents, null, 2));
console.log(`Wrote ${agents.length} agents`);
