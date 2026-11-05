"use client";

import Link from "next/link";
import { useConsent } from "@/components/legal/ConsentProvider";
import { CookiePreferencesPanel } from "@/components/legal/CookiePreferencesPanel";

export function CookieConsentBanner() {
  const { showBanner, acceptAll, rejectNonEssential, setShowPreferences } = useConsent();

  if (!showBanner) return null;

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4"
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-desc"
      >
        <div className="itq-cookie-banner mx-auto max-w-3xl rounded-2xl border border-ink-200/80 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-[#0c0d10]">
          <p id="cookie-banner-title" className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-500">
            Privacy & cookies
          </p>
          <p id="cookie-banner-desc" className="mt-2 text-[14px] leading-relaxed text-ink-600 dark:text-white/65">
            We use strictly necessary storage for theme and security. With your permission, we also use Vercel Analytics
            and Speed Insights to understand aggregated traffic.{" "}
            <Link href="/legal/cookie-policy" className="text-accent-500 underline-offset-2 hover:underline">
              Cookie Policy
            </Link>
            {" · "}
            <Link href="/legal/privacy-policy" className="text-accent-500 underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <button type="button" onClick={acceptAll} className="itq-cookie-banner__primary">
              Accept all
            </button>
            <button type="button" onClick={rejectNonEssential} className="itq-cookie-banner__secondary">
              Reject non-essential
            </button>
            <button type="button" onClick={() => setShowPreferences(true)} className="itq-cookie-banner__ghost">
              Manage preferences
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function CookiePreferencesModal() {
  const { showPreferences, setShowPreferences } = useConsent();
  if (!showPreferences) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        aria-label="Close preferences"
        onClick={() => setShowPreferences(false)}
      />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-ink-200/80 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0c0d10]">
        <CookiePreferencesPanel onClose={() => setShowPreferences(false)} />
      </div>
    </div>
  );
}
