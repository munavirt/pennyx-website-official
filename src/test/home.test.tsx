import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Demo } from "@/components/home/Demo";
import { Faq } from "@/components/home/Faq";
import { Insights } from "@/components/home/Insights";
import { GuidePage } from "@/pages/Guide";
import { GUIDES } from "@/lib/guides";
import { Route, Routes } from "react-router-dom";

describe("Walkthrough", () => {
  it("changes the visible stage with tabs and Next/Back", () => {
    render(<Demo />);
    expect(screen.getByRole("tab", { name: /amount/i })).toHaveAttribute("aria-selected", "true");
    fireEvent.click(screen.getByRole("tab", { name: /payment/i }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent(/payment instructions/i);
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent(/follow your order/i);
    expect(screen.queryByRole("button", { name: /next/i })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(screen.getByRole("tab", { name: /payment/i })).toHaveAttribute("aria-selected", "true");
  });

  it("supports arrow-key navigation between tabs", () => {
    render(<Demo />);
    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: /breakdown/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});

describe("Walkthrough: buy and sell", () => {
  it("switches between buy and sell flows with a radiogroup", () => {
    render(<Demo />);
    expect(screen.getByRole("radio", { name: "Buy" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("tab", { name: /payment/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("radio", { name: "Sell" }));
    expect(screen.getByRole("radio", { name: "Sell" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("tab", { name: /transfer/i })).toBeInTheDocument();
    expect(screen.queryByRole("tab", { name: /payment/i })).toBeNull();
  });

  it("never shows a numeric rate for selling", () => {
    render(<Demo />);
    fireEvent.click(screen.getByRole("radio", { name: "Sell" }));
    fireEvent.click(screen.getByRole("tab", { name: /breakdown/i }));
    expect(document.body.textContent).not.toMatch(/\d+\.\d+\s*USDT|₹\s*\d/);
    expect(screen.getAllByText(/shown before you confirm/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/illustrative/i)).toBeInTheDocument();
  });
});

describe("FAQ", () => {
  it("opens one answer at a time and collapses on second click", () => {
    render(<Faq />);
    const first = screen.getByRole("button", { name: /what is pennyx/i });
    expect(first).toHaveAttribute("aria-expanded", "true");
    const second = screen.getByRole("button", { name: /what is usdt/i });
    fireEvent.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(second);
    expect(second).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps all ten questions, grouped under three labels", () => {
    render(<Faq />);
    expect(screen.getAllByRole("heading", { level: 4 })).toHaveLength(10);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
  });

  it("describes PennyX as a buy and sell platform", () => {
    render(<Faq />);
    expect(screen.getByText(/buying and selling USDT/i)).toBeInTheDocument();
  });
});

describe("Learning resources", () => {
  it("links every card to a guide that exists", () => {
    render(
      <MemoryRouter>
        <Insights />
      </MemoryRouter>,
    );
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(GUIDES.length);
    for (const a of links) {
      const slug = a.getAttribute("href")!.replace("/learn/", "");
      expect(GUIDES.some((g) => g.slug === slug)).toBe(true);
    }
  });

  it("renders a guide page by slug", () => {
    window.scrollTo = () => {};
    render(
      <MemoryRouter initialEntries={["/learn/blockchain-networks"]}>
        <Routes>
          <Route path="/learn/:slug" element={<GuidePage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/blockchain networks/i);
  });
});
