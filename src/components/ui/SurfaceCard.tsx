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
        "itq-surface itq-surface-lift rounded-2xl border border-line bg-card p-6 text-card-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}
