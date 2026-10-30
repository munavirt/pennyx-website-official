import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/route/SectionShell";

const NETWORKS = [
  {
    name: "TRC-20",
    chain: "TRON network",
    body: "USDT transfers on the TRON network. Check that the network in your order matches the wallet you send from.",
  },
  {
    name: "ERC-20",
    chain: "Ethereum network",
    body: "USDT on the Ethereum network. Network fees can vary, so review the details in your order before you send.",
  },
] as const;

/** Networks the platform supports, with a link to the explainer guide. */
export function Networks() {
  return (
    <SectionShell id="networks" tone="surface" pad="product">
      <div className="mb-12 max-w-2xl lg:mb-16">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-text">
          Networks
        </p>
        <h2 className="text-balance font-display text-[clamp(2.5rem,4.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-foreground">
          Choose the right network for your USDT.
        </h2>
        <p className="mt-5 text-pretty text-[1.0625rem] leading-[1.65] text-muted-foreground">
          USDT exists on more than one blockchain network. A transfer only
          arrives when the sender and the receiver use the same network.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {NETWORKS.map((n) => (
          <div
            key={n.name}
            className="rounded-2xl border border-border bg-background p-6 sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-text">
              {n.chain}
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold text-foreground">
              {n.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {n.body}
            </p>
            <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
              Your order shows the networks available when you place it.
            </p>
          </div>
        ))}
      </div>

      <Link
        to="/learn/blockchain-networks"
        className="group mt-10 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-text"
      >
        Read the network guide
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </Link>
    </SectionShell>
  );
}
