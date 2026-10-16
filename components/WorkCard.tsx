"use client";

import { useRef } from "react";

export function WorkCard({
  name,
  kind,
  body,
  href,
  uptime,
  image,
  problem,
}: {
  name: string;
  kind: string;
  body: string;
  href: string;
  uptime: string;
  image: string;
  problem: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function tilt(event: React.MouseEvent<HTMLAnchorElement>) {
    const node = ref.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    node.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-4px)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={tilt}
      onMouseLeave={reset}
      className="group block overflow-hidden rounded-[24px] border border-line bg-forest text-white transition-transform duration-300 delay-75"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative h-44">
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-forest/55" />
        <p className="absolute bottom-4 left-5 text-[11px] uppercase tracking-[0.22em] text-white/80">
          Operational · {uptime} uptime
        </p>
      </div>
      <div className="p-6">
        <p className="text-[13px] text-ember-bright">{problem}</p>
        <h3 className="mt-2 font-display text-2xl">{name}</h3>
        <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-white/60">
          {kind}
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-white/85">{body}</p>
        <p className="mt-5 text-[13px] text-ember-bright transition delay-100 group-hover:translate-x-1">
          Visit live site →
        </p>
      </div>
    </a>
  );
}
