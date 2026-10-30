import { useGsap, gsap } from "@/hooks/use-gsap";
import { RouteLine } from "@/components/route/RouteLine";
import { RouteNode } from "@/components/route/RouteNode";
import { SectionShell } from "@/components/route/SectionShell";
import {
  AccessVignette,
  ReviewVignette,
  PayVignette,
  TrackVignette,
} from "@/components/illustrations/Vignettes";

const ART = [AccessVignette, ReviewVignette, PayVignette, TrackVignette];

const STEPS = [
  {
    n: "01",
    title: "Start an order",
    body: "Sign in or register, then choose whether to buy or sell USDT.",
  },
  {
    n: "02",
    title: "Review the details",
    body: "Check the amount, the rate and the pricing before you confirm anything.",
  },
  {
    n: "03",
    title: "Follow the instructions",
    body: "PennyX gives you the steps for your order and its deadline. Buying and selling have different steps.",
  },
  {
    n: "04",
    title: "Track your order",
    body: "Open your account to see where the order stands and whether anything needs your attention.",
  },
];

/**
 * Act III — four stops on one continuous route. The vignettes sit directly on the surface
 * (no boxes), alternating 24px up/down so the row reads as a path. Vertical on mobile.
 */
export function HowItWorks() {
  const ref = useGsap(({ root }) => {
    const q = gsap.utils.selector(root);
    gsap.from(q(".pp-hiw-head > *"), {
      opacity: 0,
      y: 16,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: { trigger: root, start: "top 70%" },
    });
    // M8 — vignettes fade in along the route
    gsap.from(q(".pp-step"), {
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: { trigger: q(".pp-hiw-row")[0] as Element, start: "top 75%" },
    });
  });

  return (
    <SectionShell id="how-it-works" tone="surface" pad="product">
      <div ref={ref}>
        <div className="pp-hiw-head mb-14 max-w-2xl lg:mb-20">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-text">
            How it works
          </p>
          <h2 className="text-balance font-display text-[clamp(2.5rem,4.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-foreground">
            Four steps, start to finish.
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-[1.0625rem] leading-[1.65] text-muted-foreground">
            The shape of an order is the same whether you buy or sell. The payment or transfer
            steps differ, and PennyX shows them as you go.
          </p>
        </div>

        <div className="pp-hiw-row relative">
          {/* Desktop: one horizontal route line branching from the page rail, with a node per stop */}
          <RouteLine
            orientation="h"
            triggerSelector=".pp-hiw-row"
            start="top 75%"
            end="top 25%"
            className="absolute left-[-36px] right-0 top-[14.7rem] z-0 hidden h-3 lg:block"
          />
          {/* Mobile: vertical line on the left */}
          <RouteLine
            orientation="v"
            triggerSelector=".pp-hiw-row"
            className="absolute bottom-6 left-[3px] top-6 w-[10px] md:hidden"
          />

          <ol className="relative grid gap-12 pl-8 md:grid-cols-2 md:pl-0 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((s, i) => {
              const Art = ART[i];
              const offset = i % 2 === 0 ? "lg:-translate-y-3" : "lg:translate-y-3";
              return (
                <li key={s.n} className="pp-step relative">
                  <RouteNode
                    pulse={i === STEPS.length - 1}
                    start="top 75%"
                    className="absolute -left-[1.8rem] top-3 md:hidden"
                  />
                  <div className={`h-56 ${offset}`}>
                    <div className="flex h-full items-end">
                      <div className="w-full">{Art ? <Art /> : null}</div>
                    </div>
                  </div>
                  <div className="mb-5 mt-3 hidden items-center gap-3 lg:flex">
                    <RouteNode
                      pulse={i === STEPS.length - 1}
                      start="top 75%"
                      className="relative z-[1]"
                    />
                  </div>
                  <p className="font-display text-sm font-semibold tabular-nums text-primary-text">
                    {s.n}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </SectionShell>
  );
}
