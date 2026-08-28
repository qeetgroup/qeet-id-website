# Architecture Map — qeet-id-website

**Level:** L2 · **Last verified:** 2026-08-28
**Verification scope:** every path confirmed to exist.

| Need | Path |
|---|---|
| Repository identity | [`qeet-repo.yml`](../../qeet-repo.yml) |
| Agent instructions | [`AGENTS.md`](../../AGENTS.md) |
| Root layout, canonical origin | `src/app/layout.tsx` |
| Robots / sitemap | `src/app/robots.ts`, `src/app/sitemap.ts` |
| **The only server code** | `src/app/api/contact/route.ts` |
| Outbound link config | `src/lib/links.ts` |
| Analytics | `src/lib/analytics.ts` |

## Routes

All marketing pages live in the `(marketing)` route group with its own layout.

```text
/  /about  /careers  /changelog  /contact  /status
/features  /pricing  /security          (+ opengraph-image.tsx each)
/blog  /blog/[slug]                      (+ og)
/customers  /customers/[slug]            (+ og)
/compare  /compare/<19 competitors>      (+ og)
/legal/{dpa,privacy,subprocessors,terms}
```

**19 comparison pages** under `src/app/(marketing)/compare/` — `auth0` `authentik` `clerk` `cognito`
`descope` `entra` `firebase` `frontegg` `fusionauth` `keycloak` `okta` `ory` `ping` `propelauth`
`stytch` `supabase` `supertokens` `workos` `zitadel`. **The README names only 4 — it is stale.**

## Components

```text
src/components/marketing/            button-link · comparison-page · contact-form
                                     faq-accordion · legal-page · page-hero
                                     pricing-calculator · qeet-mark · section
                                     site-footer · site-header · sticky-cta-bar
                                     structured-data · theme-toggle
src/components/marketing/blocks/     9
src/components/marketing/effects/    13  (aurora, border-beam, marquee, orb, …)
src/components/marketing/motion/     9
src/components/marketing/pricing/    7
src/components/marketing/sections/   12
```

## Content and data

```text
src/lib/blog.ts  changelog.ts  customers.ts  og.tsx  use-reduced-motion.ts
src/lib/pricing/  add-ons · calculator · cta · display · faq · features
                  format · index · plans · types · usage · pricing.test.ts
```

## Config

| | |
|---|---|
| Next config — React Compiler, transpiles `@qeetrix/ui`, `id.qeet.localhost` dev origin | `next.config.ts` |
| Biome | `biome.json` |
| Scripts + `overrides` pinning `@qeetrix/ui` peers | `package.json` |
| Deploy | `vercel.json` |

## Environment

| Variable | Default | Read by |
|---|---|---|
| `NEXT_PUBLIC_DASHBOARD_URL` | `https://console.id.qeet.in` | `src/lib/links.ts` |
| `NEXT_PUBLIC_DOCS_URL` | `https://docs.qeet.in` | `src/lib/links.ts` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | — | `src/lib/analytics.ts` |
| `NEXT_PUBLIC_SITE_URL` | documented | **read by nothing** — the canonical origin is hardcoded |

## What does not exist here

**No API client. No auth. No CI workflow.** One test file. The site never calls the Qeet ID backend.
