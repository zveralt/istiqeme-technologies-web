export type SubmitSiteFormResult = { ok: true } | { ok: false; error: string };

export async function submitSiteForm(body: Record<string, unknown>): Promise<SubmitSiteFormResult> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

  if (!res.ok || !data.ok) {
    return { ok: false, error: data.error ?? "We could not send your message. Please try WhatsApp or email us directly." };
  }

  return { ok: true };
}
