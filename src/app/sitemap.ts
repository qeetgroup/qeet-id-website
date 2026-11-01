import type { MetadataRoute } from "next";

import { CAPABILITIES } from "@/config/capability-index";
import { COMPETITORS } from "@/config/compare";
import { LEGAL_DOCS } from "@/config/legal";
import { listPosts } from "@/lib/blog";

/**
 * Marketing-site sitemap (Next 16 `MetadataRoute.Sitemap`).
 *
 * Enumerates every public marketing route — including the dynamic
 * `product/[slug]` and `blog/[slug]` pages, whose slugs are read from the
 * in-repo data modules so the sitemap stays in lock-step with the content.
 * The hand-maintained static list keeps non-public paths (drafts, `/api/`)
 * out by construction.
 *
 * `lastModified` is derived from real content dates where we have them
 * (latest blog post, latest changelog entry); otherwise the build date is a
 * sensible default. Priorities/frequencies follow the marketing hierarchy:
 * the home + top conversion pages rank highest and change most often.
 */

// Canonical marketing origin — must match `metadataBase` in app/layout.tsx,
// robots.ts, and the JSON-LD in structured-data.tsx (all `id.qeet.in`).
const BASE_URL = "https://id.qeet.in";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

function entry(
  path: string,
  changeFrequency: ChangeFrequency,
  priority: number,
  lastModified: string | Date,
): MetadataRoute.Sitemap[number] {
  return {
    url: path === "/" ? BASE_URL : `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const posts = listPosts();
  const latestPost = posts[0]?.publishedAt ?? now;

  // Static marketing routes, highest-value first.
  const staticRoutes: MetadataRoute.Sitemap = [
    entry("/", "weekly", 1.0, now),
    entry("/features", "monthly", 0.9, now),
    entry("/pricing", "monthly", 0.9, now),
    entry("/security", "monthly", 0.8, now),
    entry("/migrate", "monthly", 0.7, now),
    entry("/blog", "weekly", 0.7, latestPost),
    entry("/about", "monthly", 0.6, now),
    entry("/contact", "yearly", 0.5, now),
    // Legal — important for trust/compliance, low crawl cadence.
    ...LEGAL_DOCS.map((d) => entry(`/legal/${d.slug}`, "yearly", 0.3, new Date(d.updated))),
  ];

  // The six capability pages, from the same list the Product menu reads.
  const productRoutes: MetadataRoute.Sitemap = CAPABILITIES.map((c) =>
    entry(`/product/${c.slug}`, "monthly", 0.85, now),
  );

  // The comparisons, each dated by the day its facts were read.
  const compareRoutes: MetadataRoute.Sitemap = [
    entry("/compare", "monthly", 0.6, now),
    ...COMPETITORS.map((c) => entry(`/compare/${c.slug}`, "monthly", 0.6, new Date(c.checked))),
  ];

  // Dynamic blog posts.
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) =>
    entry(`/blog/${post.slug}`, "yearly", 0.6, post.publishedAt),
  );

  return [...staticRoutes, ...productRoutes, ...compareRoutes, ...blogRoutes];
}
