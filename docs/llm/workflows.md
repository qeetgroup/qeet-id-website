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
1  src/app/(marketing)/<route>/page.tsx, with its own stylesheet beside it (tokens only)
2  its words in src/config/<page>.ts, each line annotated with its source
3  compose from @qeetrix/react, the marketing layer (m-*) and components/site
4  metadata + opengraph-image.tsx; add it to src/app/sitemap.ts and lib/search/build-index.ts
5  a copy test for what it claims; bun test && bun run typecheck && bun run check && bun run build
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
1  research the platform to the qeet-id-files/research/platforms/ standard (sources, freeze date)
2  src/config/compare.ts — a Competitor: every area's cell and verdict from that research,
   `checked` = the freeze date, `revalidate` = within three months, its sources
3  a retired slug? take it out of RETIRED_SLUGS and the redirect in next.config.ts
4  the Qeet ID column (AREA_GROUPS) changes only against the code, for every page at once
5  bun test && bun run typecheck && bun run check && bun run build
```

Each page is a public, factual assertion about a named company. The sitemap, the search index and
the static params all read `COMPETITORS`, so nothing else needs listing.

## Add a blog post

```text
1  src/lib/blog.ts — a post: title, standfirst, topic, tags, `more` (where it lives on the site)
2  the body format: paragraphs, `## ` headings, `- ` lists, `code`, **strong**, and fenced
   code whose info string is the language then a caption ("```go The lock each write takes")
3  every statement about Qeet ID is checked against qeet-id-server develop — note the files
   above the post — and `checked` is that day; `publishedAt` is the day it first goes out
4  bun test (lib/blog.test.ts: format, dates, forbidden claims) && bun run build
```

There is no changelog page: it was retired (2026-10-29) because its version numbers matched no
release. Bring one back only from real tags.

## Change pricing

```text
1  src/lib/pricing/{plans,usage,features,faq}.ts — the billing service's plan catalogue
   (qeet-id-server internal/operations/billing/plans.go) is the source; match it. Plans only:
   the billing service sells no add-ons, so the site offers none
2  update src/lib/pricing/pricing.test.ts and src/config/pricing-page.test.ts
3  bun test
4  bun run typecheck && bun run build
```

Pricing is a commercial commitment. Confirm the numbers before changing them.

## Contact

There is no form and no server route. The contact page lists the organisation's published inboxes
(`partnerships@`, `support@`, `press@`, `security@` qeet.in) as email links. A form needs a real
transport, a secret and protection (rate limit, origin check) — escalate before adding one.

## Finish any task

```bash
bun run typecheck && bun run check && bun test && bun run build
git diff
```

> **There is no CI in this repository.** The Vercel build is the only automated gate, and it runs
> only `bun run build` — it will not catch a lint or type error you did not check yourself.

### Escalate rather than proceed

An unverified product claim · a GA/compliance/SDK statement · adding a secret · adding a form or a
server route · a competitor claim without a source · anything requiring another repository.
