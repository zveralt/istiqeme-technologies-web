import { NextResponse } from "next/server";
import {
  contactPayloadSchema,
  formatContactEmail,
  formatInquiryEmail,
  inquiryPayloadSchema,
  siteFormPayloadSchema,
} from "@/lib/email/contact-schemas";
import { sendSiteEmail } from "@/lib/email/resend";
import { isTrustedBrowserRequest } from "@/lib/security/origin";
import { logSecurityEvent } from "@/lib/security/log";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 32_000;

export async function POST(request: Request) {
  if (!isTrustedBrowserRequest(request)) {
    logSecurityEvent("contact_rejected_origin");
    return NextResponse.json({ ok: false, error: "Request not allowed." }, { status: 403 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Expected application/json." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload too large." }, { status: 413 });
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload too large." }, { status: 413 });
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = siteFormPayloadSchema.safeParse(json);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid form data.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  const payload = parsed.data;
  if (payload.website) {
    logSecurityEvent("contact_honeypot");
    return NextResponse.json({ ok: true });
  }

  const formatted =
    payload.form === "inquiry"
      ? formatInquiryEmail(inquiryPayloadSchema.parse(payload))
      : formatContactEmail(contactPayloadSchema.parse(payload));

  const result = await sendSiteEmail({
    subject: formatted.subject,
    text: formatted.text,
    replyTo: payload.email,
  });

  if (!result.ok) {
    logSecurityEvent("contact_failed", { configured: result.configured });
    const status = result.configured ? 502 : 503;
    const error =
      process.env.NODE_ENV === "production" && result.configured
        ? "We could not send your message right now. Please try WhatsApp or email us directly."
        : result.error;
    return NextResponse.json({ ok: false, error }, { status });
  }

  logSecurityEvent("contact_sent", { form: payload.form });
  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}
