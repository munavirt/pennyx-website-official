export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="9" className="fill-primary" />
        <path
          d="M11 24V8h6.2c3.4 0 5.8 2.2 5.8 5.4 0 3.2-2.4 5.4-5.8 5.4h-3.4V24H11Zm2.8-7.4h3.2c1.9 0 3.1-1.2 3.1-3.2 0-1.9-1.2-3.2-3.1-3.2h-3.2v6.4Z"
          className="fill-primary-foreground"
        />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight text-foreground">
        PennyX
      </span>
    </span>
  );
}
