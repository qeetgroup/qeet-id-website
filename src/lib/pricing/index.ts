/**
 * Qeet ID pricing — single authoritative entry point.
 *
 * Import everything pricing-related from `@/lib/pricing`. The modules behind
 * this barrel are framework-agnostic (except `./cta`, the website routing
 * adapter) and designed to be lifted into a shared package later so the
 * website, console, docs and a future billing service consume one definition.
 *
 * To change pricing, edit the config modules (`plans`, `features`, `usage`,
 * `add-ons`, `faq`) — not the components. See `docs/PRICING.md`.
 */

export * from "./add-ons";
export * from "./calculator";
export * from "./cta";
export * from "./display";
export * from "./faq";
export * from "./features";
export * from "./format";
export * from "./plans";
export * from "./types";
export * from "./usage";
