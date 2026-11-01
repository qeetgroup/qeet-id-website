import { ABOUT_PAGE } from "@/config/about";
import { BLOG_PAGE } from "@/config/blog";
import { CAPABILITY_PAGES } from "@/config/capabilities";
import { COMPARE_INDEX, COMPETITORS } from "@/config/compare";
import { CONTACT_PAGE } from "@/config/contact";
import { AUDIT, ENTERPRISE, FAQ, HERO, PRICING, SECURITY, WAYS_IN } from "@/config/home";
import { LEGAL_DOCS } from "@/config/legal";
import { MIGRATE_PAGE } from "@/config/migrate";
import { PRODUCT_INDEX } from "@/config/product-index";
import { SECURITY_PAGE } from "@/config/security";
import { listPosts } from "@/lib/blog";
import { formatCount, formatPlanPrice, plans } from "@/lib/pricing";
import type { SearchEntry } from "./index";

/** Every string in a value, joined and lowercased — a page's own words are its haystack. */
function words(...values: unknown[]): string {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) for (const x of v) walk(x);
    else if (v && typeof v === "object") for (const x of Object.values(v)) walk(x);
  };
  for (const v of values) walk(v);
  return out.join(" ").toLowerCase();
}

/**
 * The site's search index, built from the same copy files the pages render —
 * so search cannot describe a page differently from the page itself. Served
 * as a static file (app/search-index.json), fetched only when the search
 * popup first opens. Import it only from that route: it reads every page's
 * copy, which no client bundle should carry.
 */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  entries.push({
    type: "page",
    title: "Qeet ID",
    description: HERO.lede,
    url: "/",
    haystack: words(HERO, ENTERPRISE, AUDIT, WAYS_IN, SECURITY, PRICING),
  });

  for (const page of Object.values(CAPABILITY_PAGES)) {
    const url = `/product/${page.slug}`;
    entries.push({
      type: "capability",
      title: page.name,
      description: page.meta.description,
      url,
      haystack: words(page),
    });
    for (const s of page.sections) {
      if (s.kind !== "tabs") continue;
      for (const t of s.items) {
        entries.push({
          type: "section",
          parent: page.name,
          title: t.name,
          description: t.statement,
          url,
          haystack: words(t.name, t.statement, t.body, t.facts),
        });
      }
    }
  }

  entries.push({
    type: "page",
    title: "All features",
    description: PRODUCT_INDEX.meta.description,
    url: "/features",
    haystack: words(PRODUCT_INDEX),
  });

  entries.push({
    type: "page",
    title: "Security",
    description: SECURITY_PAGE.meta.description,
    url: "/security",
    haystack: words(SECURITY_PAGE),
  });
  for (const s of SECURITY_PAGE.sections) {
    entries.push({
      type: "section",
      parent: "Security",
      title: s.title,
      description: "lede" in s ? s.lede : "",
      url: `/security#${s.id}`,
      haystack: words(s),
    });
  }

  entries.push({
    type: "page",
    title: MIGRATE_PAGE.meta.title,
    description: MIGRATE_PAGE.meta.description,
    url: "/migrate",
    haystack: words(MIGRATE_PAGE),
  });

  entries.push({
    type: "page",
    title: COMPARE_INDEX.meta.title,
    description: COMPARE_INDEX.meta.description,
    url: "/compare",
    haystack: words(COMPARE_INDEX, "versus vs alternative competitors"),
  });
  for (const c of COMPETITORS) {
    entries.push({
      type: "section",
      parent: "Compare",
      title: `${c.name} and Qeet ID`,
      description: c.summary,
      url: `/compare/${c.slug}`,
      haystack: words(
        c.name,
        c.kind,
        c.summary,
        c.chooseThem,
        c.chooseQeet,
        "versus vs alternative",
      ),
    });
  }

  entries.push({
    type: "page",
    title: "Pricing",
    description: `Free up to ${formatCount(plans[0].mau ?? 0)} monthly active users, then Starter, Pro and Enterprise.`,
    url: "/pricing",
    haystack: words(
      plans.map((p) => [p.name, p.tagline, p.highlights, formatPlanPrice(p, "monthly").main]),
      "price plans cost monthly active users mau",
    ),
  });

  for (const post of listPosts()) {
    entries.push({
      type: "post",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      haystack: words(post.title, post.description, post.tags, post.body),
    });
  }

  entries.push({
    type: "page",
    title: BLOG_PAGE.meta.title,
    description: BLOG_PAGE.meta.description,
    url: "/blog",
    haystack: words(BLOG_PAGE.title, BLOG_PAGE.lede, "engineering posts articles"),
  });
  entries.push({
    type: "page",
    title: ABOUT_PAGE.meta.title,
    description: ABOUT_PAGE.meta.description,
    url: "/about",
    haystack: words(ABOUT_PAGE, "company qeet group"),
  });
  entries.push({
    type: "page",
    title: CONTACT_PAGE.meta.title,
    description: CONTACT_PAGE.meta.description,
    url: "/contact",
    haystack: words(CONTACT_PAGE.title, CONTACT_PAGE.lede, CONTACT_PAGE.channels, "email write"),
  });
  for (const d of LEGAL_DOCS) {
    entries.push({
      type: "legal",
      title: d.title,
      description: d.description,
      url: `/legal/${d.slug}`,
      haystack: words(d.title, d.intro, d.sections, d.subprocessors ?? []),
    });
  }

  // The home's questions last: on a tie, the page a question is about comes first.
  for (const item of FAQ.items) {
    entries.push({
      type: "section",
      parent: "Home",
      title: item.q,
      description: item.a,
      url: "/#faq-title",
      haystack: words(item),
    });
  }
  return entries;
}
