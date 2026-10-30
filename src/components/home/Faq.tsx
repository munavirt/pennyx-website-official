import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { APP_URL } from "@/lib/config";
import { ScrollTrigger } from "@/hooks/use-gsap";
import { SectionShell } from "@/components/route/SectionShell";

const FAQS: [string, string][] = [
  [
    "What is PennyX, and what can I do on it?",
    "PennyX is a platform for buying and selling USDT. You create and follow your orders in the PennyX application. This website explains how it works.",
  ],
  [
    "What is USDT?",
    "USDT (Tether) is a stablecoin: a digital token designed to track the value of the US dollar.",
  ],
  [
    "How does buying USDT work?",
    "You enter an amount in INR and review the rate and pricing. Then you follow the payment instructions for your order, submit proof of payment if it's requested, and track the order until it's complete.",
  ],
  [
    "How does selling USDT work?",
    "Selling has its own steps, which differ from buying, including how you transfer your USDT and how you receive payment. The platform shows you the steps and the details for your order as you go.",
  ],
  [
    "Where can I see the rate and any charges?",
    "The applicable rate and the pricing breakdown are shown in the platform before you confirm an order. Figures on this website are illustrative, so rely on what the platform shows for your order.",
  ],
  [
    "Which blockchain networks are supported?",
    "USDT exists on several blockchain networks, such as TRON (TRC-20) and Ethereum (ERC-20). A wallet address works on one network, not all of them, and sending USDT on the wrong one can mean the transfer fails or the funds can't be recovered. The platform lists the supported networks when you place an order. Always pick the one your wallet uses.",
  ],
  [
    "How can I track my order?",
    "Sign in to the platform and open your orders to see their current status.",
  ],
  [
    "What happens if an order expires?",
    "Each order has a payment window. If it passes without payment, the order doesn't proceed and you can start a new one. If you've already paid, or something about an order looks wrong, contact support with the order details.",
  ],
  [
    "Is identity verification required?",
    "Any verification requirements are shown during registration and sign-in.",
  ],
  [
    "How do I contact support?",
    "Support is available through the platform's support channels once you're signed in.",
  ],
];

/** The ten questions, grouped under three labels. Answers are verbatim. */
const GROUPS: { label: string; from: number; to: number }[] = [
  { label: "Basics", from: 0, to: 2 },
  { label: "Buying and selling", from: 2, to: 6 },
  { label: "Your order", from: 6, to: 10 },
];

/** Act IV — trust, transparency and FAQs, in a single accordion. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  // Page height changes when an answer opens or closes (M11).
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 320);
    return () => window.clearTimeout(t);
  }, [open]);

  return (
    <SectionShell id="faq" pad="product">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-text">
            Questions
          </p>
          <h2 className="text-balance font-display text-[clamp(2.5rem,4.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-foreground">
            The practical answers, up front.
          </h2>
          <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            Rates, networks, deadlines and support. Anything not covered here is shown inside the
            platform.
          </p>
          <a
            href={APP_URL}
            className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-text"
          >
            Open PennyX
          </a>
        </div>

        <div className="space-y-12">
          {GROUPS.map((g) => (
            <div key={g.label}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {g.label}
              </h3>
              <div className="divide-y divide-border border-y border-border">
                {FAQS.slice(g.from, g.to).map(([q, a], j) => {
                  const i = g.from + j;
                  const isOpen = open === i;
                  return (
                    <div key={q}>
                      <h4>
                        <button
                          type="button"
                          id={`faq-q-${i}`}
                          aria-expanded={isOpen}
                          aria-controls={`faq-a-${i}`}
                          onClick={() => setOpen(isOpen ? null : i)}
                          className="flex min-h-14 w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-medium text-foreground transition-colors hover:text-primary-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text"
                        >
                          {q}
                          <Plus
                            size={18}
                            aria-hidden="true"
                            className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45 text-primary-text" : "text-muted-foreground"
                              }`}
                          />
                        </button>
                      </h4>
                      <div
                        id={`faq-a-${i}`}
                        role="region"
                        aria-labelledby={`faq-q-${i}`}
                        inert={!isOpen}
                        className={`grid transition-[grid-template-rows,opacity,padding] duration-[280ms] ease-in-out ${isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                      >
                        <p className="overflow-hidden pr-10 text-[0.95rem] leading-relaxed text-muted-foreground">
                          {a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
