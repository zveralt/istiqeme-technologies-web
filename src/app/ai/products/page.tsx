import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { AiProductNav, AiProductNavMobile } from "@/components/ai/AiProductNav";
import { AiProductSection } from "@/components/ai/AiProductSection";
import { aiProductIntro, aiProductsFull } from "@/lib/ai-automation";

export const metadata: Metadata = {
  title: "AI Products",
  description:
    "Eight ISTIQEME product lines — agent library, owner brief, operations, business memory, audits, partnership, websites, and content.",
};

export default function AiProductsPage() {
  return (
    <>
      <PageHero
        eyebrow={aiProductIntro.eyebrow}
        title={aiProductIntro.title}
        description={aiProductIntro.body}
      >
        <AiProductNavMobile />
      </PageHero>

      <section data-header-theme="light" className="px-5 pb-24 md:px-8">
        <div className="mx-auto flex max-w-7xl gap-12">
          <div className="w-48 shrink-0">
            <AiProductNav />
          </div>
          <div className="min-w-0 flex-1">
            <Reveal>
              {aiProductsFull.map((product) => (
                <AiProductSection key={product.id} product={product} />
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
