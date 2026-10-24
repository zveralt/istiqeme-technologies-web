import Link from "next/link";
import { ButtonLink, WhatsAppLink } from "@/components/Button";
import { AiIndustryGrid } from "./AiIndustryGrid";
import { industryGrid } from "@/lib/ai-automation";

type Product = {
  id: string;
  num: string;
  label: string;
  title: string;
  summary: string;
  bullets: readonly string[];
  showIndustryGrid?: boolean;
  href?: string;
};

export function AiProductSection({ product }: { product: Product }) {
  const href = "href" in product ? product.href : undefined;

  return (
    <section
      id={product.id}
      className="scroll-mt-28 border-t border-line py-16 first:border-t-0 first:pt-0"
    >
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
        Product {product.num} · {product.label}
      </p>
      <h2 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-forest">
        {product.title}
      </h2>
      <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-soft">{product.summary}</p>
      <ul className="mt-6 max-w-xl space-y-2 text-[15px] text-ink-soft">
        {product.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-ember">·</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {"showIndustryGrid" in product && product.showIndustryGrid ? (
        <div className="mt-10 rounded-2xl bg-forest px-6 py-10 md:px-10">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">Agent library</p>
          <h3 className="mt-2 font-display text-2xl text-white md:text-3xl">
            {industryGrid.reduce((s, i) => s + i.agentCount, 0)}+ agents across industries
          </h3>
          <p className="mt-2 max-w-xl text-[14px] text-white/65">
            Same structure as our live deployments — pick an industry to browse named outcomes.
          </p>
          <AiIndustryGrid items={industryGrid} />
          <div className="mt-8">
            <ButtonLink href="/ai/agents" variant="ink">
              Open full library
            </ButtonLink>
          </div>
        </div>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/start" variant="ember">
          Free assessment
        </ButtonLink>
        {href ? (
          <ButtonLink href={href} variant="ghost">
            View software tiers
          </ButtonLink>
        ) : (
          <WhatsAppLink variant="ghost">Book on WhatsApp</WhatsAppLink>
        )}
        {href ? (
          <Link href="/ai/agents" className="self-center text-[13px] text-forest underline-offset-4 hover:underline">
            Browse agents
          </Link>
        ) : null}
      </div>
    </section>
  );
}
