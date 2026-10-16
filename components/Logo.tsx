import Link from "next/link";

export function Logo({
  compact = false,
  inverted = false,
}: {
  compact?: boolean;
  inverted?: boolean;
}) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <span
        className={`relative grid h-9 w-9 place-items-center rounded-[10px] ${
          inverted ? "bg-cream text-forest" : "bg-ink text-cream"
        }`}
      >
        <span className="font-display text-[17px] leading-none tracking-tight">I</span>
        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-ember" />
      </span>
      <span className="leading-tight">
        <span
          className={`block font-display text-[18px] tracking-[0.04em] ${
            inverted ? "text-cream" : "text-ink"
          }`}
        >
          ISTIQEME
        </span>
        {!compact && (
          <span
            className={`block text-[10px] uppercase tracking-[0.28em] ${
              inverted ? "text-cream/55" : "text-muted"
            }`}
          >
            Technologies
          </span>
        )}
      </span>
    </Link>
  );
}
