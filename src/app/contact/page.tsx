import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Sheet } from "@/components/ui/Sheet";
import { WhatsAppLink } from "@/components/Button";
import { heroMedia } from "@/lib/hero-media";
import { site, waLink } from "@/lib/site";

import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata("/contact");

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the team"
        accent="that builds the system."
        description="Share a short brief. We reply within one business day with a clear next step — no long form required."
        imageSrc={heroMedia.contact.src}
        imageAlt={heroMedia.contact.alt}
        imagePosition={heroMedia.contact.objectPosition}
      >
        <div className="flex flex-wrap gap-3">
          <WhatsAppLink text={site.whatsapp.discussText}>Message on WhatsApp</WhatsAppLink>
          <a
            href={site.emails[0].href}
            className="inline-flex items-center rounded-xl border border-line px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent-500/50"
          >
            Email {site.emails[0].label}
          </a>
        </div>
      </PageHero>

      <Sheet>
        <div className="itq-container grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="text-xs font-mono uppercase tracking-wide2 text-accent-500">Direct lines</p>
            <h2 className="mt-3 font-display text-4xl tracking-wide text-ink-900 dark:text-ink-50">
              How to reach us
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              WhatsApp is the fastest path. Phone and email work too — use the form when you want a
              structured brief handed off in one message.
            </p>
            <ul className="mt-8 space-y-4 text-[15px]">
              {site.phones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="text-ink-700 transition-colors hover:text-accent-600 dark:text-ink-200 dark:hover:text-accent-300"
                  >
                    {phone.label}
                  </a>
                </li>
              ))}
              {site.emails.map((email) => (
                <li key={email.href}>
                  <a
                    href={email.href}
                    className="text-ink-700 transition-colors hover:text-accent-600 dark:text-ink-200 dark:hover:text-accent-300"
                  >
                    {email.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={waLink(site.whatsapp.discussText)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-700 transition-colors hover:text-accent-600 dark:text-ink-200 dark:hover:text-accent-300"
                >
                  WhatsApp · +92 332 3407131
                </a>
              </li>
            </ul>
            <address className="mt-8 max-w-sm text-[13px] not-italic leading-relaxed text-ink-500 dark:text-ink-400">
              {site.address}
            </address>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-8">
            <ContactForm />
          </Reveal>
        </div>
      </Sheet>
    </>
  );
}
