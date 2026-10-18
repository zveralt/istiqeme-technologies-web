import type { ReactNode } from "react";

/** Pass-through — a page-level fade hid first paint and mismatched hydration. */
export default function Template({ children }: { children: ReactNode }) {
  return children;
}
