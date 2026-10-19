"use client";

import { motion, useReducedMotion, type Variants, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

/* One motion language for scroll reveals: short rise, composed ease-out.
   Content is always readable before JS runs — the hidden state is only
   applied on the client, and reduced-motion users get the final state. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const REVEAL_Y = 18;
export const REVEAL_DURATION = 0.6;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: REVEAL_Y },
  show: { opacity: 1, y: 0, transition: { duration: REVEAL_DURATION, ease: EASE_OUT } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in ms. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
} & Omit<HTMLMotionProps<"div">, "children" | "variants" | "initial" | "whileInView">;

export function Reveal({ children, className, delay = 0, as = "div", ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  const Cmp = motion[as] as typeof motion.div;
  const off = reduce === true;
  return (
    <Cmp
      className={className}
      initial={off ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px", amount: 0.12 }}
      variants={{
        hidden: { opacity: 0, y: REVEAL_Y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: REVEAL_DURATION, delay: delay / 1000, ease: EASE_OUT },
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
  return <p className={`itq-eyebrow ${className}`}>{children}</p>;
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
