import { useGsap, gsap } from "@/hooks/use-gsap";
import { RouteNode } from "@/components/route/RouteNode";
import { SectionShell } from "@/components/route/SectionShell";

const ITEMS = [
  {
    title: "Details first.",
    body: "Amounts, rates and pricing are shown before you confirm.",
  },
  {
    title: "A guided process.",
    body: "Each order comes with clear steps and any time limit that applies.",
  },
  {
    title: "Your orders, in one place.",
    body: "Order status and details stay in your account.",
  },
  {
    title: "Support when you need it.",
    body: "If something is unclear, support is available through the platform.",
  },
];

/** Act IV — four principles set as typographic statements. No numbers, no boxes. */
export function WhyPennyX() {
  const ref = useGsap(({ root }) => {
    const q = gsap.utils.selector(root);
    // M5 — word-level mask reveal for the headline
    gsap.from(q(".pp-reveal-line"), {
      yPercent: 110,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: { trigger: root, start: "top 70%" },
    });
    // M10 — each statement fades up when it reaches 75% of the viewport
    q(".pp-why-item").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 75%" },
      });
    });
  });

  return (
    <SectionShell id="why-pennyx" pad="quiet">
      {/* legacy anchor from the earlier name, so old links still land here */}
      <span
        id="why-penny-pay"
        aria-hidden="true"
        className="absolute -top-16"
      />
      <div ref={ref} className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-balance font-display text-[clamp(2.5rem,4.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-foreground">
            <span className="reveal-mask">
              <span className="pp-reveal-line block">Designed around</span>
            </span>
            <span className="reveal-mask">
              <span className="pp-reveal-line block">
                what you need to see.
              </span>
            </span>
          </h2>
          <p className="mt-6 max-w-sm text-pretty text-[1.0625rem] leading-[1.65] text-muted-foreground">
            Four things the platform is built to get right, for buyers and
            sellers alike.
          </p>
        </div>

        <ul className="relative space-y-14 pl-9">
          {/* local line the nodes sit on, beside the statements */}
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[4px] top-2 w-px bg-border"
          />
          {ITEMS.map((item) => (
            <li key={item.title} className="pp-why-item relative">
              <RouteNode start="top 60%" className="absolute -left-9 top-3" />
              <h3 className="font-display text-[clamp(1.5rem,2.2vw,2rem)] font-medium leading-[1.25] text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
