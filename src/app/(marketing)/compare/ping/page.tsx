import type { Metadata } from "next";

import { type ComparisonData, ComparisonPage } from "@/components/marketing/comparison-page";

export const metadata: Metadata = {
  title: "Qeet ID vs. Ping Identity",
  description:
    "Qeet ID vs. Ping Identity: a lightweight open-source identity binary with transparent per-MAU pricing, versus Ping's deep but heavy, commercially-licensed enterprise federation stack.",
  alternates: { canonical: "/compare/ping" },
};

const data: ComparisonData = {
  competitor: "Ping Identity",
  competitorBlurb:
    "Ping Identity is an enterprise IAM vendor with PingOne (cloud) and self-managed commercial software (PingFederate / PingAM) known for deep federation. Choose Qeet ID when you want an open-source MIT binary, transparent per-MAU pricing, a real free tier, and developer-first setup.",
  pitch: {
    headline: "Deep federation, without the heavy deploy.",
    subhead:
      "Qeet ID covers the OAuth / OIDC / SAML / SCIM Ping is known for in one lightweight open-source binary — with pricing you can read and a free tier that's actually free.",
    bullets: [
      "One MIT-licensed Go binary + Postgres, not a multi-component Java stack.",
      "Transparent per-MAU pricing and a real free tier — no enterprise-only quote.",
      "Developer-first setup instead of a heavyweight enterprise rollout.",
    ],
  },
  factsQeetid: [
    { label: "License", value: "MIT (open source)" },
    { label: "Self-host", value: "First-class" },
    { label: "Pricing", value: "Linear per-MAU" },
    { label: "Stack", value: "Go + Postgres" },
    { label: "Free tier", value: "25,000 MAU" },
  ],
  factsCompetitor: [
    { label: "License", value: "Proprietary (commercial)" },
    { label: "Self-host", value: "Licensed (commercial)" },
    { label: "Pricing", value: "Enterprise / custom" },
    { label: "Stack", value: "Closed (Java)" },
    { label: "Compliance", value: "SOC 2 / ISO / FedRAMP" },
  ],
  rows: [
    // ---- Authentication ----
    {
      section: "Authentication",
      feature: "Email + password (Argon2id + HIBP)",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Authentication",
      feature: "Passkeys / WebAuthn",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Authentication",
      feature: "Social login (Google, Apple, GitHub, Microsoft, …)",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Authentication",
      feature: "MFA (TOTP, SMS, email, recovery codes)",
      qeetid: true,
      competitor: true,
    },

    // ---- Federation ----
    {
      section: "Federation",
      feature: "OAuth 2.0 / OIDC (you are the IdP)",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Federation",
      feature: "SAML 2.0 SP + IdP",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Federation",
      feature: "SCIM 2.0 provisioning",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Federation",
      feature: "Breadth of federation / brokering protocols",
      qeetid: "partial",
      competitor: true,
      note: "Deep federation and protocol brokering are PingFederate's core strength and breadth.",
    },

    // ---- Authorization ----
    {
      section: "Authorization",
      feature: "RBAC + single-call /check API",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Authorization",
      feature: "Explainable authz (grant-path “why?” trace)",
      qeetid: true,
      competitor: false,
      note: "Qeet ID returns the role/group grant path (or denial reason) on every check.",
    },
    {
      section: "Authorization",
      feature: "Fine-grained / attribute authz",
      qeetid: "Roadmap",
      competitor: "PingAuthorize",
      note: "Ping ships fine-grained / attribute authorization via PingAuthorize; Qeet ID's ReBAC is planned.",
    },

    // ---- Deployment ----
    {
      section: "Deployment",
      feature: "Open-source code (MIT)",
      qeetid: true,
      competitor: false,
      note: "Ping's self-managed software is licensed commercial code, not open source.",
    },
    {
      section: "Deployment",
      feature: "Self-host without a commercial license",
      qeetid: true,
      competitor: false,
    },
    {
      section: "Deployment",
      feature: "Lightweight single binary",
      qeetid: true,
      competitor: false,
      note: "Self-managed Ping is a heavier, multi-component Java deployment.",
    },

    // ---- Pricing ----
    {
      section: "Pricing",
      feature: "Free production tier",
      qeetid: "25,000 MAU",
      competitor: false,
    },
    {
      section: "Pricing",
      feature: "Transparent published pricing",
      qeetid: true,
      competitor: false,
      note: "Ping pricing is enterprise / custom and quote-based.",
    },
    {
      section: "Pricing",
      feature: "Per-MAU pricing",
      qeetid: "$0.02 / MAU (Pro)",
      competitor: "Enterprise / custom",
    },

    // ---- Security & audit ----
    {
      section: "Security & audit",
      feature: "Tamper-evident hash-chained audit log + /verify",
      qeetid: true,
      competitor: "partial",
      note: "Qeet ID SHA-256 chains every audit row; an integrity endpoint proves no row was altered.",
    },
    {
      section: "Security & audit",
      feature: "Refresh-token theft detection",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Security & audit",
      feature: "Adaptive / risk-based MFA + device signals",
      qeetid: "Roadmap",
      competitor: true,
      note: "PingOne Protect ships mature adaptive risk; Qeet ID's is planned.",
    },

    // ---- Compliance ----
    {
      section: "Compliance",
      feature: "SOC 2 Type II / ISO 27001",
      qeetid: "Roadmap (pre-GA)",
      competitor: true,
      note: "Independent audit + external pen-test are scheduled before Qeet ID GA.",
    },
    {
      section: "Compliance",
      feature: "FedRAMP authorization",
      qeetid: false,
      competitor: true,
    },

    // ---- Developer experience ----
    {
      section: "Developer experience",
      feature: "OpenAPI + Postman",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Developer experience",
      feature: "Prebuilt React components / hosted UI",
      qeetid: "partial",
      competitor: true,
      note: "PingOne ships hosted sign-on; Qeet ID's React component kit is in progress.",
    },
  ],
  cta: {
    headline: "Enterprise federation, developer-friendly",
    subhead:
      "Start free on our hosted plan, or self-host the single binary in minutes — no commercial license required.",
  },
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
