import type { ReactNode } from "react";
import { Intake } from "@/components/Intake";
import { Reveal } from "@/components/ui/Reveal";
import { Sheet } from "@/components/ui/Sheet";
import { site } from "@/lib/site";

export function ClosingCta({
  id = "start",
  eyebrow = "Quick intake",
  title = "Not sure where to begin",
  mark = "?",
  description = "A few taps — we’ll route you to the right next step. No long brief required. Answer three quick questions, then leave a WhatsApp number.",
  extra,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  mark?: string;
  description?: string;
  extra?: ReactNode;
}) {
  return (
    <Sheet id={id} tone="ember" className="scroll-mt-24">
      <div className="itq-container grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <Reveal>
          <p className="itq-eyebrow">{eyebrow}</p>
          <h2 className="itq-h2 mt-5 text-white">
            {title}
            <span className="text-ember-bright">{mark}</span>
          </h2>
          <p className="itq-lead mt-5 max-w-md text-white/75">{description}</p>
          {extra ?? (
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/20 pt-6 text-white">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">Call</dt>
                <dd className="mt-2 space-y-1 text-[15px]">
                  {site.phones.map((p) => (
                    <a key={p.href} href={p.href} className="block hover:text-ember-bright">
                      {p.label}
                    </a>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">Email</dt>
                <dd className="mt-2 text-[15px]">
                  {site.emails.map((e) => (
                    <a key={e.href} href={e.href} className="block hover:text-ember-bright">
                      {e.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          )}
        </Reveal>
        <Reveal delay={80}>
          <Intake />
        </Reveal>
      </div>
    </Sheet>
  );
}
