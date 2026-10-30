import { useRef, useState, type Ref } from "react";
import { APP_URL } from "@/lib/config";
import { useGsap, gsap, ScrollTrigger } from "@/hooks/use-gsap";
import { useIsDesktop, useReducedMotion } from "@/hooks/use-media-query";
import { RouteSegment } from "@/components/route/RouteSegment";
import { RouteNode } from "@/components/route/RouteNode";
import { InstructionsState, ReviewState, StatusTimeline } from "./panels";

const STEPS = [
  {
    title: "Before you confirm",
    body: "Amount, rate and network, laid out for review.",
    panel: "New purchase",
  },
  {
    title: "While you complete it",
    body: "Your instructions, with the payment window running.",
    panel: "Instructions",
  },
  {
    title: "After you place it",
    body: "Each step of the order, marked as it happens.",
    panel: "Status",
  },
] as const;

function PanelCard({
  index,
  active,
  barRef,
}: {
  index: number;
  active: boolean;
  barRef?: Ref<HTMLSpanElement>;
}) {
  const step = STEPS[index]!;
  return (
    <div
      data-active={active}
      data-static={active}
      className="pp-state rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_60px_-30px_rgb(25_23_31/0.25)] sm:p-7"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-ink-foreground/60">
          {step.panel}
        </span>
        <span className="rounded-full bg-primary/15 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-primary">
          Illustrative
        </span>
      </div>
      {index === 0 && <ReviewState />}
      {index === 1 && <InstructionsState barRef={barRef} />}
      {index === 2 && <StatusTimeline dark />}
    </div>
  );
}

/**
 * Act II — the product moment. On desktop the panel is sticky while three text steps scroll
 * past and the panel crossfades through Review → Instructions → Status (M7). Below 1024px, or
 * with reduced motion, nothing pins: each state follows its text in normal flow. All three
 * states are always in the DOM, so the content reads the same without scroll-linked motion.
 */
export function Showcase() {
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();
  const sticky = desktop && !reduced;
  const [stage, setStage] = useState(0);
  const barRef = useRef<HTMLSpanElement | null>(null);

  const ref = useGsap(
    ({ root }) => {
      const q = gsap.utils.selector(root);
      gsap.from(q(".pp-show-head > *"), {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 65%" },
      });

      // T2 — the band rises into place as it enters
      gsap.from(q(".pp-show-band"), {
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 95%",
          end: "top 60%",
          scrub: true,
        },
      });

      if (sticky) {
        ScrollTrigger.create({
          trigger: q(".pp-show-scene")[0] as Element,
          start: "top 30%",
          end: "bottom 70%",
          onUpdate: (self) => {
            const p = self.progress;
            const next = p < 1 / 3 ? 0 : p < 2 / 3 ? 1 : 2;
            setStage((cur) => (cur === next ? cur : next));
            if (barRef.current) {
              const t = Math.min(1, Math.max(0, (p - 1 / 3) * 3));
              barRef.current.style.width = `${100 - 38 * t}%`;
            }
          },
        });
      } else {
        gsap.from(q(".pp-show-flow"), {
          opacity: 0,
          y: 16,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: q(".pp-show-scene")[0] as Element,
            start: "top 75%",
          },
        });
      }
    },
    [sticky],
  );

  return (
    <section id="platform" ref={ref} className="relative px-4 py-4 lg:py-6">
      <RouteSegment />
      <RouteNode className="absolute left-[23px] top-[calc(1.5rem+7rem+1.1rem)] z-[6] hidden lg:block" />

      <div className="pp-show-band relative rounded-[2rem] border border-white/[0.08] bg-ink py-[4.5rem] text-ink-foreground lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:pl-16 lg:pr-8">
          <div className="pp-show-head max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              The platform
            </p>
            <h2 className="text-balance font-display text-[clamp(2.5rem,4.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em]">
              Your transactions, organised in one place.
            </h2>
            <p className="mt-6 max-w-md text-pretty text-[1.0625rem] leading-[1.65] text-ink-foreground/70">
              Follow a sample purchase from review to status. The figures are
              examples, not live rates.
            </p>
            <a
              href={APP_URL}
              className="mt-8 inline-flex h-12 items-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-[background-color,transform] duration-150 hover:bg-primary-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Open PennyX
            </a>
          </div>

          {sticky ? (
            <div className="pp-show-scene mt-16 grid grid-cols-12 gap-8">
              <ol className="col-span-5">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex h-[80vh] items-start pt-6">
                    <div
                      className="transition-opacity duration-500"
                      style={{ opacity: stage === i ? 1 : 0.35 }}
                    >
                      <h3 className="font-display text-2xl font-semibold">
                        {s.title}
                      </h3>
                      <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-foreground/65">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <figure className="col-span-7">
                <div className="sticky top-28">
                  <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
                    {STEPS.map((s, i) => (
                      <div
                        key={s.title}
                        className="transition-opacity duration-500"
                        style={{ opacity: stage === i ? 1 : 0 }}
                      >
                        <PanelCard
                          index={i}
                          active={stage === i}
                          barRef={i === 1 ? barRef : undefined}
                        />
                      </div>
                    ))}
                  </div>
                  <figcaption className="mt-4 text-xs leading-relaxed text-ink-foreground/60">
                    A simplified example of the purchase review screen. Amounts
                    are for illustration and are not a live rate.
                  </figcaption>
                </div>
              </figure>
            </div>
          ) : (
            <div className="pp-show-scene mt-12 space-y-10">
              {STEPS.map((s, i) => (
                <div key={s.title} className="pp-show-flow">
                  <h3 className="font-display text-xl font-semibold">
                    {s.title}
                  </h3>
                  <p className="mb-5 mt-2 max-w-md text-sm leading-relaxed text-ink-foreground/65">
                    {s.body}
                  </p>
                  <PanelCard index={i} active />
                </div>
              ))}
              <p className="text-xs leading-relaxed text-ink-foreground/60">
                A simplified example of the purchase review screen. Amounts are
                for illustration and are not a live rate.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
