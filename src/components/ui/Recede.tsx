"use client";

import type { ReactNode, RefObject } from "react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

function useScrollRecedeEnabled() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduce) {
      setEnabled(false);
      return;
    }
    const mq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 768px)",
    );
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  return enabled;
}

/**
 * Scroll-linked recede: as the parent section's bottom edge travels from the
 * bottom of the viewport to the top, its content sinks slightly and dims so
 * the next sheet reads as riding over it. Transform + opacity only.
 * Disabled on touch / narrow viewports to avoid jank and stuck transforms.
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
  const enabled = useScrollRecedeEnabled();
  const { scrollYProgress } = useScroll({
    target: target as RefObject<HTMLElement>,
    offset: ["end end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, minOpacity]);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={cn("itq-recede", className)} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}
