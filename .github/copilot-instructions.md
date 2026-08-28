# GitHub Copilot — qeet-id-website

**Canonical instructions: [`AGENTS.md`](../AGENTS.md).** This file is a summary; it adds no
architecture.

## Repository

The **marketing site for Qeet ID** (`id.qeet.in`). Next.js 16 App Router, React 19, Tailwind v4, `@qeetrix/ui`, Biome, bun. **It does not call the Qeet ID backend** — there is no API client and no auth.

Context: **L0** `qeet-context` (organization) → **L1** `qeet-id-context` (product) → **L2** this
repository → source.

## Structure

All pages in the `(marketing)` route group under `src/app/`, including **19** competitor pages under `compare/`. Components in `src/components/marketing/{sections,blocks,effects,motion,pricing}`; content and the pricing model in `src/lib/`. The only server code is `POST /api/contact`.

## Rules

1. **Never state a product capability you have not verified** against `qeet-id-context/PRODUCT.md`. This site restates claims; it never originates them.
2. The product is **pre-1.0 (`v0.1.14`)** and **no SDK is published** — do not write "generally available" or "drop-in SDKs" (QID-009, QID-010).
3. **No secrets.** Only `NEXT_PUBLIC_*`, which is inlined at build time and therefore public.
4. **`POST /api/contact` is unprotected** — no rate limiting, captcha or origin check. Do not add a secret-bearing integration without fixing that.
5. **Never add an authenticated flow here** — that belongs to `qeet-id-login`.
6. **Never write a competitor claim from memory.** Each `compare/` page is a public assertion about a named company.

## Commands

`bun run dev` · `bun run build` · `bun run typecheck` · `bun run lint` · `bun run check` · `bun test`

## Do not

- claim a product capability without checking `qeet-id-context/PRODUCT.md`
- add a secret or a server-side credential
- add an API client or an authenticated flow
- extend `/api/contact` while it has no rate limiting or origin check
- write a competitor comparison from memory
