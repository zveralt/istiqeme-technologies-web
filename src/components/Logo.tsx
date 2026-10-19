import Link from "next/link";

export function Logo({
  compact = false,
  inverted = false,
}: {
  compact?: boolean;
  inverted?: boolean;
}) {
  return (
    <Link href="/" className="group flex items-center">
      <img
        src="/logo.png"
        alt="ISTIQEME — Your Digital Partner"
        className={
          compact
            ? "h-9 w-auto md:h-10"
            : inverted
              ? "h-14 w-auto"
              : "h-12 w-auto md:h-14"
        }
      />
    </Link>
  );
}
