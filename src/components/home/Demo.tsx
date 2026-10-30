import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/config";
import { SectionShell } from "@/components/route/SectionShell";
import { Row, StatusTimeline } from "./panels";

type Stage = {
  id: string;
  label: string;
  title: string;
  body: string;
  preview: ReactNode;
};

type Mode = "buy" | "sell";

const Steps = ({ items }: { items: [string, string][] }) => (
  <ol className="space-y-3">
    {items.map(([t, d], i) => (
      <li key={t} className="flex gap-4 rounded-xl border border-border bg-card p-4">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-sm font-semibold text-primary-text">
          {i + 1}
        </span>
        <span>
          <span className="block text-sm font-semibold">{t}</span>
          <span className="mt-0.5 block text-sm text-muted-foreground">{d}</span>
        </span>
      </li>
    ))}
  </ol>
);

const BUY_STAGES: Stage[] = [
  {
    id: "amount",
    label: "Amount",
    title: "Enter how much you want to spend",
    body: "You start with an amount in INR. As you type, the platform shows what that comes to in USDT, and nothing is submitted yet.",
    preview: (
      <div className="space-y-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">You pay</p>
          <p className="mt-1 font-display text-3xl font-semibold">₹ 25,000</p>
        </div>
        <div className="rounded-xl border border-primary/40 bg-accent-soft p-4">
          <p className="text-xs text-muted-foreground">You receive</p>
          <p className="mt-1 font-display text-3xl font-semibold text-primary-text">
            ≈ 278.4 USDT
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "breakdown",
    label: "Breakdown",
    title: "Check the rate and pricing",
    body: "Before you confirm, you can review the applicable rate and a breakdown of what you'd receive. If something looks off, you can stop here.",
    preview: (
      <div className="divide-y divide-border rounded-xl border border-border bg-card px-4">
        <Row k="Amount" v="₹ 25,000" />
        <Row k="Rate" v="Shown before you confirm" />
        <Row k="Pricing details" v="Shown in the breakdown" />
        <Row k="Network" v="Selected by you" />
        <Row k="You receive" v="≈ 278.4 USDT" strong />
      </div>
    ),
  },
  {
    id: "payment",
    label: "Payment",
    title: "Follow the payment instructions",
    body: "Once you place the order, the platform gives you the payment instructions and the deadline. If proof of payment is requested, you submit it there.",
    preview: (
      <Steps
        items={[
          ["Pay as instructed", "Use the details shown on your order."],
          ["Submit proof, if asked", "Upload it in the platform."],
          ["Mind the deadline", "Each order has a payment window."],
        ]}
      />
    ),
  },
  {
    id: "status",
    label: "Status",
    title: "Follow your order",
    body: "Your order and its current status stay in your account, so you can check back whenever you like.",
    preview: <StatusTimeline />,
  },
];

/**
 * Sell stages: the sell-side flow is NOT specified in the source material. Stage names and
 * copy follow the FAQ ("selling has its own transfer and payment steps") and need product
 * confirmation. No numeric rate or amount is shown for selling.
 */
const SELL_STAGES: Stage[] = [
  {
    id: "amount",
    label: "Amount",
    title: "Enter how much USDT you want to sell",
    body: "Enter how much USDT you want to sell. Nothing is submitted yet.",
    preview: (
      <div className="space-y-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">You sell</p>
          <p className="mt-1 font-display text-xl font-semibold">The USDT amount you enter</p>
        </div>
        <div className="rounded-xl border border-primary/40 bg-accent-soft p-4">
          <p className="text-xs text-muted-foreground">You receive</p>
          <p className="mt-1 font-display text-xl font-semibold text-primary-text">
            Shown before you confirm
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "breakdown",
    label: "Breakdown",
    title: "Review the rate and what you'd receive",
    body: "Review the rate and what you'd receive before you confirm.",
    preview: (
      <div className="divide-y divide-border rounded-xl border border-border bg-card px-4">
        <Row k="Amount" v="Entered by you" />
        <Row k="Rate" v="Shown before you confirm" />
        <Row k="Pricing details" v="Shown in the breakdown" />
        <Row k="Network" v="Selected by you" />
        <Row k="You receive" v="Shown before you confirm" strong />
      </div>
    ),
  },
  {
    id: "transfer",
    label: "Transfer",
    title: "Follow the transfer instructions",
    body: "Follow the instructions for sending your USDT, and watch the deadline.",
    preview: (
      <Steps
        items={[
          ["Send your USDT as instructed", "Use the details and network shown on your order."],
          ["Check the network", "Choose the one your wallet uses."],
          ["Mind the deadline", "Each order has a time limit."],
        ]}
      />
    ),
  },
  {
    id: "status",
    label: "Status",
    title: "Track your order",
    body: "Track your order, including how you receive payment.",
    preview: <StatusTimeline />,
  },
];

const STAGES_BY_MODE: Record<Mode, Stage[]> = { buy: BUY_STAGES, sell: SELL_STAGES };

/** Act III — try both flows. The interface sits on the page; stage tabs are nodes on a route line. */
export function Demo() {
  const [mode, setMode] = useState<Mode>("buy");
  const [index, setIndex] = useState(0);
  const stages = STAGES_BY_MODE[mode];
  const stage = stages[index]!;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const modeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const last = stages.length - 1;

  const go = (next: number, focus = false) => {
    const i = (next + stages.length) % stages.length;
    setIndex(i);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1, true);
    else if (e.key === "ArrowLeft") go(index - 1, true);
    else if (e.key === "Home") go(0, true);
    else if (e.key === "End") go(last, true);
    else return;
    e.preventDefault();
  };

  const MODES: [Mode, string][] = [
    ["buy", "Buy"],
    ["sell", "Sell"],
  ];
  const onModeKey = (e: KeyboardEvent) => {
    if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    const next: Mode = mode === "buy" ? "sell" : "buy";
    setMode(next);
    modeRefs.current[next === "buy" ? 0 : 1]?.focus();
    e.preventDefault();
  };

  const focusRing =
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text";

  return (
    <SectionShell id="walkthrough" pad="dense">
      <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-text">
            Walkthrough
          </p>
          <h2 className="text-balance font-display text-[clamp(2.5rem,4.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-foreground">
            See an order, screen by screen.
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            A demonstration of the flow. It doesn't create an order or ask for any details.
          </p>
        </div>

        {/* Buy | Sell segmented switch */}
        <div
          role="radiogroup"
          aria-label="Order type"
          onKeyDown={onModeKey}
          className="inline-flex self-start rounded-full border border-border bg-surface p-1"
        >
          {MODES.map(([m, label], i) => (
            <button
              key={m}
              ref={(el) => {
                modeRefs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={mode === m}
              tabIndex={mode === m ? 0 : -1}
              onClick={() => setMode(m)}
              className={`min-h-11 min-w-24 rounded-full px-6 text-sm font-semibold transition-[background-color,color] duration-200 ${focusRing} ${
                mode === m
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
        <div>
          {/* Stage tabs: four labelled nodes on a horizontal route line */}
          <div
            role="tablist"
            aria-label={mode === "buy" ? "Purchase stages" : "Sale stages"}
            onKeyDown={onKeyDown}
            className="relative mb-8 grid grid-cols-4"
          >
            <span
              aria-hidden="true"
              className="absolute left-[12.5%] right-[12.5%] top-[1.375rem] h-[1.5px] bg-border"
            />
            <span
              aria-hidden="true"
              className="absolute left-[12.5%] top-[1.375rem] h-[1.5px] bg-primary transition-[width] duration-[400ms] ease-out"
              style={{ width: `${(index / last) * 75}%` }}
            />
            {stages.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`demo-tab-${mode}-${s.id}`}
                role="tab"
                type="button"
                aria-selected={i === index}
                aria-controls="demo-panel"
                tabIndex={i === index ? 0 : -1}
                onClick={() => setIndex(i)}
                className={`group relative flex min-h-11 flex-col items-center gap-2 pt-3 text-sm font-medium transition-colors ${focusRing} ${
                  i === index ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`size-3.5 rounded-full border-[1.5px] transition-colors duration-300 ${
                    i <= index ? "border-primary bg-primary" : "border-border bg-background"
                  } ${i === index ? "ring-4 ring-primary/20" : ""}`}
                />
                <span>
                  <span className="mr-1 opacity-60">{i + 1}</span>
                  {s.label}
                </span>
              </button>
            ))}
          </div>

          <div
            id="demo-panel"
            role="tabpanel"
            aria-labelledby={`demo-tab-${mode}-${stage.id}`}
            key={`${mode}-${stage.id}`}
            className="animate-in fade-in slide-in-from-bottom-1 duration-[260ms] motion-reduce:animate-none"
          >
            <h3 className="font-display text-2xl font-semibold text-foreground">{stage.title}</h3>
            <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{stage.body}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-surface disabled:pointer-events-none disabled:opacity-40 ${focusRing}`}
            >
              <ArrowLeft size={15} aria-hidden="true" /> Back
            </button>
            {index < last ? (
              <button
                type="button"
                onClick={() => go(index + 1)}
                className={`inline-flex min-h-11 items-center gap-1.5 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-[background-color,transform] duration-150 hover:bg-primary-hover active:scale-[0.98] ${focusRing}`}
              >
                Next <ArrowRight size={15} aria-hidden="true" />
              </button>
            ) : (
              <a
                href={APP_URL}
                className={`group inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover ${focusRing}`}
              >
                Open PennyX
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            )}
          </div>
        </div>

        {/* Preview: a real object, so it keeps its container and the one shadow */}
        <div className="relative rounded-3xl border border-border bg-surface p-5 shadow-[0_24px_60px_-30px_rgb(25_23_31/0.25)] sm:p-8">
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {mode === "buy" ? "Buying" : "Selling"} · Step {index + 1} of {stages.length}
            </p>
            <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-primary-text">
              Illustrative
            </span>
          </div>
          <div
            key={`${mode}-${stage.id}-preview`}
            className="animate-in fade-in duration-[260ms] motion-reduce:animate-none"
          >
            {stage.preview}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
