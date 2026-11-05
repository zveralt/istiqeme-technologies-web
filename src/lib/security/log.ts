type SecurityEvent =
  | "contact_rate_limited"
  | "contact_rejected_origin"
  | "contact_honeypot"
  | "contact_sent"
  | "contact_failed"
  | "cron_unauthorized"
  | "cron_error"
  | "showcase_rate_limited";

export function logSecurityEvent(event: SecurityEvent, meta?: Record<string, string | number | boolean>) {
  if (process.env.NODE_ENV === "test") return;
  const payload = {
    ts: new Date().toISOString(),
    event,
    ...meta,
  };
  console.info("[security]", JSON.stringify(payload));
}
