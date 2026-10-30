import type { CSSProperties, Ref } from "react";
import { Check, IndianRupee } from "lucide-react";

/** Row used by order panels (light surfaces). */
export const Row = ({ k, v, strong }: { k: string; v: string; strong?: boolean }) => (
  <div className="flex items-baseline justify-between gap-4 py-3 text-sm">
    <span className="text-muted-foreground">{k}</span>
    <span className={`text-right ${strong ? "font-semibold text-primary-text" : "font-medium"}`}>
      {v}
    </span>
  </div>
);

export const STATUS_STEPS: [string, boolean][] = [
  ["Order placed", true],
  ["Payment submitted", true],
  ["In progress", false],
  ["Completed", false],
];

/** Four-step status timeline, shared by the walkthrough and the Platform panel. `dark` = ink surface. */
export function StatusTimeline({ dark = false }: { dark?: boolean }) {
  return (
    <ol
      className={`rounded-xl border p-4 ${dark ? "border-white/10 bg-white/[0.03]" : "border-border bg-card"}`}
    >
      {STATUS_STEPS.map(([t, done], i, arr) => (
        <li
          key={t}
          className="pp-status-row relative flex items-center gap-4 py-3"
          style={{ "--i": i } as CSSProperties}
        >
          {i < arr.length - 1 && (
            <span
              aria-hidden="true"
              className={`absolute left-[13px] top-9 h-full w-px ${dark ? "bg-white/15" : "bg-border"}`}
            />
          )}
          <span
            className={`relative flex size-7 shrink-0 items-center justify-center rounded-full border ${
              done
                ? "border-primary bg-primary text-primary-foreground"
                : i === 2
                  ? `border-primary ${dark ? "bg-transparent" : "bg-card"}`
                  : dark
                    ? "border-white/20"
                    : "border-border bg-card"
            }`}
          >
            {done ? (
              <Check size={14} aria-hidden="true" />
            ) : i === 2 ? (
              <span className="size-2 rounded-full bg-primary" />
            ) : null}
          </span>
          <span
            className={`text-sm ${
              i <= 2
                ? "font-semibold"
                : dark
                  ? "text-ink-foreground/50"
                  : "text-muted-foreground"
            }`}
          >
            {t}
            {i === 2 && (
              <span
                className={`ml-2 text-xs font-normal ${dark ? "text-primary" : "text-primary-text"}`}
              >
                Current
              </span>
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Platform panel, state 1: review. */
export function ReviewState() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="flex items-center gap-1.5 text-xs text-ink-foreground/60">
            <IndianRupee size={12} aria-hidden="true" /> You pay
          </p>
          <p className="mt-2 font-display text-2xl font-semibold">₹ 25,000</p>
        </div>
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
          <p className="text-xs text-ink-foreground/60">You receive</p>
          <p className="mt-2 font-display text-2xl font-semibold text-primary">≈ 278.4 USDT</p>
        </div>
      </div>
      <div className="mt-4 space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm">
        {[
          ["Conversion rate", "Shown before you confirm"],
          ["Network", "Selected at purchase"],
          ["Payment window", "Deadline shown on the order"],
          ["Order status", "Visible in your account"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4">
            <span className="text-ink-foreground/60">{k}</span>
            <span className="text-right font-medium">{v}</span>
          </div>
        ))}
      </div>
    </>
  );
}

/** Platform panel, state 2: instructions. The bar narrows on scroll; it carries no time value. */
export function InstructionsState({ barRef }: { barRef?: Ref<HTMLSpanElement> }) {
  return (
    <>
      <ol className="space-y-3">
        {[
          ["Pay as instructed", "Use the details shown on your order."],
          ["Submit proof, if asked", "Upload it in the platform."],
        ].map(([t, d], i) => (
          <li
            key={t}
            className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-sm font-semibold text-primary">
              {i + 1}
            </span>
            <span>
              <span className="block text-sm font-semibold">{t}</span>
              <span className="mt-0.5 block text-sm text-ink-foreground/60">{d}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs text-ink-foreground/60">Payment window</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <span ref={barRef} className="block h-full w-full rounded-full bg-primary" />
        </div>
      </div>
    </>
  );
}
