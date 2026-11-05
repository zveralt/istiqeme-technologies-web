import type { Metadata } from "next";
import { Guide } from "@/components/Guide";
import { GlowButton } from "@/components/ui/GlowButton";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGlyph } from "@/components/ui/ServiceGlyph";
import { Sheet } from "@/components/ui/Sheet";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { TechEcosystem } from "@/components/TechEcosystem";
import { heroMedia } from "@/lib/hero-media";
import { pageMetadata } from "@/lib/seo/metadata";
import { serviceGroups, services, waLink } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/services");

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Six services,"
        accent="one connected system."
        description="We build what your customers and staff use, automate it with AI, and send the right traffic into it. Every project is quoted individually."
        imageSrc={heroMedia.services.src}
        imageAlt={heroMedia.services.alt}
        imagePosition={heroMedia.services.objectPosition}
        lead={
          <Breadcrumbs
            contained={false}
            items={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ]}
          />
        }
      />

      <Sheet>
        <div className="itq-container">
          <Reveal>
            <SectionHeading
              eyebrow="Catalogue"
              title="Build, automate, grow"
              description="Four build services, one AI practice that sits on top of them, and marketing that sends traffic in. Each has a dedicated guide."
              align="stack"
            />
          </Reveal>

          {serviceGroups.map((group) => (
            <div key={group.id} className="mt-14 md:mt-16">
              <Reveal className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
                <p className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-none text-foreground">
                  {group.label}
                </p>
                <p className="text-[14px] text-muted">{group.line}</p>
              </Reveal>
              {services
                .filter((s) => s.group === group.id)
                .map((s) => (
                  <Reveal
                    as="article"
                    key={s.id}
                    id={s.id}
                    className="grid scroll-mt-28 gap-8 border-b border-line py-10 md:grid-cols-12 md:gap-10 md:py-14"
                  >
                    <div className="md:col-span-5">
                      <ServiceGlyph id={s.glyph} className="mb-7 max-w-sm" />
                      <p className="font-dm text-[12px] font-medium tabular-nums tracking-[0.18em] text-muted">
                        {s.tier} · {s.category}
                      </p>
                      <h3 className="mt-3 font-display text-[clamp(2rem,3.6vw,3.2rem)] leading-[0.95] text-foreground">
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
                      <div className="mt-8 flex flex-wrap gap-3">
                        <GlowButton href={s.href} size="sm">
                          Read the {s.title.toLowerCase()} guide
                        </GlowButton>
                        <GlowButton
                          href={waLink(`Hi ISTIQEME Technologies — I'd like to discuss ${s.title} for my business.`)}
                          variant="outline"
                          size="sm"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Discuss on WhatsApp
                        </GlowButton>
                      </div>
                    </div>
                  </Reveal>
                ))}
            </div>
          ))}
        </div>
      </Sheet>

      <Sheet tone="deep">
        <div className="itq-container">
          <Reveal>
            <SectionHeading
              onDark
              eyebrow="How it connects"
              title="One system, not six vendors"
              description="Most clients start with one service. This is how the pieces connect when you add the next one."
            />
          </Reveal>
          <TechEcosystem className="mt-12 md:mt-14" />
        </div>
      </Sheet>

      <Sheet tone="tint">
        <div className="itq-container">
          <Reveal>
            <SectionHeading
              eyebrow="Not sure yet"
              title="Find your starting point"
              description="Describe the business in English or Urdu. The assistant suggests where to start, then hands you to WhatsApp for a quote."
            />
          </Reveal>
          <div className="mt-12 md:mt-14">
            <Guide
              title="Find your starting point"
              intro="Tell me what you need in English or Urdu. I’ll suggest a service, then you can continue on WhatsApp for a quote."
              suggestions={[
                "I need a website that gets leads",
                "We want an online store",
                "Mujhe kaun sa package chahiye?",
              ]}
            />
          </div>
        </div>
      </Sheet>
    </>
  );
}
