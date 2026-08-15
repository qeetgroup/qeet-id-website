/**
 * Pricing configuration + logic tests (§30). Runs with `bun test`.
 *
 * These test the pricing *config and pure logic* independently of the UI, so a
 * pricing change that breaks an invariant (a plan without a price, a feature
 * missing a plan value, a mis-bucketed calculator threshold) fails here first.
 */

import { describe, expect, test } from "bun:test";

import { SIGN_UP_URL } from "@/lib/links";
import {
  ANNUAL_BILLED_MONTHS,
  ANNUAL_SAVINGS_RATE,
  AVAILABILITY_LABEL,
  addOns,
  allFeatures,
  annualBillingAvailable,
  type FeatureAvailability,
  featureGroups,
  formatCompactCount,
  formatCount,
  formatCurrency,
  formatPlanPrice,
  getHighlightedPlan,
  getPlan,
  MAU_PRESETS,
  mauToSlider,
  PLAN_IDS,
  plans,
  recommendPlanId,
  resolveAnnualTotal,
  resolveFeatureValue,
  resolveMonthlyEquivalent,
  resolvePlanCtaHref,
  sliderToMau,
  usageDimensions,
} from "@/lib/pricing";

const VALID_STATUSES: FeatureAvailability[] = [
  "included",
  "limited",
  "add-on",
  "custom",
  "unavailable",
];

describe("plans config", () => {
  test("has exactly the five public plans in order", () => {
    expect(plans.map((p) => p.id)).toEqual([...PLAN_IDS]);
    expect(plans).toHaveLength(5);
  });

  test("matches the launch price + MAU spec", () => {
    const byId = Object.fromEntries(plans.map((p) => [p.id, p]));
    expect(byId.free.price.monthly).toBe(0);
    expect(byId.free.mau).toBe(1_000);
    expect(byId.starter.price.monthly).toBe(2_400);
    expect(byId.starter.mau).toBe(10_000);
    expect(byId.growth.price.monthly).toBe(5_000);
    expect(byId.growth.mau).toBe(50_000);
    expect(byId.pro.price.monthly).toBe(8_000);
    expect(byId.pro.mau).toBe(100_000);
    expect(byId.enterprise.price.custom).toBe(true);
    expect(byId.enterprise.mau).toBeNull();
  });

  test("exactly one plan is highlighted, and it is Growth", () => {
    const highlighted = plans.filter((p) => p.highlighted);
    expect(highlighted).toHaveLength(1);
    expect(highlighted[0]?.id).toBe("growth");
    expect(getHighlightedPlan()?.id).toBe("growth");
    expect(highlighted[0]?.badge).toBe("Most popular");
  });

  test("every plan has 4–6 highlights and a CTA", () => {
    for (const p of plans) {
      expect(p.highlights.length).toBeGreaterThanOrEqual(4);
      expect(p.highlights.length).toBeLessThanOrEqual(6);
      expect(p.cta.label.length).toBeGreaterThan(0);
    }
  });

  test("getPlan throws on unknown id", () => {
    // @ts-expect-error — intentionally invalid id
    expect(() => getPlan("nope")).toThrow();
  });
});

describe("annual billing", () => {
  test("uses the 2-months-free (10-month) standard", () => {
    expect(ANNUAL_BILLED_MONTHS).toBe(10);
    expect(ANNUAL_SAVINGS_RATE).toBeCloseTo(1 / 6, 5);
  });

  test("derives annual total and monthly-equivalent for paid plans", () => {
    const starter = getPlan("starter");
    expect(resolveAnnualTotal(starter)).toBe(24_000);
    expect(resolveMonthlyEquivalent(starter, "yearly")).toBe(2_000);
    expect(resolveMonthlyEquivalent(starter, "monthly")).toBe(2_400);
  });

  test("free is 0 and enterprise is null for annual", () => {
    expect(resolveAnnualTotal(getPlan("free"))).toBe(0);
    expect(resolveAnnualTotal(getPlan("enterprise"))).toBeNull();
    expect(resolveMonthlyEquivalent(getPlan("enterprise"), "yearly")).toBeNull();
  });

  test("annual billing is available", () => {
    expect(annualBillingAvailable()).toBe(true);
  });
});

describe("feature matrix", () => {
  test("has the six product categories", () => {
    expect(featureGroups.map((g) => g.id)).toEqual([
      "authentication",
      "identity",
      "enterprise",
      "security",
      "developer",
      "operations",
    ]);
  });

  test("every feature defines a valid value for every plan", () => {
    for (const feature of allFeatures) {
      for (const id of PLAN_IDS) {
        const value = feature.values[id];
        expect(value, `${feature.id}.${id} missing`).toBeDefined();
        const { status } = resolveFeatureValue(value);
        expect(VALID_STATUSES).toContain(status);
      }
    }
  });

  test("feature ids are unique", () => {
    const ids = allFeatures.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("every availability status has a screen-reader label", () => {
    for (const status of VALID_STATUSES) {
      expect(AVAILABILITY_LABEL[status]).toBeTruthy();
    }
  });

  test("SSO/SAML/SCIM are gated as designed (no free enterprise features)", () => {
    const byId = Object.fromEntries(allFeatures.map((f) => [f.id, f]));
    expect(resolveFeatureValue(byId.saml.values.free).status).toBe("unavailable");
    expect(resolveFeatureValue(byId.saml.values.pro).status).toBe("included");
    expect(resolveFeatureValue(byId.scim.values.enterprise).status).toBe("included");
    expect(resolveFeatureValue(byId.oidc.values.free).status).toBe("included");
  });
});

describe("calculator recommendation", () => {
  test("buckets MAU into the smallest covering plan", () => {
    expect(recommendPlanId(500)).toBe("free");
    expect(recommendPlanId(1_000)).toBe("free");
    expect(recommendPlanId(1_001)).toBe("starter");
    expect(recommendPlanId(10_000)).toBe("starter");
    expect(recommendPlanId(10_001)).toBe("growth");
    expect(recommendPlanId(50_000)).toBe("growth");
    expect(recommendPlanId(50_001)).toBe("pro");
    expect(recommendPlanId(100_000)).toBe("pro");
    expect(recommendPlanId(100_001)).toBe("enterprise");
    expect(recommendPlanId(1_000_000)).toBe("enterprise");
  });

  test("every preset maps to a real plan", () => {
    for (const preset of MAU_PRESETS) {
      expect(PLAN_IDS).toContain(recommendPlanId(preset.mau));
    }
  });

  test("slider <-> MAU round-trips monotonically", () => {
    expect(Math.round(sliderToMau(mauToSlider(50_000)))).toBeCloseTo(50_000, -2);
    expect(mauToSlider(100)).toBe(0);
    expect(mauToSlider(1_000_000)).toBe(100);
    // Monotonic increasing.
    expect(sliderToMau(20)).toBeLessThan(sliderToMau(80));
  });
});

describe("formatting", () => {
  test("currency uses the rupee symbol and grouping", () => {
    const s = formatCurrency(2_400);
    expect(s).toContain("₹");
    expect(s).toContain("2,400");
    expect(formatCurrency(0)).toContain("0");
  });

  test("counts use plain grouping", () => {
    expect(formatCount(100_000)).toBe("100,000");
    expect(formatCompactCount(50_000)).toBe("50K");
    expect(formatCompactCount(1_000_000)).toBe("1M");
  });

  test("plan price display", () => {
    expect(formatPlanPrice(getPlan("free"), "monthly").main).toBe("₹0");
    expect(formatPlanPrice(getPlan("enterprise"), "monthly").main).toBe("Custom");
    const starterYear = formatPlanPrice(getPlan("starter"), "yearly");
    expect(starterYear.main).toBe("₹2,000");
    expect(starterYear.sub).toContain("billed annually");
  });
});

describe("CTA routing", () => {
  test("free -> signup, paid -> signup?plan=, enterprise -> contact", () => {
    expect(resolvePlanCtaHref(getPlan("free"))).toBe(SIGN_UP_URL);
    expect(resolvePlanCtaHref(getPlan("starter"))).toBe(`${SIGN_UP_URL}?plan=starter`);
    expect(resolvePlanCtaHref(getPlan("growth"))).toBe(`${SIGN_UP_URL}?plan=growth`);
    expect(resolvePlanCtaHref(getPlan("enterprise"))).toBe("/contact");
  });
});

describe("add-ons & usage", () => {
  test("add-ons only attach to plans that don't already bundle them", () => {
    const scim = addOns.find((a) => a.id === "scim");
    expect(scim?.availableOn).toEqual(["pro"]); // Enterprise already includes SCIM
    const saml = addOns.find((a) => a.id === "enterprise-sso-saml");
    expect(saml?.availableOn).toEqual(["growth"]); // Pro+ already include SAML
  });

  test("only MAU is public at launch, and its allowance matches the plans", () => {
    const publicDims = usageDimensions.filter((d) => d.publicAtLaunch);
    expect(publicDims.map((d) => d.id)).toEqual(["mau"]);
    const mau = usageDimensions.find((d) => d.id === "mau");
    expect(mau?.included.free).toBe(1_000);
    expect(mau?.included.pro).toBe(100_000);
    expect(mau?.included.enterprise).toBeNull();
  });
});
