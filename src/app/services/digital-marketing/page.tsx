import type { Metadata } from "next";
import { ServiceLanding } from "@/components/seo/ServiceLanding";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata("/services/digital-marketing");

export default function DigitalMarketingPage() {
  return <ServiceLanding slug="digital-marketing" />;
}
