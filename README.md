# Qeet ID — Marketing Site

The public marketing website for **Qeet ID**, the passkeys-first, open-source identity &
access platform (the OSS Auth0/Okta alternative). Ships at **[id.qeet.in](https://id.qeet.in)**.

**Stack:** Next.js 16 (App Router, React Compiler) · React 19 · [`@qeetrix/ui`](https://github.com/qeetgroup) · Tailwind CSS v4 · Motion · Biome · **bun**

> This is the marketing site only. It has no login of its own — the **Sign in / Sign up**
> buttons deep-link to the Qeet ID admin console, which hosts the real auth flows. The site
> does **not** call the backend API directly.

---

## Pages

All marketing routes live under the `src/app/(marketing)` route group; metadata routes
(`robots.ts`, `sitemap.ts`, `opengraph-image.tsx`) and one API route live at the app root.

| Route | Page |
|---|---|
| `/` | Home / landing |
| `/features` | Product features |
| `/pricing` | Pricing + interactive calculator |
| `/security` | Security & compliance |
| `/customers` · `/customers/[slug]` | Customer stories index + dynamic case studies |
| `/compare` · `/compare/{auth0,clerk,stytch,workos}` | Competitor comparison landing pages |
| `/blog` · `/blog/[slug]` | Blog index + dynamic posts |
| `/changelog` | Product changelog |
| `/about` | About / company |
| `/careers` | Careers |
| `/status` | Status page |
| `/contact` | Contact form (posts to `/api/contact`) |
| `/docs` | Docs entry point |
| `/legal/{privacy,terms,dpa,subprocessors}` | Legal pages |

**API route:** `POST /api/contact` — validates the contact form and acknowledges it.
No mail transport is wired up yet (it accepts and returns `{ ok: true }`); swap in a real
transport before launch.

Content for the blog, changelog and customer stories is authored in-repo under `src/lib/`
(`blog.ts`, `changelog.ts`, `customers.ts`), which also drives the sitemap.

---

## Getting started

```bash
# 1. Install dependencies (bun)
bun install --frozen-lockfile

# 2. Configure local env (optional — see Configuration)
cp .env.example .env.local

# 3. Start the dev server
bun run dev
```

`next dev` serves on **http://localhost:3000** by default. The workspace port map assigns this
site **:3001** (and `.env.example` uses that) — run `bun run dev -- -p 3001` to match.

### Scripts

| Script | Command | Purpose |
|---|---|---|
| `bun run dev` | `next dev` | Local dev server (HMR + React Compiler) |
| `bun run build` | `next build` | Production build |
| `bun run start` | `next start` | Serve the production build |
| `bun run typecheck` | `tsc --noEmit` | Type-check only |
| `bun run lint` | `biome lint` | Lint (errors only) |
| `bun run format` | `biome format --write` | Auto-format |
| `bun run check` | `biome check` | Lint + format check |
| `bun run generate:tree` | `struct …` | Regenerate `project.tree` |

---

## Configuration

All runtime config is public (`NEXT_PUBLIC_*`, inlined at build time) — **no secrets**. Copy
`.env.example` to `.env.local` for local dev. Both variables are optional: the code falls back
to the production values, so a bare build already targets prod.

| Variable | Dev (`.env.local`) | Production | Used for |
|---|---|---|---|
| `NEXT_PUBLIC_DASHBOARD_URL` | `http://localhost:3002` | `https://console.id.qeet.in` | Base URL for the **Sign in / Sign up** links (`src/lib/links.ts`). Defaults to the prod console when unset. |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3001` | `https://id.qeet.in` | Canonical / OG base URL (documented). **Currently not read by code** — the canonical origin is hardcoded to `https://id.qeet.in` in `app/layout.tsx` (`metadataBase`), `robots.ts`, `sitemap.ts` and `structured-data.tsx`. Safe to set; a no-op today. |

The marketing site needs **no backend API** and no server secrets to build or run.

---

## Deployment (Vercel)

Vercel **auto-detects Next.js** — no `framework` field is needed. The committed `vercel.json`
pins the toolchain to **bun** so the standalone repo installs and builds correctly:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "installCommand": "bun install --frozen-lockfile",
  "buildCommand": "bun run build"
}
```

### Steps

1. In the Vercel dashboard, **Add New… → Project** and import `qeetgroup/qeet-id-website`.
2. Leave the framework preset as **Next.js** (auto-detected). Install/build commands come from
   `vercel.json`.
3. Add environment variables for **Production** and **Preview**:
   - `NEXT_PUBLIC_DASHBOARD_URL = https://console.id.qeet.in`
   - `NEXT_PUBLIC_SITE_URL = https://id.qeet.in` (optional; no-op today)
4. **Deploy.**
5. **Custom domain:** add **`id.qeet.in`** under Project → Settings → Domains. In GoDaddy, create
   a **CNAME** record: host `id` → `cname.vercel-dns.com`. Vercel will provision TLS once DNS
   propagates.

---

## Related repositories

| Repo | Role | Domain |
|---|---|---|
| [`qeet-id-server`](https://github.com/qeetgroup/qeet-id-server) | Qeet ID backend (Go modular monolith · Postgres) | `api.id.qeet.in` |
| [`qeet-id-console`](https://github.com/qeetgroup/qeet-id-console) | Admin console (Sign in / Sign up live here) | `console.id.qeet.in` |
| [`qeet-id-login`](https://github.com/qeetgroup/qeet-id-login) | Hosted end-user login flow | `login.id.qeet.in` |
