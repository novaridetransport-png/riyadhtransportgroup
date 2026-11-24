/** Provisional wordmark until the official logo files are supplied. */
export function Logo() {
  return (
    <span className="flex items-center gap-3 text-white">
      <svg viewBox="0 0 40 40" className="size-10 shrink-0" aria-hidden="true" fill="none">
        <rect x=".75" y=".75" width="38.5" height="38.5" rx="9" stroke="currentColor" strokeOpacity=".3" strokeWidth="1.5" />
        <path d="M12 31V10h9a6.500 6.500 0 0 1 0 13h-9" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 23l8 7" stroke="#d6ad60" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="29" cy="31" r="3" fill="#d6ad60" />
      </svg>
      <span className="text-[1.05rem] font-bold leading-tight tracking-tight">Riyadh<span className="block text-[.8rem] font-medium tracking-normal text-white/75">Transport Group</span></span>
    </span>
  );
}
