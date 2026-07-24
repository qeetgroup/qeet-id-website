import type { Metadata } from "next";

import { type ComparisonData, ComparisonPage } from "@/components/marketing/comparison-page";

export const metadata: Metadata = {
  title: "Qeet ID vs. Descope",
  description:
    "Qeet ID vs. Descope: open-source, self-hostable identity with the same passkeys and enterprise SSO — from $25/mo instead of $249, plus a tamper-evident audit log.",
};

const data: ComparisonData = {
  competitor: "Descope",
  competitorBlurb:
    "Descope is a passwordless-first CIAM platform best known for its no-code, drag-and-drop authentication flow builder. It's a polished managed service; choose Qeet ID when you want open-source code, self-hosting, and transparent per-MAU pricing that starts at a fraction of Descope's entry plan.",
  pitch: {
    headline: "Open-source auth without the enterprise entry price.",
    subhead:
      "Descope's no-code flow builder is genuinely slick — but it's managed-only and paid plans start at $249/mo. Qeet ID ships the same passkeys, magic links, and SSO as source you can self-host, from $25/mo.",
    bullets: [
      "MIT-licensed core you can self-host on your own Postgres — Descope is managed-only.",
      "Enterprise SSO included from the free tier; no per-connection fees and no $249 floor to start.",
      "Tamper-evident, hash-chained audit log with a /verify endpoint, plus ABAC and explainable authz.",
    ],
  },
  factsQeetid: [
    { label: "License", value: "MIT (open source)" },
    { label: "Self-host", value: "First-class" },
    { label: "Entry price", value: "$25 / mo" },
    { label: "Pricing", value: "Linear per-MAU" },
    { label: "Stack", value: "Go + Postgres" },
  ],
  factsCompetitor: [
    { label: "License", value: "Proprietary SaaS" },
    { label: "Self-host", value: "Not available" },
    { label: "Entry price", value: "$249 / mo" },
    { label: "Pricing", value: "Tier-stepped" },
    { label: "Signature", value: "No-code flow builder" },
  ],
  rows: [
    // ---- Authentication ----
    {
      section: "Authentication",
      feature: "Passkeys / WebAuthn",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Authentication",
      feature: "Magic links",
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
      note: "Qeet ID ships a per-tenant ABAC policy engine; Descope expresses attribute logic inside its flow builder.",
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
      competitor: false,
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
      competitor: "7,500 MAU + 3 SSO",
    },
    {
      section: "Pricing",
      feature: "Entry paid plan",
      qeetid: "$25 / mo",
      competitor: "$249 / mo",
    },
    {
      section: "Pricing",
      feature: "Enterprise SSO included (no per-connection fee)",
      qeetid: true,
      competitor: "Capped per tier",
      note: "Descope bundles a fixed number of SSO connections per tier (3 free, 5 on Pro); Qeet ID includes SSO on every plan.",
    },

    // ---- Security & audit ----
    {
      section: "Security & audit",
      feature: "Tamper-evident hash-chained audit log + /verify",
      qeetid: true,
      competitor: "partial",
      note: "Descope keeps audit logs, but they are not cryptographically tamper-evident; Qeet ID SHA-256 chains every row and proves it via an integrity endpoint.",
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
      feature: "No-code drag-and-drop flow builder",
      qeetid: false,
      competitor: true,
      note: "Descope's visual flow builder is its signature strength; Qeet ID's flows are configured via API and console, not a drag-and-drop canvas.",
    },
    {
      section: "Developer experience",
      feature: "First-party SDKs",
      qeetid: "React · Node · Go",
      competitor: "Many languages",
    },
    {
      section: "Developer experience",
      feature: "Prebuilt React components",
      qeetid: "partial",
      competitor: true,
      note: "Descope ships polished drop-in React widgets; Qeet ID's React component kit is in progress.",
    },
  ],
  cta: {
    headline: "Move from Descope to code you own",
    subhead:
      "Start free on our hosted plan, or self-host with one Docker command — the same auth methods, on your infrastructure, without the $249 floor.",
  },
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
