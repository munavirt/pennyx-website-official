import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, NO_REDUCED_MOTION } from "@/hooks/use-gsap";

/**
 * 10px node. Hollow grey until it is in view, then it fills green and stays filled.
 * Under reduced motion it is simply rendered filled.
 */
export function RouteNode({
  className = "",
  start = "top 65%",
  pulse = false,
}: {
  className?: string;
  start?: string;
  /** Pulse once when lit (used on the last How It Works stop). */
  pulse?: boolean;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(NO_REDUCED_MOTION, () => {
      el.classList.add("is-armed");
      const st = ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => {
          el.classList.remove("is-armed");
          if (pulse) {
            gsap.fromTo(el, { scale: 1.9 }, { scale: 1, duration: 0.6, ease: "power3.out" });
          }
        },
      });
      return () => {
        st.kill();
        el.classList.remove("is-armed");
      };
    });
    return () => mm.revert();
  }, [start, pulse]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`route-node block size-2.5 rounded-full border-[1.5px] border-primary bg-primary ${className}`}
    />
  );
}
