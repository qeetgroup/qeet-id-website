/**
 * Capability pages and the product index — copy tests. Runs with `bun test`.
 *
 * The words live in config/capabilities.ts and config/product-index.ts, each
 * line annotated with its source. These tests hold them to the record: a claim
 * it rules out fails here, every plan row is read from the pricing table, and
 * every docs link goes to a page that exists.
 */

import { describe, expect, test } from "bun:test";

import { CAPABILITIES, CAPABILITY_PAGES } from "@/config/capabilities";
import { TAB_ICONS } from "@/config/capability-icons";
import { PRODUCT_INDEX } from "@/config/product-index";
import { allFeatures, plans, resolveFeatureValue } from "@/lib/pricing";

/**
 * The Qeet ID docs pages answering 200 on docs.qeet.in/id/<path> (checked
 * 2026-10-29). A capability page may link only to these.
 */
const DOCS_PAGES = new Set([
  "api",
  "authentication",
  "authentication/magic-links",
  "authentication/passkeys",
  "authorization",
  "concepts",
  "enterprise",
  "mfa",
  "oidc",
  "platform/audit",
  "quickstart",
  "sdks",
  "sessions",
]);

/** Pricing rows the record does not support for 1.0 — never shown on a capability page. */
const NOT_SHOWN = ["custom-domains", "sdks", "machine-identities", "byok", "adaptive-mfa"];

/** Every string, flattened; `notYet` lines (which name what is missing) kept apart. */
function strings(value: unknown, out: { text: string[]; notYet: string[] }, key = "") {
  if (typeof value === "string") (key === "notYet" ? out.notYet : out.text).push(value);
  else if (Array.isArray(value)) for (const v of value) strings(v, out, key);
  else if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value)) strings(v, out, k);
  return out;
}
const COPY = strings({ CAPABILITY_PAGES, PRODUCT_INDEX }, { text: [], notYet: [] });
const TEXT = COPY.text.join("\n");

const pages = Object.values(CAPABILITY_PAGES);

describe("capability copy — claims the record does not support", () => {
  const forbidden: [RegExp, string][] = [
    [/self[- ]?host/i, "Qeet ID is not offered self-hosted"],
    [/generally available|\bGA\b|available now|now available/i, "Qeet ID is in development"],
    [
      /\bcertified\b|certification (achieved|complete)|compliant with SOC/i,
      "certification status is unknown",
    ],
    [/\d+(\.\d+)?\s?% (uptime|availability)|\bSLA\b/i, "no uptime is promised"],
    [/trusted by|customers? (love|trust)/i, "no customers to cite"],
    [/install the sdk|npm i(nstall)? @qeet|drop-in component/i, "no SDK is published"],
    [/postgres(ql)? (rls|row[- ]level)/i, "tenancy is enforced in the application layer"],
    [
      /holding company|\b(a|the) holding\b|\bventures?\b/i,
      "the organisation is a technology company",
    ],
    [/\b(okta|entra|azure ad|ping identity|onelogin)\b/i, "no named identity provider is verified"],
    [/nested groups? (pass|inherit)/i, "roles come from direct group membership only (QTID-90)"],
  ];
  for (const [rx, why] of forbidden) {
    test(`no "${rx.source}" — ${why}`, () => {
      expect(TEXT.match(rx)?.[0]).toBeUndefined();
    });
  }

  test("custom domains and the client-credentials grant appear only as not in 1.0", () => {
    const outside = COPY.text.filter(
      (t) => /custom (sign-in )?domain|client[-_ ]credentials/i.test(t) && !/^Not in 1\.0/.test(t),
    );
    const allowed = PRODUCT_INDEX.notYet.items.flatMap((i) => [i.name, i.body]);
    expect(outside.filter((t) => !allowed.includes(t))).toEqual([]);
  });

  test("compliance evidence is never presented as certification", () => {
    for (const t of COPY.text.filter((s) => /SOC 2/.test(s) && s.length > 40)) {
      expect(t).toContain("Evidence is not certification");
    }
  });

  test("every not-in-1.0 line says so", () => {
    for (const t of COPY.notYet) expect(t.startsWith("Not in 1.0")).toBe(true);
  });
});

describe("capability pages — structure", () => {
  test("every capability in the index has a page, and every page is in the index", () => {
    expect(Object.keys(CAPABILITY_PAGES).sort()).toEqual(CAPABILITIES.map((c) => c.slug).sort());
    for (const p of pages) expect(CAPABILITIES.find((c) => c.slug === p.slug)?.name).toBe(p.name);
  });

  test("every hero path has five steps", () => {
    for (const p of pages) expect(p.path).toHaveLength(5);
  });

  test("every tab has an icon, a unique id on its page, facts and a docs page that exists", () => {
    for (const p of pages) {
      const tabs = p.sections.flatMap((s) => (s.kind === "tabs" ? s.items : []));
      expect(new Set(tabs.map((t) => t.id)).size).toBe(tabs.length);
      for (const t of tabs) {
        expect(TAB_ICONS[t.id]).toBeDefined();
        expect(t.facts.length).toBeGreaterThan(0);
        expect(DOCS_PAGES.has(t.docs), `${p.slug}/${t.id} → ${t.docs}`).toBe(true);
      }
      expect(DOCS_PAGES.has(p.docs), `${p.slug} → ${p.docs}`).toBe(true);
    }
  });

  test("chapter kickers are unique on a page (they key the sections)", () => {
    for (const p of pages) {
      const kickers = p.sections.map((s) => s.kicker);
      expect(new Set(kickers).size).toBe(kickers.length);
    }
  });
});

describe("capability pages — plans, read from the pricing table", () => {
  const status = (id: string) => {
    const feature = allFeatures.find((f) => f.id === id);
    expect(feature, `feature "${id}" exists in lib/pricing/features.ts`).toBeDefined();
    return plans.map((p) => resolveFeatureValue(feature?.values[p.id] ?? "unavailable").status);
  };

  test("every tab's plan line names a real feature", () => {
    for (const p of pages)
      for (const s of p.sections)
        if (s.kind === "tabs") for (const t of s.items) if (t.feature) status(t.feature);
  });

  test("each page's staircase steps down: rows in the order features first appear", () => {
    for (const p of pages) {
      for (const s of p.sections) {
        if (s.kind !== "plans") continue;
        const starts = s.rows.map((r) => {
          const st = status(r.id);
          const first = st.findIndex((v) => v !== "unavailable");
          expect(st.slice(first)).not.toContain("unavailable");
          return first;
        });
        expect(starts, p.slug).toEqual([...starts].sort((a, b) => a - b));
      }
    }
  });

  test("rows the record does not support for 1.0 are never shown", () => {
    const used = pages.flatMap((p) =>
      p.sections.flatMap((s) =>
        s.kind === "plans"
          ? s.rows.map((r) => r.id)
          : s.kind === "tabs"
            ? s.items.flatMap((t) => (t.feature ? [t.feature] : []))
            : [],
      ),
    );
    for (const id of NOT_SHOWN) expect(used).not.toContain(id);
  });
});
