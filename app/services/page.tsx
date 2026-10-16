import type { Metadata } from "next";
import { Intake } from "@/components/Intake";
import { Guide } from "@/components/Guide";
import { LeadDemo } from "@/components/LeadDemo";
import { Eyebrow, Reveal } from "@/components/Reveal";
import { WhatsAppLink } from "@/components/Button";
import { services, site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Five clear options for getting your business online — from a simple landing page to a full mobile app.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-32 md:px-8 md:pt-40">
        <Eyebrow>Product catalogue</Eyebrow>
        <h1 className="max-w-4xl font-display text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.95]">
          Five ways to get your business online.
        </h1>
        <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-soft">
          From a simple landing page to a full mobile app. Every project is
          quoted individually. Chat with us to find the right fit.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <Reveal>
          <Eyebrow>AI matcher</Eyebrow>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
            Find your best package.
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] text-ink-soft">
            Answer a few questions in English or Urdu. The assistant recommends
            the right ISTIQEME package, then sends you to WhatsApp for a custom
            quote.
          </p>
        </Reveal>
        <div className="mt-10">
          <Guide
            title="Find your package"
            intro="Tell me what you need in English or Urdu. I’ll recommend a package, then you can continue on WhatsApp for a custom quote."
            suggestions={[
              "I need a website that gets leads",
              "We want an online store",
              "Mujhe kaun sa package chahiye?",
            ]}
          />
        </div>
      </section>

      <section className="space-y-6 px-5 pb-24 md:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 40}>
              <article
                id={s.id}
                className="scroll-mt-28 overflow-hidden rounded-[28px] border border-line bg-cream"
              >
                <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="bg-paper p-8 md:p-10">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
                      Tier {s.tier} · {s.category}
                    </p>
                    <h2 className="mt-3 font-display text-4xl">{s.title}</h2>
                    <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                      {s.summary}
                    </p>
                    {"architecture" in s && s.architecture && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {s.architecture.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-line px-3 py-1 text-[12px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {"addons" in s && s.addons && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {s.addons.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-sand px-3 py-1 text-[12px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-8 md:p-10">
                    <p className="text-[12px] uppercase tracking-[0.2em] text-muted">
                      What you get
                    </p>
                    <ul className="mt-4 space-y-3">
                      {s.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-[15px] leading-relaxed text-ink-soft"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={waLink(
                        `Hi ISTIQEME Technologies — I'd like to discuss ${s.title} for my business.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex text-[13px] font-medium text-ember"
                    >
                      Discuss this project on WhatsApp →
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream/80 px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <LeadDemo />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-2 md:px-8">
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
              Discuss your project on WhatsApp
            </WhatsAppLink>
          </div>
        </div>
        <Intake />
      </section>
    </>
  );
}
