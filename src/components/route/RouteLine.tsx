import { useEffect, useRef } from "react";
import { gsap, NO_REDUCED_MOTION } from "@/hooks/use-gsap";

type Props = {
  orientation?: "h" | "v";
  /** Draw from right to left (or bottom to top). */
  reverse?: boolean;
  /** Arrowhead at the end of the line; fades in when the line has been drawn. */
  arrow?: boolean;
  /** Ancestor selector whose scroll position drives the draw. Defaults to the parent element. */
  triggerSelector?: string;
  start?: string;
  end?: string;
  className?: string;
};

/**
 * A single 1.5px route line: grey track + green fill drawn on scroll
 * (stroke-dashoffset, scrubbed). Fully drawn by default and under reduced motion.
 */
export function RouteLine({
  orientation = "v",
  reverse = false,
  arrow = false,
  triggerSelector,
  start = "top 80%",
  end = "bottom 60%",
  className = "",
}: Props) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const fill = useRef<SVGLineElement | null>(null);
  const head = useRef<SVGPathElement | null>(null);
  const horizontal = orientation === "h";

  useEffect(() => {
    const el = wrap.current;
    const line = fill.current;
    if (!el || !line) return;
    const trigger =
      (triggerSelector ? el.closest(triggerSelector) : el.parentElement) ?? el.parentElement;
    if (!trigger) return;

    const mm = gsap.matchMedia();
    mm.add(NO_REDUCED_MOTION, () => {
      if (head.current) head.current.style.opacity = "0";
      gsap.fromTo(
        line,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger,
            start,
            end,
            scrub: true,
            onUpdate: (self) => {
              if (head.current) head.current.style.opacity = self.progress > 0.97 ? "1" : "0";
            },
          },
        },
      );
    });
    return () => mm.revert();
  }, [triggerSelector, start, end]);

  const flip = reverse ? (horizontal ? "scaleX(-1)" : "scaleY(-1)") : undefined;

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={flip ? { transform: flip } : undefined}
    >
      <svg
        className="h-full w-full overflow-visible"
        viewBox={horizontal ? "0 0 100 12" : "0 0 10 100"}
        preserveAspectRatio="none"
      >
        {horizontal ? (
          <>
            <line x1="0" y1="6" x2="100" y2="6" stroke="var(--route-track)" strokeWidth="1.5" />
            <line ref={fill} x1="0" y1="6" x2="100" y2="6" pathLength={1} strokeDasharray="1" strokeDashoffset="0" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <line x1="5" y1="0" x2="5" y2="100" stroke="var(--route-track)" strokeWidth="1.5" />
            <line ref={fill} x1="5" y1="0" x2="5" y2="100" pathLength={1} strokeDasharray="1" strokeDashoffset="0" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" />
          </>
        )}
      </svg>
      {arrow && horizontal && (
        <svg
          viewBox="0 0 10 10"
          className="absolute right-0 top-1/2 size-2.5 -translate-y-1/2 overflow-visible"
        >
          <path ref={head} d="M0 0L10 5L0 10Z" fill="var(--primary)" style={{ transition: "opacity .3s ease" }} />
        </svg>
      )}
    </div>
  );
}
