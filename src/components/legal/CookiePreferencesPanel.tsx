"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useConsent } from "@/components/legal/ConsentProvider";

export function CookiePreferencesPanel({ onClose }: { onClose?: () => void }) {
  const { consent, savePreferences, acceptAll, rejectNonEssential } = useConsent();
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    setAnalytics(consent?.analytics ?? false);
  }, [consent]);

  return (
    <div>
      <h2 className="font-display text-2xl tracking-tight text-ink-900 dark:text-[#f3f4f6]">Cookie preferences</h2>
      <p className="mt-2 text-[14px] leading-relaxed text-ink-500 dark:text-white/55">
        Control optional analytics. Essential storage (theme, consent record, login sessions) always runs so the site
        works.
      </p>

      <div className="mt-6 space-y-4">
        <div className="rounded-xl border border-ink-200/80 p-4 dark:border-white/10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[14px] font-medium text-ink-900 dark:text-white/90">Strictly necessary</p>
              <p className="mt-1 text-[13px] text-ink-500 dark:text-white/50">
                Theme, consent memory, security, and authentication cookies.
              </p>
            </div>
            <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-ink-400">Always on</span>
          </div>
        </div>

        <div className="rounded-xl border border-ink-200/80 p-4 dark:border-white/10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[14px] font-medium text-ink-900 dark:text-white/90">Analytics & performance</p>
              <p className="mt-1 text-[13px] text-ink-500 dark:text-white/50">
                Vercel Web Analytics and Speed Insights — aggregated usage only.
              </p>
            </div>
            <label className="flex shrink-0 items-center gap-2 text-[13px]">
              <span className="sr-only">Enable analytics</span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4 rounded border-line accent-accent-500"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          className="itq-cookie-banner__primary"
          onClick={() => savePreferences({ essential: true, analytics })}
        >
          Save preferences
        </button>
        <button type="button" className="itq-cookie-banner__secondary" onClick={acceptAll}>
          Accept all
        </button>
        <button type="button" className="itq-cookie-banner__ghost" onClick={rejectNonEssential}>
          Reject non-essential
        </button>
      </div>

      <p className="mt-4 text-[12px] text-ink-400 dark:text-white/40">
        <Link href="/legal/cookie-policy" className="underline-offset-2 hover:underline">
          Read the Cookie Policy
        </Link>
        {onClose ? (
          <>
            {" · "}
            <button type="button" onClick={onClose} className="underline-offset-2 hover:underline">
              Close
            </button>
          </>
        ) : null}
      </p>
    </div>
  );
}
