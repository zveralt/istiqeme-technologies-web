import type { Metadata } from "next";
import { Guide } from "@/components/Guide";
import { LeadDemo } from "@/components/LeadDemo";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { PageHero } from "@/components/ui/PageHero";
import { EditorialRows } from "@/components/ui/EditorialRows";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGlyph, type ServiceGlyphId } from "@/components/ui/ServiceGlyph";
import { Sheet } from "@/components/ui/Sheet";
import { WhatsAppLink } from "@/components/Button";
import { serviceMenu, services, site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Five clear options for getting your business online — from a simple landing page to a full mobile app.",
};

const menuRows = serviceMenu.map((item, i) => ({
  id: item.id,
  index: String(i + 1).padStart(2, "0"),
  title: item.title,
  kicker: item.problem,
  body: item.solution,
  href: waLink(`Hi ISTIQEME Technologies — I'd like to discuss ${item.title} for my business.`),
  cta: "Discuss on WhatsApp",
  external: true,
}));

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Product catalogue"
        title="Five ways to get"
        accent="your business online."
        description="From a simple landing page to a full mobile app. Every project is quoted individually. Chat with us to find the right fit."
      />

      <Sheet>
        <div className="itq-container">
          <Reveal>
            <SectionHeading eyebrow="Catalogue" title="Five ways to get the work online" align="stack" />
          </Reveal>
          <div className="mt-14 md:mt-16">
            {services.map((s) => (
              <Reveal
                as="article"
                key={s.id}
                id={s.id}
                className="grid scroll-mt-28 gap-8 border-t border-line py-12 md:grid-cols-12 md:gap-10 md:py-16"
              >
                <div className="md:col-span-5">
                  <ServiceGlyph id={s.id as ServiceGlyphId} className="mb-8 max-w-sm" />
                  <p className="font-dm text-[12px] font-medium tabular-nums tracking-[0.18em] text-muted">
                    Tier {s.tier}
                  </p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-forest dark:text-ember-bright">
                    {s.category}
                  </p>
                  <h3 className="mt-4 font-display text-[clamp(2rem,3.6vw,3.2rem)] leading-[0.95] text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">{s.problem}</p>
                </div>
                <div className="md:col-span-7">
                  <p className="itq-lead max-w-2xl">{s.summary}</p>
                  <ul className="mt-8 grid gap-4 border-t hairline pt-6 sm:grid-cols-2">
                    {s.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[14.5px] leading-relaxed text-ink-soft">
                        <span
                          aria-hidden
                          className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-forest dark:bg-ember-bright"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  {"addons" in s && s.addons?.length ? (
                    <p className="mt-6 text-[13px] text-muted">Optional: {s.addons.join(", ")}</p>
                  ) : null}
                  {"architecture" in s && s.architecture?.length ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {s.architecture.map((a) => (
                        <span
                          key={a}
                          className="rounded-md border border-line px-3 py-1 font-mono text-[12px] text-ink-soft"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <a
                    href={waLink(`Hi ISTIQEME Technologies — I'd like to discuss ${s.title} for my business.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="itq-link-arrow mt-8 text-[13px] font-medium text-forest dark:text-ember-bright"
                  >
                    Discuss this project on WhatsApp
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
                      <path
                        d="M4 12L12 4M12 4H5M12 4V11"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Sheet>

      <Sheet tone="tint">
        <div className="itq-container">
          <Reveal>
            <SectionHeading
              eyebrow="What we provide"
              title="A solution for each job"
              description="Every line below starts a WhatsApp conversation with the engineering team."
            />
          </Reveal>
          <EditorialRows items={menuRows} className="mt-14 md:mt-16" />
        </div>
      </Sheet>

      <Sheet>
        <div className="itq-container">
          <Reveal>
            <SectionHeading
              eyebrow="AI matcher"
              title="Find your best package"
              description="Answer a few questions in English or Urdu. The assistant recommends the right ISTIQEME package, then sends you to WhatsApp for a custom quote."
            />
          </Reveal>
          <div className="mt-12 md:mt-14">
            <Guide
              title="Find your package"
              intro="Tell me what you need in English or Urdu. I’ll recommend a package, then you can continue on WhatsApp for a custom quote."
              suggestions={[
                "I need a website that gets leads",
                "We want an online store",
                "Mujhe kaun sa package chahiye?",
              ]}
            />
          </div>
        </div>
      </Sheet>

      <Sheet tone="tint">
        <div className="itq-container">
          <LeadDemo />
        </div>
      </Sheet>

      <ClosingCta
        eyebrow="Get in touch"
        title="Ready to get started"
        description="Whether you want to talk on WhatsApp or tap through a quick intake, our engineering team is here to help."
        extra={
          <div className="mt-8">
            <WhatsAppLink text={site.whatsapp.discussText} variant="light">
              Discuss your project on WhatsApp
            </WhatsAppLink>
          </div>
        }
      />
    </>
  );
}
