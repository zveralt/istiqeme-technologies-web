"use client";

import { type ReactNode } from "react";
import { useBoltReveal } from "@/hooks/useBoltReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const { ref, visible } = useBoltReveal();
  return (
    <div
      ref={ref}
      className={`reveal-bolt ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
