"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const items = [
  { id: "p1", num: "01", label: "AI Agents" },
  { id: "p2", num: "02", label: "Owner brief" },
  { id: "p3", num: "03", label: "Operations" },
  { id: "p4", num: "04", label: "Business memory" },
  { id: "p5", num: "05", label: "Audit & builds" },
  { id: "p6", num: "06", label: "Partnership" },
  { id: "p7", num: "07", label: "Websites" },
  { id: "p8", num: "08", label: "Content" },
];

export function AiProductNav() {
  const [active, setActive] = useState("p1");

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    for (const el of sections) observer.observe(el!);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="sticky top-28 hidden max-h-[calc(100vh-8rem)] flex-col gap-1 lg:flex"
      aria-label="Products"
    >
      {items.map((item) => (
        <Link
          key={item.id}
          href={`#${item.id}`}
          className={`flex items-baseline gap-3 rounded-lg px-3 py-2 text-[13px] transition-colors ${
            active === item.id ? "bg-paper text-forest" : "text-muted hover:text-forest"
          }`}
        >
          <span className="font-display text-[15px]">{item.num}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export function AiProductNavMobile() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`#${item.id}`}
          className="shrink-0 rounded-full border border-line px-3 py-1.5 text-[12px] text-forest"
        >
          {item.num} {item.label}
        </Link>
      ))}
    </div>
  );
}
