import type { Metadata } from "next";

import { type ComparisonData, ComparisonPage } from "@/components/marketing/comparison-page";

export const metadata: Metadata = {
  title: "Qeet ID vs. Microsoft Entra External ID",
  description:
    "Qeet ID vs. Microsoft Entra External ID: open-source, self-hostable identity with readable per-MAU pricing and no add-on metering, versus Microsoft's cloud-only, Azure-bound CIAM.",
};

const data: ComparisonData = {
  competitor: "Microsoft Entra External ID",
  competitorBlurb:
    "Microsoft Entra External ID is Microsoft's CIAM (the successor to Azure AD B2C, which is end-of-sale for new customers since May 2025). It's cloud-only and Azure-bound; choose Qeet ID when you want open-source code, self-hosting, readable pricing, and governance without separately-metered add-ons.",
  pitch: {
    headline: "CIAM you can read, run anywhere, and self-host.",
    subhead:
      "Qeet ID matches Entra External ID's core protocols, but the code is open, the pricing is on the page, and governance isn't a separately-metered add-on.",
    bullets: [
      "MIT-licensed core — no Azure subscription and no cloud lock-in.",
      "Readable per-MAU pricing instead of an Azure calculator estimate.",
      "Risk and audit controls built in, not billed as metered add-ons.",
    ],
  },
  factsQeetid: [
    { label: "License", value: "MIT (open source)" },
    { label: "Self-host", value: "First-class" },
    { label: "Pricing", value: "Linear per-MAU" },
    { label: "Stack", value: "Go + Postgres" },
    { label: "Cloud lock-in", value: "None" },
  ],
  factsCompetitor: [
    { label: "License", value: "Proprietary (Azure)" },
    { label: "Self-host", value: "Not available" },
    { label: "Pricing", value: "50k MAU free, then per-MAU" },
    { label: "Stack", value: "Closed (Azure)" },
    { label: "Compliance", value: "SOC 2 / ISO" },
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

    // ---- Authorization ----
    {
      section: "Authorization",
      feature: "RBAC + single-call /check API",
      qeetid: true,
      competitor: "App roles",
      note: "Entra exposes app roles / claims; Qeet ID ships a single-call /check authorization API.",
    },
    {
      section: "Authorization",
      feature: "Explainable authz (grant-path “why?” trace)",
      qeetid: true,
      competitor: false,
    },
    {
      section: "Authorization",
      feature: "Multi-tenant isolation by default (Postgres RLS)",
      qeetid: true,
      competitor: "Azure tenant",
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
      feature: "Runs without a cloud subscription",
      qeetid: true,
      competitor: false,
      note: "Entra External ID requires an Azure subscription; Qeet ID runs on any cloud or air-gapped on-prem.",
    },

    // ---- Pricing ----
    {
      section: "Pricing",
      feature: "Free tier MAU cap",
      qeetid: "25,000",
      competitor: "50,000",
      note: "Entra's free MAU tier is larger; Qeet ID's includes enterprise SSO with no add-ons.",
    },
    {
      section: "Pricing",
      feature: "Readable published per-MAU pricing",
      qeetid: true,
      competitor: false,
      note: "Entra's per-MAU rate sits behind the Azure calculator / sales, not a static price page.",
    },
    {
      section: "Pricing",
      feature: "Governance without add-on metering",
      qeetid: true,
      competitor: false,
      note: "Conditional access / ID Protection risk signals are separately-metered Entra add-ons.",
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
      note: "Entra ID Protection ships adaptive risk (as a metered add-on); Qeet ID's is planned.",
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
      feature: "Self-hosted = your compliance boundary",
      qeetid: true,
      competitor: false,
    },

    // ---- Developer experience ----
    {
      section: "Developer experience",
      feature: "First-party SDKs",
      qeetid: "React · Node · Go",
      competitor: "MSAL libraries",
    },
    {
      section: "Developer experience",
      feature: "Prebuilt React components / hosted flows",
      qeetid: "partial",
      competitor: true,
      note: "Entra ships hosted user flows + MSAL React; Qeet ID's React component kit is in progress.",
    },
  ],
  cta: {
    headline: "Modern CIAM without the Azure lock-in",
    subhead:
      "Run Qeet ID on any cloud or on-prem, or start free on our hosted plan — no Azure subscription required.",
  },
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
