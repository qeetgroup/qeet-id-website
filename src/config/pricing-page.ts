/**
 * /pricing — the page's own words. The plans, prices, features and questions
 * are lib/pricing (plans.ts follows the billing service's catalogue on
 * qeet-id-server `develop`, internal/operations/billing/plans.go; the owner
 * decided the catalogue is the plan source, QTID-348).
 */
export const PRICING_PAGE = {
  meta: {
    title: "Pricing",
    description:
      "Free up to 10,000 monthly active users, then Starter and Pro by the month or the year, and Enterprise by contract — single sign-on from Pro, with no charge per connection.",
  },
  kicker: "Pricing",
  title: ["Every price on the page.", "No charge per connection."],
  lede: "Free up to 10,000 monthly active users, then Starter and Pro by the month or the year, and Enterprise by contract. Single sign-on comes with Pro.",
  /** STATUS (config/home.ts): in development, 1.0 planned for 1 February 2027 — the prices are 1.0's */
  status:
    "Qeet ID is in development. These are the plans and prices planned for 1.0, on 1 February 2027.",

  period: {
    label: "Billing period",
    monthly: "Monthly",
    yearly: "Yearly",
    saving: "Two months free",
  },

  /**
   * Until production runs, no plan can be signed up for (decided 2026-10-29:
   * "Read the docs" + "Talk to us"). The plans' own sign-up targets stay in
   * lib/pricing for when it does.
   */
  cta: {
    free: { label: "Read the docs" },
    paid: { label: "Talk to us", href: "/contact" },
  },

  /** tax.go: catalogue prices are net, India GST added on top; plans.go: seven currencies */
  notes: [
    "Prices are before tax. In India, GST is added and shown on the invoice.",
    "Also priced in US dollars, euros, pounds, yen, and Australian and Canadian dollars.",
  ],

  calculator: {
    kicker: "Calculator",
    title: ["How many people", "sign in each month?"],
    label: "Monthly active users",
    fits: "fits",
    /** plans.go: Pro "Up to 100,000 MAU (then metered)"; no metered rate is published */
    above:
      "Above 100,000, Pro is metered and Enterprise is set by contract — talk to us for the figure.",
    perMonth: "a month",
    yearly: "or {price} a year, billed yearly",
  },

  compare: {
    kicker: "Compare",
    title: ["Every feature,", "on every plan."],
    lede: "The whole table — what each plan includes, what is limited, and what is not in 1.0, said so on its row.",
    beta: "Beta",
    roadmap: "Not in 1.0",
  },

  faq: { kicker: "Questions", title: ["Pricing,", "answered."] },

  /** plans.ts Enterprise highlights (catalogue: unlimited MAU, SCIM & LDAP, SSO enforcement, named CSM) */
  enterprise: {
    title: ["Enterprise is", "a conversation."],
    body: "Unlimited monthly active users, SCIM and LDAP directory sync, single sign-on and MFA enforcement, an admin portal for your customers' IT, custom retention with SIEM streaming, and a named customer success manager.",
  },
} as const;
