/**
 * Pricing questions — every answer checked (2026-10-30) against the billing
 * service on qeet-id-server `develop` (internal/operations/billing: plans.go,
 * lifecycle.go, tax.go) and the product record. Removed as unsupported: a
 * startup / open-source offer, add-ons and "extra environments", MAU rollover
 * rules, upgrade timing, a no-cut-off promise and a "zero-downtime cutover".
 */

import { ANNUAL_BILLED_MONTHS } from "./plans";
import type { PricingFaq } from "./types";

export const pricingFaqs: PricingFaq[] = [
  {
    /** The site's definition — the billing service neither defines nor counts MAU yet (QTID-1050); quote the record once it does. */
    q: "What counts as a monthly active user?",
    a: "A person who signs in, or whose session is renewed, at least once in a calendar month. Machines — API keys and AI agents — are not counted.",
  },
  {
    /** plans.go: Pro "Up to 100,000 MAU (then metered)"; Enterprise "Unlimited MAU" */
    q: "What happens above a plan's allowance?",
    a: "Free and Starter move up a plan. Pro includes 100,000 monthly active users and is metered beyond that, and Enterprise is set by contract.",
  },
  {
    /** plans.go Pro: "Enterprise SSO — SAML & OIDC included"; "no SSO tax" */
    q: "Is single sign-on extra?",
    a: "No. SAML and OpenID Connect single sign-on come with Pro and Enterprise, with no charge per connection.",
  },
  {
    /** plans.go: starter_year and pro_year at 10× the monthly price; Free and Enterprise have none */
    q: "Can we pay yearly?",
    a: `Yes. Starter and Pro can be billed yearly at ${ANNUAL_BILLED_MONTHS} times the monthly price — two months free. Enterprise is set by contract.`,
  },
  {
    /** plans.go prices: USD, EUR, GBP, INR, JPY, AUD, CAD; tax.go: net prices, India GST added on top */
    q: "Which currencies, and what about tax?",
    a: "Plans are priced in rupees, US dollars, euros, pounds, yen, and Australian and Canadian dollars. Prices are before tax; in India, GST is added and shown on the invoice.",
  },
  {
    /** PRODUCT.md "Billing": Stripe (global) and Razorpay (India), webhook-verified */
    q: "How do we pay?",
    a: "Through Stripe, or through Razorpay in India.",
  },
  {
    /** lifecycle.go: a plan marked to cancel ends at its period end and the organisation moves to free */
    q: "What happens if we cancel?",
    a: "The plan runs to the end of the period already paid for, and the organisation then moves to Free.",
  },
  {
    /** FLOWS/tenant-management.md "IdP migration" */
    q: "Can we move from another provider?",
    a: "Yes. People are imported from Auth0, Amazon Cognito and Azure AD B2C export files. Passwords cannot come across, so imported people sign in with a passkey or a magic link, or set a password through a reset.",
  },
];
