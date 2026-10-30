/**
 * PennyX hero illustration — an original isometric "city of payments":
 * a skyline tower with a live ticker, an exchange hall, a treasury, a
 * billboard, a coin fountain, traffic and data packets travelling the ring
 * road. Every colour is a theme token; all example text is illustrative.
 */
import {
  Box,
  Candle,
  Car,
  Coin,
  Face,
  Gable,
  Ground,
  Lamp,
  P,
  Palm,
  Plot,
  Prism,
  Road,
  Ticker,
  Tree,
  fillOf,
  useMotionOk,
  K,
} from "./iso";

const RING =
  "M140 70H380A70 70 0 0 1 450 140V380A70 70 0 0 1 380 450H140A70 70 0 0 1 70 380V140A70 70 0 0 1 140 70Z";

const TICKER = "BUY USDT  ·  TRC-20  ·  ERC-20  ·  REVIEW  ·  PAY  ·  TRACK  ·  ";

function Car2({
  motion,
  x,
  y,
  dir,
  dist,
  dur,
  delay = 0,
  tone,
}: {
  motion: boolean;
  x: number;
  y: number;
  dir: "x" | "y";
  /** signed travel distance in world units along the road */
  dist: number;
  dur: number;
  delay?: number;
  tone?: "paper" | "accent" | "soft";
}) {
  const [dx, dy] = dir === "x" ? [K * dist, dist / 2] : [-K * dist, dist / 2];
  return (
    <g>
      {motion && (
        <>
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to={`${dx} ${dy}`}
            dur={`${dur}s`}
            begin={`${-delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.12;0.88;1"
            dur={`${dur}s`}
            begin={`${-delay}s`}
            repeatCount="indefinite"
          />
        </>
      )}
      <Car x={x} y={y} dir={dir} tone={tone ?? "paper"} />
    </g>
  );
}

export function CityScene({
  idPrefix = "city",
  viewBox = "-380 -85 760 545",
}: {
  idPrefix?: string;
  /** Optional crop of the same artwork (e.g. the fountain on the About section). */
  viewBox?: string;
}) {
  const motion = useMotionOk();

  // fountain geometry
  const FX = 385;
  const FY = 362;
  const [fcx, fcy] = P(FX, FY, 52);

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      role="img"
      aria-label="Isometric illustration of a PennyX city: a ticker tower, an exchange hall, a treasury, a billboard and a coin fountain connected by roads"
      className="h-auto w-full"
    >
      <defs>
        <radialGradient id={`${idPrefix}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--ic-glow)" stopOpacity="0.45" />
          <stop offset="1" stopColor="var(--ic-glow)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${idPrefix}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ic-glow)" stopOpacity="0.4" />
          <stop offset="1" stopColor="var(--ic-glow)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ---------------- ground ---------------- */}
      <g className="ic-b">
        <Road d="M260 70V-40" dashed={false} />
        <Road d="M450 260H560" dashed={false} />
        <Road d="M70 260H-40" dashed={false} />
        <Road d="M260 450V560" dashed={false} />
        <Road d={RING} />
        <Plot x={96} y={96} w={328} d={328} r={46} tone="plot" thick={6} />

        {/* pocket park, plaza, planter */}
        <Plot x={108} y={108} w={92} d={108} r={10} tone="plot" top="accent" thick={3} />
        <Plot x={190} y={368} w={64} d={44} r={6} tone="plot" top="accent" thick={3} />
        <Ground>
          <circle
            cx={FX}
            cy={FY}
            r={34}
            fill={fillOf("accent", "top")}
            stroke="var(--ic-line)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={FX}
            cy={FY}
            r={44}
            fill="none"
            stroke="var(--ic-line)"
            strokeOpacity={0.4}
            strokeDasharray="3 5"
            vectorEffect="non-scaling-stroke"
          />
          {/* stepping stones */}
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={302 + i * 6}
              y={405 + (i % 2) * 14}
              width={9}
              height={6}
              rx={2}
              fill={fillOf("paper", "top")}
              stroke="var(--ic-line)"
              strokeWidth={0.8}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {/* data packets travelling the ring */}
          {motion &&
            [0, 6, 12].map((d) => (
              <g key={d}>
                <circle r={9} fill={`url(#${idPrefix}-glow)`}>
                  <animateMotion path={RING} dur="18s" begin={`${-d}s`} repeatCount="indefinite" />
                </circle>
                <circle r={3} fill="var(--ic-accent-right)" stroke="#fff" strokeWidth={1}>
                  <animateMotion path={RING} dur="18s" begin={`${-d}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}
        </Ground>
      </g>

      {/* ---------------- back traffic + far palms ---------------- */}
      <Palm x={-8} y={200} s={0.95} lean={-5} />
      <Palm x={20} y={340} lean={-7} />
      <Car2 motion={motion} x={160} y={63} dir="x" dist={160} dur={9} delay={2} tone="accent" />
      <Car2 motion={motion} x={63} y={150} dir="y" dist={170} dur={11} delay={5} />
      <Palm x={505} y={200} s={0.9} lean={6} />

      {/* ---------------- pocket park ---------------- */}
      <g className="ic-b">
        <Tree x={126} y={128} s={0.95} />
        <Palm x={172} y={132} lean={7} />
        <Tree x={148} y={160} s={1.05} />
        <Tree x={120} y={194} s={0.9} />
        <Palm x={178} y={196} s={0.9} lean={-6} />
      </g>

      {/* ---------------- ticker tower ---------------- */}
      <g className="ic-b">
        <Box x={110} y={230} w={80} d={100} h={64} tone="paper" gl={[4, 3]} gr={[5, 3]} />
        {/* accent edge panels */}
        <Face on="left" at={[110, 330, 64]}>
          <rect
            width={14}
            height={64}
            fill={fillOf("accent", "left")}
            stroke="var(--ic-line)"
            strokeWidth={0.8}
          />
        </Face>
        <Face on="right" at={[190, 330, 64]}>
          <rect
            width={14}
            height={64}
            fill={fillOf("accent", "right")}
            stroke="var(--ic-line)"
            strokeWidth={0.8}
          />
        </Face>
        <Ticker
          on="left"
          at={[110, 330, 36]}
          id={`${idPrefix}-tk1`}
          width={80}
          height={16}
          text={TICKER}
          animate={motion}
        />
        <Ticker
          on="right"
          at={[190, 330, 36]}
          id={`${idPrefix}-tk2`}
          width={100}
          height={16}
          text={TICKER}
          animate={motion}
          dur={20}
        />
        <Prism cx={150} cy={280} z={64} r={40} h={5} n={20} tone="paper" />
        <Prism
          cx={150}
          cy={280}
          z={69}
          r={30}
          h={186}
          n={16}
          tone="paper"
          alt="accent"
          altFn={(i) => i % 4 === 0}
          rings={[31, 62, 93, 124, 155]}
          hollow={0.74}
        />
        {/* beacon */}
        <path
          d={`M${P(150, 280, 255)}L${P(150, 280, 285)}`}
          stroke="var(--ic-line)"
          strokeWidth={1.2}
        />
        <circle
          cx={P(150, 280, 286)[0]}
          cy={P(150, 280, 286)[1]}
          r={2.6}
          fill="var(--ic-down)"
          stroke="var(--ic-line)"
          strokeWidth={0.8}
        />
        <circle
          className="ic-pulse"
          cx={P(150, 280, 286)[0]}
          cy={P(150, 280, 286)[1]}
          r={5}
          fill="var(--ic-down)"
          opacity={0.4}
        />
      </g>

      {/* ---------------- treasury ---------------- */}
      <g className="ic-b">
        <Prism
          cx={290}
          cy={160}
          r={46}
          h={52}
          n={24}
          tone="paper"
          alt="ink"
          altFn={(i) => i % 6 === 1 || i % 6 === 2}
          rings={[26]}
        />
        <Prism cx={290} cy={160} z={52} r={49} h={4} n={24} tone="paper" />
        <Ground z={56}>
          {[0, 1, 2].flatMap((r) =>
            [0, 1].map((c) => (
              <rect
                key={`${r}${c}`}
                x={272 + c * 17}
                y={138 + r * 14}
                width={14}
                height={10}
                rx={1.5}
                fill={fillOf("accent", "top")}
                stroke="var(--ic-line)"
                strokeWidth={0.8}
                vectorEffect="non-scaling-stroke"
              />
            )),
          )}
        </Ground>
        {/* wing */}
        <Box
          x={342}
          y={118}
          w={56}
          d={66}
          h={34}
          tone="paper"
          top="accent"
          gl={[4, 2]}
          gr={[4, 2]}
        />
        <Face on="left" at={[342, 184, 34]}>
          <rect
            x={4}
            y={10}
            width={48}
            height={14}
            fill={fillOf("ink", "left")}
            stroke="var(--ic-line)"
            strokeWidth={0.8}
          />
        </Face>
        <Face on="right" at={[398, 184, 34]}>
          <rect
            x={5}
            y={10}
            width={56}
            height={14}
            fill={fillOf("ink", "right")}
            stroke="var(--ic-line)"
            strokeWidth={0.8}
          />
        </Face>
      </g>

      {/* ---------------- exchange hall ---------------- */}
      <g className="ic-b">
        <Box x={205} y={240} w={95} d={110} h={40} tone="paper" gl={[6, 2]} gr={[6, 2]} />
        {/* arched windows on the +y wall */}
        <Face on="left" at={[205, 350, 40]}>
          {Array.from({ length: 6 }, (_, i) => (
            <rect
              key={i}
              x={6 + i * 14.5}
              y={10}
              width={9}
              height={18}
              rx={4}
              fill={fillOf("ink", "left")}
              stroke="var(--ic-line)"
              strokeWidth={0.7}
            />
          ))}
        </Face>
        <Box x={203} y={238} z={40} w={100} d={114} h={5} tone="paper" />
        {/* portico */}
        <Box x={300} y={244} w={30} d={102} h={4} tone="paper" />
        {[250, 268, 286, 304, 322, 340].map((yy) => (
          <Box key={yy} x={322} y={yy} z={4} w={5} d={5} h={36} tone="paper" />
        ))}
        <Box x={300} y={244} z={40} w={31} d={106} h={5} tone="paper" />
        <Gable x0={205} x1={331} y0={240} y1={352} z={45} rh={26} tone="accent" end="paper" />
        <Face on="right" at={[331, 352, 71]}>
          <circle
            cx={56}
            cy={16}
            r={8}
            fill={fillOf("accent", "left")}
            stroke="var(--ic-line)"
            strokeWidth={0.9}
          />
          <text
            x={56}
            y={19.5}
            textAnchor="middle"
            fontSize={10}
            fontWeight={700}
            fontFamily="Space Grotesk, sans-serif"
            fill="#fff"
          >
            P
          </text>
        </Face>
        {/* steps */}
        <Box x={330} y={250} w={8} d={92} h={2.5} tone="paper" />
        <Box x={338} y={254} w={6} d={84} h={1.5} tone="paper" />
      </g>

      {/* ---------------- clock monolith ---------------- */}
      <g className="ic-b">
        <Box x={120} y={365} w={16} d={46} h={100} tone="paper" top="accent" />
        <Face on="left" at={[120, 411, 100]}>
          <rect
            width={16}
            height={100}
            fill={fillOf("accent", "left")}
            stroke="var(--ic-line)"
            strokeWidth={0.8}
          />
        </Face>
        <Face on="right" at={[136, 411, 100]}>
          <circle
            cx={23}
            cy={24}
            r={15}
            fill={fillOf("paper", "left")}
            stroke="var(--ic-line)"
            strokeWidth={1}
          />
          {[0, 90, 180, 270].map((a) => (
            <path
              key={a}
              d="M23 11.5V14"
              transform={`rotate(${a} 23 24)`}
              stroke="var(--ic-line)"
              strokeWidth={0.9}
            />
          ))}
          <path d="M23 24V14" stroke="var(--ic-line)" strokeWidth={1.4}>
            {motion && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 23 24"
                to="360 23 24"
                dur="60s"
                repeatCount="indefinite"
              />
            )}
          </path>
          <path d="M23 24L29 27" stroke="var(--ic-line)" strokeWidth={1.4}>
            {motion && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 23 24"
                to="360 23 24"
                dur="720s"
                repeatCount="indefinite"
              />
            )}
          </path>
          <rect x={5} y={50} width={36} height={12} rx={2} fill={fillOf("ink", "right")} />
          <text
            x={23}
            y={59}
            textAnchor="middle"
            fontSize={8}
            fontFamily="ui-monospace, monospace"
            fill="var(--ic-accent-top)"
          >
            T+0
          </text>
        </Face>
      </g>

      {/* ---------------- billboard ---------------- */}
      <g className="ic-b">
        <Box x={388} y={204} w={5} d={3} h={62} tone="paper" />
        <Box x={362} y={202} z={62} w={60} d={4} h={34} tone="ink" />
        <Face on="left" at={[362, 206, 96]}>
          <rect x={3} y={3} width={54} height={28} fill={fillOf("accent", "left")} />
          <g className="ic-swap-a">
            <text
              x={30}
              y={16}
              textAnchor="middle"
              fontSize={10}
              fontWeight={700}
              fontFamily="Space Grotesk, sans-serif"
              fill="#fff"
            >
              Buy USDT
            </text>
            <text
              x={30}
              y={25}
              textAnchor="middle"
              fontSize={5.5}
              fontFamily="Inter, sans-serif"
              fill="#fff"
              fillOpacity={0.85}
            >
              ₹ INR → USDT
            </text>
          </g>
          <g className="ic-swap-b">
            <text
              x={30}
              y={14}
              textAnchor="middle"
              fontSize={7}
              fontWeight={700}
              fontFamily="Space Grotesk, sans-serif"
              fill="#fff"
            >
              Review first.
            </text>
            <text
              x={30}
              y={24}
              textAnchor="middle"
              fontSize={7}
              fontWeight={700}
              fontFamily="Space Grotesk, sans-serif"
              fill="#fff"
            >
              Then confirm.
            </text>
          </g>
        </Face>
      </g>

      {/* ---------------- planter with candlesticks ---------------- */}
      <g className="ic-b">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Candle
            key={i}
            x={198 + i * 9}
            y={392}
            z={3}
            h={18 + ((i * 7) % 14)}
            up={i % 3 !== 1}
            delay={i * 0.35}
            animate={motion}
          />
        ))}
      </g>

      {/* ---------------- fountain ---------------- */}
      <g className="ic-b">
        <Prism cx={FX} cy={FY} r={24} h={8} n={24} tone="paper" top="accent" />
        <Prism cx={FX} cy={FY} z={8} r={16} h={1.5} n={20} tone="soft" top="soft" />
        <Prism cx={FX} cy={FY} z={8} r={6} h={14} n={12} tone="paper" />
        <path
          d={`M${fcx - 22} ${P(FX, FY, 8)[1]}L${fcx - 7} ${fcy + 10}H${fcx + 7}L${fcx + 22} ${P(FX, FY, 8)[1]}Z`}
          fill={`url(#${idPrefix}-beam)`}
        />
        <Coin cx={fcx} cy={fcy} r={17} label="P" className={motion ? "ic-bob" : undefined} />
      </g>

      {/* ---------------- kiosks + trees ---------------- */}
      <g className="ic-b">
        <Box x={296} y={392} w={14} d={12} h={10} tone="paper" top="accent" />
        <Box x={418} y={300} w={14} d={12} h={10} tone="paper" top="accent" />
        <Tree x={160} y={424} s={0.9} />
        <Tree x={268} y={422} s={0.85} />
        <Lamp x={100} y={330} />
        <Lamp x={100} y={410} />
        <Lamp x={330} y={100} h={36} />
      </g>

      {/* ---------------- front traffic ---------------- */}
      <Car2 motion={motion} x={160} y={437.5} dir="x" dist={170} dur={10} delay={1} tone="accent" />
      <Car2 motion={motion} x={437.5} y={170} dir="y" dist={170} dur={12} delay={4} />
      <Palm x={520} y={330} s={0.95} lean={6} />
      <Palm x={250} y={505} s={0.95} lean={-6} />

      {/* ---------------- floating coins ---------------- */}
      <g>
        <Coin
          cx={P(300, 292, 120)[0]}
          cy={P(300, 292, 120)[1]}
          r={11}
          label="₮"
          className={motion ? "ic-bob-slow" : undefined}
        />
        <Coin
          cx={P(290, 160, 108)[0]}
          cy={P(290, 160, 108)[1]}
          r={9}
          label="₹"
          className={motion ? "ic-bob" : undefined}
        />
      </g>
    </svg>
  );
}
