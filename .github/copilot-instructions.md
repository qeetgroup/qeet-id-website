# GitHub Copilot — qeet-id-website

**Canonical instructions: [`AGENTS.md`](../AGENTS.md).** This file is a summary; it adds no
architecture.

## Repository

The **marketing site for Qeet ID** (`id.qeet.in`). Next.js 16 App Router, React 19, Tailwind v4, Qeetrix (`@qeetrix/tokens`, `@qeetrix/react`, `@qeetrix/icons`), Biome, bun. **It does not call the Qeet ID backend** — there is no API client and no auth.

Context: **L0** `qeet-context` (organization) → **L1** `qeet-id-context` (product) → **L2** this
repository → source.

## Structure

All pages in the `(marketing)` route group under `src/app/`, including `compare/` (eight comparisons, one template, data in `src/config/compare.ts`). Every page is on Qeetrix: each page category has its own stylesheet beside its route and its words in `src/config/`; the chrome and shared pieces are `src/components/site` (the 404 renders the same `SiteShell`). The pricing model is in `src/lib/pricing`. There is no server code besides the `/go` redirects and `healthz`.

## Rules

1. **Never state a product capability you have not verified** against `qeet-id-context/PRODUCT.md`. This site restates claims; it never originates them.
2. The product is **pre-1.0 (`v0.1.14`)** and **no SDK is published** — do not write "generally available" or "drop-in SDKs" (QID-009, QID-010).
3. **No secrets.** Only `NEXT_PUBLIC_*`, which is inlined at build time and therefore public.
4. **There is no contact form or server route.** The contact page is email links; do not add a form without a real, protected transport.
5. **Never add an authenticated flow here** — that belongs to `qeet-id-login`.
6. **Never write a competitor claim from memory.** `/compare` is a public assertion about eight named companies: every cell comes from dated research in `qeet-id-files/research/platforms/`, and `src/config/compare.test.ts` fails once a platform passes its re-check date.

## Commands

`bun run dev` · `bun run build` · `bun run typecheck` · `bun run lint` · `bun run check` · `bun test`

## Do not

- claim a product capability without checking `qeet-id-context/PRODUCT.md`
- add a secret or a server-side credential
- add an API client or an authenticated flow
- add a contact form or server route without a real, protected transport
- write a competitor comparison from memory
