import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SurfaceCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-card p-6 text-card-foreground transition duration-300 [@media(hover:hover)]:hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </div>
  );
}
