import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-5 py-20 md:px-8 md:py-24", className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
