# Workflows — qeet-id-website

**Level:** L2 · **Last verified:** 2026-08-28
**Verification scope:** every command checked against `package.json`.

## Set up

```bash
bun install --frozen-lockfile
cp .env.example .env.local
bun run dev            # binds 3000; use -- -p 3001 to match the workspace convention
```

Nothing else is required — this site has no backend dependency.

## Add a marketing page

```text
1  src/app/(marketing)/<route>/page.tsx
2  compose from src/components/marketing/{sections,blocks,effects}
3  metadata + opengraph-image.tsx if it is a significant page
4  add it to src/app/sitemap.ts
5  bun run typecheck && bun run check && bun run build
```

## Write or edit product copy

```text
1  OPEN qeet-id-context/PRODUCT.md FIRST
2  check the capability status: implemented | partial | planned | unknown
3  write only what is verified
4  bun run typecheck && bun run build
```

**The traps, all currently real:**

- The product is **pre-1.0 (`v0.1.14`)** — do not write "generally available" without checking
  QID-010.
- **No SDK is published** — npm 404, Go proxy never fetched. Do not write "drop-in SDKs" (QID-009).
- SOC 2 / ISO **evidence generation** ships; certification is `unknown`. Those are different claims.

## Add or edit a comparison page

```text
1  src/app/(marketing)/compare/<competitor>/page.tsx
2  every claim about the competitor needs a source — do NOT write from memory
3  every claim about Qeet ID needs qeet-id-context/PRODUCT.md
4  add it to the sitemap
5  bun run typecheck && bun run check && bun run build
```

There are 19 of these. Each is a public, factual assertion about a named company.

## Add a blog or changelog entry

```text
1  src/lib/blog.ts  or  src/lib/changelog.ts
2  a changelog entry is a PRODUCT claim — verify it shipped
3  bun run build       (blog/[slug] and og images are generated)
```

## Change pricing

```text
1  src/lib/pricing/{plans,add-ons,usage,features}.ts
2  update src/lib/pricing/pricing.test.ts — the ONLY real test in the repo
3  bun test
4  bun run typecheck && bun run build
```

Pricing is a commercial commitment. Confirm the numbers before changing them.

## Touch the contact route

**Read this before extending it.**

```text
1  src/app/api/contact/route.ts
2  it currently has NO mail transport, NO rate limiting, NO captcha, NO origin check
3  adding an integration means adding a secret to a repo that has none
4  address the protection gaps in the same change, or do not make it
```

## Finish any task

```bash
bun run typecheck && bun run check && bun test && bun run build
git diff
```

> **There is no CI in this repository.** The Vercel build is the only automated gate, and it runs
> only `bun run build` — it will not catch a lint or type error you did not check yourself.

### Escalate rather than proceed

An unverified product claim · a GA/compliance/SDK statement · adding a secret · extending
`/api/contact` with an integration · a competitor claim without a source · anything requiring another
repository.
