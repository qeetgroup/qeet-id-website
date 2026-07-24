import type { Metadata } from "next";

import { type ComparisonData, ComparisonPage } from "@/components/marketing/comparison-page";

export const metadata: Metadata = {
  title: "Qeet ID vs. AWS Cognito",
  description:
    "Qeet ID vs. AWS Cognito: the same OIDC/SAML core as open-source code you can run off-AWS, with a real admin UI and a built-in authorization engine.",
  alternates: { canonical: "/compare/cognito" },
};

const data: ComparisonData = {
  competitor: "AWS Cognito",
  competitorBlurb:
    "AWS Cognito is Amazon's managed identity service — tightly integrated with the AWS ecosystem and proven at massive scale. Choose Qeet ID when you want open-source code, deployment outside AWS, a dedicated admin UI, and a first-class authorization engine.",
  pitch: {
    headline: "The same standards, without the AWS lock-in.",
    subhead:
      "Cognito is a solid choice if you already live in AWS. Qeet ID gives you the same OIDC / SAML core as open-source code you can run anywhere — plus a real admin UI and a proper authorization engine.",
    bullets: [
      "MIT-licensed core you can self-host on any infrastructure — not just AWS.",
      "A dedicated identity admin UI, not the AWS console.",
      "Built-in RBAC + ABAC with a single-call /check and explainable grant paths.",
    ],
  },
  factsQeetid: [
    { label: "License", value: "MIT (open source)" },
    { label: "Self-host", value: "First-class" },
    { label: "Pricing", value: "Linear per-MAU" },
    { label: "Stack", value: "Go + Postgres" },
    { label: "Data residency", value: "EU / US / self" },
  ],
  factsCompetitor: [
    { label: "License", value: "Proprietary (AWS)" },
    { label: "Self-host", value: "Not available" },
    { label: "Pricing", value: "Per-MAU (Essentials)" },
    { label: "Stack", value: "Managed (AWS)" },
    { label: "Data residency", value: "AWS regions" },
  ],
  rows: [
    // ---- Authentication ----
    {
      section: "Authentication",
      feature: "Passkeys / WebAuthn",
      qeetid: true,
      competitor: true,
      note: "Cognito added passkeys in its 2024–25 Essentials update.",
    },
    {
      section: "Authentication",
      feature: "Magic links",
      qeetid: true,
      competitor: false,
      note: "Cognito ships email / SMS OTP passwordless; magic links need a custom auth flow.",
    },
    {
      section: "Authentication",
      feature: "MFA (TOTP, SMS)",
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
      competitor: "partial",
      note: "Cognito federates to external SAML IdPs (acts as SP) but is not itself a SAML IdP.",
    },
    {
      section: "Federation",
      feature: "SCIM 2.0 provisioning",
      qeetid: true,
      competitor: false,
      note: "Cognito is not a SCIM provisioning IdP.",
    },

    // ---- Authorization ----
    {
      section: "Authorization",
      feature: "RBAC + single-call /check API",
      qeetid: true,
      competitor: "partial",
      note: "Cognito groups give coarse roles; there is no dedicated authorization /check API.",
    },
    {
      section: "Authorization",
      feature: "ABAC policy engine",
      qeetid: true,
      competitor: "partial",
      note: "Cognito's ABAC targets AWS resource access, not a general policy engine.",
    },
    {
      section: "Authorization",
      feature: "Explainable authz (grant-path “why?” trace)",
      qeetid: true,
      competitor: false,
    },
    {
      section: "Authorization",
      feature: "Multi-tenant isolation by default",
      qeetid: true,
      competitor: "Separate user pools",
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
      note: "Cognito is AWS-only; there is no self-hosted option.",
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
      feature: "Free tier MAU cap",
      qeetid: "25,000",
      competitor: "10,000 (Essentials)",
      note: "User pools created before Nov 2024 keep the legacy 50,000 free MAU.",
    },
    {
      section: "Pricing",
      feature: "Per-MAU pricing",
      qeetid: "$0.02 / MAU (Pro)",
      competitor: "$0.015 / MAU (Essentials)",
      note: "Cognito's legacy Lite tier is cheaper at scale (roughly $0.0046–$0.0055/MAU).",
    },
    {
      section: "Pricing",
      feature: "SSO / federated sign-in included",
      qeetid: true,
      competitor: "partial",
      note: "Cognito bills federated SAML / OIDC sign-in at $0.015/MAU.",
    },

    // ---- Security & audit ----
    {
      section: "Security & audit",
      feature: "Tamper-evident hash-chained audit log + /verify",
      qeetid: true,
      competitor: "partial",
      note: "Cognito events reach CloudTrail but are not hash-chained or independently verifiable.",
    },
    {
      section: "Security & audit",
      feature: "Breached-password rejection (HIBP)",
      qeetid: true,
      competitor: "partial",
      note: "Offered through Cognito's paid advanced-security (Plus) tier.",
    },
    {
      section: "Security & audit",
      feature: "Adaptive / risk-based MFA + bot detection",
      qeetid: "Roadmap",
      competitor: true,
      note: "Cognito's Plus tier ships adaptive auth; Qeet ID's is planned.",
    },

    // ---- Compliance ----
    {
      section: "Compliance",
      feature: "SOC 2 Type II / ISO 27001",
      qeetid: "Roadmap (pre-GA)",
      competitor: true,
      note: "AWS carries broad, mature compliance attestations.",
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
      feature: "Native admin dashboard",
      qeetid: true,
      competitor: "partial",
      note: "AWS console only — no dedicated end-user identity admin UI.",
    },
    {
      section: "Developer experience",
      feature: "Webhook events with HMAC + retries",
      qeetid: true,
      competitor: "partial",
      note: "Cognito uses Lambda triggers rather than signed HTTP webhooks.",
    },
    {
      section: "Developer experience",
      feature: "First-party SDKs",
      qeetid: "React · Node · Go",
      competitor: "AWS Amplify + broad SDKs",
    },
  ],
  cta: {
    headline: "Own your identity layer, on any cloud",
    subhead:
      "Start free on our hosted plan, or run the Qeet ID binary on your own infrastructure — including air-gapped.",
  },
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
