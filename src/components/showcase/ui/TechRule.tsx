export function TechRule({
  double = false,
  className = "",
}: {
  double?: boolean;
  className?: string;
}) {
  if (double) {
    return (
      <div className={`heritage-rule space-y-1 ${className}`} aria-hidden>
        <hr className="border-0 border-t border-[#0F1B33]/25" />
        <hr className="border-0 border-t border-[#0F1B33]/15" />
      </div>
    );
  }

  return (
    <hr
      className={`heritage-rule border-0 border-t border-[#0F1B33]/20 ${className}`}
      aria-hidden
    />
  );
}
