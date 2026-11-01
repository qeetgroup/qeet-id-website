import { CAPABILITIES } from "@/config/capability-index";
import { API_REFERENCE_URL, DOCS_BASE_URL, DOCS_QUICKSTART_URL } from "@/lib/links";

/**
 * The header's destinations. Product opens a panel of the six capability
 * pages (its own href, /features, is the index they all belong to). Docs is
 * the primary action, so it is the button.
 */
export const PRIMARY_NAV = [
  { href: "/features", label: "Product", panel: true },
  { href: "/security", label: "Security" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const DOCS = { href: DOCS_BASE_URL, label: "Read the docs" } as const;

/** The Product panel: one line to set the scene, the six pages, and the index. */
export const PRODUCT_PANEL = {
  statement: "Six capabilities, one identity — each decided on the server.",
  all: { href: "/features", label: "All features" },
  migrate: { href: "/migrate", label: "Migrate to Qeet ID" },
} as const;

/** The footer's columns. Retired pages (customers, status, changelog) are gone; careers is the group's. */
export const FOOTER_COLUMNS = [
  {
    heading: "Product",
    items: [
      { label: "All features", href: "/features" },
      { label: "Migrate", href: "/migrate" },
      { label: "Compare", href: "/compare" },
      ...CAPABILITIES.map((c) => ({ label: c.name, href: `/product/${c.slug}` })),
      { label: "Security", href: "/security" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Developers",
    items: [
      { label: "Documentation", href: DOCS_BASE_URL },
      { label: "Quickstart", href: DOCS_QUICKSTART_URL },
      { label: "API reference", href: API_REFERENCE_URL },
      { label: "GitHub", href: "https://github.com/qeetgroup" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "https://qeet.in/careers" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { label: "Terms", href: "/legal/terms" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "DPA", href: "/legal/dpa" },
      { label: "Subprocessors", href: "/legal/subprocessors" },
    ],
  },
  {
    heading: "Qeet Group",
    items: [
      { label: "qeet.in", href: "https://qeet.in" },
      { label: "All businesses", href: "https://qeet.in/products" },
    ],
  },
] as const;
