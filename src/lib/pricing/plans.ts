/**
 * The five public Qeet ID plans — the authoritative launch configuration.
 *
 * Prices and MAU allowances live here and nowhere else; components read this
 * config so a price change is a one-line edit (see `docs/PRICING.md`). Feature
 * availability per plan lives in `./features`; usage dimensions in `./usage`.
 */

import type { BillingPeriod, PricingPlan } from "./types";

/**
 * Annual billing policy. We don't publish bespoke annual list prices yet, so
 * the yearly total is *derived* from the monthly price via a standard
 * commitment discount: pay for {@link ANNUAL_BILLED_MONTHS} months, get the
 * rest free. This is a real, conventional offer (not a fabricated markdown) and
 * is the single knob that controls annual savings site-wide. To publish an
 * explicit annual list price for a plan instead, set `price.yearly` on that
 * plan and {@link resolveAnnualTotal} will honour it.
 */
export const ANNUAL_BILLED_MONTHS = 10; // "2 months free" — the SaaS standard.

/** Fraction saved by paying annually, e.g. 0.1667 → "Save 17%". */
export const ANNUAL_SAVINGS_RATE = (12 - ANNUAL_BILLED_MONTHS) / 12;

export const plans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Start building with Qeet ID.",
    audience: "For developers and early experimentation.",
    price: { monthly: 0, yearly: 0, currency: "INR" },
    mau: 1_000,
    cta: { label: "Start building free", target: "signup" },
    highlights: [
      "1,000 monthly active users",
      "Passkeys, social & password sign-in",
      "Email magic links + TOTP MFA",
      "1 organization · RBAC with 3 roles",
      "REST API, OIDC & first-class SDKs",
      "Community support",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "For startups running production applications.",
    audience: "For startups and small production apps.",
    price: { monthly: 2_400, yearly: null, currency: "INR" },
    mau: 10_000,
    cta: { label: "Get started", target: "signup-plan" },
    highlights: [
      "10,000 monthly active users",
      "All MFA methods (passkey, TOTP, OTP)",
      "Unlimited organizations & roles",
      "Webhooks · 30-day audit log",
      "Custom branding + 1 custom domain",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For products scaling their identity infrastructure.",
    audience: "For growing SaaS companies.",
    price: { monthly: 5_000, yearly: null, currency: "INR" },
    mau: 50_000,
    badge: "Most popular",
    highlighted: true,
    cta: { label: "Get started", target: "signup-plan" },
    highlights: [
      "50,000 monthly active users",
      "Enterprise SSO (OIDC) — configurable",
      "RBAC + ABAC policy engine",
      "Adaptive threat protection",
      "90-day audit log + login analytics",
      "Priority support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For businesses with advanced identity and security needs.",
    audience: "For established businesses.",
    price: { monthly: 8_000, yearly: null, currency: "INR" },
    mau: 100_000,
    cta: { label: "Get started", target: "signup-plan" },
    highlights: [
      "100,000 monthly active users",
      "SAML & OIDC SSO included — no SSO tax",
      "Audit export · 90-day retention",
      "Session & device controls",
      "SCIM provisioning available",
      "Priority support & chat",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For organizations with security, governance and scale requirements.",
    audience: "For large and regulated organizations.",
    price: { monthly: null, yearly: null, currency: "INR", custom: true },
    mau: null,
    cta: { label: "Talk to sales", target: "contact" },
    highlights: [
      "Custom / high-scale MAU",
      "SCIM & LDAP directory sync included",
      "SSO/MFA enforcement & IP policies",
      "BYOK & self-hosting / dedicated tenant",
      "Custom retention + SIEM streaming",
      "Dedicated support, named CSM & SLA",
    ],
  },
];

/** Look up a plan by id. Throws in dev if the id is unknown (config drift). */
export function getPlan(id: PricingPlan["id"]): PricingPlan {
  const plan = plans.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan id: ${id}`);
  return plan;
}

/** The plan flagged as recommended (the "Most popular" / highlighted one). */
export function getHighlightedPlan(): PricingPlan | undefined {
  return plans.find((p) => p.highlighted);
}

/**
 * Total charge for a plan over one billing cycle in its currency, or `null` for
 * free/custom plans. Annual uses an explicit `price.yearly` when set, otherwise
 * derives it from {@link ANNUAL_BILLED_MONTHS}.
 */
export function resolvePeriodTotal(plan: PricingPlan, period: BillingPeriod): number | null {
  if (plan.price.custom) return null;
  if (period === "monthly") return plan.price.monthly;
  return resolveAnnualTotal(plan);
}

/** Annual total for a plan, honouring an explicit override when present. */
export function resolveAnnualTotal(plan: PricingPlan): number | null {
  if (plan.price.custom) return null;
  if (plan.price.yearly != null) return plan.price.yearly;
  if (plan.price.monthly == null) return null;
  return plan.price.monthly * ANNUAL_BILLED_MONTHS;
}

/**
 * The amount shown as the headline price for a period: the *monthly-equivalent*
 * so cards read "₹X / month" on both toggles (annual divides the yearly total
 * by 12). Returns `null` for custom plans and `0` for free.
 */
export function resolveMonthlyEquivalent(plan: PricingPlan, period: BillingPeriod): number | null {
  if (plan.price.custom) return null;
  if (period === "monthly") return plan.price.monthly;
  const annual = resolveAnnualTotal(plan);
  return annual == null ? null : Math.round(annual / 12);
}

/** True when at least one paid plan can actually be billed annually. Lets the
 *  UI hide the billing toggle entirely if annual is ever switched off. */
export function annualBillingAvailable(): boolean {
  return (
    ANNUAL_BILLED_MONTHS < 12 &&
    plans.some((p) => resolveAnnualTotal(p) != null && !p.price.custom && p.price.monthly)
  );
}
