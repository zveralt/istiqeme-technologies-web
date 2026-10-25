import type { Metadata } from "next";
import { CommandCenter } from "@/components/CommandCenter";
import { Compare } from "@/components/Compare";
import { Guide } from "@/components/Guide";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sheet } from "@/components/ui/Sheet";
import { VoiceAgent } from "@/components/VoiceAgent";
import { WorkShowcase } from "@/components/WorkShowcase";
import { site, workMenu } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "See real sites we have built, try our live demos, and reach our team directly when you are ready to talk.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Our work."
        description="See real sites we have built, try our live demos, and reach our team directly when you are ready to talk."
      />

      <Sheet>
        <div className="itq-container">
          <Reveal>
            <SectionHeading
              eyebrow="Live client sites"
              title="Real websites we build and operate"
              description="Every preview below opens the live site. These are running today, not mockups."
            />
          </Reveal>
          <div className="mt-14 md:mt-20">
            <WorkShowcase />
          </div>
        </div>
      </Sheet>

      <Sheet tone="tint">
        <div className="itq-container">
          <Compare />
        </div>
      </Sheet>

      <Sheet>
        <div className="itq-container">
          <CommandCenter />
        </div>
      </Sheet>

      <Sheet tone="tint" className="!py-16">
        <div className="itq-container">
          <VoiceAgent />
        </div>
      </Sheet>

      <Sheet tone="deep">
        <div className="itq-container">
          <Reveal>
            <SectionHeading onDark eyebrow="Solutions" title="What we have built for problems in the market" />
          </Reveal>
          <div className="mt-14 border-t border-line md:mt-16">
            {workMenu.map((item, i) => (
              <Reveal
                as="article"
                key={item.id}
                id={item.id}
                className="grid scroll-mt-28 gap-5 border-b border-line py-8 text-foreground md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.2fr)] md:gap-10 md:py-10"
              >
                <span className="font-dm text-[12px] tabular-nums tracking-[0.18em] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold leading-snug">{item.title}</h3>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                    The problem
                  </p>
                  <p className="mt-1 max-w-sm text-[15px] text-ink-soft">{item.problem}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ember">
                    The system
                  </p>
                  <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-ink-soft">{item.solution}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Sheet>

      <Sheet>
        <div className="itq-container">
          <Reveal>
            <SectionHeading
              eyebrow="Demo guide"
              title="Tour our live work"
              description="Ask about our demos and real projects — before/after sites, the Command Center, or the AI receptionist — then book a WhatsApp audit."
            />
          </Reveal>
          <div className="mt-12 md:mt-14">
            <Guide
              title="Tour the work"
              intro="Ask about our demos and real projects — before/after sites, the Command Center, or the AI receptionist — then book a WhatsApp audit."
              suggestions={[
                "Show me proof for my industry",
                "What is the Command Center?",
                "How does the AI receptionist work?",
              ]}
            />
          </div>
        </div>
      </Sheet>

      <ClosingCta
        eyebrow="Correspondence"
        title="Corporate headquarters"
        mark="."
        description={site.address}
        extra={
          <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Direct phone lines</dt>
              <dd className="mt-2 space-y-1 text-[15px]">
                {site.phones.map((p) => (
                  <a key={p.href} href={p.href} className="block text-foreground hover:text-ember">
                    {p.label}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Corporate inquiries</dt>
              <dd className="mt-2 text-[15px]">
                {site.emails.map((e) => (
                  <a key={e.href} href={e.href} className="block text-foreground hover:text-ember">
                    {e.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        }
      />
    </>
  );
}
