/**
 * Website adapter that resolves a plan's semantic CTA target to a real route.
 * This is the ONLY place in the pricing model that knows about site URLs, so
 * the core config (`./plans`) stays portable and routing stays centralised
 * (§25/§26). Free/paid CTAs deep-link to the console's sign-up (paid plans
 * preselect the tier via `?plan=`); Enterprise routes to the contact/sales page.
 */

import { SIGN_UP_URL } from "@/lib/links";
import type { PricingPlan } from "./types";

/** Route the sales/contact CTA points at. */
export const CONTACT_SALES_HREF = "/contact";

/** Resolve the destination href for a plan's CTA. */
export function resolvePlanCtaHref(plan: PricingPlan): string {
  switch (plan.cta.target) {
    case "signup":
      return SIGN_UP_URL;
    case "signup-plan":
      return `${SIGN_UP_URL}?plan=${plan.id}`;
    case "contact":
      return CONTACT_SALES_HREF;
  }
}
