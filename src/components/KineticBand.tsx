export default function KineticBand() {
  const statement = "VISION INTO EXECUTION  •  ORDER OUT OF CHAOS  •  CLARITY IN MOTION  •  OUTPUT OVER HOURS  •  INTENT INTO REALITY  •  ";

  return (
    <div
      aria-hidden="true"
      className="w-full border-b border-[#0A0A0A] bg-[#F9F9F9] overflow-hidden select-none py-3.5"
    >
      <div className="flex whitespace-nowrap animate-ticker">
        <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#0A0A0A]/70 pr-4">
          {statement.repeat(4)}
        </span>
        <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#0A0A0A]/70 pr-4">
          {statement.repeat(4)}
        </span>
      </div>
    </div>
  );
}
