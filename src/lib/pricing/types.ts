/**
 * Qeet ID pricing domain model — types.
 *
 * This module is intentionally framework-agnostic and side-effect free (no JSX,
 * no Next.js imports, no `@/lib/links`). It is the single authoritative shape
 * for Qeet ID pricing and is designed to be lifted into a shared package later
 * so the website, console, docs, checkout and a future billing service can all
 * consume one definition. Website-specific concerns (resolving a CTA to a real
 * URL) live in `./cta`, not here.
 */

/** ISO-4217 currency code. INR is the launch currency; the list is the set we
 *  are prepared to format, not a promise that all are live. */
export type CurrencyCode = "INR" | "USD" | "EUR";

/** How a plan is billed. `yearly` may be `null` in {@link PlanPrice} until an
 *  annual list price is finalised — the UI degrades gracefully in that case. */
export type BillingPeriod = "monthly" | "yearly";

/** Stable identifiers for the five public plans. Kept as a string union so the
 *  per-plan records below are exhaustively type-checked. */
export type PlanId = "free" | "starter" | "growth" | "pro" | "enterprise";

/** The full, ordered list of public plan ids (source of truth for iteration). */
export const PLAN_IDS = ["free", "starter", "growth", "pro", "enterprise"] as const;

/**
 * Availability of a capability on a given plan. Richer than a boolean so the UI
 * can communicate the real commercial shape of each feature:
 *
 *  - `included`     — fully available on the plan.
 *  - `limited`      — available with caps/reduced scope (pair with a label).
 *  - `add-on`       — not bundled; can be purchased separately.
 *  - `custom`       — scoped per contract (Enterprise).
 *  - `unavailable`  — not offered on the plan.
 */
export type FeatureAvailability = "included" | "limited" | "add-on" | "custom" | "unavailable";

/**
 * A plan's value for one feature row. Either a bare {@link FeatureAvailability}
 * status, or a status plus a short qualifier the table renders instead of an
 * icon (e.g. `"90 days"`, `"3 roles"`, `"OIDC only"`). Use {@link resolveFeatureValue}
 * to normalise before rendering.
 */
export type PlanFeatureValue =
  | FeatureAvailability
  | { status: FeatureAvailability; label?: string };

/** Product areas the comparison table groups features under. */
export type FeatureCategory =
  | "authentication"
  | "identity"
  | "enterprise"
  | "security"
  | "developer"
  | "operations";

/**
 * Maturity of a capability relative to launch. Lets the config carry planned
 * work without over-promising: `roadmap`/`beta` rows can be labelled or hidden
 * so the public pricing promise only reflects what actually ships.
 */
export type FeatureMaturity = "ga" | "beta" | "roadmap";

/** One capability row in the comparison table. */
export type PricingFeature = {
  id: string;
  category: FeatureCategory;
  /** Short label shown in the row header. */
  name: string;
  /** Optional one-line help text (rendered in a tooltip / expandable note). */
  description?: string;
  /** Availability per plan. Exhaustive over {@link PlanId}. */
  values: Record<PlanId, PlanFeatureValue>;
  /** Defaults to `"ga"`. Non-GA rows are annotated in the UI. */
  maturity?: FeatureMaturity;
};

/** A category heading + its ordered feature rows. */
export type PricingFeatureGroup = {
  id: FeatureCategory;
  title: string;
  /** One-line description of the category, shown under the heading. */
  summary: string;
  features: PricingFeature[];
};

/** A plan's price. `monthly`/`yearly` are amounts in the plan's `currency`;
 *  `null` means "not applicable" (custom pricing) or "not configured yet"
 *  (annual not finalised). `custom` flags Enterprise-style bespoke pricing. */
export type PlanPrice = {
  monthly: number | null;
  yearly: number | null;
  currency: CurrencyCode;
  custom?: boolean;
};

/**
 * A plan's call to action. `target` is a semantic route the website resolves to
 * a real URL in `./cta` — the portable config never hard-codes a host or path,
 * so routing stays centralised and the model stays portable.
 */
export type PlanCta = {
  label: string;
  target: "signup" | "signup-plan" | "contact";
};

/** One of the five public plans. */
export type PricingPlan = {
  id: PlanId;
  name: string;
  /** Positioning one-liner, e.g. "For products scaling their identity infra." */
  tagline: string;
  /** Who the plan is for (audience), e.g. "Startups in production." */
  audience: string;
  price: PlanPrice;
  /** Included monthly active users; `null` for custom/high-scale (Enterprise). */
  mau: number | null;
  /** Optional ribbon, e.g. "Most popular". */
  badge?: string;
  /** Emphasise this plan as the recommended path. */
  highlighted?: boolean;
  cta: PlanCta;
  /** 4–6 human-authored headline bullets shown on the card. */
  highlights: string[];
};

/**
 * A future billing dimension. Only `mau` is exposed publicly at launch; the
 * rest are declared so the architecture can meter/limit them later without a
 * redesign. `included` is the per-plan allowance (`null` = unlimited/custom).
 */
export type UsageDimensionId =
  | "mau"
  | "organizations"
  | "sso-connections"
  | "scim-connections"
  | "machine-identities"
  | "api-requests"
  | "webhook-deliveries"
  | "audit-retention-days"
  | "environments";

export type UsageDimension = {
  id: UsageDimensionId;
  label: string;
  unit: string;
  /** Whether this dimension is surfaced on the public pricing page at launch. */
  publicAtLaunch: boolean;
  included: Record<PlanId, number | null>;
};

/**
 * A purchasable add-on. Prices are intentionally omitted at launch (`price:
 * "custom"`); the shape exists so add-ons can be introduced by editing config
 * rather than rebuilding UI.
 */
export type AddOn = {
  id: string;
  name: string;
  description: string;
  /** `"custom"` until list pricing is finalised; otherwise a `PlanPrice`-like amount. */
  price: { custom: true } | { amount: number; currency: CurrencyCode; unit: string };
  /** Plans this add-on can attach to. */
  availableOn: PlanId[];
};

/** A pricing FAQ entry. Mirrors the visible accordion and the FAQ JSON-LD. */
export type PricingFaq = { q: string; a: string };
