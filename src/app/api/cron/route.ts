import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { logSecurityEvent } from "@/lib/security/log";
import { safeSecretEqual } from "@/lib/security/secrets";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!secret || !safeSecretEqual(token, secret)) {
    logSecurityEvent("cron_unauthorized");
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let admin;
  try {
    admin = createAdminClient();
  } catch {
    logSecurityEvent("cron_error", { reason: "admin_not_configured" });
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const { error } = await admin.from("cron_runs").insert({});
  if (error) {
    logSecurityEvent("cron_error", { reason: "insert_failed" });
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
