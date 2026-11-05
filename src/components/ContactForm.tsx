"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, ArrowUpRight, Loader2 } from "lucide-react";
import { submitSiteForm } from "@/lib/contact-form-client";
import { site, waLink } from "@/lib/site";

type Fields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const initial: Fields = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [data, setData] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [websiteHp, setWebsiteHp] = useState("");

  const validate = (): boolean => {
    const next: Errors = {};
    if (!data.name.trim()) next.name = "Please enter your name";
    if (!data.email.trim()) {
      next.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = "Please enter a valid email address";
    }
    if (!data.subject.trim()) next.subject = "Please add a subject";
    if (!data.message.trim()) next.message = "Please write a short message";
    else if (data.message.trim().length < 12) next.message = "Add a little more detail (12+ characters)";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const update = (field: keyof Fields, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setSubmitError(null);

    const result = await submitSiteForm({
      form: "contact",
      name: data.name.trim(),
      email: data.email.trim(),
      subject: data.subject.trim(),
      message: data.message.trim(),
      website: websiteHp,
    });

    if (!result.ok) {
      setStatus("idle");
      setSubmitError(result.error);
      return;
    }

    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="itq-surface rounded-2xl border border-line bg-card p-8 text-card-foreground md:p-10">
        <p className="font-mono text-xs uppercase tracking-wide2 text-accent-500">Message sent</p>
        <h3 className="mt-3 font-display text-3xl tracking-wide text-ink-900 dark:text-ink-50">
          We received your note
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-500 dark:text-ink-400">
          Your message was emailed to our team at {site.emails[0].label}. We reply within one business day.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent-500/50"
          >
            Continue on WhatsApp
            <ArrowUpRight size={16} />
          </a>
          <button
            type="button"
            onClick={() => {
              setData(initial);
              setErrors({});
              setSubmitError(null);
              setStatus("idle");
            }}
            className="rounded-xl border border-line px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent-500/50"
          >
            Write another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="itq-surface relative rounded-2xl border border-line bg-card p-6 text-card-foreground md:p-10"
    >
      <div
        className="pointer-events-none absolute left-[-9999px] h-px w-px overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <label htmlFor="contact-website-hp">Website</label>
        <input
          id="contact-website-hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={websiteHp}
          onChange={(e) => setWebsiteHp(e.target.value)}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-name"
          label="Name"
          value={data.name}
          error={errors.name}
          autoComplete="name"
          onChange={(v) => update("name", v)}
        />
        <Field
          id="contact-email"
          label="Email"
          type="email"
          value={data.email}
          error={errors.email}
          autoComplete="email"
          onChange={(v) => update("email", v)}
        />
      </div>
      <div className="mt-5">
        <Field
          id="contact-subject"
          label="Subject"
          value={data.subject}
          error={errors.subject}
          onChange={(v) => update("subject", v)}
        />
      </div>
      <div className="mt-5">
        <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wide2 text-ink-400">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={6}
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`mt-2 w-full rounded-xl border bg-paper px-4 py-3 text-[15px] text-foreground outline-none transition-[border-color,box-shadow] focus:border-accent-500 focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-ember)_18%,transparent)] ${
            errors.message ? "border-red-500/70" : "border-line"
          }`}
          placeholder="Tell us what you need, your timeline, and how we should reach you."
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-2 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
            <AlertCircle size={12} />
            {errors.message}
          </p>
        ) : null}
      </div>

      {submitError ? (
        <p className="mt-5 flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
          {submitError}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-ink-400">
          Submitting sends your message to our team by email. We reply within one business day.{" "}
          <a href="/legal/privacy-policy" className="underline-offset-2 hover:underline">
            Privacy Policy
          </a>
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink-800 disabled:opacity-60 dark:bg-[#f5f5f6] dark:text-[#111214] dark:hover:bg-white"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowUpRight size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-mono uppercase tracking-wide2 text-ink-400">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 w-full rounded-xl border bg-paper px-4 py-3 text-[15px] text-foreground outline-none transition-[border-color,box-shadow] focus:border-accent-500 focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-ember)_18%,transparent)] ${
          error ? "border-red-500/70" : "border-line"
        }`}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
          <AlertCircle size={12} />
          {error}
        </p>
      ) : null}
    </div>
  );
}
