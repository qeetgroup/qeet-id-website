# Repository Context — qeet-id-website

**Level:** L2 · **Status:** active · **Evidence state:** verified · **Last verified:** 2026-08-28
**Verification scope:** routes, env usage and the absence of an API client read from source.
Comparison-page count taken from the tree.

## Identity

The **marketing site for Qeet ID**, served at `id.qeet.in`. Next.js 16.2.6 App Router, React 19 with
the React Compiler, Tailwind v4, `@qeetrix/ui ^1.0.2`, Biome, bun. 143 source files, ~17.7k LOC.

## Context inheritance

```text
qeet-context (L0)  →  qeet-id-context (L1)  →  qeet-id-website (L2 — this document)
```

Note there is **no `qeet-id-server` link in this chain** — unlike every other Qeet ID front-end,
this repository does not consume the API.

## Responsibilities

Public marketing: product pages, pricing (with a calculator), 19 competitor comparisons, blog,
changelog, customers, careers, legal pages, SEO artifacts (robots, sitemap, OpenGraph images,
structured data), and a contact form.

## Non-responsibilities

**No authentication, no session, no API access, no product data.** Sign-in and sign-up are
*deep links* to `console.id.qeet.in`, not flows implemented here.

## Architecture

A static-first Next.js App Router site. Everything sits in the `(marketing)` route group with a
shared layout. Content lives in `src/lib/{blog,changelog,customers}.ts` and the pricing model in
`src/lib/pricing/`.

**The only server code is `POST /api/contact`.**

## It does not call the backend — verified

There is no API client file and no runtime reference to `api.id.qeet.in`. The README says so, and
the tree confirms it. What exists instead:

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_DASHBOARD_URL` | `https://console.id.qeet.in` | `/sign-in`, `/sign-up` deep links |
| `NEXT_PUBLIC_DOCS_URL` | `https://docs.qeet.in` | documentation links |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | — | analytics |

Two things worth knowing:

- **`NEXT_PUBLIC_SITE_URL` is documented but read by nothing.** The canonical origin is hardcoded as
  `https://id.qeet.in` in `layout.tsx`, `robots.ts`, `sitemap.ts` and `structured-data.tsx`.
- **`API_REFERENCE_URL` is a hardcoded constant** pointing at `https://api.qeet.in/reference#qeet-id`
  — a host that is neither the documented API host (`api.id.qeet.in`) nor the org developer portal
  (`apis.qeet.in`, which does not currently resolve). Recorded as
  `qeet-id-context/DRIFT-REGISTER.md` **QID-015**.

## The contact route

`src/app/(marketing)/../api/contact/route.ts` validates `firstName`, `lastName`, `email`, `message`
and returns either `422` with a field-error map or `{ ok: true }`.

> **It has no mail transport, no rate limiting, no captcha and no origin check** — the code
> acknowledges this itself. It is a public, unauthenticated POST endpoint on the product's marketing
> domain.
>
> Anyone extending it — adding an email provider, a CRM webhook, a secret — must address those gaps
> first. Right now it is harmless because it does nothing; that changes the moment it does.

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

19 competitor pages under `src/app/(marketing)/compare/`. Each is a factual claim about a named
third party, and third-party capabilities change. **The README lists only 4 — it is stale.**

## Testing and CI

`bun test` with Bun's built-in runner and **one test file**
(`src/lib/pricing/pricing.test.ts` — the pricing calculator, which is the only real logic here).
Biome provides lint, format and check.

**There is no `.github/` directory and no CI workflow.** The Vercel build is the only automated gate.

## Local development

`bun run dev` binds **3000** by default. The workspace port convention assigns this site **3001** —
run `bun run dev -- -p 3001` if you need it alongside the console and login app, which want 3002 and
3003. Nothing here enforces it, and since the site calls no backend, nothing breaks if you do not.

`next.config.ts` sets `allowedDevOrigins: ["id.qeet.localhost"]`.

## Security-relevant

| Area | Path | Risk | Note |
|---|---|---|---|
| Public contact endpoint | `src/app/api/contact/route.ts` | Medium | Unprotected — see above |
| Build-time config | `NEXT_PUBLIC_*` | Low | Inlined; treat as public |
| Product claims | marketing copy | Medium | A false security claim is a real problem |
| Competitor claims | `compare/` | Medium | Factual assertions about third parties |

No auth, no session, no secret, no backend access.

## Known constraints

- **No CI, no meaningful test coverage** — one test file for 17.7k LOC.
- `@qeetrix/ui ^1.0.2` is a **major version behind** npm's `2.0.0`.
- `NEXT_PUBLIC_SITE_URL` is documented but unused; the origin is hardcoded in four places.
- `API_REFERENCE_URL` points at a host that is not the API — QID-015.
- The README's comparison list (4) does not match the tree (19).
- `.env.example` is tracked despite `.gitignore` covering `.env*`.

## Documentation authority

Source > `qeet-id-context/PRODUCT.md` for any product claim > README (which is stale on the
comparison list). This site is **downstream of the product context** — it must never be the place a
capability claim originates.
