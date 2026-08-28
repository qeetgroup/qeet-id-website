# GEMINI.md — qeet-id-website

**Read [AGENTS.md](AGENTS.md) first.** It is the model-neutral instruction file and the source of
truth for this repository. This file is a pointer and adds no architecture.

```text
GEMINI.md  →  AGENTS.md  →  docs/llm/*
```

## Canonical context

| File | For |
|---|---|
| [qeet-repo.yml](qeet-repo.yml) | Machine-readable repository identity |
| [AGENTS.md](AGENTS.md) | **Rules, commands, what CI enforces** |
| [docs/llm/context.md](docs/llm/context.md) | How this repository actually works |
| [docs/llm/boundaries.md](docs/llm/boundaries.md) | What it owns, and what it must not touch |
| [docs/llm/workflows.md](docs/llm/workflows.md) | Step-by-step for common changes |
| [docs/llm/architecture-map.md](docs/llm/architecture-map.md) | "Where is X?" — fastest path to a file |

Parent context: **L0** `qeetgroup/qeet-context` · **L1** `qeetgroup/qeet-id-context`.

## What this repository is

The **marketing site for Qeet ID** (`id.qeet.in`). Next.js 16 App Router, React 19, Tailwind v4, `@qeetrix/ui`, Biome, bun. **It does not call the Qeet ID backend** — there is no API client and no auth.

## Non-negotiables

1. **Never state a product capability you have not verified** against `qeet-id-context/PRODUCT.md`. This site restates claims; it never originates them.
2. The product is **pre-1.0 (`v0.1.14`)** and **no SDK is published** — do not write "generally available" or "drop-in SDKs" (QID-009, QID-010).
3. **No secrets.** Only `NEXT_PUBLIC_*`, which is inlined at build time and therefore public.
4. **`POST /api/contact` is unprotected** — no rate limiting, captcha or origin check. Do not add a secret-bearing integration without fixing that.
5. **Never add an authenticated flow here** — that belongs to `qeet-id-login`.
6. **Never write a competitor claim from memory.** Each `compare/` page is a public assertion about a named company.

## Commands

`bun run dev` · `bun run build` · `bun run typecheck` · `bun run lint` · `bun run check` · `bun test`

That list is complete — **do not invent commands.**

## Before finishing

```bash
bun run typecheck && bun run check && bun test && bun run build
git diff
```
