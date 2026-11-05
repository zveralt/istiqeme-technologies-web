"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useConsent } from "@/components/legal/ConsentProvider";

/** Loads Vercel analytics only after explicit consent. */
export function AnalyticsGate() {
  const { ready, analyticsAllowed } = useConsent();
  if (!ready || !analyticsAllowed) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
