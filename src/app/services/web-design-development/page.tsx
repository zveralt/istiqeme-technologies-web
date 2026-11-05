import type { Metadata } from "next";
import { ServiceLanding } from "@/components/seo/ServiceLanding";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata("/services/web-design-development");

export default function WebDesignDevelopmentPage() {
  return <ServiceLanding slug="web-design-development" />;
}
