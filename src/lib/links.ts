// Cross-app links from the marketing site to the dashboard (qeetid-admin), which
// hosts the real /sign-in and /sign-up pages. Marketing only links to them.
// Override the base with NEXT_PUBLIC_DASHBOARD_URL (e.g. http://localhost:3002
// in local dev); defaults to the production dashboard domain.
const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "https://console.id.qeet.in";

export const SIGN_IN_URL = `${DASHBOARD_URL}/sign-in`;
export const SIGN_UP_URL = `${DASHBOARD_URL}/sign-up`;

// Developer documentation lives in its own portal (`qeet-id-docs`, deployed at
// docs.qeet.in) — the marketing site links out to it rather than hosting docs
// pages of its own. Override the origin with NEXT_PUBLIC_DOCS_URL in dev.
const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL ?? "https://docs.qeet.in";

export const DOCS_BASE_URL = `${DOCS_URL}/docs`;
export const DOCS_QUICKSTART_URL = `${DOCS_URL}/docs/getting-started/quickstart`;
export const DOCS_GUIDES_URL = `${DOCS_URL}/docs/guides`;

// The OpenAPI reference is served by Scalar (not the docs portal), matching the
// docs repo's own `links.apiReference`.
export const API_REFERENCE_URL = "https://api.qeet.in/reference#qeet-id";
