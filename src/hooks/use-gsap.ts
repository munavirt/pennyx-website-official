import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const NO_REDUCED_MOTION = "(prefers-reduced-motion: no-preference)";

/**
 * Runs a GSAP setup function scoped to a container ref. Uses gsap.matchMedia so the
 * animations are created only while the OS allows motion, and are reverted (leaving the
 * final, fully visible state) the moment the person switches reduced motion on or the
 * component unmounts.
 */
export function useGsap(
  setup: (ctx: { gsap: typeof gsap; root: HTMLElement }) => void,
  deps: unknown[] = [],
) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);
    mm.add(NO_REDUCED_MOTION, () => {
      setup({ gsap, root });
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return rootRef;
}

export { gsap, ScrollTrigger };
