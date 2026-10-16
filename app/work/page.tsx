import type { Metadata } from "next";
import { CommandCenter } from "@/components/CommandCenter";
import { Compare } from "@/components/Compare";
import { Guide } from "@/components/Guide";
import { Intake } from "@/components/Intake";
import { Eyebrow } from "@/components/Reveal";
import { VoiceAgent } from "@/components/VoiceAgent";
import { site, work } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "See real sites we have built, try our live demos, and reach our team directly when you are ready to talk.",
};

export default function WorkPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-32 md:px-8 md:pt-40">
        <Eyebrow>Portfolio</Eyebrow>
        <h1 className="max-w-4xl font-display text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.95]">
          Our work.
        </h1>
        <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-soft">
          See real sites we have built, try our live demos, and reach our team
          directly when you are ready to talk.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <Compare />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <CommandCenter />
      </section>

      <section className="px-5 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <VoiceAgent />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Eyebrow>Demo guide</Eyebrow>
        <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.05]">
          Tour our live work.
        </h2>
        <p className="mt-4 max-w-2xl text-[16px] text-ink-soft">
          Ask about our demos and real projects — before/after sites, the
          Command Center, or the AI receptionist — then book a WhatsApp audit.
        </p>
        <div className="mt-10">
          <Guide
            title="Tour the work"
            intro="Ask about our demos and real projects — before/after sites, the Command Center, or the AI receptionist — then book a WhatsApp audit."
            suggestions={[
              "Show me proof for my industry",
              "What is the Command Center?",
              "How does the AI receptionist work?",
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
        <Eyebrow>Live client sites</Eyebrow>
        <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)]">
          Real websites we build and operate.
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {work.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-[24px] border border-line bg-cream p-6 transition hover:-translate-y-1"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
                {item.uptime} uptime
              </p>
              <h3 className="mt-3 font-display text-3xl">{item.name}</h3>
              <p className="mt-1 text-[13px] text-muted">{item.kind}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                {item.body}
              </p>
              <p className="mt-6 text-[13px] text-ember">Visit live site →</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.1fr] md:px-8">
        <div>
          <Eyebrow>Correspondence</Eyebrow>
          <h2 className="font-display text-4xl">Corporate headquarters</h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
            {site.address}
          </p>
          <p className="mt-6 text-[13px] uppercase tracking-[0.2em] text-muted">
            Direct phone lines
          </p>
          <p className="mt-2">
            {site.phones.map((p) => p.label).join(" · ")}
          </p>
          <p className="mt-6 text-[13px] uppercase tracking-[0.2em] text-muted">
            Secure corporate inquiries
          </p>
          <p className="mt-2">
            {site.emails.map((e) => e.label).join(" ")}
          </p>
        </div>
        <Intake />
      </section>
    </>
  );
}
