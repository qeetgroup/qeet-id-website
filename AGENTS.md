<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# AGENTS.md — qeet-id-website

> The block above is **machine-managed by Next.js codegen** (`BEGIN:`/`END:nextjs-agent-rules`).
> Anything written inside it will be overwritten. Everything below is hand-maintained.

**This is the model-neutral instruction file for coding agents.** [CLAUDE.md](CLAUDE.md),
[GEMINI.md](GEMINI.md) and [.github/copilot-instructions.md](.github/copilot-instructions.md) point
here.

## What this repository is

The **marketing site for Qeet ID** — `id.qeet.in`. Next.js 16 App Router, React 19, Tailwind v4,
`@qeetrix/ui`, Biome, bun. ~17.7k LOC across 143 files.

> **It does not call the Qeet ID backend.** Verified: there is no API client and no reference to
> `api.id.qeet.in` at runtime. The only server code is its own contact route.

## Context hierarchy

```text
qeet-context (L0)  →  qeet-id-context (L1)  →  qeet-id-website (L2 — this repository)
```

## Read before changing code

| File | For |
|---|---|
| [qeet-repo.yml](qeet-repo.yml) | Machine-readable identity |
| [docs/llm/architecture-map.md](docs/llm/architecture-map.md) | "Where is X?" |
| [docs/llm/context.md](docs/llm/context.md) | How the site is built |
| [docs/llm/boundaries.md](docs/llm/boundaries.md) | What it owns and must not do |
| [docs/llm/workflows.md](docs/llm/workflows.md) | Adding a page, a comparison, a post |

## Rules

### 1. No backend, no auth, no secrets
This site calls no API and holds no credential. Only `NEXT_PUBLIC_*` variables exist, and those are
**inlined at build time — treat every value as public**. If a change needs a secret or a session, it
does not belong here. The one exception is the container image (test kit): it reads two **public**
URLs at runtime, `CONSOLE_URL` and `DOCS_URL`, for its `/go/…` redirects (`src/lib/go.ts`).

### 2. Never make a product claim you cannot verify
Marketing copy is a **public statement about a security product**. Before writing that Qeet ID
"is GA", "has SOC 2", or "ships SDKs", check `qeet-id-context/PRODUCT.md`. Several such claims are
already recorded as drift — the product is **pre-1.0 (`v0.1.14`)** and **no SDK is published**.
See `qeet-id-context/DRIFT-REGISTER.md` QID-009 and QID-010.

### 3. `POST /api/contact` is unprotected — do not extend it
It validates fields and returns `{ ok: true }`. It has **no mail transport, no rate limiting, no
captcha and no origin check** — the code says so itself. Do not add secret-bearing integrations to it
without addressing that first.

### 4. Comparison pages are competitive claims
`src/app/(marketing)/compare/` holds **19** competitor pages. Each is a factual assertion about a
named third party. Do not add or edit one from memory.

### 5. Style through the design system
Compose from `@qeetrix/ui` and the local `src/components/marketing/` primitives. The `overrides`
block in `package.json` pins `@qeetrix/ui`'s peers — do not bump them piecemeal.

## Commands

```bash
bun install
bun run dev            # binds 3000 by default; workspace convention is 3001
bun run build
bun run typecheck
bun run lint           # biome
bun run check          # biome check
bun run format
bun test               # src/lib/pricing/pricing.test.ts, src/lib/go.test.ts
docker build -t qeet-id-website:dev .   # container image for the qeet-id-deploy test kit
```

## What CI enforces

`.github/workflows/ci.yml` — job `verify` on `develop`, `release/**` and PRs: install →
`typecheck` → `check` (biome) → `bun test` → `build`. On `release/**` only, job `image` then publishes
`ghcr.io/qeetgroup/qeet-id-website:sha-<commit>` (amd64 + arm64) for the `qeet-id-deploy` test kit.
Production still deploys from `deploy.yml` (Vercel) on `main`; the image is never used there.

## Before you finish

```bash
bun run typecheck && bun run check && bun test && bun run build
git diff
```

## Escalate rather than proceed

A product claim you cannot verify against L1 · adding a secret · extending `/api/contact` with an
integration · a competitor claim you cannot source · anything requiring another repository.
