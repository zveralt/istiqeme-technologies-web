"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type SpringOptions,
} from "framer-motion";
import { cn } from "@/lib/utils";

const SPRING: SpringOptions = {
  damping: 28,
  stiffness: 120,
  mass: 1.6,
};

export type TiltParallaxProps = {
  children: ReactNode;
  className?: string;
  enabled?: boolean;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  perspective?: number;
};

/** Pointer-driven 3D tilt for the active coverflow card (inside outer rotateY). */
export function TiltParallax({
  children,
  className,
  enabled = true,
  rotateAmplitude = 10,
  scaleOnHover = 1.03,
  perspective = 900,
}: TiltParallaxProps) {
  const reduce = useReducedMotion() ?? false;
  const live = enabled && !reduce;
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), SPRING);
  const rotateY = useSpring(useMotionValue(0), SPRING);
  const scale = useSpring(1, SPRING);
  const fineRef = useRef(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => {
      fineRef.current = mq.matches;
      if (!mq.matches) {
        scale.set(1);
        rotateX.set(0);
        rotateY.set(0);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [rotateX, rotateY, scale]);

  useEffect(() => {
    if (live) return;
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }, [live, rotateX, rotateY, scale]);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!live || !fineRef.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
  }

  function handleMouseEnter() {
    if (!live || !fineRef.current) return;
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    if (!live || !fineRef.current) return;
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      ref={ref}
      className={cn("relative h-full w-full", className)}
      style={{ perspective: live ? perspective : undefined }}
      onMouseMove={live ? handleMouse : undefined}
      onMouseEnter={live ? handleMouseEnter : undefined}
      onMouseLeave={live ? handleMouseLeave : undefined}
    >
      <motion.div
        className="h-full w-full [backface-visibility:hidden]"
        style={{ rotateX, rotateY, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}
