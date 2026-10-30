/**
 * Tiny isometric drawing toolkit used by the PennyX illustrations.
 *
 * World space: x runs toward the lower-right, y toward the lower-left, z is up.
 * Visible faces of any solid are therefore: top, "left" (+y side) and
 * "right" (+x side). Everything is plain SVG and every colour comes from the
 * `--ic-*` tokens in styles.css, so the scenes follow light/dark mode.
 */
import { useEffect, useState, type ReactNode } from "react";

export const K = Math.sqrt(3) / 2;

export type Tone = "paper" | "road" | "plot" | "accent" | "soft" | "ink";
type FaceName = "top" | "left" | "right";
type V3 = [number, number, number];

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Project a world point to screen space. */
export const P = (x: number, y: number, z = 0): [number, number] => [
  r2((x - y) * K),
  r2((x + y) / 2 - z),
];

const pts = (v: V3[]) => v.map(([x, y, z]) => P(x, y, z).join(",")).join(" ");
export const fillOf = (t: Tone, f: FaceName) => `var(--ic-${t}-${f})`;

const LINE = {
  stroke: "var(--ic-line)",
  strokeWidth: 1,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

/** True unless the visitor prefers reduced motion (SSR-safe). */
export function useMotionOk() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setOk(!mq.matches);
    const on = () => setOk(!mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return ok;
}

/* ------------------------------------------------------------------ */
/* Solids                                                              */
/* ------------------------------------------------------------------ */

interface BoxProps {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  tone?: Tone;
  top?: Tone;
  left?: Tone;
  right?: Tone;
  /** [columns, rows] of hairlines on the +y face */
  gl?: [number, number];
  /** [columns, rows] of hairlines on the +x face */
  gr?: [number, number];
  hide?: FaceName[];
  className?: string | undefined;
  children?: ReactNode;
}

export function Box({
  x,
  y,
  z = 0,
  w,
  d,
  h,
  tone = "paper",
  top,
  left,
  right,
  gl,
  gr,
  hide = [],
  className,
  children,
}: BoxProps) {
  const x1 = x + w;
  const y1 = y + d;
  const z1 = z + h;
  const tt = top ?? tone;
  const tl = left ?? tone;
  const tr = right ?? tone;

  let grid = "";
  if (gl) {
    for (let i = 1; i < gl[0]; i++) {
      const xx = x + (w * i) / gl[0];
      grid += `M${P(xx, y1, z)}L${P(xx, y1, z1)}`;
    }
    for (let j = 1; j < gl[1]; j++) {
      const zz = z + (h * j) / gl[1];
      grid += `M${P(x, y1, zz)}L${P(x1, y1, zz)}`;
    }
  }
  if (gr) {
    for (let i = 1; i < gr[0]; i++) {
      const yy = y + (d * i) / gr[0];
      grid += `M${P(x1, yy, z)}L${P(x1, yy, z1)}`;
    }
    for (let j = 1; j < gr[1]; j++) {
      const zz = z + (h * j) / gr[1];
      grid += `M${P(x1, y, zz)}L${P(x1, y1, zz)}`;
    }
  }

  return (
    <g {...LINE} className={className}>
      {!hide.includes("left") && (
        <polygon
          points={pts([
            [x, y1, z],
            [x1, y1, z],
            [x1, y1, z1],
            [x, y1, z1],
          ])}
          fill={fillOf(tl, "left")}
        />
      )}
      {!hide.includes("right") && (
        <polygon
          points={pts([
            [x1, y1, z],
            [x1, y, z],
            [x1, y, z1],
            [x1, y1, z1],
          ])}
          fill={fillOf(tr, "right")}
        />
      )}
      {!hide.includes("top") && (
        <polygon
          points={pts([
            [x, y, z1],
            [x1, y, z1],
            [x1, y1, z1],
            [x, y1, z1],
          ])}
          fill={fillOf(tt, "top")}
        />
      )}
      {grid && <path d={grid} fill="none" strokeOpacity={0.4} strokeWidth={0.7} />}
      {children}
    </g>
  );
}

interface PrismProps {
  cx: number;
  cy: number;
  z?: number;
  r: number;
  h: number;
  /** number of facets (higher = rounder) */
  n?: number;
  tone?: Tone;
  /** tone used for facets where altFn(i) is true */
  alt?: Tone;
  altFn?: (i: number) => boolean;
  top?: Tone;
  /** 0–1: carve a hollow (open tube) out of the top */
  hollow?: number;
  /** z offsets (relative to z) where a ring line wraps the body */
  rings?: number[];
  className?: string | undefined;
  children?: ReactNode;
}

/** A faceted cylinder — reads as "round" but keeps the crisp line-art look. */
export function Prism({
  cx,
  cy,
  z = 0,
  r,
  h,
  n = 16,
  tone = "paper",
  alt,
  altFn,
  top,
  hollow = 0,
  rings = [],
  className,
  children,
}: PrismProps) {
  const verts = Array.from({ length: n }, (_, i) => {
    const a = (Math.PI * 2 * i) / n;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number];
  });

  const facets: ReactNode[] = [];
  const visible: number[] = [];
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * (i + 0.5)) / n;
    const c = Math.cos(a);
    const s = Math.sin(a);
    if (c + s <= 0.02) continue;
    visible.push(i);
    const [ax, ay] = verts[i]!;
    const [bx, by] = verts[(i + 1) % n]!;
    const t = alt && altFn?.(i) ? alt : tone;
    const mix = Math.round(Math.max(0, Math.min(100, ((c - s + 1) / 2) * 100)));
    facets.push(
      <polygon
        key={i}
        points={pts([
          [ax, ay, z],
          [bx, by, z],
          [bx, by, z + h],
          [ax, ay, z + h],
        ])}
        fill={`color-mix(in oklab, ${fillOf(t, "right")} ${mix}%, ${fillOf(t, "left")})`}
      />,
    );
  }

  // outline of the visible lower/upper rim for ring lines
  const rim = (zz: number) => {
    const idx: number[] = [];
    visible.forEach((i) => {
      idx.push(i);
    });
    const first = idx[0]!;
    const last = idx[idx.length - 1]!;
    const path: string[] = [];
    for (let k = first; k <= last + 1; k++) {
      const [vx, vy] = verts[k % n]!;
      path.push(`${k === first ? "M" : "L"}${P(vx, vy, zz)}`);
    }
    return path.join("");
  };

  const topPts = verts.map(([vx, vy]) => P(vx, vy, z + h).join(",")).join(" ");
  const inner = verts
    .map(([vx, vy]) => P(cx + (vx - cx) * hollow, cy + (vy - cy) * hollow, z + h).join(","))
    .join(" ");

  return (
    <g {...LINE} className={className}>
      {facets}
      <polygon points={topPts} fill={fillOf(top ?? tone, "top")} />
      {hollow > 0 && <polygon points={inner} fill={fillOf("ink", "left")} />}
      {rings.map((rz) => (
        <path key={rz} d={rim(z + rz)} fill="none" strokeOpacity={0.5} strokeWidth={0.8} />
      ))}
      {children}
    </g>
  );
}

/** Gabled roof with its ridge along x (gable end faces +x). */
export function Gable({
  x0,
  x1,
  y0,
  y1,
  z,
  rh,
  tone = "accent",
  end = "paper",
}: {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  z: number;
  rh: number;
  tone?: Tone;
  end?: Tone;
}) {
  const ym = (y0 + y1) / 2;
  return (
    <g {...LINE}>
      <polygon
        points={pts([
          [x0, y1, z],
          [x1, y1, z],
          [x1, ym, z + rh],
          [x0, ym, z + rh],
        ])}
        fill={fillOf(tone, "left")}
      />
      <polygon
        points={pts([
          [x1, y1, z],
          [x1, y0, z],
          [x1, ym, z + rh],
        ])}
        fill={fillOf(end, "right")}
      />
      {/* shingle hairlines */}
      <path
        d={Array.from({ length: 5 }, (_, i) => {
          const t = (i + 1) / 6;
          const yy = y1 - (y1 - ym) * t;
          const zz = z + rh * t;
          return `M${P(x0, yy, zz)}L${P(x1, yy, zz)}`;
        }).join("")}
        fill="none"
        strokeOpacity={0.35}
        strokeWidth={0.7}
      />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Ground plane + faces                                                */
/* ------------------------------------------------------------------ */

/** Draw flat things in world (x, y) coordinates at height z. */
export function Ground({
  z = 0,
  children,
  className,
}: {
  z?: number;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <g
      className={className}
      transform={`translate(0 ${-z}) matrix(${r2(K * 1000) / 1000} 0.5 ${-r2(K * 1000) / 1000} 0.5 0 0)`}
    >
      {children}
    </g>
  );
}

/**
 * Local drawing surface lying on a wall. `u` runs along the wall, `t` runs
 * down from `at`. `on="left"` is the +y wall, `on="right"` is the +x wall.
 * `at` is the wall's top-left corner as seen on screen.
 */
export function Face({
  on,
  at,
  children,
  className,
}: {
  on: "left" | "right";
  at: V3;
  children: ReactNode;
  className?: string | undefined;
}) {
  const [px, py] = P(...at);
  const k = r2(K * 1000) / 1000;
  const m =
    on === "left" ? `matrix(${k} 0.5 0 1 ${px} ${py})` : `matrix(${k} -0.5 0 1 ${px} ${py})`;
  return (
    <g transform={m} className={className}>
      {children}
    </g>
  );
}

/** Scrolling LED ticker on a wall. */
export function Ticker({
  on,
  at,
  width,
  height,
  id,
  text,
  fontSize = 7,
  dur = 16,
  animate = true,
}: {
  on: "left" | "right";
  at: V3;
  width: number;
  height: number;
  id: string;
  text: string;
  fontSize?: number;
  dur?: number;
  animate?: boolean;
}) {
  const tl = Math.round(text.length * fontSize * 0.62);
  return (
    <Face on={on} at={at}>
      <rect
        width={width}
        height={height}
        fill={fillOf("ink", "left")}
        stroke="var(--ic-line)"
        strokeWidth={0.8}
      />
      <clipPath id={id}>
        <rect width={width} height={height} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <g
          className={animate ? "ic-scroll" : undefined}
          style={{ ["--ic-dist" as string]: `${-tl}px`, animationDuration: `${dur}s` }}
        >
          {[0, tl].map((dx) => (
            <text
              key={dx}
              x={dx + 2}
              y={height / 2 + fontSize * 0.36}
              fontSize={fontSize}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fill="var(--ic-accent-top)"
              textLength={tl}
              lengthAdjust="spacingAndGlyphs"
            >
              {text}
            </text>
          ))}
        </g>
      </g>
    </Face>
  );
}

/* ------------------------------------------------------------------ */
/* Roads, plots                                                        */
/* ------------------------------------------------------------------ */

/** Extruded rounded slab lying on the ground. */
export function Plot({
  x,
  y,
  w,
  d,
  r = 0,
  tone = "plot",
  top,
  thick = 5,
  z = 0,
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  r?: number;
  tone?: Tone;
  top?: Tone;
  thick?: number;
  z?: number;
}) {
  const steps = Array.from({ length: thick }, (_, i) => thick - i);
  return (
    <Ground z={z}>
      {steps.map((k) => (
        <g key={k} transform={`translate(0 ${k})`}>
          <rect
            x={x}
            y={y}
            width={w}
            height={d}
            rx={r}
            fill={fillOf(tone, k > thick / 2 ? "right" : "left")}
            stroke={k === thick ? "var(--ic-line)" : "none"}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}
      <rect
        x={x}
        y={y}
        width={w}
        height={d}
        rx={r}
        fill={fillOf(top ?? tone, "top")}
        stroke="var(--ic-line)"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </Ground>
  );
}

/** A road ribbon following a world-space SVG path. */
export function Road({
  d,
  width = 28,
  thick = 3,
  dashed = true,
}: {
  d: string;
  width?: number;
  thick?: number;
  dashed?: boolean;
}) {
  const steps = Array.from({ length: thick }, (_, i) => thick - i);
  return (
    <Ground>
      {steps.map((k) => (
        <g key={k} transform={`translate(0 ${k})`}>
          {k === thick && (
            <path
              d={d}
              fill="none"
              stroke="var(--ic-line)"
              strokeWidth={width + 2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          )}
          <path
            d={d}
            fill="none"
            stroke={fillOf("road", "right")}
            strokeWidth={width}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>
      ))}
      <path
        d={d}
        fill="none"
        stroke="var(--ic-line)"
        strokeWidth={width + 2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d={d}
        fill="none"
        stroke={fillOf("road", "top")}
        strokeWidth={width}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {dashed && (
        <path
          d={d}
          fill="none"
          stroke="var(--ic-line)"
          strokeOpacity={0.35}
          strokeWidth={1}
          strokeDasharray="7 7"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </Ground>
  );
}

/* ------------------------------------------------------------------ */
/* Props: trees, palms, lamps, cars, candles, coins                    */
/* ------------------------------------------------------------------ */

export function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const [px, py] = P(x, y, 3);
  return (
    <g>
      <Box x={x - 6} y={y - 6} w={12} d={12} h={3} tone="paper" />
      <g transform={`translate(${px} ${py}) scale(${s})`} {...LINE}>
        <path d="M0 0C-13-4-13-30 0-42 13-30 13-4 0 0Z" fill={fillOf("accent", "left")} />
        <path d="M0 0C13-4 13-30 0-42Z" fill={fillOf("accent", "right")} />
        <path d="M0-3C-5-14-4-28 0-39" fill="none" strokeOpacity={0.35} strokeWidth={0.8} />
      </g>
    </g>
  );
}

const FRONDS = [-150, -105, -62, -18, 20];

export function Palm({
  x,
  y,
  s = 1,
  lean = 6,
}: {
  x: number;
  y: number;
  s?: number;
  lean?: number;
}) {
  const [px, py] = P(x, y, 3);
  return (
    <g>
      <Box x={x - 5} y={y - 5} w={10} d={10} h={3} tone="paper" />
      <g transform={`translate(${px} ${py}) scale(${s})`} {...LINE}>
        <path d={`M0 0Q${lean * 0.3} -28 ${lean} -60`} fill="none" strokeWidth={1.6} />
        <g transform={`translate(${lean} -60)`}>
          {FRONDS.flatMap((a, i) =>
            [1, -1].map((m) => (
              <path
                key={`${a}${m}`}
                transform={`scale(${m} 1) rotate(${a * 0.55})`}
                d="M0 0C5-12 20-14 31 2 22-3 10-3 0 0Z"
                fill={fillOf("accent", (i + (m > 0 ? 0 : 1)) % 2 ? "left" : "top")}
                strokeWidth={0.9}
              />
            )),
          )}
        </g>
      </g>
    </g>
  );
}

export function Lamp({ x, y, h = 42 }: { x: number; y: number; h?: number }) {
  const [bx, by] = P(x, y, 0);
  const [tx, ty] = P(x, y, h);
  return (
    <g {...LINE}>
      <ellipse cx={bx} cy={by} rx={3.5} ry={2} fill={fillOf("ink", "left")} />
      <path d={`M${bx} ${by}L${tx} ${ty}`} strokeWidth={1.2} />
      <polygon
        points={`${tx - 7},${ty - 1} ${tx + 1},${ty - 5} ${tx + 8},${ty - 1} ${tx},${ty + 3}`}
        fill={fillOf("accent", "top")}
      />
    </g>
  );
}

export function Car({
  x,
  y,
  dir = "x",
  tone = "paper",
}: {
  x: number;
  y: number;
  dir?: "x" | "y";
  tone?: Tone;
}) {
  const L = 24;
  const W = 11;
  const [bw, bd] = dir === "x" ? [L, W] : [W, L];
  const [cx, cy, cw, cd] =
    dir === "x" ? [x + 5, y + 1.5, L - 11, W - 3] : [x + 1.5, y + 5, W - 3, L - 11];
  return (
    <g>
      <Box x={x} y={y} z={1} w={bw} d={bd} h={5} tone={tone} />
      <Box x={cx} y={cy} z={6} w={cw} d={cd} h={4.5} top={tone} left="ink" right="ink" />
    </g>
  );
}

/** Flat candlestick that grows and shrinks. */
export function Candle({
  x,
  y,
  z = 0,
  h = 18,
  up = true,
  delay = 0,
  animate = true,
}: {
  x: number;
  y: number;
  z?: number;
  h?: number;
  up?: boolean;
  delay?: number;
  animate?: boolean;
}) {
  const [px, py] = P(x, y, z);
  const color = up ? "var(--ic-up)" : "var(--ic-down)";
  return (
    <g transform={`translate(${px} ${py})`}>
      <g className={animate ? "ic-candle" : undefined} style={{ animationDelay: `${delay}s` }}>
        <path d={`M0 0V${-h - 6}`} stroke="var(--ic-line)" strokeWidth={1} />
        <rect
          x={-2.4}
          y={-h}
          width={4.8}
          height={h * 0.55}
          rx={0.8}
          fill={color}
          stroke="var(--ic-line)"
          strokeWidth={0.8}
        />
      </g>
    </g>
  );
}

/** Round coin floating in screen space. */
export function Coin({
  cx,
  cy,
  r = 14,
  label = "P",
  className,
}: {
  cx: number;
  cy: number;
  r?: number;
  label?: string;
  className?: string | undefined;
}) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <g className={className}>
        <circle r={r} fill={fillOf("accent", "left")} stroke="var(--ic-line)" strokeWidth={1} />
        <path d={`M0 ${-r}A${r} ${r} 0 0 1 0 ${r}Z`} fill={fillOf("accent", "right")} />
        <circle r={r * 0.72} fill="none" stroke="#fff" strokeOpacity={0.55} strokeWidth={1} />
        <text
          y={r * 0.34}
          textAnchor="middle"
          fontSize={r * 1.0}
          fontWeight={700}
          fontFamily="Space Grotesk, ui-sans-serif, sans-serif"
          fill="#fff"
        >
          {label}
        </text>
      </g>
    </g>
  );
}
