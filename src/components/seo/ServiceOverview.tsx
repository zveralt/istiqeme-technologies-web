"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import type { ServicePhoto } from "@/lib/service-media";

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

/**
 * Editorial overview: existing H2 + copy paired with service-specific photography.
 * Preserves SEO heading structure; image is decorative support, not a content rewrite.
 */
export function ServiceOverview({
  title = "What this service covers",
  description,
  image,
}: {
  title?: string;
  description: string;
  image: ServicePhoto;
}) {
  return (
    <div className="itq-service-overview">
      <Reveal className="itq-service-overview__copy">
        <ServiceIntro eyebrow="Overview" title={title} description={description} />
      </Reveal>

      <Reveal delay={80} className="itq-service-overview__media">
        <figure className="itq-service-overview__figure">
          <div className="itq-service-overview__frame">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 46vw"
              className="itq-service-overview__img object-cover"
              style={{ objectPosition: image.objectPosition ?? "center center" }}
            />
          </div>
        </figure>
      </Reveal>
    </div>
  );
}
