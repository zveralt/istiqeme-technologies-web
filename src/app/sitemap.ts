import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/seo/services";
import { SITE_URL } from "@/lib/seo/site";

const staticRoutes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/work", changeFrequency: "weekly", priority: 0.85 },
  { path: "/ai", changeFrequency: "weekly", priority: 0.85 },
  { path: "/ai/products", changeFrequency: "monthly", priority: 0.7 },
  { path: "/ai/agents", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/start", changeFrequency: "monthly", priority: 0.65 },
  { path: "/legal", changeFrequency: "monthly", priority: 0.4 },
  { path: "/legal/privacy-policy", changeFrequency: "monthly", priority: 0.35 },
  { path: "/legal/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal/ai-disclosure", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const services = servicePages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.88,
  }));

  return [...core, ...services];
}
