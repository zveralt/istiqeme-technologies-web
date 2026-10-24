import type { Metadata } from "next";
import { Guide } from "@/components/Guide";
import { Intake } from "@/components/Intake";
import { DisplayTitle } from "@/components/ui/DisplayTitle";
import { WhatsAppLink } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "A few taps — we’ll route you to the right next step. No long brief required.",
};

export default function StartPage() {
  return (
    <section data-header-theme="light" className="relative min-h-dvh pb-24 pt-32 md:pt-40">
      <div className="pointer-events-none absolute inset-0 itq-grid" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-[#0a0a0c]" aria-hidden />
      <div className="itq-container relative grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <p className="itq-eyebrow">Quick intake</p>
          <DisplayTitle
            className="mt-6 max-w-xl text-[clamp(2.6rem,7vw,5rem)] leading-[0.9] tracking-tight"
            lines={[{ text: "Find your fit" }, { text: "in four taps.", accent: true }]}
          />
          <p className="itq-lead mt-7 max-w-md">
            Answer three quick questions, then leave a WhatsApp number. We reply within one
            business day.
          </p>
          <div className="mt-8">
            <WhatsAppLink text={site.whatsapp.discussText} variant="ghost">
              Prefer to talk now?
            </WhatsAppLink>
          </div>
        </div>
        <Intake />
      </div>
      <div className="itq-container relative mt-20">
        <Guide
          title="Ask before you begin"
          intro="Not sure which path fits? Ask in English or Urdu, then continue the intake or WhatsApp."
          suggestions={["Which service fits my business?", "How do I get a quote?", "What does ISTIQEME do?"]}
        />
      </div>
    </section>
  );
}
