import type { Metadata } from "next";
import { Intake } from "@/components/Intake";
import { Eyebrow } from "@/components/Reveal";
import { WhatsAppLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "A few taps — we’ll route you to the right next step. No long brief required.",
};

export default function StartPage() {
  return (
    <section className="w-full bg-white px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
      <div>
        <Eyebrow>Quick intake</Eyebrow>
        <h1 className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95]">
          Find your fit in four taps.
        </h1>
        <p className="mt-6 max-w-md text-[18px] leading-relaxed text-ink-soft">
          Answer three quick questions, then leave a WhatsApp number. We reply
          within one business day.
        </p>
        <div className="mt-8">
          <WhatsAppLink text={site.whatsapp.discussText} variant="ghost">
            Prefer to talk now?
          </WhatsAppLink>
        </div>
      </div>
      <Intake />
      </div>
    </section>
  );
}
