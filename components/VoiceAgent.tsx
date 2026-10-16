import { voiceCapabilities, site, waLink } from "@/lib/site";
import { Arrow } from "./Button";

export function VoiceAgent() {
  return (
    <div className="overflow-hidden rounded-[32px] bg-forest text-cream">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-8 md:p-12">
          <p className="text-[11px] uppercase tracking-[0.24em] text-cream/45">
            Always on
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.05]">
            Your AI voice agent.
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-cream/75">
            Watch a real demo: our AI receptionist answers customers, asks the
            right questions, and hands warm leads to your team — day or night.
            It sounds natural, follows your script, and never sleeps.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {voiceCapabilities.map((c) => (
              <li key={c.title}>
                <p className="font-medium">{c.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-cream/60">
                  {c.body}
                </p>
              </li>
            ))}
          </ul>
          <a
            href={waLink(site.whatsapp.receptionistText)}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-3 text-[13px] font-medium text-forest"
          >
            Discuss AI receptionist <Arrow />
          </a>
        </div>
        <div className="relative flex items-center justify-center bg-ink/25 p-10">
          <div className="relative grid h-56 w-56 place-items-center">
            <span className="pulse-ring absolute inset-0 rounded-full border border-cream/25" />
            <span className="pulse-ring absolute inset-6 rounded-full border border-cream/20 [animation-delay:0.6s]" />
            <div className="relative z-10 grid h-28 w-28 place-items-center rounded-full bg-cream text-forest">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 3a3.5 3.5 0 0 0-3.5 3.5v5a3.5 3.5 0 1 0 7 0v-5A3.5 3.5 0 0 0 12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M6 11.5a6 6 0 0 0 12 0M12 17.5V21"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <p className="absolute bottom-8 text-center text-[12px] text-cream/55">
            English + Urdu · WhatsApp handoff · Your brand voice
          </p>
        </div>
      </div>
    </div>
  );
}
