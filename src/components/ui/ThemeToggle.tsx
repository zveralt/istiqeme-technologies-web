"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "itq-circle h-10 w-10 shrink-0 !text-current",
        className,
      )}
      style={{ borderColor: "var(--hdr-line, var(--color-line))" }}
    >
      <Sun className="h-4 w-4 dark:hidden" strokeWidth={2.25} />
      <Moon className="hidden h-4 w-4 dark:block" strokeWidth={2.25} />
    </button>
  );
}
