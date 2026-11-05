import type { Metadata } from "next";
import { ServiceLanding } from "@/components/seo/ServiceLanding";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata("/services/custom-software-development");

export default function CustomSoftwareDevelopmentPage() {
  return <ServiceLanding slug="custom-software-development" />;
}
