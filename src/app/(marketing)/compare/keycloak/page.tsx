import type { Metadata } from "next";

import { type ComparisonData, ComparisonPage } from "@/components/marketing/comparison-page";

export const metadata: Metadata = {
  title: "Qeet ID vs. Keycloak",
  description:
    "How Qeet ID compares to Keycloak, the canonical open-source identity server: a lighter Go runtime, a first-party managed cloud, and modern DX — with an honest look at where Keycloak's maturity wins.",
  alternates: { canonical: "/compare/keycloak" },
};

const data: ComparisonData = {
  competitor: "Keycloak",
  competitorBlurb:
    "Keycloak is the canonical open-source identity and access server — CNCF-backed, battle-tested, and the most widely deployed self-hosted IdP there is. It genuinely beats Qeet ID on maturity, community, and protocol breadth (LDAP/Kerberos, fine-grained Authorization Services). Choose Qeet ID when you want a lightweight Go runtime, a first-party managed cloud, and a more modern developer experience.",
  pitch: {
    headline: "The open-source IdP, minus the JVM sprawl.",
    subhead:
      "Keycloak is the battle-tested, CNCF-backed open-source identity server — and it is genuinely more mature at self-hosting than we are. Qeet ID trades some of that maturity for a lighter Go runtime, a first-party managed cloud, and a modern developer experience.",
    bullets: [
      "A single Go binary + Postgres instead of a JVM / Quarkus deployment to tune.",
      "A first-party managed cloud, if you would rather not run it yourself.",
      "Tamper-evident hash-chained audit, typed SDKs, and a modern console out of the box.",
    ],
  },
  factsQeetid: [
    { label: "License", value: "MIT (open source)" },
    { label: "Self-host", value: "First-class" },
    { label: "Managed cloud", value: "EU / US" },
    { label: "Runtime", value: "Go + Postgres" },
    { label: "SDKs", value: "React · Node · Go" },
  ],
  factsCompetitor: [
    { label: "License", value: "Apache-2.0 (OSS)" },
    { label: "Self-host", value: "First-class (mature)" },
    { label: "Managed cloud", value: "None (Red Hat sub)" },
    { label: "Runtime", value: "JVM / Quarkus" },
    { label: "Community", value: "Very large" },
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
      feature: "Magic links",
      qeetid: true,
      competitor: "partial",
      note: "Keycloak has no native magic-link login; it relies on preview / community authenticators.",
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
      competitor: "partial",
      note: "Keycloak ships TOTP + WebAuthn and recovery codes; SMS / email OTP need custom or community authenticators.",
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
      competitor: "partial",
      note: "Keycloak has no native SCIM server; community extensions fill the gap.",
    },
    {
      section: "Federation",
      feature: "LDAP / Kerberos user federation",
      qeetid: false,
      competitor: true,
      note: "Keycloak federates directly to LDAP/AD and Kerberos out of the box; Qeet ID does not.",
    },

    // ---- Authorization ----
    {
      section: "Authorization",
      feature: "RBAC + single-call /check API",
      qeetid: true,
      competitor: true,
      note: "Keycloak exposes roles/groups; Qeet ID adds a single-call /check endpoint.",
    },
    {
      section: "Authorization",
      feature: "Fine-grained / ReBAC authorization",
      qeetid: "Roadmap",
      competitor: true,
      note: "Keycloak's Authorization Services (UMA 2.0) ship resource-level fine-grained permissions today; Qeet ID's ReBAC is planned.",
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
      competitor: "Apache-2.0",
      note: "Both are permissively licensed open source.",
    },
    {
      section: "Deployment",
      feature: "Self-host first-class",
      qeetid: true,
      competitor: true,
      note: "Keycloak is the canonical self-hosted IdP and fully mature; Qeet ID ships a single lightweight Go binary vs Keycloak's JVM / Quarkus footprint.",
    },
    {
      section: "Deployment",
      feature: "First-party managed cloud (SaaS)",
      qeetid: true,
      competitor: false,
      note: "The Keycloak project offers no hosted SaaS; the managed 'Red Hat build of Keycloak' needs a Red Hat subscription.",
    },

    // ---- Pricing ----
    {
      section: "Pricing",
      feature: "Self-host cost",
      qeetid: "Free (MIT)",
      competitor: "Free (Apache-2.0)",
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
      competitor: "partial",
      note: "Keycloak logs admin/login events, but they are not hash-chained or independently verifiable.",
    },
    {
      section: "Security & audit",
      feature: "Breached-password rejection (HIBP)",
      qeetid: true,
      competitor: false,
      note: "Keycloak enforces password policies but has no built-in HIBP breach check.",
    },
    {
      section: "Security & audit",
      feature: "Refresh-token theft detection",
      qeetid: true,
      competitor: "partial",
      note: "Keycloak supports refresh-token rotation / revocation; Qeet ID adds automatic reuse-detection.",
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
      note: "Keycloak has no first-party cloud to certify; certification is on you when you self-host either project.",
    },

    // ---- Developer experience ----
    {
      section: "Developer experience",
      feature: "Webhook events (HMAC + retries)",
      qeetid: true,
      competitor: "partial",
      note: "Keycloak has no native outbound webhooks; you build an event-listener SPI (or use community webhook extensions).",
    },
    {
      section: "Developer experience",
      feature: "First-party typed SDKs",
      qeetid: "React · Node · Go",
      competitor: "partial",
      note: "Keycloak ships keycloak-js + adapters; typed clients for other languages are largely community-maintained.",
    },
    {
      section: "Developer experience",
      feature: "Native admin dashboard",
      qeetid: true,
      competitor: true,
      note: "Keycloak's admin console is mature but JVM-heavy with a dated UX.",
    },
  ],
  cta: {
    headline: "Prefer a lighter IdP with a managed option?",
    subhead:
      "Run Qeet ID as a single Go binary on your own infrastructure, or start free on our hosted cloud. If Keycloak already fits your stack, honestly — keep it.",
  },
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
