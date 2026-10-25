import { getShowcasePlaceholderHtml } from "@/lib/showcase/showcasePlaceholders";
import { z } from "zod";

const querySchema = z.object({
  id: z.enum(["istiqeme", "pascale", "offduty", "offduty-legacy"]),
});

export function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id") ?? "";
  const parsed = querySchema.safeParse({ id });

  if (!parsed.success) {
    return new Response("Invalid id parameter.", { status: 400 });
  }

  const html = getShowcasePlaceholderHtml(parsed.data.id);
  if (!html) {
    return new Response("Unknown placeholder id.", { status: 404 });
  }

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, max-age=60",
      "X-Frame-Options": "SAMEORIGIN",
      "Content-Security-Policy": "frame-ancestors 'self'",
    },
  });
}
