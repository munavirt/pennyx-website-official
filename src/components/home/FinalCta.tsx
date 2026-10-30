import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/config";
import { useGsap, gsap } from "@/hooks/use-gsap";

/**
 * Preserved: green fill, rounded-[2rem] shape, headline size, the two curves.
 * Changed only: button labels, the curves are drawn on entry, and the page route arrives
 * from the left and meets the first curve's start.
 */
export function FinalCta() {
  const ref = useGsap(({ root }) => {
    const q = gsap.utils.selector(root);
    // M13 — the route arrives
    gsap.from(q(".pp-cta-panel"), {
      y: 32,
      opacity: 0.6,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 80%" },
    });
    gsap.from(q(".pp-cta-elbow"), {
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 85%" },
    });
    gsap.fromTo(
      q(".pp-cta-curve"),
      { strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: { trigger: root, start: "top 80%" },
      },
    );
  });

  return (
    <section ref={ref} className="relative px-5 pb-24 pt-16 sm:px-8 sm:pb-28 sm:pt-20">
      <div className="relative mx-auto max-w-6xl">
        {/* Page rail, elbowing into the first curve's left end (desktop) */}
        <div
          aria-hidden="true"
          className="pp-cta-elbow pointer-events-none absolute right-full top-[-5rem] z-[5] hidden h-[calc(5rem+73.3%)] w-[calc(max(2rem,(100vw-72rem)/2)-28px)] rounded-bl-[1.5rem] border-b-[1.5px] border-l-[1.5px] border-primary lg:block"
        />

        <div className="pp-cta-panel relative overflow-hidden rounded-[2rem] bg-primary px-8 py-20 text-center text-primary-foreground sm:px-16 sm:py-28">
          <svg
            aria-hidden="true"
            viewBox="0 0 600 300"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
            preserveAspectRatio="none"
          >
            <path
              className="pp-cta-curve stroke-primary-foreground"
              d="M0 220 C 150 120, 300 300, 600 80"
              strokeWidth="1.2"
              fill="none"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="0"
            />
            <path
              className="pp-cta-curve stroke-primary-foreground"
              d="M0 260 C 200 160, 380 320, 600 130"
              strokeWidth="1"
              fill="none"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="0"
            />
          </svg>
          <h2 className="relative mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.06] tracking-tight sm:text-6xl">
            Take the next step with PennyX.
          </h2>
          <p className="relative mx-auto mt-6 max-w-lg opacity-80">
            Explore the platform, understand the process, and find the information you need to get
            started.
          </p>
          <div className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={APP_URL}
              className="group inline-flex items-center gap-2 rounded-full bg-primary-foreground px-7 py-3.5 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
            >
              Open PennyX
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex min-h-11 items-center text-sm font-semibold underline-offset-4 hover:underline"
            >
              See how it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
