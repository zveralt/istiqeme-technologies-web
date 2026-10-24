"use client";

import { useEffect, useState } from "react";
import { GhostCursor } from "@/components/ui/GhostCursor";
import { useTheme } from "@/components/ui/ThemeProvider";

/** Faint brand trail under the type. Hidden for touch and reduced motion. */
export function SiteCursor() {
  const { theme } = useTheme();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setEnabled(fine.matches && !reduce.matches);
    apply();
    fine.addEventListener("change", apply);
    reduce.addEventListener("change", apply);
    return () => {
      fine.removeEventListener("change", apply);
      reduce.removeEventListener("change", apply);
    };
  }, []);

  if (!enabled) return null;

  const dark = theme === "dark";
  return (
    <GhostCursor
      color={dark ? "#4a81de" : "#2b63c8"}
      brightness={dark ? 0.7 : 0.65}
      trailLength={8}
      inertia={0.35}
      bloomStrength={0.04}
      bloomRadius={0.35}
      bloomThreshold={0.45}
      grainIntensity={0}
      fadeDelayMs={400}
      fadeDurationMs={700}
      zIndex={1}
    />
  );
}
