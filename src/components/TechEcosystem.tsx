"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type EcoNodeId = "customers" | "website" | "whatsapp" | "ai" | "crm" | "automation" | "team";

type EcoNode = {
  id: EcoNodeId;
  label: string;
  sub: string;
  what: string;
  example: string;
  href?: string;
  /** Desktop (1000×560) and mobile (400×760) coordinates */
  d: [number, number];
  m: [number, number];
};

const NODES: EcoNode[] = [
  {
    id: "customers",
    label: "Customers",
    sub: "Search, ads, referrals",
    what: "People find you through Google, social posts, ads, or a friend's recommendation — often outside office hours.",
    example: "A buyer sees a campaign at 1:40 AM and taps through.",
    href: "/services/digital-marketing",
    d: [90, 280],
    m: [200, 50],
  },
  {
    id: "website",
    label: "Website or store",
    sub: "Pages, catalog, forms",
    what: "A fast site or store that explains the offer and captures the inquiry with a form or a WhatsApp button.",
    example: "The product page answers the basics; the form collects name, need, and area.",
    href: "/services/web-design-development",
    d: [300, 140],
    m: [100, 170],
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    sub: "Chat and voice handoff",
    what: "The channel most Pakistani customers already use. Chat and voice conversations continue here with context.",
    example: "The buyer messages directly instead of filling the form.",
    d: [300, 420],
    m: [300, 170],
  },
  {
    id: "ai",
    label: "AI assistant",
    sub: "Answers and qualifies",
    what: "Answers from your own prices, stock, and rules, asks qualifying questions, and escalates what it should not handle.",
    example: "It answers delivery and pricing, asks budget and timeline, flags the lead as warm.",
    href: "/services/ai-solutions",
    d: [520, 280],
    m: [200, 320],
  },
  {
    id: "crm",
    label: "CRM",
    sub: "One record per lead",
    what: "Every conversation lands as a record with owner, status, and history — not in someone's private chat.",
    example: "A lead card is created with the transcript, score, and assigned salesperson.",
    href: "/services/custom-software-development",
    d: [740, 140],
    m: [100, 480],
  },
  {
    id: "automation",
    label: "Automation",
    sub: "Follow-ups and alerts",
    what: "Rules that send follow-ups, reminders, and alerts so nothing waits for someone to remember.",
    example: "A morning reminder goes to the salesperson; the buyer gets a confirmation message.",
    href: "/services/ai-solutions",
    d: [740, 420],
    m: [300, 480],
  },
  {
    id: "team",
    label: "Your team",
    sub: "Dashboards and apps",
    what: "Staff, managers, and leadership see the same pipeline from their own role, on web or a mobile app.",
    example: "At 9 AM the manager sees overnight leads, who owns them, and what is overdue.",
    href: "/services/mobile-app-development",
    d: [920, 280],
    m: [200, 640],
  },
];

type Edge = { from: EcoNodeId; to: EcoNodeId; label: string };

const EDGES: Edge[] = [
  { from: "customers", to: "website", label: "Visits" },
  { from: "customers", to: "whatsapp", label: "Messages" },
  { from: "website", to: "ai", label: "Form or chat" },
  { from: "whatsapp", to: "ai", label: "Conversation" },
  { from: "ai", to: "crm", label: "Logs lead" },
  { from: "ai", to: "automation", label: "Triggers rules" },
  { from: "automation", to: "whatsapp", label: "Follow-up" },
  { from: "crm", to: "team", label: "Assigned" },
  { from: "automation", to: "team", label: "Alerts" },
];

const edgeKey = (e: Edge) => `${e.from}-${e.to}`;

const SCENARIO: { edge: string; node: EcoNodeId; caption: string }[] = [
  { edge: "customers-whatsapp", node: "whatsapp", caption: "1:42 AM — a buyer messages about delivery to Gulshan." },
  { edge: "whatsapp-ai", node: "ai", caption: "The assistant answers from your price list and asks budget and timeline." },
  { edge: "ai-crm", node: "crm", caption: "It creates a lead record with the transcript and marks it warm." },
  { edge: "ai-automation", node: "automation", caption: "A rule queues a confirmation to the buyer and a reminder for sales." },
  { edge: "automation-whatsapp", node: "whatsapp", caption: "The buyer gets a short confirmation with the next step." },
  { edge: "crm-team", node: "team", caption: "9:00 AM — the salesperson opens the lead with full context and calls back." },
];

const STEP_MS = 2200;

function curve(a: [number, number], b: [number, number], vertical: boolean) {
  const [x1, y1] = a;
  const [x2, y2] = b;
  if (vertical) {
    const my = (y1 + y2) / 2;
    return `M${x1} ${y1} C${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
  }
  const mx = (x1 + x2) / 2;
  return `M${x1} ${y1} C${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

export function TechEcosystem({
  focus,
  className,
}: {
  /** Nodes to emphasise for a specific service page */
  focus?: EcoNodeId[];
  className?: string;
}) {
  const byId = useMemo(() => Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<EcoNodeId, EcoNode>, []);
  const [active, setActive] = useState<EcoNodeId>(focus?.[0] ?? "ai");
  const [hover, setHover] = useState<EcoNodeId | null>(null);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number | null>(null);

  const shown = hover ?? active;
  const scenario = step >= 0 ? SCENARIO[step] : null;

  const connected = useMemo(() => {
    const set = new Set<string>();
    for (const e of EDGES) if (e.from === shown || e.to === shown) set.add(edgeKey(e));
    return set;
  }, [shown]);

  const stop = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    timer.current = window.setTimeout(() => {
      setStep((s) => {
        const next = s + 1;
        if (next >= SCENARIO.length) {
          setPlaying(false);
          return s;
        }
        setActive(SCENARIO[next].node);
        return next;
      });
    }, step < 0 ? 0 : STEP_MS);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [playing, step]);

  const play = () => {
    setHover(null);
    if (step >= SCENARIO.length - 1 || step < 0) setStep(-1);
    setPlaying(true);
  };

  const select = (id: EcoNodeId) => {
    stop();
    setStep(-1);
    setActive(id);
  };

  const edgeState = (e: Edge) => {
    const k = edgeKey(e);
    if (scenario) {
      const idx = SCENARIO.findIndex((s) => s.edge === k);
      if (idx === step) return "live";
      if (idx >= 0 && idx < step) return "done";
      return "dim";
    }
    return connected.has(k) ? "live" : "dim";
  };

  const nodeState = (id: EcoNodeId) => {
    if (scenario) {
      if (scenario.node === id) return "live";
      const visited = SCENARIO.slice(0, step + 1).some((s) => s.node === id || s.edge.startsWith(`${id}-`));
      return visited ? "done" : "idle";
    }
    if (id === shown) return "live";
    for (const e of EDGES) if ((e.from === shown && e.to === id) || (e.to === shown && e.from === id)) return "near";
    return "idle";
  };

  const detail = byId[shown];

  const renderSvg = (vertical: boolean) => (
    <svg
      viewBox={vertical ? "0 0 400 700" : "0 0 1000 560"}
      className={cn("itq-eco__svg", vertical ? "itq-eco__svg--m" : "itq-eco__svg--d")}
      aria-hidden
    >
      {EDGES.map((e) => {
        const a = vertical ? byId[e.from].m : byId[e.from].d;
        const b = vertical ? byId[e.to].m : byId[e.to].d;
        const path = curve(a, b, vertical);
        const state = edgeState(e);
        return (
          <g key={edgeKey(e)} className="itq-eco__edge" data-state={state}>
            <path d={path} className="itq-eco__edge-track" />
            <path d={path} className="itq-eco__edge-flow" pathLength={100} />
          </g>
        );
      })}
    </svg>
  );

  return (
    <div className={cn("itq-eco", className)}>
      <div className="itq-eco__stage">
        {renderSvg(false)}
        {renderSvg(true)}
        {NODES.map((n) => {
          const state = nodeState(n.id);
          const emphasised = focus?.includes(n.id);
          return (
            <button
              key={n.id}
              type="button"
              className="itq-eco__node"
              data-state={state}
              data-focus={emphasised ? "true" : undefined}
              aria-pressed={active === n.id}
              aria-label={`${n.label}: ${n.sub}`}
              style={
                {
                  "--dx": `${(n.d[0] / 1000) * 100}%`,
                  "--dy": `${(n.d[1] / 560) * 100}%`,
                  "--mx": `${(n.m[0] / 400) * 100}%`,
                  "--my": `${(n.m[1] / 700) * 100}%`,
                } as React.CSSProperties
              }
              onPointerEnter={() => !playing && setHover(n.id)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => !playing && setHover(n.id)}
              onBlur={() => setHover(null)}
              onClick={() => select(n.id)}
            >
              <span className="itq-eco__dot" aria-hidden />
              <span className="itq-eco__label">{n.label}</span>
              <span className="itq-eco__sub">{n.sub}</span>
            </button>
          );
        })}
      </div>

      <div className="itq-eco__panel">
        <div className="itq-eco__controls">
          <button type="button" className="itq-eco__play" onClick={playing ? stop : play}>
            <span aria-hidden className="itq-eco__play-icon" data-playing={playing ? "true" : undefined} />
            {playing ? "Pause" : step >= SCENARIO.length - 1 ? "Replay the 2 AM inquiry" : step >= 0 ? "Resume" : "Play a 2 AM inquiry"}
          </button>
          <div className="itq-eco__steps" aria-hidden>
            {SCENARIO.map((s, i) => (
              <span key={s.edge + i} data-on={i <= step ? "true" : undefined} />
            ))}
          </div>
        </div>

        <div className="itq-eco__detail" aria-live="polite">
          {scenario ? (
            <>
              <p className="itq-eco__kicker">
                Step {step + 1} of {SCENARIO.length} · {byId[scenario.node].label}
              </p>
              <p className="itq-eco__caption">{scenario.caption}</p>
            </>
          ) : (
            <>
              <p className="itq-eco__kicker">{detail.sub}</p>
              <p className="itq-eco__title">{detail.label}</p>
              <p className="itq-eco__what">{detail.what}</p>
              <p className="itq-eco__example">
                <span>Example</span> {detail.example}
              </p>
              {detail.href ? (
                <Link href={detail.href} className="itq-eco__link itq-link-arrow">
                  Related service
                </Link>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
