import type { Metadata } from "next";

import { type ComparisonData, ComparisonPage } from "@/components/marketing/comparison-page";

export const metadata: Metadata = {
  title: "Qeet ID vs. SuperTokens",
  description:
    "Qeet ID vs. SuperTokens: MFA, multi-tenancy, and enterprise SSO included rather than paid add-ons, with a tamper-evident audit log and ABAC.",
};

const data: ComparisonData = {
  competitor: "SuperTokens",
  competitorBlurb:
    "SuperTokens is a developer-friendly, Apache-2.0 open-source auth platform whose self-hosted core is free with unlimited MAU, and it ships genuinely nice prebuilt React UI. Choose Qeet ID when you want MFA, multi-tenancy, and enterprise SSO included rather than as paid add-ons — plus a tamper-evident audit trail and ABAC.",
  pitch: {
    headline: "The add-ons, included.",
    subhead:
      "SuperTokens is clean, Apache-2.0, and free to self-host with unlimited MAU. But MFA, multi-tenancy, and enterprise SSO are all paid add-ons. Qeet ID ships them in the box — with a tamper-evident audit log and ABAC on top.",
    bullets: [
      "MFA, multi-tenancy, and SAML SSO included — not metered add-ons.",
      "Tamper-evident hash-chained audit log with a /verify endpoint.",
      "ABAC policy engine and explainable “why?” authorization built in.",
    ],
  },
  factsQeetid: [
    { label: "License", value: "MIT (open source)" },
    { label: "Enterprise SSO", value: "Included" },
    { label: "MFA", value: "Included" },
    { label: "Multi-tenant", value: "Built-in" },
    { label: "Stack", value: "Go + Postgres" },
  ],
  factsCompetitor: [
    { label: "License", value: "Apache-2.0 (open source)" },
    { label: "Enterprise SSO", value: "Paid add-on" },
    { label: "MFA", value: "Paid add-on" },
    { label: "Self-host", value: "Free (unlimited MAU)" },
    { label: "Prebuilt UI", value: "React recipes" },
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
      feature: "Passwordless (magic link, OTP)",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Authentication",
      feature: "Passkeys / WebAuthn",
      qeetid: true,
      competitor: "partial",
      note: "SuperTokens' passkeys / WebAuthn support is newer.",
    },
    {
      section: "Authentication",
      feature: "Social login",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Authentication",
      feature: "MFA (TOTP, SMS, email OTP)",
      qeetid: true,
      competitor: "partial",
      note: "MFA is a paid add-on ($0.01/MAU, min $100/mo).",
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
      competitor: "partial",
      note: "SAML is a paid, contact-priced add-on via a SAML→OIDC bridge.",
    },
    {
      section: "Federation",
      feature: "SCIM 2.0 provisioning",
      qeetid: true,
      competitor: false,
      note: "No native SCIM provisioning.",
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
      note: "SuperTokens ships built-in RBAC; there's no dedicated ABAC engine.",
    },
    {
      section: "Authorization",
      feature: "Multi-tenant isolation by default",
      qeetid: true,
      competitor: "partial",
      note: "Multi-tenancy is a paid, contact-priced add-on on SuperTokens.",
    },

    // ---- Deployment ----
    {
      section: "Deployment",
      feature: "Open-source core (OSI)",
      qeetid: true,
      competitor: true,
      note: "Both are open source — Qeet ID is MIT, SuperTokens is Apache-2.0.",
    },
    {
      section: "Deployment",
      feature: "Self-host with unlimited MAU (free)",
      qeetid: true,
      competitor: true,
      note: "SuperTokens' self-hosted core is free with unlimited MAU — a real strength.",
    },
    {
      section: "Deployment",
      feature: "Bundled admin dashboard",
      qeetid: true,
      competitor: "partial",
      note: "SuperTokens' dashboard is basic; first 3 admin users free, then $20/user.",
    },

    // ---- Pricing ----
    {
      section: "Pricing",
      feature: "Enterprise SSO included (no SSO tax)",
      qeetid: true,
      competitor: false,
      note: "SAML SSO is a paid add-on on SuperTokens.",
    },
    {
      section: "Pricing",
      feature: "MFA + multi-tenancy included",
      qeetid: true,
      competitor: false,
      note: "Both are paid add-ons on SuperTokens.",
    },
    {
      section: "Pricing",
      feature: "Managed cloud per-MAU",
      qeetid: "$0.02/MAU (25k free)",
      competitor: "$0.02/MAU (5k free, min $100/mo)",
    },

    // ---- Security & audit ----
    {
      section: "Security & audit",
      feature: "Tamper-evident hash-chained audit log + /verify",
      qeetid: true,
      competitor: false,
      note: "SuperTokens has no hash-chained audit log or integrity endpoint.",
    },
    {
      section: "Security & audit",
      feature: "Adaptive / risk-based MFA + bot detection",
      qeetid: "Roadmap",
      competitor: false,
    },

    // ---- Compliance ----
    {
      section: "Compliance",
      feature: "SOC 2 Type II / ISO 27001 (managed cloud)",
      qeetid: "Roadmap (pre-GA)",
      competitor: true,
      note: "SuperTokens' managed cloud is SOC 2 compliant; Qeet ID's audit is scheduled before GA.",
    },
    {
      section: "Compliance",
      feature: "GDPR erasure / data export",
      qeetid: true,
      competitor: true,
    },

    // ---- Developer experience ----
    {
      section: "Developer experience",
      feature: "Prebuilt React components",
      qeetid: "partial",
      competitor: true,
      note: "SuperTokens ships prebuilt React UI (“recipes”); Qeet ID's React kit is in progress.",
    },
    {
      section: "Developer experience",
      feature: "First-party SDKs",
      qeetid: "React · Node · Go",
      competitor: "Node, Python, Go (+ frontend)",
    },
  ],
  cta: {
    headline: "Everything included, none of it metered",
    subhead:
      "Self-host Qeet ID free under MIT, or start on managed cloud — MFA, multi-tenancy, and SAML SSO in every plan.",
  },
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
