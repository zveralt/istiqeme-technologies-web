import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, WhatsAppLink } from "@/components/Button";
import { Guide } from "@/components/Guide";
import { AiFaqList } from "@/components/ai/AiFaqList";
import { LeadDemo } from "@/components/LeadDemo";
import { Eyebrow, Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { AiIndustryGrid } from "@/components/ai/AiIndustryGrid";
import {
  aiBuildingBlocks,
  aiCaseStudies,
  aiFaqs,
  aiHero,
  aiPainStats,
  aiProcess,
  aiProductsFull,
  aiProfiles,
  aiStats,
  industryGrid,
} from "@/lib/ai-automation";
import { agents } from "@/lib/ai-agents";

export const metadata: Metadata = {
  title: "AI & Automation",
  description: aiHero.subtitle,
};

export default function AiHubPage() {
  return (
    <>
      <PageHero eyebrow={aiHero.eyebrow} title={aiHero.title} description={aiHero.subtitle}>
        <p className="max-w-2xl text-[16px] leading-relaxed text-ink-soft">{aiHero.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/ai/products" variant="ember">
            Browse products
          </ButtonLink>
          <ButtonLink href="/ai/agents" variant="ghost">
            Open agent library
          </ButtonLink>
          <ButtonLink href="/start" variant="ghost">
            Start assessment
          </ButtonLink>
        </div>
      </PageHero>

      <section data-header-theme="dark" className="band-deep glow-field px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Products</Eyebrow>
          <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">Eight ways we run your business</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {aiProductsFull.map((p) => (
              <Link
                key={p.id}
                href={`/ai/products#${p.id}`}
                className="rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-ember/40"
              >
                <span className="font-display text-lg text-foreground">{p.num}</span>
                <p className="mt-2 text-[15px] font-medium text-foreground">{p.title}</p>
                <p className="mt-2 line-clamp-2 text-[13px] text-muted">{p.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {aiStats.map((s) => (
            <Reveal key={s.label}>
              <p className="font-display text-4xl text-forest">{s.value}</p>
              <p className="mt-2 text-[15px] text-ink-soft">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Proof</Eyebrow>
          <h2 className="mt-3 font-display text-3xl text-forest">Systems already in the field</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {aiCaseStudies.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="rounded-2xl border border-line bg-card p-6 text-card-foreground transition-shadow hover:shadow-md"
              >
                <p className="text-[11px] uppercase tracking-wider text-muted">{c.meta}</p>
                <h3 className="mt-2 font-display text-xl text-forest">{c.title}</h3>
                <p className="mt-3 text-[14px] text-ink-soft">{c.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <LeadDemo />
        </div>
      </section>

      <section data-header-theme="dark" className="band-deep glow-field px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Agent library</Eyebrow>
          <h2 className="mt-3 font-display text-3xl text-foreground">
            {agents.length} agents · {industryGrid.length} industries
          </h2>
          <AiIndustryGrid items={industryGrid} />
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>The cost of waiting</Eyebrow>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {aiPainStats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl text-ember">{s.value}</p>
                <p className="mt-2 text-ink-soft">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>How we work</Eyebrow>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {aiProcess.map((step) => (
              <div key={step.step} className="border-t border-line pt-4">
                <span className="font-display text-2xl text-forest">{step.step}</span>
                <h3 className="mt-2 font-medium text-forest">{step.title}</h3>
                <p className="mt-2 text-[14px] text-ink-soft">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Building blocks</Eyebrow>
          <ul className="mt-6 columns-1 gap-x-12 text-[15px] text-ink-soft sm:columns-2">
            {aiBuildingBlocks.map((b) => (
              <li key={b} className="mb-2 break-inside-avoid">· {b}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Who this is for</Eyebrow>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {aiProfiles.map((p) => (
              <div key={p.id} className="rounded-2xl border border-line bg-card p-6 text-card-foreground">
                <span className="text-[11px] text-muted">Profile {p.id}</span>
                <h3 className="mt-2 font-display text-xl text-forest">{p.title}</h3>
                <p className="mt-3 text-[14px] text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <AiFaqList title="AI & automation FAQ" items={aiFaqs} />
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Guide
            title="Ask about AI for your business"
            intro="Describe the job in English or Urdu. We’ll point you to a product, an agent, or WhatsApp."
            suggestions={[
              "Which agent fits a wholesale shop?",
              "How does the owner brief work?",
              "Can this run on WhatsApp?",
            ]}
          />
        </div>
      </section>

      <section data-header-theme="dark" className="band-deep glow-field px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-foreground">
            Ready when you are
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            Pick an industry in the library or start the intake — we reply on WhatsApp within one business day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/start" variant="ink">
              Free assessment
            </ButtonLink>
            <WhatsAppLink variant="ghost">Message on WhatsApp</WhatsAppLink>
          </div>
        </div>
      </section>
    </>
  );
}
