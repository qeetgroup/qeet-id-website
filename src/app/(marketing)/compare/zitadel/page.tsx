import type { Metadata } from "next";

import { type ComparisonData, ComparisonPage } from "@/components/marketing/comparison-page";

export const metadata: Metadata = {
  title: "Qeet ID vs. Zitadel",
  description:
    "How Qeet ID compares to Zitadel: per-MAU (not per-DAU) pricing, a permissive MIT license, ABAC, and a tamper-evident audit chain — with an honest look at where Zitadel's GA maturity wins.",
  alternates: { canonical: "/compare/zitadel" },
};

const data: ComparisonData = {
  competitor: "Zitadel",
  competitorBlurb:
    "Zitadel is a modern, passwordless-first identity platform available self-hosted (AGPL-3.0) or as a managed cloud. It is fully GA with an event-sourced audit trail and a SOC 2 / ISO-certified cloud — more mature than Qeet ID today. Choose Qeet ID for MAU-based (not DAU) billing, a permissive MIT license, an ABAC policy engine, and a tamper-evident hash-chained audit log.",
  pitch: {
    headline: "MAU billing, a permissive license, and ABAC.",
    subhead:
      "Zitadel is a fully-GA, passwordless-first identity platform with a slick cloud — and honestly it is more mature than Qeet ID today. Where we differ: we bill per MAU (not DAU), ship under permissive MIT (not AGPL), and add an ABAC policy engine plus a tamper-evident audit chain.",
    bullets: [
      "Per-MAU pricing that is easier to forecast than Zitadel's per-DAU model.",
      "Permissive MIT license — no AGPL copyleft to reason about.",
      "ABAC + explainable authz and a hash-chained /verify audit endpoint.",
    ],
  },
  factsQeetid: [
    { label: "License", value: "MIT (open source)" },
    { label: "Billing", value: "Per MAU" },
    { label: "Self-host", value: "First-class" },
    { label: "Runtime", value: "Go + Postgres" },
    { label: "Maturity", value: "Pre-GA" },
  ],
  factsCompetitor: [
    { label: "License", value: "AGPL-3.0" },
    { label: "Billing", value: "Per DAU" },
    { label: "Self-host", value: "First-class" },
    { label: "Cloud", value: "SOC 2 / ISO" },
    { label: "Maturity", value: "GA (mature)" },
  ],
  rows: [
    // ---- Authentication ----
    {
      section: "Authentication",
      feature: "Passkeys / WebAuthn",
      qeetid: true,
      competitor: true,
      note: "Zitadel is passwordless-first; passkeys are a core strength.",
    },
    {
      section: "Authentication",
      feature: "Email + password",
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
      competitor: "partial",
      note: "Zitadel's SCIM support is limited / on its roadmap; Qeet ID ships SCIM 2.0 for users + groups.",
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
      competitor: false,
      note: "Zitadel centres on roles / grants; it has no dedicated attribute-based policy engine.",
    },
    {
      section: "Authorization",
      feature: "Explainable authz (grant-path “why?” trace)",
      qeetid: true,
      competitor: false,
      note: "Qeet ID returns the grant path or denial reason on every check.",
    },
    {
      section: "Authorization",
      feature: "Multi-tenant isolation by default",
      qeetid: true,
      competitor: true,
      note: "Both isolate tenants by default — Qeet ID via Postgres RLS, Zitadel via organizations.",
    },

    // ---- Deployment ----
    {
      section: "Deployment",
      feature: "Open-source license",
      qeetid: "MIT",
      competitor: "AGPL-3.0",
      note: "Qeet ID is permissive MIT; Zitadel relicensed from Apache-2.0 to AGPL-3.0 in 2025, which can carry copyleft obligations.",
    },
    {
      section: "Deployment",
      feature: "Self-host first-class",
      qeetid: true,
      competitor: true,
      note: "Both self-host well; Zitadel is fully GA, Qeet ID is pre-GA.",
    },
    {
      section: "Deployment",
      feature: "First-party managed cloud (SaaS)",
      qeetid: true,
      competitor: true,
    },

    // ---- Pricing ----
    {
      section: "Pricing",
      feature: "Billing unit",
      qeetid: "Per MAU",
      competitor: "Per DAU",
      note: "Zitadel bills by daily active users (DAU); Qeet ID bills by monthly active users (MAU), which is easier to forecast for most apps.",
    },
    {
      section: "Pricing",
      feature: "Free tier",
      qeetid: "25,000 MAU",
      competitor: "100 DAU",
    },
    {
      section: "Pricing",
      feature: "Paid entry plan",
      qeetid: "$25/mo, 50k MAU incl.",
      competitor: "$100/mo, 25k DAU incl.",
    },
    {
      section: "Pricing",
      feature: "No per-connection SSO fee",
      qeetid: true,
      competitor: true,
      note: "Neither charges an 'SSO tax' — enterprise SSO is included on all tiers.",
    },

    // ---- Security & audit ----
    {
      section: "Security & audit",
      feature: "Tamper-evident hash-chained audit log + /verify",
      qeetid: true,
      competitor: "partial",
      note: "Zitadel keeps a rich event-sourced audit trail, but there is no hash-chain integrity endpoint to prove no row was altered.",
    },
    {
      section: "Security & audit",
      feature: "Full event-sourced audit trail",
      qeetid: "partial",
      competitor: true,
      note: "Event sourcing is Zitadel's core architecture; Qeet ID stores an append-only hash-chained log rather than a full event store.",
    },

    // ---- Compliance ----
    {
      section: "Compliance",
      feature: "GDPR erasure / data export",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Compliance",
      feature: "Managed-cloud SOC 2 Type II / ISO 27001",
      qeetid: "Roadmap (pre-GA)",
      competitor: true,
      note: "Zitadel's cloud carries SOC 2 / ISO certifications; Qeet ID's managed cloud is completing its audits before GA.",
    },

    // ---- Developer experience ----
    {
      section: "Developer experience",
      feature: "First-party typed SDKs",
      qeetid: "React · Node · Go",
      competitor: true,
      note: "Both ship first-party SDKs across popular languages.",
    },
    {
      section: "Developer experience",
      feature: "Native admin dashboard",
      qeetid: true,
      competitor: true,
    },
  ],
  cta: {
    headline: "Try MAU-priced, MIT-licensed identity",
    subhead:
      "Start free up to 25,000 MAU, or self-host the MIT core. If Zitadel's DAU model and AGPL license already work for you, that is a fine choice too.",
  },
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
