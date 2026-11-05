"use client";

import type { ReactNode } from "react";
import { DisplayTitle, type TitleLine } from "@/components/ui/DisplayTitle";
import { HeroImageBackground } from "@/components/ui/HeroImageBackground";

export function PageHero({
  id,
  eyebrow,
  title,
  accent,
  description,
  children,
  imageSrc,
  imageAlt,
  imagePosition,
  lead,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  children?: ReactNode;
  /** Optional trail above the eyebrow (e.g. breadcrumbs). */
  lead?: ReactNode;
  /** Interior pages: local photo under /public/images/heroes */
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
}) {
  const lines: TitleLine[] = accent
    ? [
        { text: title },
        { text: accent, accent: true },
      ]
    : [{ text: title }];

  const hasImage = Boolean(imageSrc);

  return (
    <section
      id={id}
      data-header-theme="light"
      className="itq-stage relative overflow-hidden pb-14 pt-[max(7.5rem,calc(env(safe-area-inset-top)+5.5rem))] md:pb-24 md:pt-40"
    >
      {hasImage ? (
        <HeroImageBackground
          src={imageSrc!}
          alt={imageAlt ?? ""}
          objectPosition={imagePosition}
        />
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 itq-grid" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-[#0a0a0c]"
            aria-hidden
          />
        </>
      )}
      <div className="itq-container relative">
        {lead ? <div className="mb-6">{lead}</div> : null}
        <p className="itq-eyebrow">{eyebrow}</p>
        <DisplayTitle lines={lines} className="itq-hero-title mt-6 max-w-5xl" />
        {description ? <p className="itq-lead mt-7 max-w-2xl text-balance">{description}</p> : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
