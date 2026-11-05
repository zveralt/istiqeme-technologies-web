import type { Metadata } from "next";
import { ServiceLanding } from "@/components/seo/ServiceLanding";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata("/services/ai-solutions");

export default function AiSolutionsPage() {
  return <ServiceLanding slug="ai-solutions" />;
}
