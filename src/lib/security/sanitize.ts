/** Remove ASCII control characters (except tab/newline in body text handled separately). */
export function stripControlChars(value: string): string {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

/** Prevent email header injection in outbound subjects. */
export function sanitizeEmailSubject(value: string): string {
  return stripControlChars(value).replace(/[\r\n]+/g, " ").trim().slice(0, 300);
}
