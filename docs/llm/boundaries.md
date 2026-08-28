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
| The design system | `qeetrix-ui` |

## Consumes

`@qeetrix/ui` and its pinned peers. **Nothing else at runtime** — no API, no database, no session.

## Provides

Public HTML, plus one unauthenticated `POST /api/contact` endpoint. It provides no package and no
API to any other Qeet repository.

## Security boundaries

**This repository has no trust boundary to protect** — it holds nothing. Its risks are of a
different kind:

| Surface | Risk |
|---|---|
| `POST /api/contact` | Public, unauthenticated, **no rate limit / captcha / origin check** |
| `NEXT_PUBLIC_*` | Inlined at build — **every value is public** |
| Marketing copy | A **false security claim** about a security product is a real problem |
| `compare/` pages | Factual assertions about 19 named third parties |

**The most likely harm from this repository is a wrong statement, not a wrong request.**

## Cross-repository dependencies

```text
qeetrix-ui ──@qeetrix/ui──►  qeet-id-website
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
| Extending `/api/contact` | Needs rate limiting, origin checks and a secret story first |
| `@qeetrix/ui` major upgrade | `qeetrix-ui` — pinned `^1.0.2` against npm `2.0.0` |
| Hostname change | DNS, `qeet-id-deploy`, and the org domain standard |

Product-level fan-out: `qeet-id-context/CHANGE-MATRIX.md`.

## Hard limits

1. **Never state a product capability you have not verified** in `qeet-id-context/PRODUCT.md`.
   The product is pre-1.0 and no SDK is published — write accordingly.
2. **Never add a secret.** Only `NEXT_PUBLIC_*` exists, and it is public.
3. **Never add an authenticated flow here** — that is `qeet-id-login`'s job.
4. **Never call the Qeet ID API from this site.** It deliberately has no client.
5. **Never extend `/api/contact`** with a secret-bearing integration while it is unprotected.
6. **Never write a competitor claim from memory.**
7. **Never change another repository** from a task scoped to this one.
