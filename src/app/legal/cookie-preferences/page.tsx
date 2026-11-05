import type { Metadata } from "next";
import { CookiePreferencesPanel } from "@/components/legal/CookiePreferencesPanel";

export const metadata: Metadata = {
  title: "Cookie Preferences",
  description: "Manage cookie and analytics preferences for the ISTIQEME Technologies website.",
  robots: { index: false, follow: true },
};

export default function CookiePreferencesPage() {
  return (
    <div className="itq-container py-28 md:py-32">
      <div className="mx-auto max-w-lg">
        <CookiePreferencesPanel />
      </div>
    </div>
  );
}
