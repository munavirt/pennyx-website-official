import { SectionShell } from "@/components/route/SectionShell";

const POINTS = [
  {
    title: "Order details before you confirm",
    body: "The amount, the rate and the pricing are shown before you commit to an order.",
  },
  {
    title: "Clear instructions with deadlines",
    body: "Each order lists the steps to follow and any time limit that applies.",
  },
  {
    title: "Status in your account",
    body: "Follow where each order stands without guessing what happens next.",
  },
  {
    title: "Guides before your first order",
    body: "Read about USDT, networks and common mistakes before you send anything.",
  },
] as const;

/** Security and transparency: what the platform shows you, stated without overclaiming. */
export function Security() {
  return (
    <SectionShell id="security" pad="product">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-text">
            Security and transparency
          </p>
          <h2 className="text-balance font-display text-[clamp(2.5rem,4.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-foreground">
            Know what you are doing before you transact.
          </h2>
          <p className="mt-5 max-w-md text-pretty text-[1.0625rem] leading-[1.65] text-muted-foreground">
            PennyX is built so you can check the details of every order before
            you commit to it.
          </p>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {POINTS.map((p) => (
            <li
              key={p.title}
              className="flex flex-col bg-background p-6 sm:p-7"
            >
              <span
                aria-hidden="true"
                className="mb-5 h-1 w-8 rounded-full bg-primary"
              />
              <h3 className="font-display text-lg font-semibold text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
