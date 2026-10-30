import type { GuideArt as Kind } from "@/lib/guides";

const INK = "var(--foreground)";
const LINE = "var(--border)";
const GREEN = "var(--primary)";
const SOFT = "var(--accent-soft)";
const MUTED = "var(--muted-foreground)";

/** Small, flat explanatory diagrams for the guide cards. Decorative: the card title carries the meaning. */
export function GuideArtwork({ kind }: { kind: Kind }) {
  return (
    <svg
      viewBox="0 0 320 160"
      fill="none"
      aria-hidden="true"
      className="h-full w-full"
      fontFamily="Inter, system-ui, sans-serif"
    >
      {kind === "usdt" && (
        <g>
          <rect
            x="28"
            y="52"
            width="104"
            height="56"
            rx="14"
            fill={SOFT}
            stroke={GREEN}
            strokeWidth="1.5"
          />
          <text x="80" y="87" textAnchor="middle" fontSize="20" fontWeight="600" fill={INK}>
            1 USDT
          </text>
          <path d="M146 72h28M146 88h28" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <rect
            x="188"
            y="52"
            width="104"
            height="56"
            rx="14"
            fill="var(--card)"
            stroke={LINE}
            strokeWidth="1.5"
          />
          <text x="240" y="87" textAnchor="middle" fontSize="20" fontWeight="600" fill={INK}>
            ≈ US$1
          </text>
          <text x="160" y="136" textAnchor="middle" fontSize="11" fill={MUTED}>
            Designed to track the US dollar
          </text>
        </g>
      )}
      {kind === "network" && (
        <g fontSize="11">
          {[
            { y: 34, label: "TRC-20" },
            { y: 94, label: "ERC-20" },
          ].map((lane) => (
            <g key={lane.label}>
              <rect
                x="20"
                y={lane.y}
                width="64"
                height="32"
                rx="8"
                fill="var(--card)"
                stroke={LINE}
                strokeWidth="1.5"
              />
              <text x="52" y={lane.y + 20} textAnchor="middle" fill={INK}>
                Wallet
              </text>
              <rect
                x="236"
                y={lane.y}
                width="64"
                height="32"
                rx="8"
                fill="var(--card)"
                stroke={LINE}
                strokeWidth="1.5"
              />
              <text x="268" y={lane.y + 20} textAnchor="middle" fill={INK}>
                Receiver
              </text>
              <text
                x="160"
                y={lane.y + 12}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill={MUTED}
              >
                {lane.label}
              </text>
            </g>
          ))}
          <path d="M88 50h144" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M88 110h144" stroke={LINE} strokeWidth="2.5" strokeLinecap="round" />
          <path
            d="M84 62 L236 98"
            stroke={INK}
            strokeWidth="1.5"
            strokeDasharray="4 5"
            strokeLinecap="round"
            opacity="0.5"
          />
          <circle cx="160" cy="80" r="10" fill="var(--card)" stroke={INK} strokeWidth="1.5" />
          <path d="M155.5 75.5l9 9m0-9l-9 9" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
          <text x="160" y="144" textAnchor="middle" fontSize="11" fill={MUTED}>
            Both sides must use the same network
          </text>
        </g>
      )}
      {kind === "checklist" && (
        <g fontSize="12">
          {[
            ["Network", "matches"],
            ["Address", "checked"],
            ["Amount", "re-read"],
          ].map(([a, b], i) => {
            const y = 22 + i * 40;
            return (
              <g key={a}>
                <rect
                  x="40"
                  y={y}
                  width="240"
                  height="32"
                  rx="10"
                  fill="var(--card)"
                  stroke={LINE}
                  strokeWidth="1.5"
                />
                <circle cx="62" cy={y + 16} r="9" fill={GREEN} />
                <path
                  d={`M57.5 ${y + 16}l3 3 6-6`}
                  stroke="#041608"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text x="82" y={y + 20} fontWeight="600" fill={INK}>
                  {a}
                </text>
                <text x="262" y={y + 20} textAnchor="end" fill={MUTED}>
                  {b}
                </text>
              </g>
            );
          })}
        </g>
      )}
    </svg>
  );
}
