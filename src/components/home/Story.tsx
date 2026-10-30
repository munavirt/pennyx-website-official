import { RouteLine } from "@/components/route/RouteLine";
import { RevealHeading } from "@/components/route/RevealHeading";
import { SectionShell } from "@/components/route/SectionShell";
import { useGsap, gsap } from "@/hooks/use-gsap";

const PROMISES = [
  ["Before you confirm", "The amount, the rate and the pricing."],
  ["While you complete it", "The steps and the deadline."],
  ["After you place it", "The status, in your account."],
] as const;

const LANES = [
  { key: "buy", title: "Buy USDT", body: "Pay in INR, receive USDT.", reverse: false },
  { key: "sell", title: "Sell USDT", body: "Transfer your USDT, receive payment.", reverse: true },
] as const;

/** Act II — the promise, stated once, and the buy/sell fork as two visible lanes. */
export function Story() {
  const ref = useGsap(({ root }) => {
    const q = gsap.utils.selector(root);

    // M5 — word/line mask reveal
    gsap.from(q(".pp-reveal-line"), {
      yPercent: 110,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: { trigger: root, start: "top 70%" },
    });
    gsap.from(q(".pp-story-body"), {
      y: 16,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 62%" },
    });
    gsap.from(q(".pp-story-promise"), {
      y: 16,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: { trigger: ".pp-story-lanes", start: "top 80%" },
    });
    // M6 — lane packets start once the lanes are in view
    gsap.from(q(".pp-lane-label"), {
      opacity: 0,
      y: 10,
      duration: 0.5,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: ".pp-story-lanes", start: "top 80%" },
    });
  });

  return (
    <SectionShell pad="quiet">
      <div ref={ref}>
        {/* Section id lives on the shell's section; Story has no nav anchor. */}
        <RevealHeading
          lines={["No guessing", "what comes next."]}
          className="max-w-4xl font-display text-[clamp(2.5rem,6.4vw,5rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-foreground"
        />

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
          <div>
            <p className="pp-story-body max-w-md text-pretty text-[1.0625rem] leading-[1.65] text-muted-foreground">
              Buying or selling USDT shouldn't be a leap of faith. PennyX puts the details, the
              instructions and the status in one place.
            </p>

            {/* Buy lane and sell lane: the rail splits into two directions, then rejoins */}
            <div className="pp-story-lanes relative mt-12 space-y-9">
              {LANES.map((l) => (
                <div key={l.key} className="relative">
                  <div className="pp-lane-label mb-3">
                    <p className="font-display text-lg font-semibold text-foreground">{l.title}</p>
                    <p className="text-sm text-muted-foreground">{l.body}</p>
                  </div>
                  <div className="relative h-3">
                    {/* branch from the page rail into the lane */}
                    <span
                      aria-hidden="true"
                      className="absolute right-full top-1/2 hidden h-px w-9 bg-border lg:block"
                    />
                    <RouteLine
                      orientation="h"
                      reverse={l.reverse}
                      arrow
                      triggerSelector=".pp-story-lanes"
                      start="top 78%"
                      end="bottom 45%"
                      className="absolute inset-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ul className="divide-y divide-border border-y border-border self-start">
            {PROMISES.map(([title, body]) => (
              <li key={title} className="pp-story-promise py-6">
                <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
