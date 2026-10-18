import { ButtonLink } from "@/components/Button";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { HomeHero } from "@/components/HomeHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceRows } from "@/components/ServiceRows";
import { WhyPinned } from "@/components/WhyPinned";
import { WorkShowcase } from "@/components/WorkShowcase";
import { AiHomeTeaser } from "@/components/ai/AiHomeTeaser";
import { EditorialRows } from "@/components/ui/EditorialRows";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sheet } from "@/components/ui/Sheet";
import type { ServiceGlyphId } from "@/components/ui/ServiceGlyph";
import { problems, services, site } from "@/lib/site";

const serviceRows = services.map((s) => ({
  id: s.id,
  index: s.tier,
  title: s.title,
  kicker: s.category,
  body: s.summary,
  href: `/services#${s.id}`,
  glyph: s.id as ServiceGlyphId,
}));

const problemRows = problems.map((p, i) => ({
  id: p.href,
  index: String(i + 1).padStart(2, "0"),
  title: p.problem,
  kicker: "What we build",
  body: p.solution,
  href: p.href,
  cta: "See the system",
}));

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <Sheet id="services" recede>
        <div className="itq-container">
          <Reveal>
            <SectionHeading
              eyebrow="Our services"
              title="What we build"
              description="Websites, online stores, mobile apps, AI assistants, and marketing — scoped to your business, not a one-size-fits-all template."
            >
              <ButtonLink href="/services" variant="ghost">
                See all services
              </ButtonLink>
            </SectionHeading>
          </Reveal>
          <div className="mt-14 md:mt-16">
            <ServiceRows items={serviceRows} />
          </div>
        </div>
      </Sheet>

      <Sheet id="work" tone="tint">
        <div className="itq-container">
          <Reveal>
            <SectionHeading
              eyebrow="Selected work"
              title="Live client sites"
              description="Real websites and systems we build and run — designed for speed, clarity, and trust."
            >
              <ButtonLink href="/work" variant="ghost">
                View portfolio
              </ButtonLink>
            </SectionHeading>
          </Reveal>
          <div className="mt-14 md:mt-20">
            <WorkShowcase limit={3} />
          </div>
        </div>
      </Sheet>

      <WhyPinned />

      <Sheet id="ai">
        <AiHomeTeaser />
      </Sheet>

      <Sheet id="problems" tone="deep">
        <div className="itq-container">
          <Reveal>
            <SectionHeading
              onDark
              eyebrow="Problems we solve"
              title="Every system starts with a problem we already see"
              description={`Since ${site.since} we have built practical tools for retailers, wholesalers, and local businesses in ${site.city}. These are the gaps we keep meeting — and the systems that close them.`}
            />
          </Reveal>
          <EditorialRows items={problemRows} variant="padded" className="mt-14 text-white md:mt-16" />
          <div className="mt-16 md:mt-20">
            <p className="itq-eyebrow">How we close them</p>
            <h3 className="mt-4 text-[1.5rem] font-semibold text-white">From a short interview to a system that runs.</h3>
            <div className="mt-10">
              <ProcessSteps compact onDark />
            </div>
          </div>
        </div>
      </Sheet>

      <ClosingCta />
    </>
  );
}
