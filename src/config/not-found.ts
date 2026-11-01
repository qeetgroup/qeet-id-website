/** The 404 page's words, and where it points. */
export const NOT_FOUND = {
  kicker: "404",
  title: ["This page is not here.", "It may have moved."],
  lede: "Search the site, or start from one of these.",
  search: "Search the site",
  places: [
    {
      label: "All features",
      href: "/features",
      note: "Everything Qeet ID does, and what is not in 1.0",
    },
    { label: "Security", href: "/security", note: "How Qeet ID is built to be safe" },
    { label: "Pricing", href: "/pricing", note: "Four plans, and a calculator" },
    { label: "Compare", href: "/compare", note: "Eight platforms, area by area" },
    { label: "Blog", href: "/blog", note: "How Qeet ID is built" },
    { label: "Contact", href: "/contact", note: "One address for each thing you need" },
  ],
} as const;
