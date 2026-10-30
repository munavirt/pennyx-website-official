import { CityScene } from "@/components/illustrations/CityScene";
import { RouteLine } from "@/components/route/RouteLine";
import { SectionShell } from "@/components/route/SectionShell";
import { useGsap, gsap } from "@/hooks/use-gsap";

/** Act V — who this is for, plainly. The monogram tile is replaced by the artwork's own fountain. */
export function About() {
  const ref = useGsap(({ root }) => {
    const q = gsap.utils.selector(root);
    gsap.from(q(".pp-reveal-line"), {
      yPercent: 110,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: { trigger: root, start: "top 70%" },
    });
  });

  return (
    <SectionShell id="about" pad="quiet">
      <div ref={ref} className="relative grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12">
        <div>
          <h2 className="text-balance font-display text-[clamp(2.5rem,4.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-foreground">
            <span className="reveal-mask">
              <span className="pp-reveal-line block">Built so every</span>
            </span>
            <span className="reveal-mask">
              <span className="pp-reveal-line block">step is visible.</span>
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-[1.0625rem] leading-[1.65] text-muted-foreground">
            PennyX is a platform for buying and selling USDT. The idea is simple: you should see
            every step of a transaction (the amount, the conversion, the instructions and the
            outcome) in one place.
          </p>
          <p className="mt-4 max-w-xl text-pretty text-[1.0625rem] leading-[1.65] text-muted-foreground">
            This website explains the platform. Orders are created and managed in the PennyX
            application.
          </p>
        </div>

        {/* Same artwork, different viewBox: the fountain and its P coin, directly on the page */}
        <div aria-hidden="true" className="relative mx-auto w-full max-w-sm">
          <CityScene idPrefix="about" viewBox="-130 255 300 195" />
        </div>

        {/* The route's last straight run: from the page rail, beneath the copy, up to the fountain */}
        <RouteLine
          orientation="h"
          triggerSelector="section"
          start="top 55%"
          end="bottom 75%"
          className="absolute left-[-36px] right-[calc((100%-3rem)/4.8)] top-[calc(100%+2.5rem)] z-0 hidden h-3 lg:block"
        />
      </div>
    </SectionShell>
  );
}
