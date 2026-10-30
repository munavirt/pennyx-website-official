import { APP_URL } from "@/lib/config";
import { Logo } from "./Logo";

const COLS = [
  {
    title: "Explore",
    links: [
      ["Platform", "#platform"],
      ["How It Works", "#how-it-works"],
      ["Why PennyX", "#why-pennyx"],
      ["FAQ", "#faq"],
      ["About", "#about"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "#about"],
      ["FAQ", "#faq"],
      ["Open PennyX", APP_URL],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Terms & conditions", "#top"],
      ["Privacy policy", "#top"],
      ["Risk disclosure", "#top"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A clear, guided platform for buying and selling USDT. This website is informational;
            transactions take place in the PennyX application.
          </p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              {c.title}
            </p>
            <ul>
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} PennyX. All rights reserved.</p>
          <p>Digital assets carry risk. Values shown on this site are illustrative.</p>
        </div>
      </div>
    </footer>
  );
}
