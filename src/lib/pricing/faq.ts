/**
 * Pricing FAQ — mirrors the visible accordion and the FAQPage JSON-LD (§14).
 * Wording stays neutral and policy-light where billing rules aren't finalised,
 * and never promises capabilities Qeet ID doesn't ship.
 */

import { ANNUAL_SAVINGS_RATE } from "./plans";
import type { PricingFaq } from "./types";

const annualPct = Math.round(ANNUAL_SAVINGS_RATE * 100);

export const pricingFaqs: PricingFaq[] = [
  {
    q: "What counts as a monthly active user (MAU)?",
    a: "A unique end-user who signs in or refreshes an active session within a calendar month. Machine-to-machine tokens and service accounts are not counted as MAU.",
  },
  {
    q: "What happens if I exceed my plan's MAU?",
    a: "We'll notify you as you approach your limit and help you move to the plan that fits. We won't cut off your users without warning — reach out and we'll size the right tier with you.",
  },
  {
    q: "Can I upgrade or downgrade anytime?",
    a: "Yes. Upgrades take effect immediately; downgrades apply at the start of your next billing cycle so you keep what you've paid for.",
  },
  {
    q: "Is annual billing available?",
    a: `Yes — pay annually on Starter, Growth or Pro and save about ${annualPct}% versus paying monthly (two months free). Enterprise is billed on an annual contract sized to your needs.`,
  },
  {
    q: "Do unused MAUs roll over?",
    a: "No. MAU allowances reset each calendar month and unused capacity doesn't carry forward.",
  },
  {
    q: "What's included in the Free plan?",
    a: "Passkeys, social and password sign-in, magic links and TOTP MFA, one organization with role-based access, the REST API and OIDC, plus our SDKs — enough to build and ship a real integration. No credit card required.",
  },
  {
    q: "What's included in Enterprise?",
    a: "Custom-scale MAU, SCIM and LDAP directory sync, SSO/MFA enforcement, BYOK, self-hosting or a dedicated tenant, custom audit retention with SIEM streaming, and dedicated support with a named CSM and a custom SLA. Terms are set per contract.",
  },
  {
    q: "Do you offer startup or open-source pricing?",
    a: "Yes. Early-stage startups and verified open-source projects can qualify for discounted or sponsored plans — get in touch and tell us about your project.",
  },
  {
    q: "How does enterprise SSO work?",
    a: "Qeet ID is a SAML 2.0 provider and an OpenID Connect provider. SSO is included from Growth (OIDC) and Pro (SAML + OIDC) — there's no separate 'SSO tax' tier just to connect an identity provider.",
  },
  {
    q: "Can I purchase add-ons?",
    a: "Yes. Add-ons such as SCIM, extra environments, advanced audit/SIEM and additional MAU can attach to paid plans. Pricing is quoted per add-on — contact us to enable one.",
  },
  {
    q: "Are organizations billed separately?",
    a: "No. Organizations are part of your plan (one on Free, unlimited on paid plans). You're billed on MAU, not on how you structure teams and tenants.",
  },
  {
    q: "How are machine identities billed?",
    a: "Service accounts and AI-agent identities authenticate machine-to-machine and don't count toward MAU. High-volume workloads can add capacity via an add-on.",
  },
  {
    q: "Can I migrate from another identity provider?",
    a: "Yes. Bulk user import supports migrations from providers like Auth0, Cognito and Azure AD B2C, and our team can help plan a zero-downtime cutover on paid plans.",
  },
];
