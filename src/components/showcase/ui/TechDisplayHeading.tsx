import { useRef, type RefObject } from "react";
import { useScrollParallax } from "../hooks/useScrollParallax";

type TechDisplayHeadingProps = {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  size?: "hero" | "section" | "card";
  pageTitle?: boolean;
  className?: string;
  id?: string;
};

const sizeClass = {
  hero: "text-[1.65rem] sm:text-5xl md:text-6xl lg:text-7xl",
  section: "text-[1.45rem] sm:text-4xl md:text-5xl lg:text-5xl",
  card: "text-lg sm:text-2xl md:text-3xl lg:text-3xl",
} as const;

const tagSizeClass = {
  h1: "text-[1.65rem] sm:text-5xl md:text-6xl lg:text-7xl",
  h2: "text-[1.45rem] sm:text-4xl md:text-5xl lg:text-5xl",
  h3: "text-lg sm:text-2xl md:text-3xl lg:text-3xl",
} as const;

export function TechDisplayHeading({
  lines,
  as: Tag = "h1",
  size,
  pageTitle = false,
  className = "",
  id,
}: TechDisplayHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const scale = size ? sizeClass[size] : tagSizeClass[Tag];

  useScrollParallax(ref as RefObject<HTMLElement | null>, pageTitle ? 6 : 0);

  return (
    <Tag
      id={id}
      ref={ref as never}
      className={`tech-masthead leading-none tracking-tight text-white break-keep hyphens-none ${scale} ${className}`}
    >
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </Tag>
  );
}
