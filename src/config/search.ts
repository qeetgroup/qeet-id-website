/** The search popup's words (components/search/search-popup.tsx). */
export const SEARCH_COPY = {
  title: "Search Qeet ID",
  placeholder: "Search — try “SCIM” or “passkeys”",
  try: "Try",
  suggestions: ["Passkeys", "SCIM", "Audit log", "AI agents", "Pricing", "Migrate"],
  none: "Nothing on the site matches “{q}”.",
  results: "{n} results",
  hints: { move: "to move", open: "to open", close: "to close" },
} as const;
