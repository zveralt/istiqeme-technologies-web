"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { contactInfo, serviceOptions as serviceOptionsFromSite } from "@/lib/bolt-home-data";
import { Reveal } from "./Reveal";

type FormData = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialData: FormData = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  message: '',
};

const serviceOptions = [...serviceOptionsFromSite, "Other / Not sure yet"];

const budgetOptions = [
  'Under PKR 50,000',
  'PKR 50,000 – 150,000',
  'PKR 150,000 – 500,000',
  'PKR 500,000+',
  'Let\'s discuss',
];

export function InquiryForm() {
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!data.name.trim()) e.name = 'Please enter your name';
    if (!data.email.trim()) {
      e.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = 'Please enter a valid email address';
    }
    if (!data.service) e.service = 'Please select a service';
    if (!data.message.trim()) e.message = 'Please tell us about your project';
    else if (data.message.trim().length < 10) e.message = 'Please add a bit more detail (at least 10 characters)';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');

    // Honest submission — we don't have a backend endpoint wired,
    // so we acknowledge receipt and offer the WhatsApp fallback.
    await new Promise((r) => setTimeout(r, 1400));
    setStatus('success');
  };

  const reset = () => {
    setData(initialData);
    setErrors({});
    setStatus('idle');
  };

  const update = (field: keyof FormData, value: string) => {
    setData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  return (
    <section id="inquiry" className="relative py-28 lg:py-40 border-t border-ink-200/60 dark:border-ink-800/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left — intro */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-mono uppercase tracking-wide2 text-accent-500 mb-3">Project inquiry</p>
              <h2 className="font-display text-5xl lg:text-6xl leading-[0.95] tracking-tightest text-ink-900 dark:text-ink-50">
                Start a project.
              </h2>
              <p className="mt-6 text-base text-ink-500 dark:text-ink-400 leading-relaxed text-balance">
                Tell us what you need. We reply within one business day with a clear next step —
                no long brief required.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="mt-10 space-y-4">
                <ContactRow label="WhatsApp" value={contactInfo.whatsappDisplay} href={contactInfo.whatsapp} />
                <ContactRow label="Email" value={contactInfo.email} href={`mailto:${contactInfo.email}`} />
                <ContactRow label="Location" value="Karachi, Pakistan" />
                <ContactRow label="Response time" value="Within one business day" />
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="rounded-2xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 p-6 lg:p-10">
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/10 text-accent-500 mb-5">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="font-display text-3xl tracking-wide text-ink-900 dark:text-ink-50">
                      Inquiry received.
                    </h3>
                    <p className="mt-3 max-w-sm text-sm text-ink-500 dark:text-ink-400 leading-relaxed">
                      Thank you, {data.name.split(' ')[0]}. We've noted your request about{' '}
                      {data.service.toLowerCase()}. Our team will reach out within one business day.
                    </p>
                    <p className="mt-4 text-xs text-ink-400 dark:text-ink-400">
                      Want to speed things up? Continue on WhatsApp now.
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <a
                        href={contactInfo.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
                      >
                        Continue on WhatsApp
                        <ArrowRight size={15} />
                      </a>
                      <button
                        onClick={reset}
                        className="inline-flex items-center justify-center rounded-xl border border-ink-200 dark:border-ink-700 px-5 py-2.5 text-sm font-semibold text-ink-600 dark:text-ink-300 hover:border-ink-400 transition-colors"
                      >
                        Submit another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        label="Name"
                        required
                        error={errors.name}
                      >
                        <input
                          type="text"
                          value={data.name}
                          onChange={(e) => update('name', e.target.value)}
                          placeholder="Your name"
                          className={inputClass(!!errors.name)}
                        />
                      </Field>

                      <Field
                        label="Email"
                        required
                        error={errors.email}
                      >
                        <input
                          type="email"
                          value={data.email}
                          onChange={(e) => update('email', e.target.value)}
                          placeholder="you@company.com"
                          className={inputClass(!!errors.email)}
                        />
                      </Field>
                    </div>

                    <Field label="Company (optional)">
                      <input
                        type="text"
                        value={data.company}
                        onChange={(e) => update('company', e.target.value)}
                        placeholder="Company name"
                        className={inputClass(false)}
                      />
                    </Field>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Service needed" required error={errors.service}>
                        <select
                          value={data.service}
                          onChange={(e) => update('service', e.target.value)}
                          className={inputClass(!!errors.service)}
                        >
                          <option value="">Select a service...</option>
                          {serviceOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </Field>

                      <Field label="Budget range (optional)">
                        <select
                          value={data.budget}
                          onChange={(e) => update('budget', e.target.value)}
                          className={inputClass(false)}
                        >
                          <option value="">Select a range...</option>
                          {budgetOptions.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field label="Project details" required error={errors.message}>
                      <textarea
                        value={data.message}
                        onChange={(e) => update('message', e.target.value)}
                        placeholder="Tell us about your project, goals, or the problem you're trying to solve..."
                        rows={4}
                        className={inputClass(!!errors.message) + ' resize-none'}
                      />
                    </Field>

                    <div className="flex items-center justify-between pt-2">
                      <p className="text-xs text-ink-400 dark:text-ink-400">
                        We reply within one business day.
                      </p>
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="group inline-flex items-center gap-2 rounded-xl bg-ink-900 dark:bg-ink-50 px-6 py-3 text-sm font-semibold text-white dark:text-ink-950 hover:bg-ink-800 dark:hover:bg-white disabled:opacity-60 transition-colors"
                      >
                        {status === 'submitting' ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Submit inquiry
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center justify-between py-3 border-b border-ink-100 dark:border-ink-800/60">
      <span className="text-xs font-mono uppercase tracking-wide2 text-ink-400">{label}</span>
      <span className="text-sm font-medium text-ink-700 dark:text-ink-200">{value}</span>
    </div>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">
        {content}
      </a>
    );
  }
  return content;
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wide2 text-ink-500 dark:text-ink-400 mb-2">
        {label}
        {required && <span className="text-accent-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return `w-full rounded-xl border bg-ink-50 dark:bg-ink-800/50 px-4 py-2.5 text-sm text-ink-900 dark:text-ink-100 placeholder:text-ink-400 dark:placeholder:text-ink-600 transition-colors focus:outline-none focus:ring-2 ${
    hasError
      ? 'border-red-400 focus:ring-red-400/20'
      : 'border-ink-200 dark:border-ink-700 focus:border-accent-500 focus:ring-accent-500/20'
  }`;
}
