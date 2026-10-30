import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/home/Nav";
import { APP_URL } from "@/lib/config";
import { GUIDES, findGuide } from "@/lib/guides";
import { GuideArtwork } from "@/components/illustrations/GuideArt";

/** Single learning guide page (/learn/:slug). */
export function GuidePage() {
  const { slug } = useParams();
  const guide = findGuide(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!guide) return <Navigate to="/" replace />;
  const others = GUIDES.filter((g) => g.slug !== guide.slug);
  const appHref = APP_URL.startsWith("#") ? `/${APP_URL}` : APP_URL;

  return (
    <div className="overflow-x-hidden">
      <Nav />
      <main className="pb-24 pt-32 sm:pt-40">
        <article className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link
            to="/#learn"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-text"
          >
            <ArrowLeft size={15} aria-hidden="true" /> All guides
          </Link>

          <p className="mb-4 mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-primary-text">
            {guide.tag}
          </p>
          <h1 className="font-display text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-6xl">
            {guide.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{guide.intro}</p>

          <div className="mt-10 aspect-[2/1] max-w-md overflow-hidden rounded-2xl border border-border bg-surface">
            <GuideArtwork kind={guide.art} />
          </div>

          <div className="mt-14 space-y-12">
            {guide.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-2xl font-semibold text-foreground">{s.heading}</h2>
                {s.paragraphs?.map((p) => (
                  <p key={p} className="mt-3 leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                {s.items && (
                  <ul className="mt-4 space-y-3">
                    {s.items.map((it) => (
                      <li key={it} className="flex gap-3 leading-relaxed text-muted-foreground">
                        <span
                          aria-hidden="true"
                          className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-primary"
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <p className="mt-14 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
            This guide is general information, not financial advice. Digital assets carry risk. For
            the details of your own order, use what the PennyX platform shows you.
          </p>

          <div className="mt-14">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              More guides
            </h2>
            <ul className="divide-y divide-border border-y border-border">
              {others.map((g) => (
                <li key={g.slug}>
                  <Link
                    to={`/learn/${g.slug}`}
                    className="group flex items-center justify-between gap-4 py-4 font-display text-lg font-medium text-foreground transition-colors hover:text-primary-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text"
                  >
                    {g.title}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={appHref}
              className="mt-10 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text"
            >
              Open PennyX
            </a>
          </div>
        </article>
      </main>
    </div>
  );
}
