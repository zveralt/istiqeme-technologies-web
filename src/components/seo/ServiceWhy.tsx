"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useGuideCardHot } from "@/components/seo/useGuideCardHot";
import { cn } from "@/lib/utils";

type WhyItem = { title: string; body: string };

function WhyCard({ item, index }: { item: WhyItem; index: number }) {
  const { ref, onEnter, onMove, onLeave } = useGuideCardHot<HTMLElement>();

  return (
    <article
      ref={ref}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="itq-service-why"
      style={{ ["--guide-x" as string]: "50%", ["--guide-y" as string]: "35%" }}
    >
      <span className="itq-service-why__glow" aria-hidden />
      <span className="itq-service-why__inner" aria-hidden />
      <p className="itq-service-why__index relative z-[1] font-mono">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="itq-service-why__title relative z-[1]">{item.title}</h3>
      <p className="itq-service-why__body relative z-[1]">{item.body}</p>
    </article>
  );
}

export function ServiceWhy({
  eyebrow = "Why ISTIQEME",
  title,
  lead,
  items,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
  items: WhyItem[];
  className?: string;
}) {
  return (
    <div className={cn("itq-service-why-section", className)}>
      <Reveal className="itq-service-why-section__intro">
        <p className="itq-eyebrow">{eyebrow}</p>
        <div>
          <h2 className="itq-h2 itq-service-why-section__title text-foreground">
            {title}
            <span className="text-ember">.</span>
          </h2>
          <span className="itq-service-intro__rule" aria-hidden />
        </div>
        <p className="itq-lead itq-service-why-section__lead">{lead}</p>
      </Reveal>

      <ul className="itq-service-why-grid">
        {items.map((item, index) => (
          <Reveal as="li" key={item.title} delay={index * 45} className="h-full">
            <WhyCard item={item} index={index} />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
