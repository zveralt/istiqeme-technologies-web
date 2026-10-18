"use client";

import { useState } from "react";
import { dashboardRoles, site, waLink } from "@/lib/site";
import { Arrow } from "./Button";

const screens = {
  salesman: {
    kpis: [
      { l: "Visits today", v: "18" },
      { l: "Captured", v: "11" },
      { l: "Pending", v: "3" },
    ],
    rows: [
      ["Al-Noor Traders", "Policy inquiry", "DHA"],
      ["Faisal Cloth House", "Onboarding", "Saddar"],
      ["Harbour Supplies", "Restock", "Korangi"],
    ],
  },
  manager: {
    kpis: [
      { l: "Team close rate", v: "42%" },
      { l: "Open follow-ups", v: "27" },
      { l: "SLA risk", v: "4" },
    ],
    rows: [
      ["Ayesha", "9 / 12", "On pace"],
      ["Imran", "6 / 12", "Needs assist"],
      ["Sara", "11 / 12", "Ahead"],
    ],
  },
  ceo: {
    kpis: [
      { l: "Pipeline", v: "PKR 4.8cr" },
      { l: "Win rate", v: "31%" },
      { l: "Uptime", v: "99.99%" },
    ],
    rows: [
      ["Field ops", "Healthy", "12ms"],
      ["Onboarding", "Watch", "secured"],
      ["Collections", "Healthy", "live"],
    ],
  },
};

export function CommandCenter() {
  const [role, setRole] = useState<(typeof dashboardRoles)[number]["id"]>("salesman");
  const current = dashboardRoles.find((r) => r.id === role)!;
  const screen = screens[role];

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-muted">
          istiqeme.live
        </p>
        <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.05]">
          The command center: track every lead and sale.
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
          No more lost messages or messy spreadsheets. This is a custom system
          we designed for field sales teams. Sales staff, managers, and
          leadership each see the information they need in one secure place.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {dashboardRoles.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`rounded-full px-4 py-2 text-[13px] ${
                role === r.id ? "bg-ink text-cream" : "border border-line bg-cream"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <h3 className="mt-8 font-display text-2xl">{current.title}</h3>
        <p className="text-[13px] uppercase tracking-[0.18em] text-muted">
          {current.subtitle}
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{current.body}</p>
        <a
          href={waLink(site.whatsapp.discussText)}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-ember"
        >
          Discuss a dashboard like this <Arrow />
        </a>
      </div>
      <div className="rounded-[28px] border border-line bg-cream p-4 shadow-[0_30px_70px_-40px_rgba(22,19,16,0.45)] md:p-6">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted">
          <span>Interface snapshot</span>
          <span>Synthetic showcase data</span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {screen.kpis.map((k) => (
            <div key={k.l} className="rounded-2xl bg-paper p-3">
              <p className="text-[11px] text-muted">{k.l}</p>
              <p className="font-display text-2xl">{k.v}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-line">
          {screen.rows.map((row, idx) => (
            <div
              key={row.join("-")}
              className={`grid grid-cols-3 px-4 py-3 text-[13px] ${
                idx % 2 ? "bg-paper" : "bg-cream"
              }`}
            >
              {row.map((cell) => (
                <span key={cell}>{cell}</span>
              ))}
            </div>
          ))}
        </div>
        <ul className="mt-5 flex flex-wrap gap-4 text-[12px] text-muted">
          <li>Latency 12ms</li>
          <li>Uptime 99.99%</li>
          <li>Data sovereignty secured</li>
        </ul>
      </div>
    </div>
  );
}
