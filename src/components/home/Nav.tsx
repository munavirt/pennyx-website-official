import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { APP_URL } from "@/lib/config";
import { useTheme } from "@/hooks/use-theme";
import { Logo } from "./Logo";

const LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why PennyX", href: "#why-pennyx" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "#about" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  // Section anchors live on the home page; from other routes (e.g. guides) point back to it.
  const { pathname } = useLocation();
  const prefix = pathname === "/" ? "" : "/";
  const withBase = (href: string) => (href.startsWith("#") ? `${prefix}${href}` : href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Underline the link of the section currently crossing the middle of the viewport.
  useEffect(() => {
    if (pathname !== "/" || typeof IntersectionObserver === "undefined") return;
    const ids = LINKS.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 sm:px-8 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <a href={withBase("#top")} aria-label="PennyX home">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={withBase(l.href)}
              aria-current={active === l.href.slice(1) ? "location" : undefined}
              className={`relative py-2 text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-text after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-foreground after:transition-transform after:duration-[160ms] ${
                active === l.href.slice(1)
                  ? "text-foreground after:scale-x-100"
                  : "text-muted-foreground after:scale-x-0"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href={withBase(APP_URL)}
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover sm:inline-flex"
          >
            Open PennyX
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-5 pb-6 pt-3 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={withBase(l.href)}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface"
              >
                {l.label}
              </a>
            ))}
            <a
              href={withBase(APP_URL)}
              className="mt-3 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Open PennyX
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
