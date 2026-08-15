/**
 * Lightweight, vendor-agnostic analytics shim.
 *
 * The marketing site ships no analytics vendor today, and we don't want to add
 * one (§20 — don't introduce a new vendor unless necessary). This helper gives
 * components a single, typed `track()` seam so meaningful interactions are
 * instrumented now and a real destination can be wired later by editing only
 * this file. It is safe on the server (no-op) and never throws.
 *
 * When something IS wired up, it can either:
 *   - read `window.dataLayer` (GTM), which we push to, or
 *   - listen for the `qeet:analytics` CustomEvent we dispatch.
 */

export type AnalyticsEvent =
  | "pricing_page_view"
  | "pricing_billing_toggle"
  | "pricing_plan_cta_click"
  | "pricing_comparison_expand"
  | "pricing_calculator_interaction"
  | "enterprise_contact_click";

type AnalyticsProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/** Record an analytics event. No-ops on the server; never throws. */
export function track(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  if (typeof window === "undefined") return;
  const payload = { event, ...props };
  try {
    window.dataLayer?.push(payload);
    window.dispatchEvent(new CustomEvent("qeet:analytics", { detail: payload }));
  } catch {
    // Analytics must never break the UI.
  }
}
