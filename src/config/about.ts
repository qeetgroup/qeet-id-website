/**
 * /about — Qeet ID's place in Qeet Group, short.
 *
 * Quoted, never paraphrased: the four words, the vision and the mission are
 * the organisation's published profile, as qeet-context/ORGANIZATION.md
 * records it (the deck on qeet.in quotes the same, slides/canon.ts). The
 * self-description is qeet.in's (config/organisation.ts POSITIONING, chosen
 * 2026-10-27 over the record's older "multi-company holding"). Qeet ID's role
 * is qeet-context/PRODUCT-PORTFOLIO.md "Qeet ID — Role in the organization";
 * the line on building identity once is qeet.in's own (config/product-scope.ts
 * qeet-id.highlight). The record's "open-source … self-hostable" positioning
 * is not used: Qeet ID is offered only as a Qeet Group service (owner
 * decision, 17 Oct 2026).
 */
export const ABOUT_PAGE = {
  meta: {
    title: "About",
    description:
      "Qeet ID is the identity layer of Qeet Group: every other Qeet product signs people in through it. Built on one philosophy — question, explore, envision, transform.",
  },
  kicker: "About",
  title: ["Identity, built once.", "For every Qeet product."],
  /** PRODUCT-PORTFOLIO.md: "Every other product authenticates against it via OIDC." */
  lede: "Qeet ID is the identity layer of Qeet Group. Every other Qeet product signs people in through it, over OpenID Connect — and so can yours.",

  why: {
    kicker: "Why it exists",
    /** qeet.in config/product-scope.ts, qeet-id.highlight */
    quote:
      "Building identity once, properly, and using it everywhere is cheaper than building it adequately many times.",
    attribution: "Qeet Group",
  },

  group: {
    kicker: "Qeet Group",
    /** qeet.in POSITIONING */
    title: ["A technology company", "built on a single philosophy."],
    positioning:
      "A technology company built on a single philosophy: that meaningful progress begins with the right question.",
    /** qeet.in FRAMING */
    framing: "One philosophy. Many businesses.",
    /** ORGANIZATION.md:40-43 — the first sentence of each, verbatim; the order never changes. */
    words: [
      { word: "Question", claim: "Progress begins with the right question." },
      { word: "Explore", claim: "Curiosity, made operational." },
      { word: "Envision", claim: "Designing for what compounds." },
      { word: "Transform", claim: "Vision is decoration until it ships." },
    ],
    /** ORGANIZATION.md:45-49, verbatim */
    vision:
      "To create a future of limitless possibilities, where industries and individuals thrive through questioning, exploring, and transforming ideas into reality.",
    mission:
      "To empower people and organisations to adapt, innovate, and transform by embracing curiosity, exploration, and future-focused thinking.",
    source: "Qeet Group organisation profile",
    more: { label: "Qeet Group at qeet.in", href: "https://qeet.in" },
  },

  close: ["See what Qeet ID does,", "or talk to us."],
} as const;
