/**
 * Formatting helpers for the pricing domain — currency, counts and feature
 * values. Centralising these keeps the rupee symbol and locale grouping out of
 * every component (§28) and makes adding a currency a one-line change here.
 */

import type { CurrencyCode, FeatureAvailability, PlanFeatureValue } from "./types";

/** Locale used to group/format each currency. Add a row to support a currency. */
const CURRENCY_LOCALE: Record<CurrencyCode, string> = {
  INR: "en-IN",
  USD: "en-US",
  EUR: "en-IE",
};

/** The launch currency. All plan prices are authored in this currency today. */
export const DEFAULT_CURRENCY: CurrencyCode = "INR";

type FormatCurrencyOptions = {
  currency?: CurrencyCode;
  /** Show paise/cents. Defaults to 0 (whole-rupee list prices). */
  maximumFractionDigits?: number;
};

/**
 * Format a monetary amount with the correct symbol and locale grouping, e.g.
 * `formatCurrency(2400)` → `"₹2,400"`. Uses `Intl.NumberFormat` so grouping and
 * symbol placement follow the currency's locale rather than being hard-coded.
 */
export function formatCurrency(amount: number, options: FormatCurrencyOptions = {}): string {
  const currency = options.currency ?? DEFAULT_CURRENCY;
  return new Intl.NumberFormat(CURRENCY_LOCALE[currency], {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
  }).format(amount);
}

/**
 * Format a plain count (MAU, requests, …) with `en-US` grouping so numbers read
 * the same to an international developer audience regardless of currency locale,
 * e.g. `formatCount(100000)` → `"100,000"`.
 */
export function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

/**
 * Compact count for tight UI (slider ticks, calculator presets), e.g.
 * `formatCompactCount(50000)` → `"50K"`, `formatCompactCount(1000000)` → `"1M"`.
 */
export function formatCompactCount(n: number): string {
  if (n >= 1_000_000) return `${trimZero(n / 1_000_000)}M`;
  if (n >= 1_000) return `${trimZero(n / 1_000)}K`;
  return `${n}`;
}

function trimZero(n: number): string {
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
}

/** Normalise a {@link PlanFeatureValue} to `{ status, label? }` for rendering. */
export function resolveFeatureValue(value: PlanFeatureValue): {
  status: FeatureAvailability;
  label?: string;
} {
  return typeof value === "string" ? { status: value } : value;
}

/** Human-readable, screen-reader-friendly wording for each availability status. */
export const AVAILABILITY_LABEL: Record<FeatureAvailability, string> = {
  included: "Included",
  limited: "Limited",
  "add-on": "Available as an add-on",
  custom: "Custom",
  unavailable: "Not included",
};
