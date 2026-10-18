import type { Metadata } from "next";
import { Suspense } from "react";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { AgentLibrary } from "@/components/ai/AgentLibrary";
import { agents } from "@/lib/ai-agents";

export const metadata: Metadata = {
  title: "Agent library",
  description:
    "Filter ISTIQEME AI agents by industry and department — each reads your systems, does one job, and escalates exceptions to you.",
};

export default function AiAgentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Agent library"
        title="Agents built for your industry"
        description={`Each agent reads your tools, owns one outcome end to end, and sends exceptions to a human — usually on WhatsApp. ${agents.length} agents ready to scope for Karachi operators.`}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/start" variant="ember">
            Free assessment
          </ButtonLink>
          <ButtonLink href="/ai/products" variant="ghost">
            See all products
          </ButtonLink>
        </div>
      </PageHero>

      <section className="px-5 pb-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Suspense>
              <AgentLibrary />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </>
  );
}
