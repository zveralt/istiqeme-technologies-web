"use client";

import dynamic from "next/dynamic";

const GridBackground = dynamic(
  () => import("@/components/ui/GridBackground").then((m) => ({ default: m.GridBackground })),
  { ssr: false },
);

export function DeferredGridBackground() {
  return <GridBackground />;
}
