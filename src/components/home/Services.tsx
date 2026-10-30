import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/config";
import { SectionShell } from "@/components/route/SectionShell";

const SERVICES = [
  {
    key: "buy",
    title: "Buy USDT",
    body: "Pay in INR and receive USDT. Review the amount and the rate before you confirm.",
    cta: "Buy USDT",
    from: "INR",
    to: "USDT",
  },
  {
    key: "sell",
    title: "Sell USDT",
    body: "Send your USDT and receive payment. Follow the transfer steps shown for your order.",
    cta: "Sell USDT",
    from: "USDT",
    to: "INR",
  },
] as const;

function ServiceArt({
  from,
  to,
  label,
}: {
  from: string;
  to: string;
  label: string;
}) {
  return (
    <svg
      viewBox="0 0 320 140"
      role="img"
      aria-label={label}
      className="h-auto w-full"
    >
      <rect
        x="12"
        y="40"
        width="96"
        height="60"
        rx="14"
        className="fill-surface stroke-border"
        strokeWidth="1.5"
      />
      <text
        x="60"
        y="77"
        textAnchor="middle"
        className="fill-foreground font-display text-[22px] font-semibold"
      >
        {from}
      </text>
      <path
        d="M124 70 H186"
        className="stroke-primary"
        strokeWidth="2"
        strokeDasharray="4 6"
      />
      <path
        d="M180 64 L190 70 L180 76"
        fill="none"
        className="stroke-primary"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="212"
        y="40"
        width="96"
        height="60"
        rx="14"
        className="fill-accent-soft stroke-primary"
        strokeWidth="1.5"
      />
      <text
        x="260"
        y="77"
        textAnchor="middle"
        className="fill-primary-text font-display text-[22px] font-semibold"
      >
        {to}
      </text>
    </svg>
  );
}

/** Buy and sell as two service cards, each with its own flow illustration. */
export function Services() {
  return (
    <SectionShell id="services" pad="product">
      <div className="mb-12 max-w-2xl lg:mb-16">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-text">
          Services
        </p>
        <h2 className="text-balance font-display text-[clamp(2.5rem,4.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-foreground">
          Buy or sell USDT with clear steps.
        </h2>
        <p className="mt-5 text-pretty text-[1.0625rem] leading-[1.65] text-muted-foreground">
          Choose the order that fits you. Each order shows its details before
          you confirm anything.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {SERVICES.map((s) => (
          <article
            key={s.key}
            className="group flex flex-col rounded-2xl border border-border bg-background p-6 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-lg sm:p-8 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <div className="rounded-xl bg-surface p-5">
              <ServiceArt
                from={s.from}
                to={s.to}
                label={`${s.from} to ${s.to}`}
              />
            </div>
            <h3 className="mt-8 font-display text-2xl font-semibold text-foreground">
              {s.title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {s.body}
            </p>
            <a
              href={APP_URL}
              className="mt-8 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text"
            >
              {s.cta}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
