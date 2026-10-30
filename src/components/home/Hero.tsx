import { useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/config";
import { useGsap, gsap } from "@/hooks/use-gsap";
import { HeroScene } from "./HeroScene";
import { HeroRoute } from "./HeroRoute";

const INDICATORS = [
  "Clear order details",
  "Guided transaction process",
  "Order status tracking",
] as const;

/**
 * Hero — staggered editorial composition built around the isometric diamond:
 * heading in the top-left corner space, copy and actions in the bottom-left corner space,
 * the artwork centre-right, and the route leaving its road stub.
 * The illustration itself is untouched.
 */
export function Hero() {
  const sceneBox = useRef<HTMLDivElement | null>(null);
  const ref = useGsap(({ root }) => {
    const q = gsap.utils.selector(root);

    // M1 — entrance, in reading order: heading → world → explanation → action (< 2s, once)
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(q(".pp-hero-line"), { yPercent: 100, duration: 0.9, stagger: 0.12 })
      .from(q(".pp-hero-scene"), { y: 24, opacity: 0, duration: 1.0 }, 0.25)
      .from(
        q(".ic-b"),
        { y: 32, opacity: 0, duration: 0.8, stagger: 0.05 },
        0.45,
      )
      .fromTo(
        q(".pp-hero-underline"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: "power2.inOut" },
        0.9,
      )
      .from(
        q(".pp-hero-chip"),
        { x: -12, opacity: 0, duration: 0.5, stagger: 0.1 },
        1.0,
      )
      .from(q(".pp-hero-sub"), { y: 16, opacity: 0, duration: 0.6 }, 1.05)
      .from(q(".pp-hero-cta"), { y: 12, opacity: 0, duration: 0.5 }, 1.2);

    // M3 — scroll depth: the artwork drifts past the heading (desktop only, max 60px)
    if (window.matchMedia("(min-width: 1024px)").matches) {
      const scrub = {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(q(".pp-hero-depth-scene"), {
        y: -56,
        ease: "none",
        scrollTrigger: scrub,
      });
      gsap.to(q(".pp-hero-depth-head"), {
        y: -24,
        ease: "none",
        scrollTrigger: scrub,
      });
    }
  });

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden pt-24 sm:pt-28 lg:h-[min(100svh,860px)] lg:min-h-[660px] lg:pt-0"
    >
      {/* Ground plane: the city sits on a surface. No blobs. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background: "linear-gradient(to top, var(--surface), transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="band-fade-bottom pointer-events-none absolute inset-x-0 bottom-0 h-40"
      />
      <HeroRoute heroRef={ref} sceneRef={sceneBox} />

      <div className="relative z-[1] mx-auto flex h-full max-w-7xl flex-col px-5 sm:px-8 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr_auto] lg:pb-20 lg:pl-16 lg:pr-8 lg:pt-28">
        {/* 1. Heading — line 2 steps down along the diamond's upper-left diagonal */}
        <div className="pp-hero-depth-head relative z-10 lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <h1 className="font-display text-[clamp(1.75rem,8.4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground md:text-[clamp(3rem,5.4vw,5.25rem)]">
            <span className="reveal-mask whitespace-nowrap">
              <span className="pp-hero-line block">Buy and sell USDT</span>
            </span>
            <span className="reveal-mask whitespace-nowrap lg:ml-[9%]">
              <span className="pp-hero-line block">
                <span className="relative inline-block">
                  with INR.
                  {/* Bright brand green as a 6px underline (passes contrast); the ink text carries the meaning */}
                  <span
                    aria-hidden="true"
                    className="pp-hero-underline absolute -bottom-1 left-0 h-1.5 w-full origin-left rounded-full bg-primary"
                  />
                </span>
              </span>
            </span>
          </h1>
        </div>

        {/* 2. Illustration — centre-right, may bleed past the container */}
        <div
          ref={sceneBox}
          className="relative -mr-[4%] mt-8 w-[104%] lg:col-span-8 lg:col-start-5 lg:row-span-3 lg:row-start-1 lg:mr-[-6vw] lg:mt-24 lg:w-[clamp(720px,62vw,960px)] lg:max-w-none lg:self-start lg:justify-self-end"
        >
          <div className="pp-hero-depth-scene">
            <div className="pp-hero-scene">
              <HeroScene />
            </div>
          </div>
        </div>

        {/* 3 + 4. Direction labels, description, actions — bottom-left corner */}
        <div className="relative z-10 mt-6 max-w-[26rem] lg:col-span-4 lg:col-start-1 lg:row-start-3 lg:mt-0 lg:self-end">
          <div className="mb-5 flex flex-wrap gap-2">
            {INDICATORS.map((label) => (
              <span
                key={label}
                className="pp-hero-chip inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-xs font-medium text-foreground"
              >
                <span aria-hidden="true" className="h-px w-3 bg-primary" />
                {label}
              </span>
            ))}
          </div>

          <p className="pp-hero-sub text-pretty text-[1.0625rem] leading-[1.6] text-muted-foreground">
            PennyX helps you exchange USDT through a guided order process.
            Review the amount, the rate and the instructions before you confirm
            your transaction.
          </p>

          <div className="pp-hero-cta mt-6">
            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <a
                href={APP_URL}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-[background-color,transform] duration-150 hover:bg-primary-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text"
              >
                Open PennyX
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#how-it-works"
                className="group inline-flex min-h-11 items-center justify-center gap-1.5 text-sm font-semibold text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-text"
              >
                See how it works
                <ArrowDown
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                />
              </a>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Orders are created and managed in the PennyX app. This site
              explains how it works.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
