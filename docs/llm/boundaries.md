# Boundaries — qeet-id-website

**Level:** L2 · **Last verified:** 2026-08-28
**Verification scope:** ownership from `qeet-id-context/REPOSITORIES.md`; the absence of an API
client verified against the tree.

## Owns

The public marketing site at `id.qeet.in`: product, pricing, comparison, blog, changelog, customer,
careers and legal pages · SEO artifacts · the pricing calculator · a contact form.

## Does not own

| Not owned | Owner |
|---|---|
| **Any product capability claim** | `qeet-id-context/PRODUCT.md` — this site *restates*, never originates |
| Authentication / sign-in UI | `qeet-id-login` |
| The operator console | `qeet-id-console` |
| Product documentation | `qeet-id-docs` |
| The API | `qeet-id-server` |
| The design system | `qeetrix-react` (Qeetrix) |

## Consumes

`@qeetrix/react`, `@qeetrix/tokens` and `@qeetrix/icons` (and `@base-ui/react`, which `@qeetrix/react` needs). **Nothing else at runtime** — no API, no database, no session.

## Provides

Public HTML only. It provides no package and no API to any other Qeet repository.

## Security boundaries

**This repository has no trust boundary to protect** — it holds nothing. Its risks are of a
different kind:

| Surface | Risk |
|---|---|
| `NEXT_PUBLIC_*` | Inlined at build — **every value is public** |
| Marketing copy | A **false security claim** about a security product is a real problem |
| `compare/` pages | Factual assertions about eight named third parties — only from dated research (`src/config/compare.ts`) |

**The most likely harm from this repository is a wrong statement, not a wrong request.**

## Cross-repository dependencies

```text
qeetrix ──@qeetrix/react · tokens · icons──►  qeet-id-website
qeet-id-website ──deep links──►  console.id.qeet.in · docs.qeet.in
qeet-id-context/PRODUCT.md ──is the source for──►  every capability claim on this site
```

This site is downstream of everything and upstream of nothing.

## Safe to change without coordination

Copy, layout, styling, animation · a new marketing section built from existing components · blog and
changelog entries · SEO metadata · accessibility improvements · pricing-calculator presentation.

## Requires coordination or verification

| Change | Why |
|---|---|
| **Any product capability claim** | Verify against `qeet-id-context/PRODUCT.md` first |
| **A GA / compliance / SDK-availability statement** | Currently contradicted by QID-009, QID-010 |
| A new or edited comparison page | A factual claim about a third party — needs a source |
| Pricing figures | A commercial commitment, not a UI change |
| Legal pages | Not an engineering decision |
| Adding a form or server route | Needs rate limiting, origin checks and a secret story first |
| A Qeetrix upgrade | `@qeetrix/react` 0.2.2, `@qeetrix/tokens` 0.0.11, `@qeetrix/icons` 2.0.0 are pinned exactly — bump them together, deliberately, and re-run the regression |
| Hostname change | DNS, `qeet-id-deploy`, and the org domain standard |

Product-level fan-out: `qeet-id-context/CHANGE-MATRIX.md`.

## Hard limits

1. **Never state a product capability you have not verified** in `qeet-id-context/PRODUCT.md`.
   The product is pre-1.0 and no SDK is published — write accordingly.
2. **Never add a secret.** Only `NEXT_PUBLIC_*` exists, and it is public.
3. **Never add an authenticated flow here** — that is `qeet-id-login`'s job.
4. **Never call the Qeet ID API from this site.** It deliberately has no client.
5. **Never add a form or server route** without a real, protected transport.
6. **Never write a competitor claim from memory.**
7. **Never change another repository** from a task scoped to this one.
