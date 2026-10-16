import type { Metadata } from "next";
import { Intake } from "@/components/Intake";
import { Eyebrow, Reveal } from "@/components/Reveal";
import { WhatsAppLink } from "@/components/Button";
import { site, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "Team",
  description:
    "From banking-grade environments to SME scale — leadership and engineering under one roof.",
};

export default function TeamPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-32 md:px-8 md:pt-40">
        <Eyebrow>Leadership</Eyebrow>
        <h1 className="max-w-4xl font-display text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.95]">
          The core execution team.
        </h1>
        <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-soft">
          From banking-grade environments to SME scale — leadership and
          engineering under one roof.
        </p>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-5 pb-20 md:px-8">
        {team.map((person, i) => (
          <Reveal key={person.name} delay={i * 60}>
            <article className="overflow-hidden rounded-[32px] border border-line bg-cream">
              <div className="grid md:grid-cols-[280px_1fr]">
                <div className="flex flex-col justify-between bg-ink p-8 text-cream md:min-h-[340px]">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-cream/10 font-display text-2xl">
                    {person.initials}
                  </div>
                  <div className="mt-12">
                    <h2 className="font-display text-3xl leading-tight">
                      {person.name}
                    </h2>
                    <p className="mt-2 text-[13px] text-cream/60">{person.role}</p>
                  </div>
                </div>
                <div className="grid gap-8 p-8 md:p-10">
                  {person.sections.map((section) => (
                    <div key={section.label}>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
                        {section.label}
                      </p>
                      <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
                        {section.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:px-8">
        <div>
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
            Ready to get started?
          </h2>
          <p className="mt-4 text-[16px] text-ink-soft">
            Whether you want to talk on WhatsApp or tap through a quick intake,
            our engineering team is here to help.
          </p>
          <div className="mt-8">
            <WhatsAppLink text={site.whatsapp.discussText}>
              Message us on WhatsApp
            </WhatsAppLink>
          </div>
        </div>
        <Intake />
      </section>
    </>
  );
}
