/**
 * The blog — format and claims tests. Runs with `bun test`.
 *
 * Each post describes how Qeet ID works, and is checked against the code on
 * the date it carries. These tests hold the format the renderer reads and
 * keep the posts off claims the record does not support.
 */

import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { listPosts, parseBody, posts, readingMinutes } from "@/lib/blog";
import { parseInline } from "@/lib/inline";

/** The site's first commit: no post can be older than the site. */
const SITE_BEGAN = "2026-07-20";

describe("the body format", () => {
  test("headings, lists, captioned code and paragraphs", () => {
    const blocks = parseBody(
      "Intro line one\nline two\n\n## A heading\n\n- one `x`\n- two\n\n```go The caption\nfunc f() {}\n```\n\nEnd.",
    );
    expect(blocks.map((b) => b.kind)).toEqual(["p", "h2", "ul", "code", "p"]);
    expect(blocks[0]).toEqual({ kind: "p", text: "Intro line one line two" });
    expect(blocks[1]).toEqual({ kind: "h2", text: "A heading", id: "a-heading" });
    expect(blocks[2]).toEqual({ kind: "ul", items: ["one `x`", "two"] });
    expect(blocks[3]).toEqual({
      kind: "code",
      text: "func f() {}",
      lang: "go",
      caption: "The caption",
    });
  });

  test("inline code, strong and links", () => {
    expect(parseInline("a `b` **c** [d](/e) f")).toEqual([
      { kind: "text", text: "a " },
      { kind: "code", text: "b" },
      { kind: "text", text: " " },
      { kind: "strong", text: "c" },
      { kind: "text", text: " " },
      { kind: "link", text: "d", href: "/e" },
      { kind: "text", text: " f" },
    ]);
  });
});

describe("each post", () => {
  test("unique slugs, newest first", () => {
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
    const dates = listPosts().map((p) => p.publishedAt);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  for (const p of posts) {
    describe(p.slug, () => {
      test("dated no earlier than the site, and checked against the code since", () => {
        expect(p.publishedAt >= SITE_BEGAN).toBe(true);
        expect(p.checked >= p.publishedAt).toBe(true);
        expect(Number.isNaN(Date.parse(p.checked))).toBe(false);
      });

      test("every code sample says what it is, and headings are unique", () => {
        const blocks = parseBody(p.body);
        for (const b of blocks) if (b.kind === "code") expect(b.caption, p.slug).toBeTruthy();
        const ids = blocks.flatMap((b) => (b.kind === "h2" ? [b.id] : []));
        expect(ids.length).toBeGreaterThanOrEqual(2);
        expect(new Set(ids).size).toBe(ids.length);
      });

      test("no unbalanced inline code left in the prose", () => {
        for (const b of parseBody(p.body)) {
          const lines = b.kind === "p" ? [b.text] : b.kind === "ul" ? b.items : [];
          for (const l of lines) expect((l.match(/`/g) ?? []).length % 2, l).toBe(0);
        }
      });

      test("claims the record does not support", () => {
        const text = `${p.title}\n${p.description}\n${p.body}`;
        const forbidden: [RegExp, string][] = [
          [/SOC ?2|ISO ?27001|\bcertified\b|compliant\b/i, "Qeet ID holds no certification"],
          [/self[- ]?host/i, "Qeet ID is not offered self-hosted"],
          [/generally available|\bGA\b/, "Qeet ID is in development"],
          [/\bcustomers? (love|trust|use)/i, "no customers to cite"],
        ];
        for (const [re, why] of forbidden) expect(text, why).not.toMatch(re);
      });

      test("links to a page that exists, and reads in a sensible time", () => {
        const path = p.more.href.split("#")[0];
        const dir = path.startsWith("/product/") ? "product/[slug]" : path.slice(1);
        expect(existsSync(join(process.cwd(), "src/app/(marketing)", dir, "page.tsx"))).toBe(true);
        expect(readingMinutes(p)).toBeGreaterThanOrEqual(2);
        expect(readingMinutes(p)).toBeLessThanOrEqual(10);
      });
    });
  }
});
