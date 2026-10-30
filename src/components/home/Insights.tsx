import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { GUIDES } from "@/lib/guides";
import { GuideArtwork } from "@/components/illustrations/GuideArt";
import { SectionShell } from "@/components/route/SectionShell";

/** Act IV — three short guides, each with its own page. Divided rows, no cards. */
export function Insights() {
  return (
    <SectionShell id="learn" tone="surface" pad="product">
      <div className="mb-12 max-w-2xl">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-text">
          Learn
        </p>
        <h2 className="text-balance font-display text-[clamp(2.5rem,4.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-foreground">
          Understand USDT before you get started.
        </h2>
        <p className="mt-5 text-pretty text-[1.0625rem] leading-[1.65] text-muted-foreground">
          Explore helpful guides about stablecoins, blockchain networks and safe
          transaction practices.
        </p>
      </div>

      <ul className="divide-y divide-border border-y border-border">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <Link
              to={`/learn/${g.slug}`}
              className="group grid items-center gap-6 py-7 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-text md:grid-cols-[18rem_1fr_auto] md:gap-10"
            >
              <div className="aspect-[2/1] overflow-hidden rounded-xl border border-border bg-card">
                <div className="h-full w-full transition-transform duration-[180ms] ease-out group-hover:-translate-y-[3px] group-focus-visible:-translate-y-[3px] motion-reduce:transition-none">
                  <GuideArtwork kind={g.art} />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-text">
                  {g.tag}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-foreground transition-colors duration-[180ms] group-hover:text-primary-text">
                  {g.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {g.summary}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors group-hover:text-primary-text">
                Read guide
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-[180ms] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
