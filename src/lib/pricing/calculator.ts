/**
 * Pricing calculator logic — a *plan recommender*, not a metered-bill estimator.
 * Qeet ID does not bill paid-tier overages today, so we deliberately avoid
 * fabricating per-MAU math: given an expected MAU, we return the smallest plan
 * whose allowance covers it (Enterprise for anything above the largest plan).
 *
 * All functions here are pure and framework-free so they can be unit-tested and
 * reused by the console/estimator later. Plan thresholds are derived from
 * {@link plans}, so changing a plan's MAU automatically re-buckets the slider.
 */

import { getPlan, plans } from "./plans";
import type { PlanId, PricingPlan } from "./types";

/** Slider bounds. A log scale keeps each order of magnitude equally spaced. */
export const MIN_MAU = 100;
export const MAX_MAU = 1_000_000;

const LOG_SPAN = Math.log10(MAX_MAU / MIN_MAU);

/** Map a 0–100 slider position to a MAU value on the log scale. */
export function sliderToMau(position: number): number {
  return MIN_MAU * 10 ** ((position / 100) * LOG_SPAN);
}

/** Inverse of {@link sliderToMau}: map a MAU value back to a 0–100 position. */
export function mauToSlider(mau: number): number {
  if (mau <= MIN_MAU) return 0;
  if (mau >= MAX_MAU) return 100;
  return (Math.log10(mau / MIN_MAU) / LOG_SPAN) * 100;
}

/** Round to two significant figures so the read-out doesn't flicker on scrub. */
export function roundFriendly(n: number): number {
  if (n < 100) return Math.round(n);
  const order = Math.floor(Math.log10(n));
  const step = 10 ** Math.max(0, order - 1);
  return Math.round(n / step) * step;
}

/** Clamp a MAU value to the supported slider range. */
export function clampMau(mau: number): number {
  return Math.max(MIN_MAU, Math.min(MAX_MAU, mau));
}

/**
 * The recommended plan id for an expected MAU: the first plan (in ascending
 * order) whose allowance covers it, else `"enterprise"` for custom/high scale.
 */
export function recommendPlanId(mau: number): PlanId {
  for (const plan of plans) {
    if (plan.mau != null && mau <= plan.mau) return plan.id;
  }
  return "enterprise";
}

/** The recommended {@link PricingPlan} for an expected MAU. */
export function recommendPlan(mau: number): PricingPlan {
  return getPlan(recommendPlanId(mau));
}

/** Quick-pick presets shown under the slider (§12). */
export const MAU_PRESETS: { mau: number; label: string }[] = [
  { mau: 1_000, label: "1K" },
  { mau: 10_000, label: "10K" },
  { mau: 50_000, label: "50K" },
  { mau: 100_000, label: "100K" },
  { mau: 250_000, label: "250K" },
  { mau: 1_000_000, label: "1M+" },
];
