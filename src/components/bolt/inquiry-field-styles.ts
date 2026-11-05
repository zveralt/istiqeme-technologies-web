import { cn } from "@/lib/utils";

export function inquiryInputClass(hasError: boolean, extra?: string): string {
  return cn(
    "w-full rounded-xl border bg-ink-50 dark:bg-ink-800/50 px-4 py-2.5 text-sm text-ink-900 dark:text-ink-100 placeholder:text-ink-400 dark:placeholder:text-ink-600 transition-colors focus:outline-none focus:ring-2",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
      : "border-ink-200 dark:border-ink-700 focus:border-accent-500 focus:ring-accent-500/20",
    extra,
  );
}
