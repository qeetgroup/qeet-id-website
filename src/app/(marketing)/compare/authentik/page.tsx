import type { Metadata } from "next";

import { type ComparisonData, ComparisonPage } from "@/components/marketing/comparison-page";

export const metadata: Metadata = {
  title: "Qeet ID vs. Authentik",
  description:
    "How Qeet ID compares to Authentik: a shared MIT license, plus a managed cloud option, typed SDKs, a hosted login, and a tamper-evident audit chain for customer-facing apps — with an honest look at Authentik's protocol breadth.",
  alternates: { canonical: "/compare/authentik" },
};

const data: ComparisonData = {
  competitor: "Authentik",
  competitorBlurb:
    "Authentik is a popular MIT-licensed, self-hosted identity provider with exceptionally broad protocol support — SAML, OIDC, LDAP, SCIM, RADIUS, and a forward-auth proxy — spanning homelab to enterprise. It has no managed cloud and is oriented more as an SSO gateway than a customer-facing CIAM. Choose Qeet ID when you want a managed cloud option, typed SDKs and a hosted login for your app, and a tamper-evident audit log.",
  pitch: {
    headline: "Same MIT license. Built for customer-facing apps.",
    subhead:
      "Authentik is a strong, MIT-licensed self-hosted IdP with unusually broad protocol support (LDAP, RADIUS, forward-auth proxy). Qeet ID shares the MIT license but is built as a CIAM: a managed cloud option, typed SDKs, a hosted login app, and a tamper-evident audit chain.",
    bullets: [
      "A first-party managed cloud — Authentik is self-host only.",
      "CIAM developer experience: typed SDKs, hosted login, ABAC + explainable authz.",
      "Tamper-evident hash-chained audit + /verify in the open-source core.",
    ],
  },
  factsQeetid: [
    { label: "License", value: "MIT (open source)" },
    { label: "Self-host", value: "First-class" },
    { label: "Managed cloud", value: "EU / US" },
    { label: "Focus", value: "CIAM" },
    { label: "SDKs", value: "React · Node · Go" },
  ],
  factsCompetitor: [
    { label: "License", value: "MIT (core)" },
    { label: "Self-host", value: "First-class" },
    { label: "Managed cloud", value: "None" },
    { label: "Focus", value: "IdP / SSO gateway" },
    { label: "Protocols", value: "Broad (LDAP/RADIUS)" },
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
      feature: "Email + password",
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
      note: "Both ship SCIM; Authentik gates outbound sync to Google Workspace / Entra behind its Enterprise license.",
    },
    {
      section: "Federation",
      feature: "LDAP / RADIUS / forward-auth proxy",
      qeetid: false,
      competitor: true,
      note: "Authentik's LDAP, RADIUS, and forward-auth proxy providers are a real strength; Qeet ID does not offer them.",
    },

    // ---- Authorization ----
    {
      section: "Authorization",
      feature: "RBAC + single-call /check API",
      qeetid: true,
      competitor: true,
      note: "Authentik added RBAC to its OSS core; Qeet ID adds a single-call /check endpoint.",
    },
    {
      section: "Authorization",
      feature: "ABAC policy engine",
      qeetid: true,
      competitor: "partial",
      note: "Authentik's expression policies can gate flows on attributes, but there is no dedicated ABAC engine.",
    },
    {
      section: "Authorization",
      feature: "Explainable authz (grant-path “why?” trace)",
      qeetid: true,
      competitor: false,
      note: "Qeet ID returns the grant path or denial reason on every check.",
    },

    // ---- Deployment ----
    {
      section: "Deployment",
      feature: "Open-source core",
      qeetid: "MIT",
      competitor: "MIT",
      note: "Both ship a permissively MIT-licensed core.",
    },
    {
      section: "Deployment",
      feature: "Self-host first-class",
      qeetid: true,
      competitor: true,
      note: "Both self-host well; Authentik is fully GA, Qeet ID is pre-GA.",
    },
    {
      section: "Deployment",
      feature: "First-party managed cloud (SaaS)",
      qeetid: true,
      competitor: false,
      note: "Authentik states it does not currently offer a hosted version — self-host only.",
    },

    // ---- Pricing ----
    {
      section: "Pricing",
      feature: "Self-host cost",
      qeetid: "Free (MIT)",
      competitor: "Free (MIT core)",
    },
    {
      section: "Pricing",
      feature: "Enterprise self-host license",
      qeetid: "N/A (self-host free)",
      competitor: "$5 internal + $0.02 external / user / mo",
      note: "Authentik gates provisioning sync, enhanced audit, and mTLS behind a paid Enterprise self-host license.",
    },
    {
      section: "Pricing",
      feature: "Managed cloud free tier",
      qeetid: "25,000 MAU",
      competitor: "No SaaS",
    },

    // ---- Security & audit ----
    {
      section: "Security & audit",
      feature: "Tamper-evident hash-chained audit log + /verify",
      qeetid: true,
      competitor: false,
      note: "Authentik logs events (enhanced audit + CSV export are Enterprise-gated), but there is no hash-chained integrity endpoint.",
    },
    {
      section: "Security & audit",
      feature: "Breached-password rejection (HIBP)",
      qeetid: true,
      competitor: true,
      note: "Both can reject breached passwords via a HaveIBeenPwned policy.",
    },

    // ---- Compliance ----
    {
      section: "Compliance",
      feature: "GDPR erasure / data export",
      qeetid: true,
      competitor: true,
    },
    {
      section: "Compliance",
      feature: "Managed-cloud SOC 2 Type II / ISO 27001",
      qeetid: "Roadmap (pre-GA)",
      competitor: "No SaaS",
      note: "Authentik has no first-party cloud to certify; certification is on you when you self-host either project.",
    },

    // ---- Developer experience ----
    {
      section: "Developer experience",
      feature: "CIAM-focused hosted login + prebuilt UI",
      qeetid: true,
      competitor: "partial",
      note: "Authentik is more an IdP / SSO gateway than a customer-facing CIAM; its flow pages are themeable but not a drop-in component kit. Qeet ID's React component kit is in progress.",
    },
    {
      section: "Developer experience",
      feature: "First-party typed SDKs",
      qeetid: "React · Node · Go",
      competitor: "partial",
      note: "Authentik generates API clients but has no first-party typed app SDKs for embedding auth.",
    },
    {
      section: "Developer experience",
      feature: "Native admin dashboard",
      qeetid: true,
      competitor: true,
      note: "Both ship an admin UI; Authentik's is built around flows and providers.",
    },
  ],
  cta: {
    headline: "MIT identity, built for your customers",
    subhead:
      "Self-host the MIT core, or start free on our managed cloud up to 25,000 MAU. If you need Authentik's LDAP / RADIUS / proxy breadth for internal SSO, it is an excellent choice.",
  },
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
