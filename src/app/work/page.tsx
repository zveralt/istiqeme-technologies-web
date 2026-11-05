import type { Metadata } from "next";
import { CommandCenter } from "@/components/CommandCenter";
import { Compare } from "@/components/Compare";
import { Guide } from "@/components/Guide";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sheet } from "@/components/ui/Sheet";
import { VoiceAgent } from "@/components/VoiceAgent";
import { Projects } from "@/components/bolt/Projects";
import { heroMedia } from "@/lib/hero-media";
import { workMenu } from "@/lib/site";

import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata("/work");

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Our work."
        description="Client sites, our own corporate and CRM platforms, and concept builds — each labelled clearly, alongside interactive demos of the systems we ship."
        imageSrc={heroMedia.work.src}
        imageAlt={heroMedia.work.alt}
        imagePosition={heroMedia.work.objectPosition}
      />

      <Projects />

      <Sheet tone="deep">
        <div className="itq-container">
          <div className="portfolio-before-after">
            <Compare />
          </div>
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
    </>
  );
}
