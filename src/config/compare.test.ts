/**
 * /compare — copy tests. Runs with `bun test`.
 *
 * Every platform is compared in the same fifteen areas, from research with a
 * freeze date; these tests hold the pages to that shape and keep Qeet ID's
 * column to what the record supports. The revalidation test fails once a
 * platform's facts are past their re-read date — re-check them, then move
 * `checked` and `revalidate` on.
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

import { AREAS, COMPARE_INDEX, COMPETITORS, RETIRED_SLUGS, tally } from "@/config/compare";
import { MIGRATE_PAGE } from "@/config/migrate";
import { longDate } from "@/lib/dates";

const DAY = 86_400_000;
const QEET = AREAS.map((a) => a.qeet).join("\n");

describe("the fifteen areas", () => {
  test("fifteen, each with a Qeet ID cell", () => {
    expect(AREAS).toHaveLength(15);
    expect(new Set(AREAS.map((a) => a.id)).size).toBe(15);
    for (const a of AREAS) expect(a.qeet.length).toBeGreaterThan(20);
  });

  test("Qeet ID's column claims nothing the record does not support", () => {
    const forbidden: [RegExp, string][] = [
      [/generally available|\bGA\b|available now/i, "Qeet ID is in development"],
      [/\bcertified\b|SOC ?2|ISO ?27001/i, "Qeet ID holds no certification"],
      [/\bSLA\b|uptime/i, "no uptime is promised"],
      [/\bregions?\b|residency/i, "no region choice is offered"],
    ];
    for (const [re, why] of forbidden) expect(QEET, why).not.toMatch(re);
  });

  test("self-hosting is mentioned only to say there is none", () => {
    const self = QEET.split("\n").filter((l) => /self-host/i.test(l));
    expect(self).toEqual(["A managed service run by Qeet Group. There is no self-hosted edition."]);
  });

  test("what is not in 1.0 says so", () => {
    const by = Object.fromEntries(AREAS.map((a) => [a.id, a.qeet]));
    expect(by.tokens).toMatch(/^Not in 1\.0\./);
    expect(by.sdks).toMatch(/^Not published yet\./);
    expect(by.status).toBe("In development. 1.0 is planned for 1 February 2027.");
  });
});

describe("each platform", () => {
  test("eight, with unique slugs", () => {
    expect(COMPETITORS).toHaveLength(8);
    expect(new Set(COMPETITORS.map((c) => c.slug)).size).toBe(8);
  });

  for (const c of COMPETITORS) {
    describe(c.name, () => {
      test("every area is compared, or marked as outside its job — at most two", () => {
        expect(Object.keys(c.cells).sort()).toEqual(AREAS.map((a) => a.id).sort());
        expect(tally(c).compared).toBeGreaterThanOrEqual(13);
      });

      test("a split says who leads on what; nothing else carries a note", () => {
        for (const cell of Object.values(c.cells)) {
          if (!cell) continue;
          if (cell.lead === "split") expect(cell.note, cell.them).toBeTruthy();
          else expect(cell.note, cell.them).toBeUndefined();
        }
      });

      test("release status counts against Qeet ID until 1.0", () => {
        expect(c.cells.status?.lead).toBe("them");
        expect(c.cells.status?.them).toMatch(/^Generally available/);
      });

      test("the other platform leads somewhere other than release status", () => {
        expect(tally(c).them).toBeGreaterThanOrEqual(2);
      });

      test("dated research, re-read within three months, not yet due", () => {
        const checked = Date.parse(c.checked);
        const due = Date.parse(c.revalidate);
        expect(Number.isNaN(checked)).toBe(false);
        expect(due - checked).toBeLessThanOrEqual(92 * DAY);
        expect(due + DAY, `${c.name}: re-check the facts (due ${c.revalidate})`).toBeGreaterThan(
          Date.now(),
        );
        expect(c.research).toMatch(/^Platform research 00\d — /);
      });

      test("first-party sources, each dated", () => {
        expect(c.sources.length).toBeGreaterThanOrEqual(5);
        for (const s of c.sources) {
          expect(s.title.length).toBeGreaterThan(2);
          expect(s.date).toMatch(/\d{4}/);
        }
      });

      test("a choice for each side", () => {
        expect(c.chooseThem.length).toBeGreaterThanOrEqual(3);
        expect(c.chooseQeet.length).toBeGreaterThanOrEqual(3);
      });

      test("the move is offered only where the importer reads its export", () => {
        expect(Boolean(c.migrate)).toBe(MIGRATE_PAGE.from.includes(c.name as never));
      });
    });
  }
});

describe("the index and the retired pages", () => {
  test("the index names all eight", () => {
    for (const c of COMPETITORS) expect(COMPARE_INDEX.meta.description).toContain(c.name);
  });

  test("retired slugs are not compared, and each redirects to /compare", () => {
    const config = readFileSync(new URL("../../next.config.ts", import.meta.url), "utf8");
    const route = config.match(/\/compare\/:slug\(([^)]+)\)/)?.[1].split("|") ?? [];
    expect(route.sort()).toEqual([...RETIRED_SLUGS].sort());
    for (const s of RETIRED_SLUGS) expect(COMPETITORS.some((c) => c.slug === s)).toBe(false);
  });

  test("dates read as days", () => {
    expect(longDate("2026-09-15")).toBe("15\u00a0September\u00a02026");
  });
});
