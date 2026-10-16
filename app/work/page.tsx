import type { Metadata } from "next";
import { CommandCenter } from "@/components/CommandCenter";
import { Compare } from "@/components/Compare";
import { Guide } from "@/components/Guide";
import { Intake } from "@/components/Intake";
import { Eyebrow } from "@/components/Reveal";
import { VoiceAgent } from "@/components/VoiceAgent";
import { WorkCard } from "@/components/WorkCard";
import { site, work, workMenu } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "See real sites we have built, try our live demos, and reach our team directly when you are ready to talk.",
};

export default function WorkPage() {
  return (
    <>
      <section className="glow-field w-full bg-white px-5 pb-12 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-7xl">
        <Eyebrow>Portfolio</Eyebrow>
        <h1 className="max-w-4xl font-display text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.95]">
          Our work.
        </h1>
        <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-soft">
          See real sites we have built, try our live demos, and reach our team
          directly when you are ready to talk.
        </p>
        </div>
      </section>

      <section className="w-full bg-black/[0.03] px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Compare />
        </div>
      </section>

      <section className="w-full bg-white px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <CommandCenter />
        </div>
      </section>

      <section className="bg-black/[0.03] px-5 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <VoiceAgent />
        </div>
      </section>

      <section className="w-full bg-white px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
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
        </div>
      </section>

      <section className="w-full bg-white px-5 pb-8 md:px-8">
        <div className="mx-auto max-w-7xl">
        <Eyebrow>Solutions</Eyebrow>
        <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)]">
          What we have built for problems in the market.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {workMenu.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="scroll-mt-28 rounded-[24px] bg-forest p-6 text-white"
            >
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-[12px] uppercase tracking-[0.18em] text-white/55">
                The problem
              </p>
              <p className="mt-1 text-[15px]">{item.problem}</p>
              <p className="mt-4 text-[12px] uppercase tracking-[0.18em] text-ember-bright">
                The system
              </p>
              <p className="mt-1 text-[15px] leading-relaxed text-white/85">
                {item.solution}
              </p>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section className="w-full bg-black/[0.03] px-5 pb-12 md:px-8">
        <div className="mx-auto max-w-7xl">
        <Eyebrow>Live client sites</Eyebrow>
        <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)]">
          Real websites we build and operate.
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {work.map((item) => (
            <WorkCard key={item.name} {...item} />
          ))}
        </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 bg-white px-5 py-20 md:grid-cols-[1fr_1.1fr] md:px-8">
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
