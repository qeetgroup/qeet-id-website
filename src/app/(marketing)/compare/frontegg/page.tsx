import type { Metadata } from "next";

import { type ComparisonData, ComparisonPage } from "@/components/marketing/comparison-page";

export const metadata: Metadata = {
  title: "Qeet ID vs. Frontegg",
  description:
    "Qeet ID vs. Frontegg: open-source, self-hostable B2B identity with published per-MAU pricing instead of opaque usage-based billing.",
};

const data: ComparisonData = {
  competitor: "Frontegg",
  competitorBlurb:
    "Frontegg is a B2B user-management platform known for its polished self-serve admin and login box. Qeet ID covers the same enterprise auth surface as MIT-licensed software you can self-host, with published per-MAU pricing instead of opaque usage-based billing.",
  pitch: {
    headline: "The same B2B toolkit — with pricing you can actually see.",
    subhead:
      "Frontegg's self-serve admin box is polished, but its pricing is opaque PAYG and self-hosting is enterprise-only. Qeet ID is MIT-licensed, self-hostable, and priced in public at $0.02/MAU.",
    bullets: [
      "MIT-licensed core you can self-host on your own Postgres — Frontegg self-host is enterprise-deal only.",
      "Published, linear per-MAU pricing — no “call us” for the per-unit rate.",
      "Tamper-evident hash-chained audit log + /verify, ABAC, and explainable authz built in.",
    ],
  },
  factsQeetid: [
    { label: "License", value: "MIT (open source)" },
    { label: "Self-host", value: "First-class" },
    { label: "Pricing", value: "Published per-MAU" },
    { label: "Entry price", value: "$25 / mo" },
    { label: "Stack", value: "Go + Postgres" },
  ],
  factsCompetitor: [
    { label: "License", value: "Proprietary SaaS" },
    { label: "Self-host", value: "Enterprise only" },
    { label: "Pricing", value: "Opaque PAYG" },
    { label: "Free tier", value: "7,500 MAU" },
    { label: "Focus", value: "B2B admin box" },
  ],
  rows: [
    // ---- Authentication ----
    {
      section: "Authentication",
      feature: "Email + password",
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

    // ---- Authorization ----
    {
      section: "Authorization",
      feature: "RBAC + single-call /check API",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Authorization",
      feature: "ABAC policy engine",
      qeetid: true,
      competitor: "partial",
      note: "Qeet ID ships a per-tenant ABAC policy engine; Frontegg leans on its entitlements engine for attribute-style gating.",
    },
    {
      section: "Authorization",
      feature: "Explainable authz (grant-path “why?” trace)",
      qeetid: true,
      competitor: false,
      note: "Qeet ID returns the role/group grant path (or denial reason) on every check.",
    },

    // ---- Deployment ----
    {
      section: "Deployment",
      feature: "Open-source code (MIT)",
      qeetid: true,
      competitor: false,
    },
    {
      section: "Deployment",
      feature: "Self-host (single binary + Postgres)",
      qeetid: true,
      competitor: "Enterprise deal only",
      note: "Frontegg self-hosting is offered only in enterprise contracts; treat it as effectively managed-only. Qeet ID self-host is first-class on every plan.",
    },
    {
      section: "Deployment",
      feature: "Air-gapped / fully offline",
      qeetid: true,
      competitor: false,
    },

    // ---- Pricing ----
    {
      section: "Pricing",
      feature: "Free tier",
      qeetid: "25,000 MAU",
      competitor: "7,500 MAU + 5 connections",
    },
    {
      section: "Pricing",
      feature: "Published per-MAU rate",
      qeetid: "$0.02 / MAU",
      competitor: "Not published",
      note: "Frontegg uses usage-based PAYG pricing with no publicly-listed per-unit rate; Qeet ID publishes a flat linear rate.",
    },
    {
      section: "Pricing",
      feature: "Transparent pricing (no “call for quote” to start)",
      qeetid: true,
      competitor: false,
    },

    // ---- Security & audit ----
    {
      section: "Security & audit",
      feature: "Tamper-evident hash-chained audit log + /verify",
      qeetid: true,
      competitor: "partial",
      note: "Frontegg keeps audit logs, but they are not cryptographically tamper-evident; Qeet ID SHA-256 chains every row and proves it via an integrity endpoint.",
    },
    {
      section: "Security & audit",
      feature: "Refresh-token theft detection",
      qeetid: true,
      competitor: true,
    },

    // ---- Compliance ----
    {
      section: "Compliance",
      feature: "SOC 2 Type II",
      qeetid: "Roadmap (pre-GA)",
      competitor: true,
      note: "Independent audit + external pen-test are scheduled before Qeet ID GA.",
    },
    {
      section: "Compliance",
      feature: "GDPR erasure / data export",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Compliance",
      feature: "Self-hosted = your compliance boundary",
      qeetid: true,
      competitor: false,
    },

    // ---- Developer experience ----
    {
      section: "Developer experience",
      feature: "Self-serve B2B admin / login box",
      qeetid: "partial",
      competitor: true,
      note: "The self-serve admin and login box is Frontegg's signature strength; Qeet ID ships a hosted login app and admin console but a lighter self-service portal.",
    },
    {
      section: "Developer experience",
      feature: "First-party SDKs",
      qeetid: "React · Node · Go",
      competitor: "Multiple languages",
    },
    {
      section: "Developer experience",
      feature: "Prebuilt React components",
      qeetid: "partial",
      competitor: true,
      note: "Frontegg ships polished drop-in React components; Qeet ID's React component kit is in progress.",
    },
  ],
  cta: {
    headline: "Transparent, self-hostable B2B identity",
    subhead:
      "Start free or self-host in minutes — with a price you can read before you sign, and code you can run on your own infrastructure.",
  },
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
