# Architecture Map — qeet-id-website

**Level:** L2 · **Last verified:** 2026-08-28
**Verification scope:** every path confirmed to exist.

| Need | Path |
|---|---|
| Repository identity | [`qeet-repo.yml`](../../qeet-repo.yml) |
| Agent instructions | [`AGENTS.md`](../../AGENTS.md) |
| Root layout, canonical origin | `src/app/layout.tsx` |
| Robots / sitemap | `src/app/robots.ts`, `src/app/sitemap.ts` |
| Server code | None besides `/go` redirects and `healthz` — the contact route was removed (2026-10-29) |
| Outbound link config | `src/lib/links.ts` |
| Analytics | None — the site ships no analytics (the unused `track()` stub went with the old pricing page, 2026-10-30) |

## Routes

All marketing pages live in the `(marketing)` route group with its own layout.

```text
/  /about  /contact
/features  /pricing  /security          (+ opengraph-image.tsx each)
/product/{authentication,enterprise-sso,directory-sync,authorization,audit-log,ai-agents}
                                         one template, product/[slug] (+ og); /features is their index
/migrate                                 moving from Auth0, Cognito or Azure AD B2C (+ og)
/search-index.json                       the site search index, static, fetched when search first opens
/.well-known/security.txt                RFC 9116 — the reporting channels (public/.well-known)
/blog  /blog/[slug]                      (+ og)
/compare  /compare/[slug]               eight comparisons, one template (+ og)
/legal/{dpa,privacy,subprocessors,terms}

Retired, permanent redirects in next.config.ts: /customers(/*) /status /changelog → /
and /careers → https://qeet.in/careers
```

**Comparisons**: `auth0` `okta` `entra` `ping` `keycloak` `zitadel` `ory` `workos` — data in
`src/config/compare.ts`, marks in `src/components/compare/lead.tsx`. The retired slugs (`authentik`
`clerk` `cognito` `descope` `firebase` `frontegg` `fusionauth` `propelauth` `stytch` `supabase`
`supertokens`) redirect, temporarily, to `/compare`.

## Components

Every route is on Qeetrix (the redesign, 2026-10). The old marketing components and
`@qeetrix/ui` were removed on 2026-10-30.

```text
src/components/site/        the chrome and shared pieces: site-shell (header, main, footer,
                            search — the layout and the 404 both use it) · site-header (Drawer
                            phone menu) · site-footer · site-nav · button-link · brand-mark ·
                            theme-switch · search-button · inline-text · plan-ladder · reveal · vars
src/components/home/        hero · sections (01–06 + close) · chapter
src/components/capability/  sections (hero, tabs · split · ruler · points · table · plans
                            blocks, related, close) · capability-tab (client)
src/components/search/      search-popup (⌘K, a Qeetrix Dialog) · marked
src/components/security/    contents-rail
src/components/pricing/     plan-board (monthly / yearly) · calculator · comparison
src/components/compare/     lead (the verdict marks, the tally strip and legend)
src/components/blog/        prose (the post body, captioned code)
src/components/seo/         structured-data (JSON-LD)
```

## Content and data

```text
src/config/home.ts    every word on the home page, each line checked against the record
src/config/capabilities.ts      the six capability pages' copy (typed blocks), each line sourced
src/config/capability-index.ts  their names, icons and lines — the menu, footer and sitemap read it
src/config/capability-icons.ts  the tab icons, for the client tab
src/config/product-index.ts     /features: standards and what is not in 1.0
src/config/security.ts          /security, the trust brief — each line sourced to SECURITY.md or develop
src/config/migrate.ts           /migrate — what each import adapter reads, the steps
src/config/search.ts            the search popup's words
src/config/pricing-page.ts      /pricing's own words (plans, rows and answers are lib/pricing)
src/config/compare.ts           /compare — eight platforms, fifteen areas, dated research
src/config/blog.ts              /blog's own words (the posts are lib/blog.ts)
src/config/about.ts             /about — Qeet Group's words, quoted
src/config/contact.ts           /contact — the four published addresses
src/config/legal.ts             /legal/[slug] — the four documents, as data
src/config/not-found.ts         the 404's words
src/config/media.ts   licensed, self-hosted photographs (author, source, licence)
src/lib/blog.ts  dates.ts  go.ts  inline.ts  links.ts  og.tsx  theme.ts  use-theme.ts
src/lib/search/   index (types + ranking, qeet.in's) · build-index (from the copy files) · use-search-index
src/lib/pricing/  calculator · cta · display · faq · features
                  format · index · plans · types · usage · pricing.test.ts
```

## Styling

`globals.css` is qeet.in's: Tailwind, `@qeetrix/tokens` (with Qeet Sans and Fira Code as subsets),
per-component `@qeetrix/react` CSS and the marketing layer (`src/styles/marketing.css`), under a
declared layer order, plus the page's canvas, text and font. Each page category has its own
stylesheet beside its route. The theme is one attribute, `data-qx-color-scheme` on `<html>`: the
pre-paint script in `app/layout.tsx` follows the system until the visitor chooses, and
`theme-switch` remembers the choice under `qeetid-web-theme` (`lib/theme.ts`).

## Config

| | |
|---|---|
| Next config — React Compiler, `id.qeet.localhost` dev origin, redirects | `next.config.ts` |
| Biome | `biome.json` |
| Scripts + `overrides` pinning `@base-ui/react` | `package.json` |
| Deploy | `vercel.json` |

## Environment

| Variable | Default | Read by |
|---|---|---|
| `NEXT_PUBLIC_DASHBOARD_URL` | `https://console.id.qeet.in` | `src/lib/links.ts` |
| `NEXT_PUBLIC_DOCS_URL` | `https://docs.qeet.in` | `src/lib/links.ts` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | — | **read by nothing** — no analytics is wired |
| `NEXT_PUBLIC_SITE_URL` | documented | **read by nothing** — the canonical origin is hardcoded |

## What does not exist here

**No API client. No auth. No CI workflow.** Seven test files (`bun test`): pricing, go, search, and the home, capability, trust-page (security, migrate) and pricing-page copy. The site never calls the Qeet ID backend.
