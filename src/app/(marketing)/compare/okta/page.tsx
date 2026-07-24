import type { Metadata } from "next";

import { type ComparisonData, ComparisonPage } from "@/components/marketing/comparison-page";

export const metadata: Metadata = {
  title: "Qeet ID vs. Okta",
  description:
    "How Qeet ID compares to Okta: open-source and self-hostable, with transparent per-MAU pricing and no SSO tax — versus Okta's mature but proprietary, tier-gated platform.",
  alternates: { canonical: "/compare/okta" },
};

const data: ComparisonData = {
  competitor: "Okta",
  competitorBlurb:
    "Okta is the workforce + customer identity market leader (and Auth0's parent), with a huge integration catalog and mature compliance. Choose Qeet ID when you want open-source code, self-hosting, and transparent per-MAU pricing without the well-known SSO tax.",
  pitch: {
    headline: "Enterprise-grade identity, minus the Okta tax.",
    subhead:
      "Qeet ID speaks the same SAML / OIDC / SCIM Okta does and includes enterprise SSO on the free tier — no per-connection fees, no opaque per-user quote.",
    bullets: [
      "MIT-licensed core you can self-host on a single Go binary + Postgres.",
      "SSO, MFA, and audit logs included — never gated behind a pricier tier.",
      "Transparent per-MAU pricing you can read on the page, not a sales quote.",
    ],
  },
  factsQeetid: [
    { label: "License", value: "MIT (open source)" },
    { label: "Self-host", value: "First-class" },
    { label: "Pricing", value: "Linear per-MAU" },
    { label: "Stack", value: "Go + Postgres" },
    { label: "SSO tax", value: "None" },
  ],
  factsCompetitor: [
    { label: "License", value: "Proprietary SaaS" },
    { label: "Self-host", value: "Not available" },
    { label: "Pricing", value: "Per-user, tier-gated" },
    { label: "Stack", value: "Closed (managed)" },
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
      feature: "Prebuilt app integration catalog",
      qeetid: "partial",
      competitor: "7,000+ apps (OIN)",
      note: "Okta's Integration Network is a genuine strength; Qeet ID relies on standard protocols + bring-your-own connectors.",
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
      feature: "Fine-grained / ReBAC",
      qeetid: "Roadmap",
      competitor: "Auth0 FGA",
      note: "Fine-grained authorization is available via Okta's sister product Auth0 FGA; Qeet ID's ReBAC is planned.",
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
      feature: "Free production tier",
      qeetid: "25,000 MAU",
      competitor: "Dev edition only",
    },
    {
      section: "Pricing",
      feature: "SSO included on entry plan (no SSO tax)",
      qeetid: true,
      competitor: false,
      note: "Okta is known for gating SSO/MFA and features to pricier tiers.",
    },
    {
      section: "Pricing",
      feature: "Transparent published pricing",
      qeetid: true,
      competitor: false,
      note: "Qeet ID Pro is $0.02 / MAU; Okta enterprise pricing is per-user and quote-based.",
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
      note: "Okta ThreatInsight / adaptive MFA are mature; Qeet ID's are planned.",
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
      feature: "First-party SDKs",
      qeetid: "React · Node · Go",
      competitor: "Many languages",
      note: "Okta ships a far broader set of SDK languages.",
    },
    {
      section: "Developer experience",
      feature: "Prebuilt React components / hosted UI",
      qeetid: "partial",
      competitor: true,
      note: "Qeet ID ships a hosted login app; its React component kit is in progress.",
    },
  ],
  cta: {
    headline: "Enterprise SSO without the enterprise invoice",
    subhead:
      "Start free with SSO included, or run Qeet ID on your own infrastructure with one Docker command.",
  },
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
