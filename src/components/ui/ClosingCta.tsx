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
      <div className="itq-container grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-6">
          <p className="itq-eyebrow">{eyebrow}</p>
          <h2 className="itq-h2 mt-5 max-w-[14ch] text-foreground">
            {title}
            <span className="text-ember">{mark}</span>
          </h2>
          <p className="itq-lead mt-6 max-w-md">{description}</p>
          {extra ?? (
            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-line pt-7 text-foreground">
              <div>
                <dt className="itq-micro">Call</dt>
                <dd className="mt-3 space-y-1.5 text-[15px]">
                  {site.phones.map((p) => (
                    <a key={p.href} href={p.href} className="itq-ulink block w-fit tabular-nums hover:text-ember-bright">
                      {p.label}
                    </a>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="itq-micro">Email</dt>
                <dd className="mt-3 text-[15px]">
                  {site.emails.map((e) => (
                    <a key={e.href} href={e.href} className="itq-ulink block w-fit hover:text-ember-bright">
                      {e.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          )}
        </Reveal>
        <Reveal delay={100} className="lg:col-span-6">
          <Intake />
        </Reveal>
      </div>
    </Sheet>
  );
}
