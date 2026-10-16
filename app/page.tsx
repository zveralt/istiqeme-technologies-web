import { ButtonLink, WhatsAppLink } from "@/components/Button";
import { Guide } from "@/components/Guide";
import { Intake } from "@/components/Intake";
import { LeadDemo } from "@/components/LeadDemo";
import { Reveal, Eyebrow } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";
import { WorkCard } from "@/components/WorkCard";
import { marquee, pillars, problems, services, site, work } from "@/lib/site";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section id="top" className="glow-field relative overflow-hidden bg-white px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-[clamp(1.15rem,2.4vw,1.7rem)] font-bold leading-snug text-forest">
            “The standard for technology inquiries — systems that answer before the question grows old.”
          </p>
          <p className="mt-8 text-[11px] uppercase tracking-[0.32em] text-muted">
            {site.city} · Est. {site.since} · ISTIQEME Technologies
          </p>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.7rem,8vw,7.2rem)] leading-[0.92] tracking-[-0.03em] text-forest">
            Complex systems.
            <br />
            <span className="font-accent">Beautifully simplified.</span>
          </h1>
          <p className="mt-8 max-w-xl text-[18px] leading-relaxed text-ink-soft md:text-[19px]">
            High-performance digital tools for growing businesses — built in
            Karachi since {site.since}.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/start" variant="ember">
              Start quick intake
            </ButtonLink>
            <WhatsAppLink variant="ghost">Message us on WhatsApp</WhatsAppLink>
          </div>
        </div>
      </section>

      <div className="border-y border-line bg-black/[0.03] py-4">
        <div className="flex overflow-hidden">
          <div className="marquee-track flex min-w-full gap-10 pr-10 text-[13px] uppercase tracking-[0.28em] text-muted">
            {[...marquee, ...marquee].map((item, i) => (
              <span key={`${item}-${i}`} className="flex items-center gap-10">
                {item}
                <span className="h-1 w-1 rounded-full bg-ember" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <section id="services" className="band-deep glow-field px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow className="text-white/75">Our services</Eyebrow>
                <h2 className="font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.05] text-white">
                  What we build
                </h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white/75">
                  Websites, online stores, mobile apps, AI assistants, and
                  marketing — scoped to your business, not a one-size-fits-all
                  template.
                </p>
              </div>
              <ButtonLink href="/services" variant="ghost">
                See all services
              </ButtonLink>
            </div>
          </Reveal>
          <div className="relative mt-8">
            {services.map((s, i) => (
              <Link
                key={s.id}
                href={`/services#${s.id}`}
                className="group sticky mb-4 flex flex-col justify-between rounded-[24px] border border-line bg-white p-6 text-ink shadow-[0_16px_40px_-24px_rgba(7,24,44,0.45)]"
                style={{ top: 108, zIndex: i + 1 }}
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
                    Tier {s.tier} · {s.category}
                  </p>
                  <p className="mt-3 text-[13px] text-forest">{s.problem}</p>
                  <h3 className="mt-2 font-display text-2xl text-forest">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                    {s.summary}
                  </p>
                </div>
                <span className="mt-6 text-[13px] text-forest transition delay-100 group-hover:translate-x-1">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl bg-white px-5 py-24 md:px-8">
        <Reveal>
          <Eyebrow>AI voice assistant</Eyebrow>
          <h2 className="max-w-3xl font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.05]">
            Ask anything. Get a clear answer. Continue on WhatsApp.
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
            Tap a question or type your own. The assistant listens in English or
            Urdu, explains in simple words, and can connect you with the
            engineering team when you are ready.
          </p>
        </Reveal>
        <div className="mt-10">
          <Guide />
        </div>
      </section>

      <section className="bg-black/[0.03] px-5 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Testimonials />
        </div>
      </section>

      <section className="mx-auto max-w-7xl bg-white px-5 py-24 md:px-8">
        <Reveal>
          <Eyebrow>What we do best</Eyebrow>
        </Reveal>
        <div className="mt-8 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="bg-paper p-8">
              <span className="font-display text-4xl text-ember/80">
                0{i + 1}
              </span>
              <h3 className="mt-6 font-display text-2xl">{p.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-black/[0.03] px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <LeadDemo />
        </div>
      </section>

      <section id="work" className="glow-field mx-auto max-w-7xl scroll-mt-28 bg-white px-5 py-24 md:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>Our work</Eyebrow>
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.05]">
                Live client sites
              </h2>
              <p className="mt-4 max-w-xl text-[16px] text-ink-soft">
                Real websites and systems we build and run — designed for speed,
                clarity, and trust.
              </p>
            </div>
            <ButtonLink href="/work" variant="ghost">
              View portfolio
            </ButtonLink>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {work.map((item, i) => (
            <Reveal key={item.name} delay={i * 80}>
              <WorkCard {...item} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="problems" className="band-deep glow-field scroll-mt-28 px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow className="text-white/75">Problems we solve</Eyebrow>
            <h2 className="max-w-3xl font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05] text-white">
              Every system starts with a problem we already see in the market.
            </h2>
            <p className="mt-4 max-w-xl text-[16px] text-white/75">
              Since {site.since} we have built practical tools for retailers,
              wholesalers, and local businesses in Karachi. These are the
              gaps we keep meeting — and the systems that close them.
            </p>
          </Reveal>
          <div className="relative mt-8">
            {problems.map((item, i) => (
              <Link
                key={item.problem}
                href={item.href}
                className="sticky mb-4 block rounded-[24px] border border-line bg-white p-6 text-ink shadow-[0_16px_40px_-24px_rgba(7,24,44,0.45)]"
                style={{ top: 108, zIndex: i + 1 }}
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
                  The problem
                </p>
                <h3 className="mt-3 font-display text-2xl text-forest">{item.problem}</h3>
                <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-forest">
                  What we build
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {item.solution}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="start" className="mx-auto grid max-w-7xl gap-12 bg-black/[0.03] px-5 py-24 md:grid-cols-2 md:px-8">
        <Reveal>
          <Eyebrow>Quick intake</Eyebrow>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05]">
            Not sure where to begin?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            A few taps — we’ll route you to the right next step. No long brief
            required. Answer three quick questions, then leave a WhatsApp
            number.
          </p>
        </Reveal>
        <Intake />
      </section>
    </>
  );
}
