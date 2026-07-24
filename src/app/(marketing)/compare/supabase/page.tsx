import type { Metadata } from "next";

import { type ComparisonData, ComparisonPage } from "@/components/marketing/comparison-page";

export const metadata: Metadata = {
  title: "Qeet ID vs. Supabase Auth",
  description:
    "Qeet ID vs. Supabase Auth: both open source, but Qeet ID is a dedicated identity product — first-class multi-tenancy, a real authz engine, SSO, SCIM, and a verifiable audit log.",
};

const data: ComparisonData = {
  competitor: "Supabase Auth",
  competitorBlurb:
    "Supabase Auth (GoTrue) is the open-source, self-hostable authentication layer of the Supabase Postgres platform — cheap, generous on free MAU, and tightly integrated with your database. Choose Qeet ID when identity is a product in its own right: first-class multi-tenancy, a real authorization engine, enterprise SSO and SCIM, and a verifiable audit trail.",
  pitch: {
    headline: "Open source too — but identity is the whole product.",
    subhead:
      "Supabase Auth is a genuinely open-source, self-hostable component of the Supabase platform. Qeet ID competes on the same ground, then goes further where auth is your core concern: multi-tenancy, a real authorization engine, SSO without a paywall, and a verifiable audit trail.",
    bullets: [
      "First-class multi-tenancy, not one user pool per project.",
      "A dedicated RBAC + ABAC engine with /check and explainable grant paths — not just RLS policies.",
      "SAML SSO and SCIM included, plus a hash-chained audit log you can verify.",
    ],
  },
  factsQeetid: [
    { label: "License", value: "MIT (open source)" },
    { label: "Self-host", value: "First-class" },
    { label: "Pricing", value: "Linear per-MAU" },
    { label: "Stack", value: "Go + Postgres" },
    { label: "Focus", value: "Dedicated identity" },
  ],
  factsCompetitor: [
    { label: "License", value: "Apache-2.0 (open source)" },
    { label: "Self-host", value: "First-class" },
    { label: "Pricing", value: "Per-MAU, cheaper overage" },
    { label: "Stack", value: "Go (GoTrue) + Postgres" },
    { label: "Focus", value: "Auth within DB platform" },
  ],
  rows: [
    // ---- Authentication ----
    {
      section: "Authentication",
      feature: "Passkeys / WebAuthn",
      qeetid: true,
      competitor: "partial",
      note: "Supabase's WebAuthn support is newer and less complete.",
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
      competitor: "partial",
      note: "Supabase MFA centres on TOTP and phone; email OTP and recovery codes are less complete.",
    },

    // ---- Federation ----
    {
      section: "Federation",
      feature: "Social / OIDC login",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Federation",
      feature: "SAML 2.0 enterprise SSO",
      qeetid: true,
      competitor: "partial",
      note: "App-level SAML SSO is Supabase Pro-plus only and billed separately (~$0.015/SSO-MAU).",
    },
    {
      section: "Federation",
      feature: "SCIM 2.0 provisioning",
      qeetid: true,
      competitor: false,
      note: "Supabase has no SCIM provisioning.",
    },

    // ---- Authorization ----
    {
      section: "Authorization",
      feature: "RBAC + single-call /check API",
      qeetid: true,
      competitor: "partial",
      note: "Supabase does authz via Postgres RLS + custom claims — no dedicated /check API.",
    },
    {
      section: "Authorization",
      feature: "ABAC policy engine",
      qeetid: true,
      competitor: "partial",
      note: "Attribute rules live in RLS policies, not a standalone policy engine.",
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
      note: "A Supabase project is effectively one user pool; multi-tenant is not first-class.",
    },

    // ---- Deployment ----
    {
      section: "Deployment",
      feature: "Open-source code",
      qeetid: true,
      competitor: true,
      note: "Both are open source — Qeet ID is MIT, Supabase Auth (GoTrue) is Apache-2.0.",
    },
    {
      section: "Deployment",
      feature: "Self-host on Postgres",
      qeetid: true,
      competitor: true,
      note: "Both self-host; Qeet ID is a single binary, Supabase self-host runs the wider platform stack.",
    },
    {
      section: "Deployment",
      feature: "Air-gapped / fully offline",
      qeetid: true,
      competitor: "partial",
      note: "Qeet ID runs fully offline as one binary; Supabase self-host pulls a larger multi-service stack.",
    },

    // ---- Pricing ----
    {
      section: "Pricing",
      feature: "Free tier",
      qeetid: "25,000 MAU",
      competitor: "50,000 MAU",
      note: "Supabase's free tier is larger.",
    },
    {
      section: "Pricing",
      feature: "Per-MAU overage",
      qeetid: "$0.02 / MAU (Pro)",
      competitor: "$0.00325 / MAU (Pro)",
      note: "Supabase's overage is cheaper; Pro includes 100,000 MAU.",
    },
    {
      section: "Pricing",
      feature: "Enterprise SSO included",
      qeetid: true,
      competitor: "partial",
      note: "Supabase app SAML SSO is a paid Pro-plus add-on billed per SSO-MAU.",
    },

    // ---- Security & audit ----
    {
      section: "Security & audit",
      feature: "Tamper-evident hash-chained audit log + /verify",
      qeetid: true,
      competitor: "partial",
      note: "Supabase offers logs but no hash-chained, independently verifiable audit trail.",
    },
    {
      section: "Security & audit",
      feature: "Breached-password rejection (HIBP)",
      qeetid: true,
      competitor: true,
      note: "Supabase supports an opt-in HaveIBeenPwned password check.",
    },
    {
      section: "Security & audit",
      feature: "Adaptive / risk-based MFA + bot detection",
      qeetid: "Roadmap",
      competitor: "partial",
      note: "Supabase leans on CAPTCHA / rate limits; neither ships full adaptive MFA yet.",
    },

    // ---- Compliance ----
    {
      section: "Compliance",
      feature: "SOC 2 Type II / ISO 27001",
      qeetid: "Roadmap (pre-GA)",
      competitor: true,
      note: "Supabase's managed platform holds SOC 2; Qeet ID's audit is scheduled before GA.",
    },
    {
      section: "Compliance",
      feature: "Self-hosted = your compliance boundary",
      qeetid: true,
      competitor: true,
      note: "Both can self-host, so the compliance boundary is yours either way.",
    },

    // ---- Developer experience ----
    {
      section: "Developer experience",
      feature: "Dedicated identity admin UI",
      qeetid: true,
      competitor: "partial",
      note: "Supabase's dashboard is database-centric; auth is a section within it, not a dedicated identity admin.",
    },
    {
      section: "Developer experience",
      feature: "Webhook events with HMAC + retries",
      qeetid: true,
      competitor: "partial",
      note: "Supabase exposes auth hooks / DB webhooks; Qeet ID ships signed, retried event webhooks.",
    },
    {
      section: "Developer experience",
      feature: "First-party SDKs",
      qeetid: "React · Node · Go",
      competitor: "JavaScript-first",
      note: "Supabase's JS SDK is excellent; broader language coverage is community-driven.",
    },
  ],
  cta: {
    headline: "Both open source. One is built for identity.",
    subhead:
      "Start free on our hosted plan or self-host the Qeet ID binary — with multi-tenancy, SSO, and a verifiable audit log built in.",
  },
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
