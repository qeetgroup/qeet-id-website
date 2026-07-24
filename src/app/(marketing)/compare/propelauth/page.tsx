import type { Metadata } from "next";

import { type ComparisonData, ComparisonPage } from "@/components/marketing/comparison-page";

export const metadata: Metadata = {
  title: "Qeet ID vs. PropelAuth",
  description:
    "Qeet ID vs. PropelAuth: open-source B2B identity you can self-host, at $0.02/MAU with a tamper-evident audit log built in rather than a paid add-on.",
};

const data: ComparisonData = {
  competitor: "PropelAuth",
  competitorBlurb:
    "PropelAuth is a B2B-first identity platform with strong organization and team management and flat, unlimited enterprise SSO. Qeet ID offers the same B2B model as open-source, self-hostable software, at a lower per-MAU rate and with a tamper-evident audit log built in.",
  pitch: {
    headline: "B2B auth you can read, run, and audit.",
    subhead:
      "PropelAuth nails B2B org management and flat, unlimited SSO. Qeet ID matches the B2B model as open source you can self-host, at a lower per-MAU rate with a tamper-evident audit log built in.",
    bullets: [
      "MIT-licensed and self-hostable on your own Postgres — PropelAuth is managed-only.",
      "$0.02 / MAU vs $0.05, with SCIM at the enterprise tier rather than a $500/mo plan.",
      "Hash-chained audit log + /verify is built in — PropelAuth's audit export is a paid add-on.",
    ],
  },
  factsQeetid: [
    { label: "License", value: "MIT (open source)" },
    { label: "Self-host", value: "First-class" },
    { label: "Per-MAU", value: "$0.02 / MAU" },
    { label: "Entry price", value: "$25 / mo" },
    { label: "Stack", value: "Go + Postgres" },
  ],
  factsCompetitor: [
    { label: "License", value: "Proprietary SaaS" },
    { label: "Self-host", value: "Not available" },
    { label: "Per-MAU", value: "$0.05 / MAU" },
    { label: "Entry price", value: "$150 / mo" },
    { label: "Focus", value: "B2B org-first" },
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
      competitor: "partial",
      note: "Passkey support in PropelAuth is limited; Qeet ID treats passkeys as a first-class method.",
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
      feature: "SAML 2.0 SSO",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Federation",
      feature: "SCIM 2.0 provisioning",
      qeetid: true,
      competitor: "Growth+ ($500/mo) + $100/conn",
      note: "Qeet ID includes SCIM on its enterprise plan; PropelAuth gates it behind the Growth+ tier and charges per connection.",
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
      note: "Qeet ID ships a per-tenant ABAC policy engine; PropelAuth's model is role-based.",
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
      competitor: "10,000 MAU + unlimited orgs",
    },
    {
      section: "Pricing",
      feature: "Entry paid plan",
      qeetid: "$25 / mo",
      competitor: "$150 / mo (Growth)",
    },
    {
      section: "Pricing",
      feature: "Per-MAU pricing",
      qeetid: "$0.02 / MAU",
      competitor: "$0.05 / MAU",
    },
    {
      section: "Pricing",
      feature: "Unlimited flat enterprise SSO (no per-connection fee)",
      qeetid: true,
      competitor: true,
      note: "PropelAuth's flat, unlimited SSO on Growth is a genuine plus; Qeet ID also includes SSO with no per-connection fee.",
    },

    // ---- Security & audit ----
    {
      section: "Security & audit",
      feature: "Tamper-evident hash-chained audit log + /verify",
      qeetid: true,
      competitor: false,
      note: "Qeet ID SHA-256 chains every audit row and proves integrity via a /verify endpoint; PropelAuth offers audit-log export as a paid add-on, not tamper-evidence.",
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
      feature: "B2B org portal + user impersonation",
      qeetid: "partial",
      competitor: true,
      note: "Self-serve org management and user impersonation are PropelAuth's signature strength; Qeet ID has multi-tenant orgs and an admin console but a lighter impersonation flow.",
    },
    {
      section: "Developer experience",
      feature: "Audit log API + CSV/JSON export",
      qeetid: true,
      competitor: "Paid add-on ($50/conn)",
    },
    {
      section: "Developer experience",
      feature: "First-party SDKs",
      qeetid: "React · Node · Go",
      competitor: "Many languages",
    },
  ],
  cta: {
    headline: "Own your B2B identity stack",
    subhead:
      "Keep the org-first model you like — get the source, self-hosting, and a lower per-MAU bill. Start free or self-host with one Docker command.",
  },
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
