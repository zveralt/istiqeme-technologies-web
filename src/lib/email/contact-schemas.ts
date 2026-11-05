import { z } from "zod";
import { sanitizeEmailSubject } from "@/lib/security/sanitize";

const name = z.string().trim().min(1, "Name is required").max(200);
const email = z.string().trim().email("Valid email required").max(320);
const messageLong = z.string().trim().min(10, "Message too short").max(8000);

/** Honeypot — must stay empty; bots that fill hidden fields are dropped server-side. */
const honeypot = z
  .string()
  .max(200)
  .optional()
  .default("");

export const inquiryPayloadSchema = z.object({
  form: z.literal("inquiry"),
  name,
  email,
  company: z.string().trim().max(200).optional().default(""),
  service: z.string().trim().min(1, "Service is required").max(200),
  budget: z.string().trim().max(200).optional().default(""),
  message: messageLong,
  website: honeypot,
});

export const contactPayloadSchema = z.object({
  form: z.literal("contact"),
  name,
  email,
  subject: z.string().trim().min(1, "Subject is required").max(300),
  message: z.string().trim().min(12, "Message too short").max(8000),
  website: honeypot,
});

export const siteFormPayloadSchema = z.discriminatedUnion("form", [
  inquiryPayloadSchema,
  contactPayloadSchema,
]);

export type InquiryPayload = z.infer<typeof inquiryPayloadSchema>;
export type ContactPayload = z.infer<typeof contactPayloadSchema>;

export function formatInquiryEmail(data: InquiryPayload): { subject: string; text: string } {
  const lines = [
    "New project inquiry — istiqeme website",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    `Service: ${data.service}`,
    data.budget ? `Budget: ${data.budget}` : "Budget: (not provided)",
    "",
    "Project details:",
    data.message,
  ].filter((line): line is string => line !== null);

  return {
    subject: sanitizeEmailSubject(`[Inquiry] ${data.service} — ${data.name}`),
    text: lines.join("\n"),
  };
}

export function formatContactEmail(data: ContactPayload): { subject: string; text: string } {
  const lines = [
    "Contact form — istiqeme website",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    "",
    data.message,
  ];

  return {
    subject: sanitizeEmailSubject(`[Contact] ${data.subject} — ${data.name}`),
    text: lines.join("\n"),
  };
}
