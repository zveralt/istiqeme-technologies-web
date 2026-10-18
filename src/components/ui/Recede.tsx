"use client";

import type { ReactNode, RefObject } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useFinePointer } from "@/lib/use-fine-pointer";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked recede: as the parent section's bottom edge travels from the
 * bottom of the viewport to the top, content sinks, dims, and (on fine pointers)
 * softens. Only transform / opacity / filter are animated.
 *
 * Reduced-motion users are handled in CSS (`.itq-recede` identity override).
 */
export function Recede({
  target,
  children,
  className,
  distance = 72,
  minOpacity = 0.35,
}: {
  target: RefObject<HTMLElement | null>;
  children: ReactNode;
  className?: string;
  distance?: number;
  minOpacity?: number;
}) {
  const fine = useFinePointer();

  const { scrollYProgress } = useScroll({
    target: target as RefObject<HTMLElement>,
    offset: ["end end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, minOpacity]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(3px)"]);

  return (
    <motion.div
      className={cn("itq-recede", className)}
      style={{ y, opacity, filter: fine ? blur : undefined }}
    >
      {children}
    </motion.div>
  );
}
