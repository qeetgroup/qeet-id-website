# Repository Context — qeet-id-website

**Level:** L2 · **Status:** active · **Evidence state:** verified · **Last verified:** 2026-08-28
**Verification scope:** routes, env usage and the absence of an API client read from source.
Comparison-page count taken from the tree.

## Identity

The **marketing site for Qeet ID**, served at `id.qeet.in`. Next.js 16.2.6 App Router, React 19 with
the React Compiler, Tailwind v4, Qeetrix (`@qeetrix/react 0.2.2`, `@qeetrix/tokens 0.0.11`, `@qeetrix/icons 2.0.0`), Biome, bun.

## Context inheritance

```text
qeet-context (L0)  →  qeet-id-context (L1)  →  qeet-id-website (L2 — this document)
```

Note there is **no `qeet-id-server` link in this chain** — unlike every other Qeet ID front-end,
this repository does not consume the API.

## Responsibilities

Public marketing: product pages, pricing (with a calculator), a blog, legal pages, a contact page
of email links, and SEO artifacts (robots, sitemap, OpenGraph images, structured data). The 19
competitor comparisons are offline until re-verified.

## Non-responsibilities

**No authentication, no session, no API access, no product data.** Sign-in and sign-up are
*deep links* to `console.id.qeet.in`, not flows implemented here.

## Architecture

A static-first Next.js App Router site. Everything sits in the `(marketing)` route group with a
shared layout. Content lives in `src/lib/blog.ts` and the pricing model in `src/lib/pricing/`.

**There is no server code besides the `/go` redirects and `healthz`.**

## It does not call the backend — verified

There is no API client file and no runtime reference to `api.id.qeet.in`. The README says so, and
the tree confirms it. What exists instead:

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_DASHBOARD_URL` | `https://console.id.qeet.in` | `/sign-in`, `/sign-up` deep links |
| `NEXT_PUBLIC_DOCS_URL` | `https://docs.qeet.in` | documentation links |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | — | read by nothing — no analytics is wired |

Two things worth knowing:

- **`NEXT_PUBLIC_SITE_URL` is documented but read by nothing.** The canonical origin is hardcoded as
  `https://id.qeet.in` in `layout.tsx`, `robots.ts`, `sitemap.ts` and `structured-data.tsx`.
- **`API_REFERENCE_URL` is a hardcoded constant** pointing at `https://api.qeet.in/reference#qeet-id`
  — the organisation's developer portal, which is `api.qeet.in` (`qeet-apis` deploys there; the
  org records said `apis.qeet.in`, which does not resolve — corrected in qeet-context, 2026-10-28).
  `qeet-id-context/DRIFT-REGISTER.md` **QID-015** recorded the old mismatch and can be reviewed.

## Contact

There is no contact form or route. The page lists the organisation's published inboxes as email
links. The previous form posted to `POST /api/contact`, which sent nothing and told the visitor the
message had gone — it was removed on 2026-10-29. A future form needs a real transport, a secret and
protection (rate limit, origin check) in the same change.

## Marketing copy is a product claim

This site makes public assertions about a security product. Before writing or editing one, check
`qeet-id-context/PRODUCT.md`. Known conflicts already recorded at product level:

| Claim risk | Reality |
|---|---|
| "Generally available" | Highest published version is **`v0.1.14`**; the roadmap says pre-1.0 — QID-010 |
| "Drop-in SDKs" | **No Qeet ID SDK is published** — npm 404, Go proxy never fetched — QID-009 |
| SOC 2 / ISO | Evidence **generation** ships; certification status is `unknown` |

**Do not restate a capability from memory.** The product context is the check.

## Comparison pages

Eight comparisons under `/compare`, from `src/config/compare.ts`. Each is a factual claim about a
named third party, from research frozen on a date; third-party capabilities change, so each page
carries its re-check date and `compare.test.ts` fails once it passes.

## Testing and CI

`bun test` with Bun's built-in runner, ten test files. Most are **copy tests**: each page's words
(`src/config/*`, `lib/blog.ts`) are held to their sources and kept off claims the record does not
support; the rest cover the pricing calculator, search and the `/go` redirects. Where sibling
repositories are checked out beside this one, the tests also read them (`qeet-context`,
`qeet-group`, `qeet-id-context`). Biome provides lint, format and check.

CI (`.github/workflows/ci.yml`) runs install (frozen lockfile), typecheck, check, test and build.

## Local development

`bun run dev` binds **3000** by default. The workspace port convention assigns this site **3001** —
run `bun run dev -- -p 3001` if you need it alongside the console and login app, which want 3002 and
3003. Nothing here enforces it, and since the site calls no backend, nothing breaks if you do not.

`next.config.ts` sets `allowedDevOrigins: ["id.qeet.localhost"]`.

## Security-relevant

| Area | Path | Risk | Note |
|---|---|---|---|
| Build-time config | `NEXT_PUBLIC_*` | Low | Inlined; treat as public |
| Product claims | marketing copy | Medium | A false security claim is a real problem |
| Competitor claims | `src/config/compare.ts` | Medium | Factual assertions about third parties — dated, re-checked by `compare.test.ts` |

No auth, no session, no secret, no backend access.

## Known constraints

- The Qeetrix packages are pinned exactly. Every icon comes from `@qeetrix/icons`; there are no third-party logos.
- `NEXT_PUBLIC_SITE_URL` is documented but unused; the origin is hardcoded in four places.
- `API_REFERENCE_URL` points at a host that is not the API — QID-015.
- `.env.example` is tracked despite `.gitignore` covering `.env*`.

## Documentation authority

Source > `qeet-id-context/PRODUCT.md` for any product claim > README (which is stale on the
comparison list). This site is **downstream of the product context** — it must never be the place a
capability claim originates.
