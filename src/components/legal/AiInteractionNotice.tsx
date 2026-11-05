import Link from "next/link";

export function AiInteractionNotice({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-xl border border-accent-500/25 bg-accent-500/[0.06] px-4 py-3 text-[13px] leading-relaxed text-ink-600 dark:border-accent-400/30 dark:bg-accent-400/[0.08] dark:text-white/70 ${className}`}
      role="note"
    >
      <strong className="font-medium text-ink-900 dark:text-white/90">Automated assistant — not a human.</strong>{" "}
      Replies on this page are generated locally from FAQ content or pre-written demos, not live AI APIs. They may be
      incomplete or outdated and are not professional advice.{" "}
      <Link href="/legal/ai-disclosure" className="text-accent-500 underline-offset-2 hover:underline">
        AI disclosure
      </Link>
      {" · "}
      <Link href="/contact" className="text-accent-500 underline-offset-2 hover:underline">
        Contact our team
      </Link>
    </div>
  );
}
