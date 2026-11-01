/**
 * /contact — who to write to. Email only: the form was removed (2026-10-29)
 * and comes back only with a real, protected transport (AGENTS.md).
 *
 * The addresses are the ones Qeet Group publishes on qeet.in
 * (config/site.ts EMAIL: partnerships, press, support, security). No reply
 * time is promised — none is published for Qeet ID (config/security.ts).
 */
export const CONTACT_PAGE = {
  meta: {
    title: "Contact",
    description:
      "Write to Qeet ID about partnerships and plans, building on it, press, or a security issue — one address for each.",
  },
  kicker: "Contact",
  title: ["One address", "for each thing you need."],
  lede: "Qeet ID is in development, and email is the way to reach the people building it. Pick the address that fits.",
  channels: [
    {
      id: "partnerships",
      name: "Plans and partnerships",
      body: "Pricing, Enterprise plans, a security review, or building something together.",
      email: "partnerships@qeet.in",
    },
    {
      id: "support",
      name: "Building on Qeet ID",
      body: "Questions about the APIs, the docs, or moving across from another provider.",
      email: "support@qeet.in",
    },
    {
      id: "press",
      name: "Press",
      body: "Interviews, comment and media requests, with the angle and the deadline.",
      email: "press@qeet.in",
    },
    {
      id: "security",
      name: "A security issue",
      body: "A vulnerability you have found. What to include, and how reports are handled, is on the security page.",
      email: "security@qeet.in",
      more: { label: "Reporting a vulnerability", href: "/security#report" },
    },
  ],
  elsewhere: {
    kicker: "Elsewhere",
    items: [
      {
        label: "The docs",
        href: "https://docs.qeet.in/id",
        note: "How Qeet ID works, and how to build on it",
      },
      { label: "GitHub", href: "https://github.com/qeetgroup", note: "Qeet Group's repositories" },
      { label: "qeet.in", href: "https://qeet.in", note: "Qeet Group, and its other products" },
    ],
  },
} as const;
