import { ButtonLink, WhatsAppLink } from "@/components/Button";
import { Guide } from "@/components/Guide";
import { Intake } from "@/components/Intake";
import { LeadDemo } from "@/components/LeadDemo";
import { Reveal, Eyebrow } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";
import { marquee, pillars, services, site, team, work } from "@/lib/site";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-36">
        <div className="pointer-events-none absolute -right-24 top-10 hidden h-[520px] w-[520px] rounded-full border border-line md:block" />
        <div className="pointer-events-none absolute -right-8 top-32 hidden h-[360px] w-[360px] rounded-full border border-ember/20 md:block" />
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-muted">
            {site.city} · Est. {site.since} · ISTIQEME Technologies
          </p>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.7rem,8vw,7.2rem)] leading-[0.92] tracking-[-0.03em]">
            Complex systems.
            <br />
            <em className="text-ember">Beautifully simplified.</em>
          </h1>
          <p className="mt-8 max-w-xl text-[18px] leading-relaxed text-ink-soft md:text-[19px]">
            High-performance digital tools for growing businesses — built in
            Karachi since 2019.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/start" variant="ember">
              Start quick intake
            </ButtonLink>
            <WhatsAppLink variant="ghost">Message us on WhatsApp</WhatsAppLink>
          </div>
        </div>
      </section>

      <div className="border-y border-line bg-paper-deep/50 py-4">
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

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-8">
        <Reveal className="md:col-span-5">
          <Eyebrow>Our corporate journey</Eyebrow>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05]">
            Banking-grade discipline, built for the shop next door.
          </h2>
        </Reveal>
        <Reveal className="md:col-span-7 md:pt-10" delay={80}>
          <p className="text-[17px] leading-relaxed text-ink-soft">
            ISTIQEME Technologies is the software arm of the ISTIQEME group.
            Since 2019, our parent company has delivered large-scale sales and
            onboarding systems for major telecom and banking networks.
          </p>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
            We bring that same reliability to local retailers, wholesalers, and
            businesses in Karachi — practical tools your team can actually use
            every day.
          </p>
          <p className="mt-8 text-[11px] uppercase tracking-[0.26em] text-muted">
            Our mission · Operational roots since 2019
          </p>
        </Reveal>
      </section>

      <section className="bg-cream/70 px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow>Our services</Eyebrow>
                <h2 className="font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.05]">
                  What we build
                </h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-soft">
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
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 70} className={i === 0 ? "md:col-span-2 xl:col-span-1" : ""}>
                <Link
                  href={`/services#${s.id}`}
                  className="group flex h-full flex-col justify-between rounded-[24px] border border-line bg-paper p-6 transition hover:-translate-y-1 hover:border-ember/40 hover:shadow-[0_24px_50px_-32px_rgba(22,19,16,0.45)]"
                >
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
                      Tier {s.tier} · {s.category}
                    </p>
                    <h3 className="mt-3 font-display text-2xl">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                      {s.summary}
                    </p>
                  </div>
                  <span className="mt-6 text-[13px] text-ember">Explore →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
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

      <section className="px-5 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Testimonials />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
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

      <section className="bg-cream/70 px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <LeadDemo />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
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
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-[24px] border border-line bg-cream"
              >
                <div className="relative h-40 bg-forest">
                  <div className="ajrak absolute inset-0 opacity-40" />
                  <p className="relative p-5 text-[11px] uppercase tracking-[0.22em] text-cream/70">
                    Operational · {item.uptime} uptime
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl group-hover:text-ember">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-muted">
                    {item.kind}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                  <p className="mt-5 text-[13px] text-ember">Visit live site →</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-paper-deep/60 px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow>Our team</Eyebrow>
                <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05]">
                  Who builds your system
                </h2>
                <p className="mt-4 max-w-xl text-[16px] text-ink-soft">
                  Experienced engineers and designers who have built systems for
                  banks, retailers, and growing local businesses.
                </p>
              </div>
              <ButtonLink href="/team" variant="ghost">
                Meet the team
              </ButtonLink>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {team.map((person, i) => (
              <Reveal key={person.name} delay={i * 70}>
                <article className="rounded-[24px] border border-line bg-paper p-6">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ink font-display text-xl text-cream">
                    {person.initials}
                  </div>
                  <h3 className="mt-5 font-display text-2xl">{person.name}</h3>
                  <p className="mt-1 text-[13px] text-muted">{person.role}</p>
                  <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">
                    {person.sections[0].body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="start" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2 md:px-8">
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
