/**
 * Presentation helper: turn a plan + billing period into the price strings a
 * card renders. Kept out of the components so both the homepage section and the
 * full pricing page format prices identically (§26/§28).
 */

import { formatCurrency } from "./format";
import { resolveAnnualTotal, resolveMonthlyEquivalent } from "./plans";
import type { BillingPeriod, PricingPlan } from "./types";

export type PriceDisplay = {
  /** Large headline amount, e.g. "₹2,400" or "Custom". */
  main: string;
  /** Trailing period suffix, e.g. "/month". Omitted for custom plans. */
  period?: string;
  /** Secondary line, e.g. "billed annually · ₹24,000/yr". */
  sub?: string;
  /** Full screen-reader sentence describing the price. */
  srLabel: string;
};

export function formatPlanPrice(plan: PricingPlan, period: BillingPeriod): PriceDisplay {
  const currency = plan.price.currency;

  if (plan.price.custom) {
    return { main: "Custom", srLabel: `${plan.name} plan: custom pricing` };
  }

  const monthlyEquivalent = resolveMonthlyEquivalent(plan, period) ?? 0;
  const main = formatCurrency(monthlyEquivalent, { currency });

  if (monthlyEquivalent === 0) {
    return { main, period: "/month", srLabel: `${plan.name} plan: free` };
  }

  if (period === "yearly") {
    const annual = resolveAnnualTotal(plan);
    const annualLabel = annual != null ? `${formatCurrency(annual, { currency })}/yr` : "";
    return {
      main,
      period: "/month",
      sub: annualLabel ? `billed annually · ${annualLabel}` : "billed annually",
      srLabel: `${plan.name} plan: ${main} per month, billed annually`,
    };
  }

  return { main, period: "/month", srLabel: `${plan.name} plan: ${main} per month` };
}
