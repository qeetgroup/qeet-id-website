/**
 * /about, /contact, /legal/* and the 404 — copy tests. Runs with `bun test`.
 *
 * About quotes Qeet Group; Contact names its addresses; Legal states facts
 * about the service. Each is held to its source — and, where the sibling
 * repositories are checked out next to this one, to the source itself:
 * qeet-context (ORGANIZATION.md), qeet-group (qeet.in's published addresses)
 * and qeet-id-context (DEPENDENCIES.md).
 */

import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { ABOUT_PAGE } from "@/config/about";
import { CONTACT_PAGE } from "@/config/contact";
import { DRAFT_NOTE, LEGAL_DOCS } from "@/config/legal";
import { NOT_FOUND } from "@/config/not-found";

const ROOT = process.cwd();
/** A sibling repository's file, or null when it is not checked out. */
function sibling(...path: string[]): string | null {
  const file = join(ROOT, ...path);
  return existsSync(file) ? readFileSync(file, "utf8") : null;
}
const ORGANIZATION = sibling("..", "..", "qeet-context", "ORGANIZATION.md");
const QEET_IN_SITE = sibling("..", "..", "qeet-group", "src", "config", "site.ts");
const DEPENDENCIES = sibling("..", "qeet-id-context", "DEPENDENCIES.md");

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}
const squash = (s: string) => s.replace(/\s+/g, " ");

/** A path the site serves. */
function served(href: string) {
  const path = href.split("#")[0];
  if (path.startsWith("/legal/")) return LEGAL_DOCS.some((d) => `/legal/${d.slug}` === path);
  return existsSync(join(ROOT, "src/app/(marketing)", path.slice(1), "page.tsx"));
}

describe("about", () => {
  const text = strings(ABOUT_PAGE).join("\n");

  test("the four words, in order, each with its own first sentence", () => {
    expect(ABOUT_PAGE.group.words.map((w) => w.word)).toEqual([
      "Question",
      "Explore",
      "Envision",
      "Transform",
    ]);
  });

  test.skipIf(!ORGANIZATION)("quotes the organisation verbatim", () => {
    const org = squash(ORGANIZATION ?? "");
    for (const w of ABOUT_PAGE.group.words) expect(org).toContain(w.claim);
    expect(org).toContain(ABOUT_PAGE.group.vision);
    expect(org).toContain(ABOUT_PAGE.group.mission);
  });

  test("speaks as qeet.in does, and claims nothing the record does not support", () => {
    const forbidden: [RegExp, string][] = [
      [/self[- ]?host|open[- ]source/i, "Qeet ID is offered only as a Qeet Group service"],
      [/\bholding\b|\bventures?\b/i, "a technology company; businesses"],
      [/generally available|\bGA\b|available now/i, "Qeet ID is in development"],
      [/founded|years of|founding team/i, "no founding story is on record"],
      [/\bSDKs?\b/, "no SDK is published"],
    ];
    for (const [re, why] of forbidden) expect(text, why).not.toMatch(re);
  });
});

describe("contact", () => {
  const PUBLISHED = ["partnerships", "support", "press", "security"].map((n) => `${n}@qeet.in`);

  test("only the addresses Qeet Group publishes", () => {
    for (const c of CONTACT_PAGE.channels) expect(PUBLISHED).toContain(c.email);
    expect(new Set(CONTACT_PAGE.channels.map((c) => c.email)).size).toBe(4);
  });

  test.skipIf(!QEET_IN_SITE)("each one is on qeet.in", () => {
    for (const c of CONTACT_PAGE.channels) expect(QEET_IN_SITE).toContain(`"${c.email}"`);
  });

  test("no reply time is promised, and no form", () => {
    const text = strings(CONTACT_PAGE).join("\n");
    expect(text).not.toMatch(/within \d|hours?\b|business days?|respond in/i);
    expect(text).not.toMatch(/\bform\b/i);
  });
});

describe("legal", () => {
  const text = LEGAL_DOCS.map((d) => strings(d).join("\n")).join("\n");

  test("four documents, each dated no earlier than the site, each a draft that says so", () => {
    expect(LEGAL_DOCS.map((d) => d.slug)).toEqual(["privacy", "terms", "dpa", "subprocessors"]);
    for (const d of LEGAL_DOCS) expect(d.updated >= "2026-07-20").toBe(true);
    expect(DRAFT_NOTE).toMatch(/not been reviewed by counsel/);
    expect(DRAFT_NOTE).toMatch(/not yet in service/);
  });

  test("facts the service does not bear out", () => {
    const forbidden: [RegExp, string][] = [
      [/residency|choose (your|a) region/i, "organisations cannot choose a region"],
      [/data protection officer|\bDPO\b/i, "no Data Protection Officer is on record"],
      [/(privacy|dpo|legal)@qeet\.in/, "an address qeet.in does not publish"],
      [/google cloud|cloudflare|datadog|resend/i, "not a provider the service uses"],
      [/SOC ?2|ISO ?27001|\bcertified\b/i, "Qeet ID holds no certification"],
      [/cookies? (to|for) (track|analytic)/i, "the site sets no tracking cookies"],
    ];
    for (const [re, why] of forbidden) expect(text, why).not.toMatch(re);
  });

  test("every link goes somewhere the site serves, or to a published address", () => {
    for (const [, href] of text.matchAll(/\]\(([^)]+)\)/g)) {
      if (href.startsWith("mailto:")) expect(href).toBe("mailto:support@qeet.in");
      else expect(served(href), href).toBe(true);
    }
  });

  test.skipIf(!DEPENDENCIES)("every provider is in the dependency record", () => {
    const deps = DEPENDENCIES ?? "";
    const names = LEGAL_DOCS.flatMap((d) => d.subprocessors ?? []).flatMap((s) =>
      s.name.split(/ and | or /),
    );
    const record: Record<string, string> = {
      "Amazon Web Services": "AWS",
      Vercel: "Vercel",
      Twilio: "Twilio",
      Expo: "Expo",
      Stripe: "Stripe",
      Razorpay: "Razorpay",
      Anthropic: "Anthropic",
      OpenAI: "OpenAI",
    };
    for (const n of names) {
      expect(record[n], n).toBeDefined();
      expect(deps, n).toContain(record[n]);
    }
  });
});

describe("the 404", () => {
  test("every place it points to exists", () => {
    for (const p of NOT_FOUND.places) expect(served(p.href), p.href).toBe(true);
  });
});
