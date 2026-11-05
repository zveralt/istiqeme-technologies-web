import type { Metadata } from "next";
import { ServiceLanding } from "@/components/seo/ServiceLanding";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata("/services/mobile-app-development");

export default function MobileAppDevelopmentPage() {
  return <ServiceLanding slug="mobile-app-development" />;
}
