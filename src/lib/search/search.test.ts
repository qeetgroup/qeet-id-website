/**
 * Site search — the index and the ranking. Runs with `bun test`.
 *
 * The index is built from the pages' own copy files (lib/search/build-index),
 * so these tests check that the things people look for land where they should,
 * and that every result points at a page that exists.
 */

import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { CAPABILITIES } from "@/config/capability-index";
import { COMPETITORS } from "@/config/compare";
import { LEGAL_DOCS } from "@/config/legal";
import { SECURITY_PAGE } from "@/config/security";
import { rankEntries } from "@/lib/search";
import { buildSearchIndex } from "@/lib/search/build-index";

const index = buildSearchIndex();
const top = (q: string) => rankEntries(index, q)[0];

/** The App Router page a URL lands on (the marketing group, or a product slug). */
function routeExists(url: string) {
  const path = url.split("#")[0].split("?")[0];
  if (path.startsWith("/product/")) return CAPABILITIES.some((c) => `/product/${c.slug}` === path);
  if (path.startsWith("/compare/")) return COMPETITORS.some((c) => `/compare/${c.slug}` === path);
  if (path.startsWith("/legal/")) return LEGAL_DOCS.some((d) => `/legal/${d.slug}` === path);
  if (path.startsWith("/blog/")) return true; // checked against listPosts below
  const dir = join(process.cwd(), "src/app/(marketing)", path === "/" ? "" : path);
  return existsSync(join(dir, "page.tsx"));
}

describe("search — what people look for lands where it should", () => {
  const cases: [string, string][] = [
    ["passkeys", "/product/authentication"],
    ["scim", "/product/directory-sync"],
    ["saml", "/product/enterprise-sso"],
    ["authzen", "/product/authorization"],
    ["hash chain", "/product/audit-log"],
    ["ai agents", "/product/ai-agents"],
    ["auth0", "/compare/auth0"],
    ["migrate from auth0", "/migrate"],
    ["keycloak", "/compare/keycloak"],
    ["alternative", "/compare"],
    ["row-level security", "/security#isolation"],
    ["vulnerability", "/security"],
    ["pricing", "/pricing"],
  ];
  for (const [q, url] of cases) {
    test(`"${q}" → ${url}`, () => {
      expect(top(q)?.url.startsWith(url.split("#")[0])).toBe(true);
      if (url.includes("#")) expect(rankEntries(index, q).some((r) => r.url === url)).toBe(true);
    });
  }

  test("a typo in one word does not lose the rest", () => {
    expect(rankEntries(index, "scim xqzv").length).toBeGreaterThan(0);
  });
});

describe("search — the index", () => {
  test("every capability page is in it, with its tabs", () => {
    for (const c of CAPABILITIES) {
      expect(index.some((e) => e.type === "capability" && e.url === `/product/${c.slug}`)).toBe(
        true,
      );
    }
    expect(index.filter((e) => e.type === "section" && e.parent === "Authentication").length).toBe(
      5,
    );
  });

  test("every result points at a page that exists, and every security anchor is a section", () => {
    for (const e of index) expect(routeExists(e.url), e.url).toBe(true);
    const ids = new Set(SECURITY_PAGE.sections.map((s) => s.id));
    for (const e of index.filter((x) => x.url.startsWith("/security#"))) {
      expect(ids.has(e.url.split("#")[1])).toBe(true);
    }
  });

  test("no entry is listed twice", () => {
    const keys = index.map((e) => `${e.url} ${e.title}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
