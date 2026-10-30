import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "@/App";

// jsdom has no layout, IntersectionObserver or ResizeObserver; stub what the page touches.
class NoopObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}
Object.assign(globalThis, { IntersectionObserver: NoopObserver, ResizeObserver: NoopObserver });

const renderHome = () =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>,
  );

describe("Home page", () => {
  it("keeps all ten sections and the footer in the original order", () => {
    const { container } = renderHome();
    const ids = [...container.querySelectorAll("main > section")].map((s) => s.id);
    // Story has no anchor, so its id is empty; the order of the rest must be unchanged.
    expect(ids).toEqual([
      "top",
      "",
      "platform",
      "how-it-works",
      "walkthrough",
      "why-pennyx",
      "faq",
      "learn",
      "about",
      "",
    ]);
    expect(container.querySelector("footer")).not.toBeNull();
  });

  it("states both directions in the hero", () => {
    const { container } = renderHome();
    const hero = container.querySelector("#top")!;
    expect(hero.textContent).toMatch(/buy and sell usdt/i);
    expect(hero.textContent).toMatch(/Buy · INR → USDT/);
    expect(hero.textContent).toMatch(/Sell · USDT → payout/);
  });

  it("uses one verb for the destination and no unfinished labels", () => {
    const { container } = renderHome();
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/Access PennyX|Explore PennyX|\(soon\)|coming soon/i);
    expect(text).toMatch(/Open PennyX/);
    expect(text).toMatch(/buying and selling USDT/);
    expect(text).not.toMatch(/purchasing USDT/i);
  });

  it("renders every Platform state in the DOM when motion is reduced", () => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      matches: query.includes(": reduce"),
      media: query,
      onchange: null,
      addListener: () => { },
      removeListener: () => { },
      addEventListener: () => { },
      removeEventListener: () => { },
      dispatchEvent: () => false,
    })) as typeof window.matchMedia;
    try {
      const { container } = renderHome();
      const platform = container.querySelector("#platform")!;
      expect(platform.querySelectorAll(".pp-state")).toHaveLength(3);
      expect(platform.textContent).toMatch(/Payment window/);
      expect(platform.textContent).toMatch(/In progress/);
    } finally {
      window.matchMedia = original;
    }
  });
});
