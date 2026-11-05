import Link from "next/link";
import { WhatsAppLink } from "@/components/Button";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Sheet } from "@/components/ui/Sheet";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceFaq } from "@/components/seo/ServiceFaq";
import { ServiceGuideCard } from "@/components/seo/ServiceGuideCard";
import { ServiceOverview } from "@/components/seo/ServiceOverview";
import { ServiceProcess } from "@/components/seo/ServiceProcess";
import { ServiceWhy } from "@/components/seo/ServiceWhy";
import { getServiceMedia } from "@/lib/service-media";
import { keywordForPath } from "@/lib/seo/keywords";
import { faqSchema, serviceSchema } from "@/lib/seo/schema";
import { getServicePage, portfolioFor, type ServicePageContent } from "@/lib/seo/services";
import { site, waLink } from "@/lib/site";

function ServiceIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="itq-service-intro">
      <p className="itq-eyebrow">{eyebrow}</p>
      <div>
        <h2 className="itq-h2 itq-service-intro__title text-foreground">
          {title}
          <span className="text-ember">.</span>
        </h2>
        <span className="itq-service-intro__rule" aria-hidden />
      </div>
      {description ? <p className="itq-lead itq-service-intro__copy">{description}</p> : null}
    </div>
  );
}

export function ServiceLanding({ slug }: { slug: string }) {
  const page = getServicePage(slug);
  if (!page) return null;

  const mapped = keywordForPath(page.path);
  const portfolio = portfolioFor(page.portfolioNames);
  const title = mapped?.h1 ?? page.eyebrow;
  const accent = mapped?.h1Accent;
  const media = getServiceMedia(page.mediaKey);
  if (!media) return null;

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: mapped?.title ?? page.eyebrow,
            description: mapped?.description ?? page.intro,
            path: page.path,
            serviceType: page.eyebrow,
          }),
          faqSchema(page.faqs),
        ]}
      />

      <PageHero
        eyebrow={page.eyebrow}
        title={title}
        accent={accent}
        description={mapped?.description ?? page.intro}
        imageSrc={media.hero.src}
        imageAlt={media.hero.alt}
        imagePosition={media.hero.objectPosition}
        lead={
          <Breadcrumbs
            contained={false}
            items={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: page.eyebrow, path: page.path },
            ]}
          />
        }
      >
        <div className="flex flex-wrap gap-3">
          <WhatsAppLink
            text={`Hi ISTIQEME Technologies — I'd like to discuss ${page.eyebrow} for my business.`}
          >
            Discuss on WhatsApp
          </WhatsAppLink>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-xl border border-line px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent-500/50"
          >
            Contact the team
          </Link>
        </div>
      </PageHero>

      <Sheet>
        <div className="itq-container">
          <ServiceOverview description={page.intro} image={media.overview} />
        </div>
      </Sheet>

      <Sheet tone="tint">
        <div className="itq-container">
          <Reveal>
            <ServiceIntro
              eyebrow="Capabilities"
              title={mapped?.supportingH2[0] ?? "What we build"}
            />
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-2 md:grid-cols-2 md:mt-14">
            {page.features.map((feature, index) => (
              <Reveal as="li" key={feature.title} delay={index * 40} className="itq-service-capability">
                <p className="itq-service-capability__index font-mono text-[11px] uppercase tracking-[0.16em]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.05] tracking-[0.01em] text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted text-pretty">
                  {feature.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Sheet>

      <Sheet>
        <div className="itq-container">
          <Reveal>
            <ServiceIntro
              eyebrow="Problems"
              title={mapped?.supportingH2[1] ?? "Problems we solve"}
              description="The friction that usually shows up before a business calls us — framed so you can match it to your own operation."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
            {page.problems.map((problem, index) => (
              <Reveal key={problem.title} delay={index * 50} className="h-full">
                <article className="itq-service-problem">
                  <p className="itq-service-problem__index">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="itq-service-problem__title">{problem.title}</h3>
                  <p className="itq-service-problem__body">{problem.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Sheet>

      <Sheet tone="deep">
        <div className="itq-container">
          <Reveal>
            <ServiceIntro
              eyebrow="Process"
              title={mapped?.supportingH2[2] ?? "How we deliver"}
              description="A clear path from the first conversation to a system your team can run."
            />
          </Reveal>
          <ServiceProcess steps={page.process} />
        </div>
      </Sheet>

      {portfolio.length ? (
        <Sheet>
          <div className="itq-container">
            <Reveal>
              <ServiceIntro
                eyebrow="Proof"
                title={mapped?.supportingH2[3] ?? "Related work"}
                description="Examples from live client work and systems we build and run. Not every engagement looks identical — these show the quality bar."
              />
            </Reveal>
            <ul className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
              {portfolio.map((item, index) => (
                <Reveal as="li" key={item.name} delay={index * 40} className="h-full">
                  <ServiceGuideCard
                    href={item.href || "/work"}
                    external={Boolean(item.href)}
                    size="proof"
                    kicker={item.kind}
                    title={item.name}
                    description={item.body}
                    cta={item.href ? "Open live site" : "See in portfolio"}
                  />
                </Reveal>
              ))}
            </ul>
          </div>
        </Sheet>
      ) : null}

      <Sheet tone="tint">
        <div className="itq-container">
          <ServiceWhy
            title={mapped?.supportingH2[4] ?? "Why choose ISTIQEME"}
            lead={page.whyLead}
            items={page.whyUs}
          />
        </div>
      </Sheet>

      <Sheet>
        <div className="itq-container">
          <Reveal>
            <ServiceIntro
              eyebrow="Related"
              title="Continue exploring"
              description="Internal paths that commonly sit next to this service."
            />
          </Reveal>
          <ul className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3">
            {page.relatedPaths.map((link, index) => (
              <Reveal as="li" key={link.href} delay={index * 40} className="h-full">
                <ServiceGuideCard
                  href={link.href}
                  title={link.label}
                  description={link.line}
                  cta="Explore"
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </Sheet>

      <Sheet tone="tint">
        <div className="itq-container">
          <Reveal>
            <ServiceIntro
              eyebrow="FAQ"
              title={mapped?.supportingH2[5] ?? "Frequently asked questions"}
              description="Straight answers to the questions buyers usually ask before a call."
            />
          </Reveal>
          <div className="mt-10 md:mt-12">
            <ServiceFaq
              items={page.faqs}
              contactNote={
                <>
                  Prefer a live conversation? Call{" "}
                  <a href={site.phones[0].href} className="itq-ulink">
                    {site.phones[0].label}
                  </a>{" "}
                  or{" "}
                  <a href={waLink(site.whatsapp.discussText)} className="itq-ulink">
                    continue on WhatsApp
                  </a>
                  .
                </>
              }
            />
          </div>
        </div>
      </Sheet>

      <ClosingCta
        eyebrow="Next step"
        title="Ready to scope this"
        mark="?"
        description={`Tell us about your ${page.eyebrow} needs. We reply within one business day with a clear next step — no long brief required.`}
      />
    </>
  );
}

/** Re-export for typed page generation */
export type { ServicePageContent };
