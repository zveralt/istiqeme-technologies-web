import { ButtonLink } from "@/components/Button";
import { LeadDemo } from "@/components/LeadDemo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { agents } from "@/lib/ai-agents";

export function AiHomeTeaser() {
  return (
    <div className="itq-container">
      <Reveal>
        <SectionHeading
          eyebrow="AI & automation"
          title="Agents that read your business and run one job"
          description={`Browse ${agents.length} ready-to-deploy agents by industry, or see eight product lines — from owner briefs to operations on WhatsApp.`}
          align="stack"
        />
      </Reveal>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/ai/products" variant="ember">
          Browse products
        </ButtonLink>
        <ButtonLink href="/ai/agents" variant="ghost">
          Agent library
        </ButtonLink>
      </div>
      <div className="mt-14 md:mt-16">
        <LeadDemo />
      </div>
    </div>
  );
}
