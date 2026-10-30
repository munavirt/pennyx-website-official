/**
 * Small isometric spot illustrations (one per purchase step) that share the
 * hero city's language: pale solids, #58d779 accents, ink windows.
 */
import { Box, Coin, Face, Ground, P, Plot, Prism, fillOf, useMotionOk, Tree } from "./iso";

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="-118 -92 236 214"
      fill="none"
      role="img"
      aria-label={label}
      className="h-auto w-full"
    >
      {children}
    </svg>
  );
}

/** 01 — a doorway into the platform: building with an accent door and a key coin. */
export function AccessVignette() {
  const motion = useMotionOk();
  return (
    <Frame label="Illustration of a platform entrance with a door and a sign-in key">
      <Plot x={-10} y={-10} w={120} d={120} r={14} tone="plot" thick={5} />
      <Box x={20} y={20} w={60} d={50} h={56} tone="paper" gl={[4, 4]} gr={[3, 4]} />
      <Face on="left" at={[20, 70, 56]}>
        <rect
          x={22}
          y={26}
          width={16}
          height={30}
          rx={8}
          fill={fillOf("accent", "left")}
          stroke="var(--ic-line)"
          strokeWidth={0.9}
        />
        <circle cx={34} cy={42} r={1.4} fill="#fff" />
        {[4, 44].map((x) => (
          <rect
            key={x}
            x={x}
            y={12}
            width={10}
            height={14}
            rx={4}
            fill={fillOf("ink", "left")}
            stroke="var(--ic-line)"
            strokeWidth={0.7}
          />
        ))}
      </Face>
      <Box x={16} y={16} z={56} w={68} d={58} h={5} tone="paper" top="accent" />
      <Box x={44} y={80} w={14} d={14} h={2} tone="paper" />
      <Tree x={92} y={92} s={0.9} />
      <Coin
        cx={P(50, 50, 106)[0]}
        cy={P(50, 50, 106)[1]}
        r={12}
        label="P"
        className={motion ? "ic-bob" : undefined}
      />
    </Frame>
  );
}

/** 02 — review: a console/terminal slab with the conversion shown as stacked bars. */
export function ReviewVignette() {
  const motion = useMotionOk();
  return (
    <Frame label="Illustration of a review panel comparing an INR amount with a USDT amount">
      <Plot x={-10} y={-10} w={120} d={120} r={14} tone="plot" thick={5} />
      <Box x={14} y={30} w={72} d={44} h={10} tone="paper" />
      <Box x={20} y={34} z={10} w={58} d={6} h={46} tone="ink" top="paper" />
      <Face on="left" at={[20, 40, 56]}>
        <rect x={3} y={4} width={52} height={38} fill={fillOf("paper", "left")} />
        <rect x={6} y={8} width={26} height={5} rx={1.5} fill={fillOf("soft", "right")} />
        <rect
          x={6}
          y={17}
          width={40}
          height={9}
          rx={2}
          fill="none"
          stroke="var(--ic-line)"
          strokeWidth={0.7}
        />
        <text
          x={9}
          y={24}
          fontSize={6.5}
          fontWeight={700}
          fontFamily="Space Grotesk, sans-serif"
          fill="var(--ic-line)"
        >
          ₹ 25,000
        </text>
        <rect x={6} y={29} width={40} height={9} rx={2} fill={fillOf("accent", "left")} />
        <text
          x={9}
          y={36}
          fontSize={6.5}
          fontWeight={700}
          fontFamily="Space Grotesk, sans-serif"
          fill="#fff"
        >
          ≈ USDT
        </text>
      </Face>
      <Box x={88} y={72} w={14} d={14} h={20} tone="paper" top="accent" />
      <Coin
        cx={P(88, 40, 40)[0]}
        cy={P(88, 40, 40)[1]}
        r={11}
        label="₹"
        className={motion ? "ic-bob-slow" : undefined}
      />
      <Coin
        cx={P(30, 90, 36)[0]}
        cy={P(30, 90, 36)[1]}
        r={11}
        label="₮"
        className={motion ? "ic-bob" : undefined}
      />
    </Frame>
  );
}

/** 03 — follow instructions: a payment terminal with a QR-style grid and a stopwatch. */
export function PayVignette() {
  const motion = useMotionOk();
  const cells = ["1110111", "1010101", "1110111", "0001000", "1101011", "0111010", "1010111"];
  return (
    <Frame label="Illustration of a payment terminal showing a code to scan, with a countdown timer">
      <Plot x={-10} y={-10} w={120} d={120} r={14} tone="plot" thick={5} />
      <Box x={22} y={34} w={46} d={34} h={8} tone="paper" />
      <Box x={30} y={38} z={8} w={30} d={6} h={52} tone="paper" top="accent" />
      <Face on="left" at={[30, 44, 60]}>
        <rect x={2} y={2} width={26} height={26} rx={2} fill={fillOf("ink", "left")} />
        {cells.flatMap((row, r) =>
          [...row].map((c, i) =>
            c === "1" ? (
              <rect
                key={`${r}${i}`}
                x={5 + i * 2.8}
                y={5 + r * 2.8}
                width={2.4}
                height={2.4}
                fill="var(--ic-accent-top)"
              />
            ) : null,
          ),
        )}
      </Face>
      {/* stopwatch */}
      <Prism cx={84} cy={84} r={12} h={5} n={20} tone="paper" top="soft" />
      <Ground z={5}>
        <path
          d="M84 84L84 76"
          stroke="var(--ic-line)"
          strokeWidth={1.2}
          vectorEffect="non-scaling-stroke"
        >
          {motion && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 84 84"
              to="360 84 84"
              dur="8s"
              repeatCount="indefinite"
            />
          )}
        </path>
      </Ground>
      <Coin
        cx={P(45, 52, 84)[0]}
        cy={P(45, 52, 84)[1]}
        r={10}
        label="✓"
        className={motion ? "ic-bob" : undefined}
      />
    </Frame>
  );
}

/** 04 — track: a stacked order timeline climbing toward a confirmed beacon. */
export function TrackVignette() {
  const motion = useMotionOk();
  return (
    <Frame label="Illustration of order progress as stepped blocks rising toward a confirmed flag">
      <Plot x={-10} y={-10} w={120} d={120} r={14} tone="plot" thick={5} />
      <Box x={14} y={60} w={24} d={28} h={14} tone="paper" top="accent" />
      <Box x={38} y={52} w={24} d={36} h={30} tone="paper" top="accent" />
      <Box x={62} y={44} w={24} d={44} h={50} tone="accent" top="accent" />
      <path d={`M${P(74, 66, 94)}L${P(74, 66, 128)}`} stroke="var(--ic-line)" strokeWidth={1.2} />
      <polygon
        points={[P(74, 66, 128), P(74, 66, 112), P(74, 52, 120)].map((p) => p.join(",")).join(" ")}
        fill={fillOf("accent", "left")}
        stroke="var(--ic-line)"
        strokeWidth={1}
      />
      <circle
        className={motion ? "ic-pulse" : undefined}
        cx={P(74, 66, 128)[0]}
        cy={P(74, 66, 128)[1]}
        r={4}
        fill="var(--ic-glow)"
        opacity={0.5}
      />
      <Tree x={96} y={30} s={0.85} />
      <Coin
        cx={P(26, 74, 36)[0]}
        cy={P(26, 74, 36)[1]}
        r={9}
        label="₮"
        className={motion ? "ic-bob-slow" : undefined}
      />
    </Frame>
  );
}
