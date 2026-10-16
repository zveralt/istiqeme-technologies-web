import type { Metadata } from "next";
import { Intake } from "@/components/Intake";
import { Guide } from "@/components/Guide";
import { LeadDemo } from "@/components/LeadDemo";
import { Eyebrow, Reveal } from "@/components/Reveal";
import { WhatsAppLink } from "@/components/Button";
import { serviceMenu, services, site, waLink } from "@/lib/site";

function stackStyle(index: number) {
  return {
    top: 120,
    zIndex: index + 1,
    background: `linear-gradient(${150 + index * 8}deg, #070707 0%, #1c1c1c 55%, #111111 100%)`,
    color: "#ffffff",
  };
}

export const metadata: Metadata = {
  title: "Services",
  description:
    "Five clear options for getting your business online â€” from a simple landing page to a full mobile app.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="glow-field w-full bg-white px-5 pb-12 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-7xl">
        <Eyebrow>Product catalogue</Eyebrow>
        <h1 className="max-w-4xl font-display text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.95]">
          Five ways to get your business online.
        </h1>
        <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-soft">
          From a simple landing page to a full mobile app. Every project is
          quoted individually. Chat with us to find the right fit.
        </p>
        </div>
      </section>

      <section className="w-full bg-black/[0.03] px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-7xl">
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
            intro="Tell me what you need in English or Urdu. Iâ€™ll recommend a package, then you can continue on WhatsApp for a custom quote."
            suggestions={[
              "I need a website that gets leads",
              "We want an online store",
              "Mujhe kaun sa package chahiye?",
            ]}
          />
        </div>
        </div>
      </section>

      <section className="w-full bg-white px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>What we provide</Eyebrow>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] text-forest">
            A solution for each job.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {serviceMenu.map((item) => (
              <article key={item.id} id={item.id} className="scroll-mt-28 rounded-[24px] border border-line bg-[#f6f8fb] p-6">
                <h3 className="font-display text-2xl text-forest">{item.title}</h3>
                <p className="mt-3 text-[15px] text-ink-soft">{item.problem}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink">{item.solution}</p>
                <a
                  href={waLink(
                    `Hi ISTIQEME Technologies — I'd like to discuss ${item.title} for my business.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex text-[13px] font-medium text-forest"
                >
                  Discuss this on WhatsApp →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band-deep glow-field w-full px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow className="text-white/65">Catalogue</Eyebrow>
          <h2 className="max-w-3xl font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] text-white">
            Five ways to get the work online.
          </h2>
          <div className="relative mt-16">
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className="sticky mb-4 scroll-mt-28 rounded-[24px] p-6"
              style={stackStyle(i)}
            >
              <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.16em]">
                Tier {s.tier} · {s.category}
              </p>
              <p className="mt-4 text-[14px] opacity-80">{s.problem}</p>
              <h2 className="mt-2 font-display text-4xl">{s.title}</h2>
              <p className="mt-4 text-[16px] leading-relaxed opacity-90">
                {s.summary}
              </p>
              <ul className="mt-4 space-y-3">
                {s.points.map((point) => (
                  <li key={point} className="text-[15px] leading-relaxed opacity-85">
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
                className="mt-6 inline-flex text-[13px] font-medium underline"
              >
                Discuss this project on WhatsApp →
              </a>
            </article>
          ))}
          </div>
        </div>
      </section>
      <section className="bg-black/[0.03] px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <LeadDemo />
        </div>
      </section>

      <section className="w-full bg-white px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
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
        </div>
      </section>
    </>
  );
}
