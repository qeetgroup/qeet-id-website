import type { Metadata } from "next";

import { type ComparisonData, ComparisonPage } from "@/components/marketing/comparison-page";

export const metadata: Metadata = {
  title: "Qeet ID vs. FusionAuth",
  description:
    "Qeet ID vs. FusionAuth: a truly MIT-licensed identity core with enterprise SSO included, versus FusionAuth's source-available license and paid SSO tiers.",
};

const data: ComparisonData = {
  competitor: "FusionAuth",
  competitorBlurb:
    "FusionAuth is a mature, feature-rich CIAM platform with a free, self-hostable Community edition that supports unlimited MAU. It is source-available (proprietary), not OSI open source, and reserves SAML IdP, SCIM, and threat detection for paid plans. Choose Qeet ID for a truly MIT-licensed core with enterprise SSO in every tier.",
  pitch: {
    headline: "Truly open source. Enterprise SSO without the tier tax.",
    subhead:
      "FusionAuth is battle-tested and its free self-hosted edition is genuinely unlimited. But it's source-available, not open source — and SAML IdP, SCIM, and threat detection live behind paid plans. Qeet ID is MIT and ships those in the box.",
    bullets: [
      "MIT-licensed — inspect, fork, and run the core with no license key.",
      "SAML IdP-initiated SSO and SCIM provisioning included, not tier-gated.",
      "Tamper-evident hash-chained audit log with a /verify integrity endpoint.",
    ],
  },
  factsQeetid: [
    { label: "License", value: "MIT (open source)" },
    { label: "Self-host", value: "First-class" },
    { label: "Enterprise SSO", value: "Included" },
    { label: "Pricing", value: "$25/mo Pro · $0.02/MAU" },
    { label: "Stack", value: "Go + Postgres" },
  ],
  factsCompetitor: [
    { label: "License", value: "Source-available" },
    { label: "Self-host", value: "Free (unlimited MAU)" },
    { label: "Enterprise SSO", value: "Paid tiers" },
    { label: "Cloud", value: "From $162/mo" },
    { label: "Stack", value: "Java (self-managed)" },
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
      feature: "Social login",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Authentication",
      feature: "MFA (TOTP, SMS, email OTP, recovery codes)",
      qeetid: true,
      competitor: "partial",
      note: "TOTP is free; SMS / email / voice MFA require a paid plan.",
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
      note: "SP + cross-app SSO are free; IdP-initiated SAML needs a paid plan.",
    },
    {
      section: "Federation",
      feature: "SCIM 2.0 provisioning",
      qeetid: true,
      competitor: "partial",
      note: "SCIM is an Enterprise-only feature on FusionAuth.",
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
      note: "FusionAuth models roles and entities; there's no dedicated ABAC policy engine.",
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
      feature: "Multi-tenant isolation by default",
      qeetid: true,
      competitor: true,
      note: "FusionAuth has tenants; its Tenant Manager admin is Enterprise-only.",
    },

    // ---- Deployment ----
    {
      section: "Deployment",
      feature: "Truly open-source (OSI) license",
      qeetid: true,
      competitor: "partial",
      note: "FusionAuth is source-available (proprietary), not OSI open source; the Community edition is free.",
    },
    {
      section: "Deployment",
      feature: "Self-host with unlimited MAU (free)",
      qeetid: true,
      competitor: true,
      note: "FusionAuth's free Community edition self-hosts unlimited MAU — a genuine strength.",
    },
    {
      section: "Deployment",
      feature: "Bundled admin dashboard",
      qeetid: true,
      competitor: true,
    },

    // ---- Pricing ----
    {
      section: "Pricing",
      feature: "Enterprise SSO included (no SSO tax)",
      qeetid: true,
      competitor: false,
      note: "SAML IdP-initiated SSO and SCIM require paid / Enterprise plans.",
    },
    {
      section: "Pricing",
      feature: "Transparent public per-MAU pricing",
      qeetid: true,
      competitor: false,
      note: "FusionAuth cloud pricing uses an on-page calculator; the per-MAU rate isn't published as a flat number.",
    },
    {
      section: "Pricing",
      feature: "Managed cloud entry price",
      qeetid: "$25/mo (Pro)",
      competitor: "$162/mo (Starter)",
    },

    // ---- Security & audit ----
    {
      section: "Security & audit",
      feature: "Tamper-evident hash-chained audit log + /verify",
      qeetid: true,
      competitor: "partial",
      note: "FusionAuth logs audit events, but without a SHA-256 hash-chain integrity /verify.",
    },
    {
      section: "Security & audit",
      feature: "Breached-password rejection (HIBP)",
      qeetid: true,
      competitor: "partial",
      note: "FusionAuth's breach / Pwned-password detection is a paid-plan feature.",
    },
    {
      section: "Security & audit",
      feature: "Adaptive / risk-based MFA + threat detection",
      qeetid: "Roadmap",
      competitor: "partial",
      note: "FusionAuth's advanced threat detection is Enterprise-only; Qeet ID's adaptive MFA is on the roadmap.",
    },

    // ---- Compliance ----
    {
      section: "Compliance",
      feature: "SOC 2 Type II / ISO 27001 (managed cloud)",
      qeetid: "Roadmap (pre-GA)",
      competitor: true,
      note: "FusionAuth Cloud is SOC 2 compliant; Qeet ID's audit is scheduled before GA.",
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
      feature: "First-party SDKs",
      qeetid: "React · Node · Go",
      competitor: "Many client libraries",
    },
    {
      section: "Developer experience",
      feature: "Prebuilt React components / hosted login UI",
      qeetid: "partial",
      competitor: "partial",
      note: "Both ship themeable hosted login pages; Qeet ID's React component kit is in progress.",
    },
  ],
  cta: {
    headline: "MIT-licensed identity, enterprise SSO included",
    subhead:
      "Self-host the full Qeet ID core for free under MIT, or start on managed cloud from $25/mo — SAML and SCIM in every plan.",
  },
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
