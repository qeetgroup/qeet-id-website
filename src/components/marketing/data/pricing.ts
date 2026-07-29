import { SIGN_UP_URL } from "@/lib/links";

/**
 * Shared pricing tiers — the single source of truth for both the full
 * `/pricing` page and the condensed homepage Pricing section.
 */
export type PricingTier = {
  name: string;
  description: string;
  price: string;
  period: string;
  cta: { label: string; href: string };
  featured?: boolean;
  features: string[];
};

export const tiers: PricingTier[] = [
  {
    name: "Free",
    description: "For prototypes and early projects.",
    price: "₹0",
    period: "forever",
    cta: { label: "Start free", href: SIGN_UP_URL },
    features: [
      "Up to 10,000 monthly active users",
      "Passkeys, social & password login",
      "Email magic links & TOTP MFA",
      "1 organization · RBAC (3 roles)",
      "7-day audit log",
      "Community support",
    ],
  },
  {
    name: "Starter",
    description: "For teams shipping to production.",
    price: "₹2,400",
    period: "/ month",
    cta: { label: "Start 14-day trial", href: `${SIGN_UP_URL}?plan=starter` },
    features: [
      "Up to 25,000 MAU",
      "All MFA methods (SMS, email, passkey)",
      "Custom branding & 1 custom domain",
      "Webhooks · 30-day audit log",
      "Email support, 48h SLA",
      "99.9% uptime SLA",
    ],
  },
  {
    name: "Pro",
    description: "For scaling B2B/B2C — no SSO tax.",
    price: "₹8,000",
    period: "/ month + usage",
    cta: { label: "Start 14-day trial", href: `${SIGN_UP_URL}?plan=pro` },
    featured: true,
    features: [
      "Up to 100,000 MAU included, then metered",
      "Enterprise SSO — SAML & OIDC included",
      "RBAC + ABAC & advanced threat protection",
      "Audit export · 90-day retention",
      "AI Copilot · priority + chat support",
      "99.95% uptime SLA",
    ],
  },
  {
    name: "Enterprise",
    description: "Governance & compliance for large orgs.",
    price: "Custom",
    period: "annual contract",
    cta: { label: "Talk to sales", href: "/contact" },
    features: [
      "Unlimited MAU & organizations",
      "SCIM & LDAP directory sync",
      "SSO/MFA enforcement + conditional access",
      "BYOK, data residency & dedicated tenant",
      "SOC 2 Type II, ISO 27001, HIPAA BAA",
      "99.99% SLA · named CSM + onboarding",
    ],
  },
];
