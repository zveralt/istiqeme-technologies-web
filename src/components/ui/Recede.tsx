"use client";

import type { ReactNode, RefObject } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked recede: as the parent section's bottom edge travels from the
 * bottom of the viewport to the top, its content sinks slightly and dims so
 * the next sheet reads as riding over it. Transform + opacity only.
 */
export function Recede({
  target,
  children,
  className,
  distance = 56,
  minOpacity = 0.4,
}: {
  target: RefObject<HTMLElement | null>;
  children: ReactNode;
  className?: string;
  distance?: number;
  minOpacity?: number;
}) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: target as RefObject<HTMLElement>,
    offset: ["end end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, minOpacity]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={cn("itq-recede", className)} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}
