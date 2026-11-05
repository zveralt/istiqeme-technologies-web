import { Resend } from "resend";

export type SendSiteEmailInput = {
  subject: string;
  replyTo: string;
  text: string;
};

export type SendSiteEmailResult =
  | { ok: true }
  | { ok: false; error: string; configured: boolean };

function getConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM?.trim();
  const to = (process.env.CONTACT_FORM_TO ?? "tech@istiqeme.net").trim();
  return { apiKey, from, to };
}

export function isEmailConfigured(): boolean {
  const { apiKey, from, to } = getConfig();
  return Boolean(apiKey && from && to);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendSiteEmail(input: SendSiteEmailInput): Promise<SendSiteEmailResult> {
  const { apiKey, from, to } = getConfig();
  if (!apiKey || !from || !to) {
    return {
      ok: false,
      configured: false,
      error: "Email delivery is not configured yet (Resend environment variables).",
    };
  }

  const resend = new Resend(apiKey);
  const html = `<pre style="font-family:ui-monospace,monospace;font-size:14px;line-height:1.5;white-space:pre-wrap">${escapeHtml(input.text)}</pre>`;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: input.replyTo,
    subject: input.subject,
    text: input.text,
    html,
  });

  if (error) {
    return { ok: false, configured: true, error: error.message };
  }

  return { ok: true };
}
