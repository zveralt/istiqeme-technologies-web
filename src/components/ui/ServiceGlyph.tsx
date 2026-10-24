import { cn } from "@/lib/utils";

export type ServiceGlyphId = "landing" | "corporate" | "shop" | "app" | "marketing";

/**
 * Purpose-built, brand-coloured diagrams for each service — not stock photos.
 * Drawn at 320×220 so they crop cleanly in the sticky preview and catalogue.
 */
export function ServiceGlyph({
  id,
  className,
}: {
  id: ServiceGlyphId;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "itq-media aspect-[16/11] w-full bg-[linear-gradient(165deg,#0a0a0c_0%,#111214_58%,#1b1c20_100%)]",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 320 220" className="h-full w-full" fill="none">
        {id === "landing" && <LandingGlyph />}
        {id === "corporate" && <CorporateGlyph />}
        {id === "shop" && <ShopGlyph />}
        {id === "app" && <AppGlyph />}
        {id === "marketing" && <MarketingGlyph />}
      </svg>
    </div>
  );
}

function LandingGlyph() {
  return (
    <g>
      <rect x="54" y="28" width="212" height="164" rx="14" fill="#111214" stroke="rgba(232,232,234,0.22)" />
      <rect x="54" y="28" width="212" height="22" rx="14" fill="#111214" />
      <circle cx="70" cy="39" r="3" fill="rgba(232,232,234,0.35)" />
      <circle cx="80" cy="39" r="3" fill="rgba(232,232,234,0.35)" />
      <circle cx="90" cy="39" r="3" fill="rgba(232,232,234,0.35)" />
      <rect x="108" y="33" width="90" height="12" rx="6" fill="rgba(232,232,234,0.08)" />
      <rect x="78" y="68" width="84" height="8" rx="4" fill="#d4e3fa" />
      <rect x="78" y="82" width="124" height="5" rx="2.5" fill="rgba(232,232,234,0.28)" />
      <rect x="78" y="92" width="108" height="5" rx="2.5" fill="rgba(232,232,234,0.16)" />
      <rect x="78" y="112" width="164" height="52" rx="10" fill="rgba(232,232,234,0.06)" stroke="rgba(232,232,234,0.16)" />
      <rect x="90" y="124" width="88" height="6" rx="3" fill="rgba(232,232,234,0.28)" />
      <rect x="90" y="136" width="140" height="6" rx="3" fill="rgba(232,232,234,0.12)" />
      <rect x="90" y="148" width="72" height="8" rx="4" fill="#2b63c8" />
      <circle cx="232" cy="152" r="11" fill="#128c7e" />
      <path d="M227.5 152.5h9M232 148v9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

function CorporateGlyph() {
  return (
    <g>
      <g transform="translate(86 52)">
        <rect width="148" height="110" rx="10" fill="#111214" stroke="rgba(232,232,234,0.18)" />
        <rect x="14" y="16" width="72" height="6" rx="3" fill="#d4e3fa" />
        <rect x="14" y="30" width="120" height="4" rx="2" fill="rgba(232,232,234,0.2)" />
        <rect x="14" y="40" width="96" height="4" rx="2" fill="rgba(232,232,234,0.12)" />
        <rect x="14" y="58" width="54" height="36" rx="6" fill="rgba(232,232,234,0.08)" />
        <rect x="76" y="58" width="54" height="36" rx="6" fill="rgba(232,232,234,0.08)" />
      </g>
      <g transform="translate(68 38)">
        <rect width="148" height="110" rx="10" fill="#111214" stroke="rgba(232,232,234,0.22)" />
        <rect x="14" y="16" width="64" height="6" rx="3" fill="#d4e3fa" />
        <rect x="14" y="30" width="112" height="4" rx="2" fill="rgba(232,232,234,0.22)" />
        <rect x="14" y="58" width="120" height="4" rx="2" fill="rgba(232,232,234,0.12)" />
        <rect x="14" y="68" width="88" height="4" rx="2" fill="rgba(232,232,234,0.1)" />
      </g>
      <g transform="translate(50 24)">
        <rect width="148" height="110" rx="10" fill="#1b1c20" stroke="rgba(232,232,234,0.3)" />
        <rect x="12" y="10" width="124" height="14" rx="7" fill="rgba(232,232,234,0.08)" />
        <rect x="14" y="36" width="78" height="7" rx="3.5" fill="#d4e3fa" />
        <rect x="14" y="50" width="118" height="4" rx="2" fill="rgba(232,232,234,0.22)" />
        <rect x="14" y="60" width="96" height="4" rx="2" fill="rgba(232,232,234,0.12)" />
        <rect x="14" y="78" width="40" height="18" rx="9" fill="#2b63c8" />
        <rect x="60" y="78" width="40" height="18" rx="9" fill="rgba(232,232,234,0.1)" />
      </g>
    </g>
  );
}

function ShopGlyph() {
  const tiles = [
    [44, 36],
    [118, 36],
    [192, 36],
    [44, 118],
    [118, 118],
    [192, 118],
  ] as const;
  return (
    <g>
      {tiles.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <rect
            width="64"
            height="66"
            rx="10"
            fill={i === 1 ? "rgba(232,232,234,0.16)" : "#111214"}
            stroke={i === 1 ? "#d4e3fa" : "rgba(232,232,234,0.16)"}
          />
          <rect x="10" y="10" width="44" height="28" rx="5" fill="rgba(232,232,234,0.1)" />
          <rect x="10" y="44" width="28" height="4" rx="2" fill="rgba(232,232,234,0.4)" />
          <rect x="10" y="52" width="18" height="4" rx="2" fill={i === 1 ? "#d4e3fa" : "rgba(232,232,234,0.18)"} />
        </g>
      ))}
      <rect x="126" y="94" width="48" height="16" rx="8" fill="#2b63c8" />
    </g>
  );
}

function AppGlyph() {
  return (
    <g>
      <rect x="108" y="18" width="104" height="184" rx="22" fill="#111214" stroke="rgba(232,232,234,0.28)" />
      <rect x="148" y="26" width="24" height="6" rx="3" fill="rgba(232,232,234,0.2)" />
      <rect x="120" y="42" width="80" height="148" rx="8" fill="#111214" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(132 ${58 + i * 38})`}>
          <rect width="56" height="28" rx="7" fill="rgba(232,232,234,0.08)" stroke="rgba(232,232,234,0.14)" />
          <circle cx="12" cy="14" r="6" fill={i === 0 ? "#128c7e" : "rgba(232,232,234,0.2)"} />
          <rect x="22" y="8" width="26" height="4" rx="2" fill="rgba(232,232,234,0.45)" />
          <rect x="22" y="16" width="18" height="3" rx="1.5" fill="rgba(232,232,234,0.2)" />
        </g>
      ))}
      <rect x="140" y="176" width="40" height="6" rx="3" fill="rgba(232,232,234,0.16)" />
    </g>
  );
}

function MarketingGlyph() {
  const bars = [28, 44, 36, 58, 48, 72];
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={36 + (i % 2) * 86}
          y={28 + Math.floor(i / 2) * 52}
          width="74"
          height="42"
          rx="10"
          fill="#0a0a0c"
          stroke="rgba(232,232,234,0.16)"
        />
      ))}
      <rect x="208" y="28" width="76" height="146" rx="12" fill="#111214" stroke="rgba(232,232,234,0.22)" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={220 + i * 10}
          y={156 - h}
          width="6"
          height={h}
          rx="3"
          fill={i === bars.length - 1 ? "#d4e3fa" : "rgba(232,232,234,0.28)"}
        />
      ))}
      <path
        d="M48 150c18-10 28-28 46-28s26 22 46 22 28-18 44-30"
        stroke="#128c7e"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="184" cy="114" r="4" fill="#128c7e" />
    </g>
  );
}
