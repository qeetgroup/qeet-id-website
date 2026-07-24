import type { Metadata } from "next";

import { type ComparisonData, ComparisonPage } from "@/components/marketing/comparison-page";

export const metadata: Metadata = {
  title: "Qeet ID vs. Ory",
  description:
    "Qeet ID vs. Ory: an all-in-one open-source identity product — admin UI, hosted login, and SAML/SCIM included — versus Ory's composable, build-it-yourself primitives.",
};

const data: ComparisonData = {
  competitor: "Ory",
  competitorBlurb:
    "Ory is a respected open-source identity stack (Kratos, Hydra, Keto, Oathkeeper) with composable, headless APIs and best-in-class Zanzibar-style permissions. Choose Qeet ID when you want the whole product in one binary — admin UI, hosted login, SAML/SCIM included — instead of assembling and operating several services yourself.",
  pitch: {
    headline: "All-in-one, not build-it-yourself.",
    subhead:
      "Ory gives you clean, composable identity primitives and leaves the UI, admin, and glue to you. Qeet ID ships the whole product — user store, admin dashboard, and hosted login — in one binary. If you need Zanzibar-style permissions today, Ory's Keto genuinely leads.",
    bullets: [
      "One binary with a built-in admin dashboard and hosted login — no UI to assemble.",
      "MAU billing with a real production free tier, not a dev-only sandbox.",
      "SAML SSO and SCIM included, not gated behind an enterprise plan.",
    ],
  },
  factsQeetid: [
    { label: "License", value: "MIT (open source)" },
    { label: "Self-host", value: "Single binary" },
    { label: "Admin UI", value: "Included" },
    { label: "Billing", value: "Per-MAU (prod free tier)" },
    { label: "Stack", value: "Go + Postgres" },
  ],
  factsCompetitor: [
    { label: "License", value: "Apache-2.0 (open source)" },
    { label: "Self-host", value: "Multi-service" },
    { label: "Admin UI", value: "Build your own" },
    { label: "Billing", value: "Per-aDAU (dev-only free)" },
    { label: "Fine-grained authz", value: "Keto (Zanzibar)" },
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
      competitor: true,
    },

    // ---- Federation ----
    {
      section: "Federation",
      feature: "OAuth 2.0 / OIDC (you are the IdP)",
      qeetid: true,
      competitor: true,
      note: "Ory Hydra is a mature, certified OAuth2 / OIDC provider.",
    },
    {
      section: "Federation",
      feature: "SAML 2.0 SP + IdP",
      qeetid: true,
      competitor: "partial",
      note: "Enterprise SAML SSO is an Enterprise-only feature on Ory Network.",
    },
    {
      section: "Federation",
      feature: "SCIM 2.0 provisioning",
      qeetid: true,
      competitor: "partial",
      note: "Directory Sync / SCIM is Enterprise-only on Ory Network.",
    },

    // ---- Authorization ----
    {
      section: "Authorization",
      feature: "RBAC + single-call /check API",
      qeetid: true,
      competitor: true,
      note: "Ory Keto powers role checks alongside its relationship model.",
    },
    {
      section: "Authorization",
      feature: "Fine-grained / ReBAC (Zanzibar-style)",
      qeetid: "Roadmap",
      competitor: true,
      note: "Ory Keto ships Google-Zanzibar permissions today; Qeet ID's ReBAC is on the roadmap.",
    },
    {
      section: "Authorization",
      feature: "ABAC policy engine",
      qeetid: true,
      competitor: "partial",
      note: "Ory leans on Oathkeeper access rules; there's no dedicated ABAC policy engine.",
    },
    {
      section: "Authorization",
      feature: "Multi-tenant isolation by default",
      qeetid: true,
      competitor: "Projects",
    },

    // ---- Deployment ----
    {
      section: "Deployment",
      feature: "Open-source core",
      qeetid: true,
      competitor: true,
      note: "Both are truly open source — Qeet ID is MIT, Ory is Apache-2.0.",
    },
    {
      section: "Deployment",
      feature: "Self-host (single binary + Postgres)",
      qeetid: true,
      competitor: "partial",
      note: "Ory self-hosts, but as several services (Kratos, Hydra, Keto, Oathkeeper).",
    },
    {
      section: "Deployment",
      feature: "Bundled admin dashboard",
      qeetid: true,
      competitor: false,
      note: "Ory is headless / API-first — you build the admin UI.",
    },

    // ---- Pricing ----
    {
      section: "Pricing",
      feature: "Production free tier",
      qeetid: true,
      competitor: false,
      note: "Ory's free tier is development-only; it has no production environment.",
    },
    {
      section: "Pricing",
      feature: "Per-user billing model",
      qeetid: "$0.02 / MAU (Pro)",
      competitor: "per-aDAU + ~$64/mo (Production)",
    },
    {
      section: "Pricing",
      feature: "Enterprise SSO included",
      qeetid: true,
      competitor: false,
      note: "SAML SSO and Directory Sync are Enterprise-only on Ory Network.",
    },

    // ---- Security & audit ----
    {
      section: "Security & audit",
      feature: "Tamper-evident hash-chained audit log + /verify",
      qeetid: true,
      competitor: "partial",
      note: "Ory Network keeps audit logs, but without a SHA-256 hash-chain integrity /verify.",
    },
    {
      section: "Security & audit",
      feature: "Breached-password rejection (HIBP)",
      qeetid: true,
      competitor: true,
      note: "Ory Kratos can enforce a Have I Been Pwned password policy.",
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
      note: "Ory Network is independently SOC 2 audited; Qeet ID's audit is scheduled before GA.",
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
      feature: "Prebuilt React components / hosted login UI",
      qeetid: "partial",
      competitor: false,
      note: "Qeet ID ships a hosted login app; its React kit is in progress. Ory ships no UI — you build it.",
    },
    {
      section: "Developer experience",
      feature: "First-party SDKs",
      qeetid: "React · Node · Go",
      competitor: "Generated, many languages",
    },
  ],
  cta: {
    headline: "Ship auth without assembling it",
    subhead:
      "Run the full Qeet ID stack — user store, admin, and hosted login — from a single Docker image, or start free on managed cloud.",
  },
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
