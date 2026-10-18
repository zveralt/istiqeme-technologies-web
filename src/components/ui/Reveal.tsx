"use client";

import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { useFinePointer } from "@/lib/use-fine-pointer";

const EASE = [0.22, 1, 0.36, 1] as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
} & Omit<HTMLMotionProps<"div">, "children" | "variants" | "initial" | "whileInView">;

export function Reveal({ children, className, delay = 0, as = "div", ...rest }: RevealProps) {
  const fine = useFinePointer();
  const Cmp = motion[as] as typeof motion.div;
  return (
    <Cmp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px", amount: 0.15 }}
      variants={{
        hidden: { opacity: fine ? 0 : 1, y: fine ? 20 : 0 },
        show: {
          opacity: 1,
          y: 0,
          transition: fine
            ? { duration: 0.55, delay, ease: EASE }
            : { duration: 0 },
        },
      }}
      {...rest}
    >
      {children}
    </Cmp>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-[11px] uppercase tracking-[0.28em] text-muted ${className}`}>{children}</p>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Cmp = motion[as] as typeof motion.div;
  return (
    <Cmp className={className} variants={itemVariants}>
      {children}
    </Cmp>
  );
}
