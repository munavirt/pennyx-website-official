import { useEffect, useRef, useState, type RefObject } from "react";
import { gsap, NO_REDUCED_MOTION } from "@/hooks/use-gsap";
import { useReducedMotion } from "@/hooks/use-media-query";

/** Artwork viewBox (CityScene) and the screen-space end of its east road stub. */
const ART_W = 760;
const ART_MIN_X = -380;
const ART_MIN_Y = -85;
// project(560, 260) with P(x, y) = ((x - y) * √3/2, (x + y) / 2) → east stub end.
const STUB_X = 259.8;
const STUB_Y = 410;

type Geo = { w: number; h: number; d: string };

/**
 * The route leaves the artwork's east road stub (lower right), sweeps along the bottom of the
 * hero beneath the copy, and turns down into the page rail 28px from the left edge.
 * Measured from the artwork's own box, so it tracks the illustration at any width.
 * Desktop only; decorative (aria-hidden).
 */
export function HeroRoute({
  heroRef,
  sceneRef,
}: {
  heroRef: RefObject<HTMLElement | null>;
  sceneRef: RefObject<HTMLElement | null>;
}) {
  const [geo, setGeo] = useState<Geo | null>(null);
  const fill = useRef<SVGPathElement | null>(null);
  const svg = useRef<SVGSVGElement | null>(null);
  const drawn = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const hero = heroRef.current;
    const scene = sceneRef.current;
    if (!hero || !scene) return;

    const compute = () => {
      if (window.innerWidth < 1024) {
        setGeo(null);
        return;
      }
      const h = hero.getBoundingClientRect();
      const s = scene.getBoundingClientRect();
      const k = s.width / ART_W;
      const sx = s.left - h.left + (STUB_X - ART_MIN_X) * k;
      const sy = s.top - h.top + (STUB_Y - ART_MIN_Y) * k;
      const run = Math.max(0, Math.min(44, h.width - 64 - sx));
      const ex = sx + run * 0.866;
      const ey = sy + run * 0.5;
      const by = Math.max(ey + 72, h.height - 26);
      const d = [
        `M${sx.toFixed(1)} ${sy.toFixed(1)}`,
        `L${ex.toFixed(1)} ${ey.toFixed(1)}`,
        `C${(ex + 36).toFixed(1)} ${(ey + 21).toFixed(1)} ${(ex + 36).toFixed(1)} ${by.toFixed(1)} ${(ex - 24).toFixed(1)} ${by.toFixed(1)}`,
        `L52 ${by.toFixed(1)}`,
        `Q28 ${by.toFixed(1)} 28 ${(by + 24).toFixed(1)}`,
        `L28 ${h.height.toFixed(1)}`,
      ].join(" ");
      setGeo({ w: h.width, h: h.height, d });
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(hero);
    ro.observe(scene);
    void document.fonts?.ready.then(compute);
    return () => ro.disconnect();
  }, [heroRef, sceneRef]);

  // Draw once, after the hero entrance has finished (M1 ends around 1.8s).
  useEffect(() => {
    const path = fill.current;
    if (!geo || !path || drawn.current) return;
    drawn.current = true;
    const mm = gsap.matchMedia();
    mm.add(NO_REDUCED_MOTION, () => {
      gsap.fromTo(
        path,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", delay: 1.1 },
      );
    });
    return () => mm.revert();
  }, [geo]);

  // Pause the travelling packets while the hero is off-screen (M2).
  useEffect(() => {
    const el = svg.current;
    const hero = heroRef.current;
    if (!el || !hero || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting) el.unpauseAnimations?.();
      else el.pauseAnimations?.();
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [heroRef, geo]);

  if (!geo) return null;

  return (
    <svg
      ref={svg}
      aria-hidden="true"
      viewBox={`0 0 ${geo.w} ${geo.h}`}
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
    >
      <path d={geo.d} fill="none" stroke="var(--route-track)" strokeWidth="1.5" />
      <path
        ref={fill}
        d={geo.d}
        fill="none"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="0"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {!reduced &&
        ["2.6s", "4.6s", "6.6s"].map((begin) => (
          <circle key={begin} r="3" fill="var(--primary)">
            <animateMotion path={geo.d} dur="6s" begin={begin} repeatCount="indefinite" />
          </circle>
        ))}
    </svg>
  );
}
