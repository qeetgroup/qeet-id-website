/**
 * /pricing — copy tests. Runs with `bun test`.
 *
 * The page's words are config/pricing-page.ts; its plans, rows and answers are
 * lib/pricing, held to the billing catalogue on qeet-id-server develop. These
 * tests fail on what was removed as unsupported on 2026-10-30, and on any
 * not-in-1.0 row that loses its tag.
 */

import { describe, expect, test } from "bun:test";

import { PRICING_PAGE } from "@/config/pricing-page";
import { allFeatures, plans, pricingFaqs } from "@/lib/pricing";

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}
const TEXT = strings({
  PRICING_PAGE,
  pricingFaqs,
  plans: plans.map((p) => [p.name, p.tagline, p.audience, p.highlights]),
  features: allFeatures.map((f) => [f.name, f.description]),
}).join("\n");

describe("pricing — claims the record does not support", () => {
  const forbidden: [RegExp, string][] = [
    [/\bgrowth\b/i, "the Growth plan is not sold (QTID-348)"],
    [
      /\d+(\.\d+)?\s?% (uptime|availability)|\buptime\b|\bSLA\b/i,
      "no uptime is promised; production is stopped",
    ],
    [
      /HIPAA|data residency|dedicated tenant/i,
      "not in the record (the catalogue's lines are not copied)",
    ],
    [
      /startup (pricing|plan|discount|program)|open[- ]source (pricing|plan)|sponsored plan|discounted plan/i,
      "no such offer is recorded",
    ],
    [/\benvironments?\b/i, "Qeet ID has no customer environments"],
    [/zero[- ]downtime|won'?t cut off|without warning/i, "no such promise is recorded"],
    [/keep (their|your) passwords?|nobody (has to )?resets?/i, "imports carry no passwords"],
    [/self[- ]?host/i, "Qeet ID is not offered self-hosted"],
    [/\bcertified\b|certification (achieved|complete)/i, "certification status is unknown"],
  ];
  for (const [rx, why] of forbidden) {
    test(`no "${rx.source}" — ${why}`, () => {
      expect(TEXT.match(rx)?.[0]).toBeUndefined();
    });
  }
});

describe("pricing — nothing sold that cannot be bought", () => {
  test("no add-ons: the billing service sells plans only (decided 2026-10-30)", () => {
    expect(TEXT.match(/add-?on/i)?.[0]).toBeUndefined();
  });
});

describe("pricing — rows the record says are not in 1.0", () => {
  const maturity = (id: string) => allFeatures.find((f) => f.id === id)?.maturity;
  test.each(["custom-domains", "machine-identities", "byok", "sdks"])(
    "%s is tagged Not in 1.0",
    (id) => {
      expect(maturity(id)).toBe("roadmap");
    },
  );
  test("adaptive MFA is beta (PRODUCT.md: partial)", () => {
    expect(maturity("adaptive-mfa")).toBe("beta");
  });
});

describe("pricing — the catalogue's facts", () => {
  test("the four plans, Free to Enterprise, at the catalogue's prices and allowances", () => {
    expect(plans.map((p) => [p.id, p.price.monthly, p.mau])).toEqual([
      ["free", 0, 10_000],
      ["starter", 2_400, 25_000],
      ["pro", 8_000, 100_000],
      ["enterprise", null, null],
    ]);
  });
  test("until production runs, no button signs anyone up", () => {
    expect(PRICING_PAGE.cta.free.label).toBe("Read the docs");
    expect(PRICING_PAGE.cta.paid.href).toBe("/contact");
  });
  test("the status line says the prices are 1.0's", () => {
    expect(PRICING_PAGE.status).toMatch(/in development/);
    expect(PRICING_PAGE.status).toMatch(/1\.0/);
  });
});
