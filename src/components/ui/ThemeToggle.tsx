"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeProvider";
import { cn } from "@/lib/utils";

/**
 * Dedicated theme control — avoids .itq-circle hover (pill-arrow translate / forest fill)
 * which fought header color tokens and felt broken on this control.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "itq-theme-toggle inline-grid h-10 w-10 shrink-0 place-items-center rounded-lg border",
        "border-[color:var(--hdr-line,var(--color-line))] bg-transparent",
        "text-[color:var(--hdr-fg,var(--color-forest))] dark:text-[color:var(--hdr-fg,var(--color-ember-bright))]",
        "transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:border-accent-500/50 hover:bg-accent-500/[0.08] hover:text-accent-600",
        "dark:hover:border-accent-400/45 dark:hover:bg-accent-400/[0.12] dark:hover:text-accent-300",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember)]",
        "active:scale-[0.97] motion-reduce:transition-colors motion-reduce:active:scale-100",
        className,
      )}
    >
      <Sun className="h-4 w-4 dark:hidden" strokeWidth={2.25} aria-hidden />
      <Moon className="hidden h-4 w-4 dark:block" strokeWidth={2.25} aria-hidden />
    </button>
  );
}
