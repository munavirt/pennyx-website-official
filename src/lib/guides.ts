/**
 * Learning guides. These are general explainers about USDT and blockchain networks.
 * They deliberately make no claims about PennyX fees, timings, or policies; anything
 * product-specific is pointed back to the platform itself.
 */
export type GuideArt = "usdt" | "network" | "checklist";

export type Guide = {
  slug: string;
  tag: string;
  title: string;
  summary: string;
  art: GuideArt;
  intro: string;
  sections: { heading: string; paragraphs?: string[]; items?: string[] }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "usdt-explained",
    tag: "Fundamentals",
    title: "USDT explained",
    summary: "What USDT is, what people use it for, and what “stable” does and doesn't mean.",
    art: "usdt",
    intro:
      "USDT, also called Tether, is one of the most widely used stablecoins. If you're new to it, this is the short version.",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "USDT is a digital token designed to stay close to the value of one US dollar. Unlike coins whose price moves widely, it's meant to be a steady unit you can hold or send.",
        ],
      },
      {
        heading: "What people use it for",
        items: [
          "Holding a dollar-linked balance in a crypto wallet.",
          "Moving value between wallets and platforms.",
          "Sending value across borders without relying on a bank transfer.",
        ],
      },
      {
        heading: "What “stable” doesn't mean",
        paragraphs: [
          "Stable is a design goal, not a guarantee. The price can drift slightly from one dollar, and holding USDT is not the same as holding money in a bank account. Digital assets carry risk, so only transact amounts and in ways you understand.",
        ],
      },
      {
        heading: "One token, several networks",
        paragraphs: [
          "USDT exists on more than one blockchain network. Which one you use matters a great deal when you send it. The guide on blockchain networks explains why.",
        ],
      },
    ],
  },
  {
    slug: "blockchain-networks",
    tag: "Networks",
    title: "Understanding blockchain networks",
    summary: "Why TRC-20 and ERC-20 aren't interchangeable, and how to pick the right one.",
    art: "network",
    intro:
      "A blockchain network is the system that carries a transfer from one wallet to another. The same token can live on several of them.",
    sections: [
      {
        heading: "Same token, different networks",
        paragraphs: [
          "USDT is available on networks such as TRON, where it's labelled TRC-20, and Ethereum, where it's labelled ERC-20. Each network has its own addresses, its own fees, and its own way of confirming transfers.",
        ],
      },
      {
        heading: "Why the choice matters",
        paragraphs: [
          "A wallet address is tied to a network. If you send USDT on a network the receiving wallet doesn't support, the transfer can fail, or the funds can end up somewhere they can't be recovered. There is usually no way to undo it.",
        ],
      },
      {
        heading: "How to choose",
        items: [
          "Check which networks the platform lists for your order. Only those are supported.",
          "Check that your own wallet supports the one you pick.",
          "Make sure the network on both sides matches exactly.",
          "Compare fees if more than one option is available. They often differ by network.",
        ],
      },
    ],
  },
  {
    slug: "avoiding-common-mistakes",
    tag: "Safety",
    title: "Avoiding common mistakes",
    summary: "A short checklist to run through before you send or confirm anything.",
    art: "checklist",
    intro:
      "Most problems with digital-asset transfers come down to a handful of avoidable slips. Run through these before you confirm.",
    sections: [
      {
        heading: "Before you send",
        items: [
          "Confirm the network matches on both sides.",
          "Copy and paste wallet addresses instead of typing them, then check the first and last few characters.",
          "Re-read the amount. A misplaced digit is hard to reverse.",
          "Use the instructions shown on your order in the platform, and note its deadline.",
        ],
      },
      {
        heading: "Staying safe",
        items: [
          "Never share your wallet's seed phrase or private keys with anyone. No legitimate service needs them.",
          "Be cautious about payment details or links that reach you outside the platform.",
          "Open PennyX from the site you know rather than from links in unsolicited messages.",
        ],
      },
      {
        heading: "If something looks wrong",
        paragraphs: [
          "Stop before you retry or send again. Contact support through the platform's support channels with your order details, so someone can look at what happened.",
        ],
      },
    ],
  },
];

export const findGuide = (slug: string | undefined) => GUIDES.find((g) => g.slug === slug);
