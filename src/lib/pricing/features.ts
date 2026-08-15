/**
 * The feature comparison matrix — grouped by product area, one authoritative
 * source for both the comparison table and any per-plan feature lists.
 *
 * Availability is cross-checked against the Qeet ID server's implemented
 * capabilities (see `qeet-id-server` — authentication, federation, developer,
 * operations contexts + the entitlements catalog). We deliberately DO NOT list
 * capabilities that aren't implemented (e.g. data residency) or claim
 * certifications we don't hold (SOC 2 / ISO 27001 are evidence-tooling +
 * in-progress audits, surfaced as such — never "certified"). Tier *placement*
 * of implemented features is a commercial decision; feature *existence* is not.
 */

import type { PlanFeatureValue, PlanId, PricingFeatureGroup } from "./types";

/** Terse row builder: values in plan order (free → enterprise). */
function v(
  free: PlanFeatureValue,
  starter: PlanFeatureValue,
  growth: PlanFeatureValue,
  pro: PlanFeatureValue,
  enterprise: PlanFeatureValue,
): Record<PlanId, PlanFeatureValue> {
  return { free, starter, growth, pro, enterprise };
}

export const featureGroups: PricingFeatureGroup[] = [
  {
    id: "authentication",
    title: "Authentication",
    summary: "Every way your users sign in — passwordless-first, phishing-resistant by default.",
    features: [
      {
        id: "email-password",
        category: "authentication",
        name: "Email & password",
        description: "Argon2id hashing with breached-password (HIBP) checks and lockout.",
        values: v("included", "included", "included", "included", "included"),
      },
      {
        id: "passwordless",
        category: "authentication",
        name: "Passwordless & magic links",
        values: v("included", "included", "included", "included", "included"),
      },
      {
        id: "social",
        category: "authentication",
        name: "Social login",
        description: "Google, GitHub, Microsoft, Apple and any custom OIDC provider.",
        values: v("included", "included", "included", "included", "included"),
      },
      {
        id: "passkeys",
        category: "authentication",
        name: "Passkeys / WebAuthn",
        description: "FIDO2 passkeys for passwordless sign-in and step-up.",
        values: v("included", "included", "included", "included", "included"),
      },
      {
        id: "mfa",
        category: "authentication",
        name: "Multi-factor auth",
        description: "TOTP, email & SMS OTP, push, and recovery codes.",
        values: v(
          { status: "limited", label: "TOTP · email OTP" },
          "included",
          "included",
          "included",
          "included",
        ),
      },
      {
        id: "sms-push-otp",
        category: "authentication",
        name: "SMS & push OTP",
        values: v("unavailable", "included", "included", "included", "included"),
      },
      {
        id: "adaptive-mfa",
        category: "authentication",
        name: "Adaptive / risk-based MFA",
        description: "Step-up driven by device reputation and impossible-travel signals.",
        values: v("unavailable", { status: "limited" }, "included", "included", "included"),
      },
      {
        id: "account-recovery",
        category: "authentication",
        name: "Account recovery",
        values: v("included", "included", "included", "included", "included"),
      },
    ],
  },
  {
    id: "identity",
    title: "Identity",
    summary: "Users, organizations and fine-grained authorization for B2B and B2C.",
    features: [
      {
        id: "user-management",
        category: "identity",
        name: "User management",
        values: v("included", "included", "included", "included", "included"),
      },
      {
        id: "organizations",
        category: "identity",
        name: "Organizations",
        values: v(
          { status: "limited", label: "1 org" },
          { status: "included", label: "Unlimited" },
          { status: "included", label: "Unlimited" },
          { status: "included", label: "Unlimited" },
          { status: "included", label: "Unlimited" },
        ),
      },
      {
        id: "groups",
        category: "identity",
        name: "Groups",
        values: v("unavailable", "included", "included", "included", "included"),
      },
      {
        id: "rbac",
        category: "identity",
        name: "Roles & permissions (RBAC)",
        values: v(
          { status: "limited", label: "3 roles" },
          { status: "included", label: "Unlimited" },
          { status: "included", label: "Unlimited" },
          { status: "included", label: "Unlimited" },
          { status: "included", label: "Unlimited" },
        ),
      },
      {
        id: "abac-rebac",
        category: "identity",
        name: "ABAC & ReBAC policies",
        description: "Attribute- and relationship-based access with explainable decisions.",
        values: v("unavailable", "unavailable", "included", "included", "included"),
      },
      {
        id: "invitations",
        category: "identity",
        name: "Invitations",
        values: v(
          { status: "limited", label: "5 seats" },
          "included",
          "included",
          "included",
          "included",
        ),
      },
      {
        id: "domain-verification",
        category: "identity",
        name: "Domain verification",
        values: v("unavailable", "included", "included", "included", "included"),
      },
      {
        id: "branding",
        category: "identity",
        name: "Custom branding & profiles",
        values: v("unavailable", "included", "included", "included", "included"),
      },
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise",
    summary: "Federation and provisioning for large organizations — no artificial SSO tax.",
    features: [
      {
        id: "oidc",
        category: "enterprise",
        name: "OIDC provider",
        description: "Qeet ID is a standards-compliant OpenID Connect provider on every plan.",
        values: v("included", "included", "included", "included", "included"),
      },
      {
        id: "sso",
        category: "enterprise",
        name: "Single sign-on (SSO)",
        values: v(
          "unavailable",
          "unavailable",
          { status: "limited", label: "OIDC" },
          "included",
          "included",
        ),
      },
      {
        id: "saml",
        category: "enterprise",
        name: "SAML 2.0",
        values: v("unavailable", "unavailable", "unavailable", "included", "included"),
      },
      {
        id: "scim",
        category: "enterprise",
        name: "SCIM provisioning",
        values: v("unavailable", "unavailable", "unavailable", "add-on", "included"),
      },
      {
        id: "directory-sync",
        category: "enterprise",
        name: "Directory sync (LDAP / AD)",
        values: v("unavailable", "unavailable", "unavailable", "unavailable", "included"),
      },
      {
        id: "enterprise-connections",
        category: "enterprise",
        name: "Enterprise connections & Admin Portal",
        values: v(
          "unavailable",
          "unavailable",
          "unavailable",
          { status: "limited", label: "Self-serve" },
          "included",
        ),
      },
      {
        id: "custom-domains",
        category: "enterprise",
        name: "Custom domains",
        values: v("unavailable", "included", "included", "included", "included"),
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    summary: "Hardened by default: hash-chained audit, threat signals and enterprise key control.",
    features: [
      {
        id: "sessions",
        category: "security",
        name: "Session management",
        description: "Refresh-token rotation with theft detection and cluster-wide revocation.",
        values: v("included", "included", "included", "included", "included"),
      },
      {
        id: "device-controls",
        category: "security",
        name: "Device & session controls",
        values: v({ status: "limited" }, "included", "included", "included", "included"),
      },
      {
        id: "threat-detection",
        category: "security",
        name: "Threat & risk detection",
        values: v("unavailable", { status: "limited" }, "included", "included", "included"),
      },
      {
        id: "security-policies",
        category: "security",
        name: "Security policies (IP allow/deny)",
        values: v("unavailable", "unavailable", { status: "limited" }, "included", "included"),
      },
      {
        id: "audit-logs",
        category: "security",
        name: "Audit logs",
        description: "Append-only, SHA-256 hash-chained with a tamper-evident /verify endpoint.",
        values: v(
          { status: "limited", label: "7-day" },
          { status: "included", label: "30-day" },
          { status: "included", label: "90-day" },
          { status: "included", label: "90-day + export" },
          { status: "custom", label: "Custom + SIEM" },
        ),
      },
      {
        id: "token-management",
        category: "security",
        name: "Token management (ES256 · JWKS)",
        values: v("included", "included", "included", "included", "included"),
      },
      {
        id: "secrets-vault",
        category: "security",
        name: "Encrypted secrets & token vault",
        values: v("unavailable", "included", "included", "included", "included"),
      },
      {
        id: "byok",
        category: "security",
        name: "BYOK (bring your own key)",
        description: "Envelope encryption via AWS KMS for the secrets and token vault.",
        values: v("unavailable", "unavailable", "unavailable", "unavailable", "included"),
      },
    ],
  },
  {
    id: "developer",
    title: "Developer platform",
    summary: "APIs, webhooks, SDKs and machine identities — built for engineers first.",
    features: [
      {
        id: "rest-api",
        category: "developer",
        name: "REST API & OpenAPI 3.1",
        values: v("included", "included", "included", "included", "included"),
      },
      {
        id: "oauth",
        category: "developer",
        name: "OAuth 2.0 grants",
        description: "auth code + PKCE, client credentials, token exchange, device & CIBA.",
        values: v("included", "included", "included", "included", "included"),
      },
      {
        id: "sdks",
        category: "developer",
        name: "SDKs (React · Next.js · Go · Node · Python)",
        values: v("included", "included", "included", "included", "included"),
      },
      {
        id: "api-keys",
        category: "developer",
        name: "API keys",
        values: v(
          { status: "limited", label: "2 keys" },
          { status: "included", label: "Unlimited" },
          { status: "included", label: "Unlimited" },
          { status: "included", label: "Unlimited" },
          { status: "included", label: "Unlimited" },
        ),
      },
      {
        id: "webhooks",
        category: "developer",
        name: "Webhooks (HMAC-signed)",
        values: v("unavailable", "included", "included", "included", "included"),
      },
      {
        id: "machine-identities",
        category: "developer",
        name: "Service accounts (M2M)",
        values: v({ status: "limited" }, "included", "included", "included", "included"),
      },
      {
        id: "agent-identities",
        category: "developer",
        name: "AI-agent identities",
        description: "Ephemeral, scoped tokens for agents with a lifecycle kill-switch.",
        values: v("unavailable", "unavailable", "included", "included", "included"),
      },
      {
        id: "auth-hooks",
        category: "developer",
        name: "Auth hooks / Actions",
        values: v("unavailable", "unavailable", "included", "included", "included"),
      },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    summary: "Insight, compliance and support to run identity in production.",
    features: [
      {
        id: "analytics",
        category: "operations",
        name: "Analytics & dashboards",
        description: "MAU/DAU, login funnels and MFA-adoption insights.",
        values: v({ status: "limited" }, "included", "included", "included", "included"),
      },
      {
        id: "monitoring",
        category: "operations",
        name: "Monitoring & metrics (OTel)",
        values: v({ status: "limited" }, "included", "included", "included", "included"),
      },
      {
        id: "gdpr",
        category: "operations",
        name: "GDPR tools (export & erasure)",
        values: v("included", "included", "included", "included", "included"),
      },
      {
        id: "siem",
        category: "operations",
        name: "SIEM log streaming",
        values: v("unavailable", "unavailable", "unavailable", "add-on", "included"),
      },
      {
        id: "compliance-evidence",
        category: "operations",
        name: "Compliance evidence (SOC 2 · ISO 27001)",
        description: "Live control-state evidence export. Independent audits are in progress.",
        maturity: "beta",
        values: v(
          "unavailable",
          "unavailable",
          "unavailable",
          { status: "limited" },
          { status: "custom" },
        ),
      },
      {
        id: "support",
        category: "operations",
        name: "Support",
        values: v(
          { status: "included", label: "Community" },
          { status: "included", label: "Standard" },
          { status: "included", label: "Priority" },
          { status: "included", label: "Priority" },
          { status: "custom", label: "Dedicated + CSM" },
        ),
      },
      {
        id: "sla",
        category: "operations",
        name: "Uptime SLA",
        values: v("unavailable", "unavailable", "unavailable", "unavailable", {
          status: "custom",
          label: "Custom SLA",
        }),
      },
      {
        id: "onboarding",
        category: "operations",
        name: "Enterprise onboarding",
        values: v("unavailable", "unavailable", "unavailable", "unavailable", {
          status: "custom",
          label: "White-glove",
        }),
      },
    ],
  },
];

/** Flattened list of every feature row (useful for tests and lookups). */
export const allFeatures = featureGroups.flatMap((g) => g.features);
