import { timingSafeEqual } from "node:crypto";

/** Constant-time comparison for shared secrets (cron, webhooks). */
export function safeSecretEqual(provided: string, expected: string): boolean {
  if (!provided || !expected) return false;
  const a = Buffer.from(provided, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
