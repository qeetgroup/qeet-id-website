/**
 * Home page copy tests. Runs with `bun test`.
 *
 * Every word on the home page lives in config/home.ts and is checked against
 * the product record (qeet-id-context, and qeet-id-server develop). These tests
 * hold it there: a claim the record does not support fails here, before review.
 */

import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";

import {
  AUDIT,
  CLOSING,
  ENTERPRISE,
  FAQ,
  HERO,
  PRICING,
  SECURITY,
  STATUS,
  WAYS_IN,
} from "@/config/home";
import { MEDIA } from "@/config/media";
import { allFeatures, plans, resolveFeatureValue } from "@/lib/pricing";

const COPY = { STATUS, HERO, ENTERPRISE, AUDIT, WAYS_IN, SECURITY, PRICING, FAQ, CLOSING };

/** Every string in the copy, flattened — icons and other functions skipped. */
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}
const TEXT = strings(COPY).join("\n");

describe("home copy — claims the record does not support", () => {
  const forbidden: [RegExp, string][] = [
    [/self[- ]?host/i, "Qeet ID is not offered self-hosted (owner, 2026-10-29)"],
    [/generally available|\bGA\b|available now|now available/i, "Qeet ID is in development"],
    [
      /\bcertified\b|certification (achieved|complete)|compliant with SOC/i,
      "certification status is unknown",
    ],
    [
      /\d+(\.\d+)?\s?% (uptime|availability)|\bSLA\b/i,
      "production is stopped; no uptime is promised",
    ],
    [
      /trusted by|customers? (love|trust)|\d[\d,]*\+ (teams|companies|developers)/i,
      "no customers to cite",
    ],
    [/install the sdk|npm i(nstall)? @qeet|drop-in component/i, "no SDK is published"],
    [/postgres(ql)? (rls|row[- ]level)/i, "tenancy is enforced in the application layer"],
    [/\bholding\b|\bventures?\b/i, "the organisation is a technology company"],
    [/growth plan/i, "the Growth plan is not sold (QTID-348)"],
    [/custom (sign-in )?domains?/i, "custom domains are record-only for 1.0 (QTID-118)"],
    [
      /client[_ ]credentials|machine-to-machine/i,
      "client_credentials is withdrawn for 1.0 (QTID-161)",
    ],
  ];
  for (const [rx, why] of forbidden) {
    test(`no "${rx.source}" — ${why}`, () => {
      expect(TEXT.match(rx)?.[0]).toBeUndefined();
    });
  }

  test("compliance evidence is never presented as certification", () => {
    const row = SECURITY.rows.find((r) => /SOC 2/.test(r.value));
    expect(row?.note).toContain("Evidence is not certification");
  });

  test("the SDKs are said to be unpublished wherever integration is described", () => {
    expect(FAQ.items.find((i) => /integrate/i.test(i.q))?.a).toContain("not published yet");
  });

  test("the status line states development and the planned 1.0 date", () => {
    expect(STATUS.label).toBe("In development");
    expect(STATUS.line).toContain("1 February 2027");
  });
});

describe("home — the pricing staircase", () => {
  const rows = PRICING.ladder.map(({ id }) => {
    const feature = allFeatures.find((f) => f.id === id);
    expect(feature, `feature "${id}" exists in lib/pricing/features.ts`).toBeDefined();
    return plans.map((p) => resolveFeatureValue(feature?.values[p.id] ?? "unavailable").status);
  });

  test("once a plan includes a feature, every larger plan does too", () => {
    for (const statuses of rows) {
      const first = statuses.findIndex((s) => s !== "unavailable");
      expect(first).toBeGreaterThanOrEqual(0);
      expect(statuses.slice(first)).not.toContain("unavailable");
    }
  });

  test("rows run in the order features first appear, so the bars step down", () => {
    const starts = rows.map((s) => s.findIndex((v) => v !== "unavailable"));
    expect(starts).toEqual([...starts].sort((a, b) => a - b));
  });

  test("the title's free allowance is the Free plan's", () => {
    const free = plans.find((p) => p.price.monthly === 0);
    expect(PRICING.title.join(" ")).toContain((free?.mau ?? 0).toLocaleString("en-US"));
  });
});

describe("home — structure", () => {
  test("no FAQ question is asked twice, and every answer is written", () => {
    const qs = FAQ.items.map((i) => i.q);
    expect(new Set(qs).size).toBe(qs.length);
    for (const i of FAQ.items) expect(i.a.length).toBeGreaterThan(20);
  });

  test("the sign-in index has three columns, each item with an icon and a note", () => {
    expect(WAYS_IN.columns).toHaveLength(3);
    for (const c of WAYS_IN.columns) {
      for (const it of c.items) {
        expect(it.icon).toBeDefined();
        expect(it.note.length).toBeGreaterThan(10);
      }
    }
  });

  test("the example ledger links each entry to the hash of the one before", () => {
    const hashes = AUDIT.ledger.map((e) => e.hash);
    expect(new Set([AUDIT.genesis, ...hashes]).size).toBe(hashes.length + 1);
  });

  test("every photograph is self-hosted, with its author and source recorded", () => {
    for (const photo of Object.values(MEDIA)) {
      expect(existsSync(join(process.cwd(), "public", photo.src))).toBe(true);
      expect(photo.author.length).toBeGreaterThan(0);
      expect(photo.source).toMatch(/^https:\/\//);
    }
  });
});
