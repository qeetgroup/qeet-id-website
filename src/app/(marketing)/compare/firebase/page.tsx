import type { Metadata } from "next";

import { type ComparisonData, ComparisonPage } from "@/components/marketing/comparison-page";

export const metadata: Metadata = {
  title: "Qeet ID vs. Firebase Auth",
  description:
    "Qeet ID vs. Firebase Auth: the same fast auth methods plus built-in RBAC/ABAC, enterprise SSO without a pricing gate, an admin UI, and open-source self-hosting.",
};

const data: ComparisonData = {
  competitor: "Firebase Auth",
  competitorBlurb:
    "Firebase Auth is Google's developer-friendly authentication service — generous on its free basic tier and backed by mature client SDKs. Choose Qeet ID when you need built-in authorization, enterprise SSO without a pricing gate, a dedicated admin UI, and open-source self-hosting.",
  pitch: {
    headline: "More than a login box bolted to a database.",
    subhead:
      "Firebase Auth is fast to start and free at the basic tier. Qeet ID matches its auth methods and adds the parts you would otherwise build yourself — RBAC / ABAC, enterprise SSO, an admin UI, and a verifiable audit trail.",
    bullets: [
      "Built-in RBAC + ABAC with /check and explainable grant paths — no custom-claims plumbing.",
      "Enterprise SAML / OIDC SSO included, not gated behind Identity Platform's paid tier.",
      "Open-source and self-hostable — no Google Cloud lock-in.",
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
    { label: "License", value: "Proprietary (Google)" },
    { label: "Self-host", value: "Not available" },
    { label: "Pricing", value: "Free basic / GCIP per-MAU" },
    { label: "Stack", value: "Managed (Google Cloud)" },
    { label: "Data residency", value: "Google Cloud regions" },
  ],
  rows: [
    // ---- Authentication ----
    {
      section: "Authentication",
      feature: "Passkeys / WebAuthn",
      qeetid: true,
      competitor: true,
      note: "Firebase added passkey support recently.",
    },
    {
      section: "Authentication",
      feature: "Magic links",
      qeetid: true,
      competitor: true,
      note: "Firebase calls these email-link sign-in.",
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
      feature: "Social / OIDC consumer login",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Federation",
      feature: "SAML 2.0 / OIDC enterprise SSO",
      qeetid: true,
      competitor: "partial",
      note: "Requires Identity Platform (GCIP) Tier 2 — free ≤50 MAU, then $0.015/MAU.",
    },
    {
      section: "Federation",
      feature: "SCIM 2.0 provisioning",
      qeetid: true,
      competitor: false,
      note: "Firebase / GCIP is not a SCIM provisioning IdP.",
    },

    // ---- Authorization ----
    {
      section: "Authorization",
      feature: "RBAC + single-call /check API",
      qeetid: true,
      competitor: false,
      note: "No built-in RBAC; you roll your own with custom claims + Security Rules.",
    },
    {
      section: "Authorization",
      feature: "ABAC policy engine",
      qeetid: true,
      competitor: "partial",
      note: "Attribute logic lives in Firestore Security Rules, not a dedicated policy engine.",
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
      competitor: "partial",
      note: "GCIP supports tenants; base Firebase Auth does not.",
    },

    // ---- Deployment ----
    {
      section: "Deployment",
      feature: "Open-source code (MIT)",
      qeetid: true,
      competitor: false,
      note: "Firebase client SDKs are open; the auth service is not.",
    },
    {
      section: "Deployment",
      feature: "Self-host (single binary + Postgres)",
      qeetid: true,
      competitor: false,
      note: "Firebase is Google-cloud-only; there is no self-host.",
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
      competitor: "Unlimited (basic)",
      note: "Base Firebase Auth is free (only phone / SMS is billed); Identity Platform is priced per-MAU.",
    },
    {
      section: "Pricing",
      feature: "Per-MAU pricing",
      qeetid: "$0.02 / MAU (Pro)",
      competitor: "From $0.0055 / MAU (GCIP)",
      note: "GCIP is tier-stepped and declines with volume.",
    },
    {
      section: "Pricing",
      feature: "Enterprise SSO included",
      qeetid: true,
      competitor: false,
      note: "SAML / OIDC SSO sits in GCIP's higher-priced Tier 2.",
    },

    // ---- Security & audit ----
    {
      section: "Security & audit",
      feature: "Tamper-evident hash-chained audit log + /verify",
      qeetid: true,
      competitor: "partial",
      note: "Firebase events reach Cloud Audit Logs but are not hash-chained or verifiable.",
    },
    {
      section: "Security & audit",
      feature: "Breached-password rejection (HIBP)",
      qeetid: true,
      competitor: false,
      note: "Not built in; base Firebase Auth does not check passwords against a breach corpus.",
    },
    {
      section: "Security & audit",
      feature: "Adaptive / risk-based MFA + bot detection",
      qeetid: "Roadmap",
      competitor: "partial",
      note: "Firebase leans on reCAPTCHA / App Check; Qeet ID's adaptive MFA is planned.",
    },

    // ---- Compliance ----
    {
      section: "Compliance",
      feature: "SOC 2 Type II / ISO 27001",
      qeetid: "Roadmap (pre-GA)",
      competitor: true,
      note: "Google Cloud carries broad compliance attestations.",
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
      note: "Firebase console is developer-centric; no dedicated end-user identity admin.",
    },
    {
      section: "Developer experience",
      feature: "Webhook events with HMAC + retries",
      qeetid: true,
      competitor: "partial",
      note: "Firebase uses Cloud Functions triggers rather than signed HTTP webhooks.",
    },
    {
      section: "Developer experience",
      feature: "First-party SDKs",
      qeetid: "React · Node · Go",
      competitor: "Mature, broad client SDKs",
      note: "Firebase's client SDKs are a genuine strength.",
    },
  ],
  cta: {
    headline: "Keep the fast start. Add the enterprise parts.",
    subhead:
      "Start free on our hosted plan, or self-host the Qeet ID binary — with RBAC, SSO, and audit built in from day one.",
  },
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
