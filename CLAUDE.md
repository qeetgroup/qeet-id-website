@AGENTS.md

# CLAUDE.md — qeet-id-website

**Read [AGENTS.md](AGENTS.md) first.** It is the model-neutral instruction file and the source of
truth for this repository. This file adds only Claude-specific guidance.

```text
CLAUDE.md  →  AGENTS.md  →  docs/llm/*
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
Read them when a task needs organization or product understanding; this repository does not restate them.

## The things most likely to trip you up here

1. **Never state a product capability you have not verified** against `qeet-id-context/PRODUCT.md`. This site restates claims; it never originates them.
2. The product is **pre-1.0 (`v0.1.14`)** and **no SDK is published** — do not write "generally available" or "drop-in SDKs" (QID-009, QID-010).
3. **No secrets.** Only `NEXT_PUBLIC_*`, which is inlined at build time and therefore public.
4. **There is no contact form or server route.** The contact page is email links; do not add a form without a real, protected transport.
5. **Never add an authenticated flow here** — that belongs to `qeet-id-login`.
6. **Never write a competitor claim from memory.** `/compare` is a public assertion about eight named companies: every cell comes from dated research in `qeet-id-files/research/platforms/`, and `src/config/compare.test.ts` fails once a platform passes its re-check date.

## Working style

- **Read before editing.** Match the neighbouring file's shape rather than introducing an abstraction.
- Use the architecture map instead of guessing a path.
- **Do not read `.env*` or secret files** into anything you write.

## Finishing a change

```bash
bun run typecheck && bun run check && bun test && bun run build
git diff
```

## Escalate rather than proceed

Stop and report if a task would weaken a security control, change a published contract, or require
modifying another repository. Cross-repository impact: `qeet-id-context/CHANGE-MATRIX.md`.
