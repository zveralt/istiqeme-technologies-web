import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Code2,
  Globe,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  PenTool,
  Search,
  Smartphone,
  Store,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { aiProcess } from "@/lib/ai-automation";
import { marquee, services, site, testimonials, waLink, work } from "@/lib/site";

const serviceIcons: Record<string, LucideIcon> = {
  landing: Globe,
  corporate: PenTool,
  shop: Store,
  app: Smartphone,
  marketing: Megaphone,
};

export type BoltService = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export const boltServices: BoltService[] = services.map((s) => ({
  id: s.id,
  number: s.tier,
  title: s.title,
  category: s.category,
  description: s.summary,
  icon: serviceIcons[s.id] ?? Globe,
  href: `/services#${s.id}`,
}));

const scrollByHost: Record<string, string> = {
  "istiqeme.net": "-420px",
  "credo-lumina-framework.lovable.app": "-360px",
  "pascaleagency.org": "-360px",
  "www.skh.com.pk": "-390px",
  "skh.com.pk": "-390px",
  "www.veritas.edu.pk": "-440px",
  "veritas.edu.pk": "-440px",
};

export type ClientSite = {
  id: string;
  number: string;
  title: string;
  domain: string;
  description: string;
  category: string;
  url: string;
  scrollDistance: string;
};

function siteHost(href: string) {
  try {
    return new URL(href).host.replace(/^www\./, "");
  } catch {
    return href;
  }
}

export const clientSites: ClientSite[] = work.map((w, i) => {
  const host = siteHost(w.href);
  return {
    id: w.name.toLowerCase().replace(/\s+/g, "-"),
    number: String(i + 1).padStart(2, "0"),
    title: w.name,
    domain: host,
    description: w.body,
    category: w.kind,
    url: w.href,
    scrollDistance: scrollByHost[host] ?? scrollByHost[`www.${host}`] ?? "-380px",
  };
});

export const workflowNodes = [
  { id: "web", label: "Website / App", sublabel: "Visitor arrives", icon: Globe },
  { id: "ai", label: "AI Assistant", sublabel: "Qualifies & responds", icon: Bot },
  { id: "crm", label: "CRM Dashboard", sublabel: "Logs the lead", icon: LayoutDashboard },
  { id: "whatsapp", label: "WhatsApp Agent", sublabel: "Routes to your team", icon: MessageSquare },
] as const;

const processIcons = [Search, Code2, Workflow, TrendingUp] as const;

export const processSteps = aiProcess.map((step, i) => ({
  number: step.step,
  title: step.title,
  description: step.body,
  icon: processIcons[i] ?? Search,
}));

export const marqueeItems = [...marquee];

export const heroStats = [
  { label: "Based in", value: site.city },
  { label: "Building since", value: String(site.since) },
  { label: "We speak", value: "English · اردو" },
  { label: "We reply", value: "Within one business day" },
];

export const aiDemoSteps = [
  { number: "01", title: "Customer activity", detail: "Form submitted at 2:00 AM" },
  { number: "02", title: "AI evaluation", detail: "Instant context & data enrichment" },
  { number: "03", title: "Immediate outreach", detail: "Personalized WhatsApp dispatched" },
  { number: "04", title: "Revenue conversion", detail: "Calendar consultation secured" },
];

export const contactInfo = {
  whatsapp: waLink(site.whatsapp.discussText),
  whatsappDisplay: site.phones[0]?.label ?? "+92 332 3407131",
  email: site.emails[0]?.label ?? "tech@istiqeme.net",
};

export const boltTestimonials = testimonials.map((t) => ({
  name: t.name,
  company: t.org,
  quote: t.headline,
  detail: t.summary,
}));

export const serviceOptions = services.map((s) => s.title);
