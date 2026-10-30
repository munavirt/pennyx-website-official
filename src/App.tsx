import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Nav } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { Story } from "@/components/home/Story";
import { Showcase } from "@/components/home/Showcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Demo } from "@/components/home/Demo";
import { WhyPennyX } from "@/components/home/WhyPennyX";
import { Insights } from "@/components/home/Insights";
import { About } from "@/components/home/About";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { Footer } from "@/components/home/Footer";
import { GuidePage } from "@/pages/Guide";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

// The wrapper uses overflow-x: clip (not hidden) so the Platform panel's position: sticky works.
function Index() {
  // Sections render client-side, so the browser can't jump to a #fragment on arrival
  // (e.g. coming back from a guide page). Do it once the page is mounted.
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <div className="overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Story />
        <Showcase />
        <HowItWorks />
        <Demo />
        <WhyPennyX />
        <Faq />
        <Insights />
        <About />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/learn/:slug" element={<GuidePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
