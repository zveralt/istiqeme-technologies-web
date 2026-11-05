import type { Metadata } from "next";
import { ServiceLanding } from "@/components/seo/ServiceLanding";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata("/services/ecommerce-development");

export default function EcommerceDevelopmentPage() {
  return <ServiceLanding slug="ecommerce-development" />;
}
