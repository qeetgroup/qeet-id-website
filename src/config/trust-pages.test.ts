/**
 * /security and /migrate — copy tests. Runs with `bun test`.
 *
 * Their words live in config/security.ts and config/migrate.ts, each line
 * annotated with its source. These tests hold them to what the record says —
 * and to what it does not: no response times or safe harbour are published
 * for Qeet ID, and no provider's passwords come across in an import.
 */

import { describe, expect, test } from "bun:test";

import { MIGRATE_PAGE } from "@/config/migrate";
import { SECURITY_PAGE } from "@/config/security";

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}
const SEC = strings(SECURITY_PAGE).join("\n");
const MIG = strings(MIGRATE_PAGE).join("\n");

describe("both pages — claims the record does not support", () => {
  const forbidden: [RegExp, string][] = [
    [/self[- ]?host/i, "Qeet ID is not offered self-hosted"],
    [/generally available|\bGA\b|available now/i, "Qeet ID is in development"],
    [/\bcertified\b|certification (achieved|complete)/i, "certification status is unknown"],
    [/\d+(\.\d+)?\s?% (uptime|availability)|\bSLA\b/i, "no uptime is promised"],
    [/trusted by|customers? (love|trust)/i, "no customers to cite"],
    [/install the sdk|npm i(nstall)? @qeet/i, "no SDK is published"],
  ];
  for (const [rx, why] of forbidden) {
    test(`no "${rx.source}" — ${why}`, () => {
      expect(`${SEC}\n${MIG}`.match(rx)?.[0]).toBeUndefined();
    });
  }
});

describe("/security", () => {
  test("no reporting promise the record does not make (qeet-context SECURITY.md §11)", () => {
    expect(
      SEC.match(
        /safe[- ]?harbou?r|bug bounty|bounty|within \d+ (hours|days)|acknowledge within/i,
      )?.[0],
    ).toBeUndefined();
  });

  test("the two published reporting channels are both given", () => {
    expect(SECURITY_PAGE.report.email).toBe("security@qeet.in");
    expect(SECURITY_PAGE.report.body).toContain("private vulnerability reporting");
  });

  test("compliance evidence is never presented as certification", () => {
    expect(SEC).toContain("Evidence is not certification");
  });

  test("only rules held in code are listed (I3, I4, I5, I8 are not yet held)", () => {
    const listed = SECURITY_PAGE.sections.flatMap((s) =>
      "rules" in s ? s.rules.map((r) => r.n) : [],
    );
    for (const n of ["I3", "I4", "I5", "I8"]) expect(listed).not.toContain(n);
  });
});

describe("/migrate", () => {
  test("never says passwords come across (FLOWS/tenant-management.md)", () => {
    expect(
      MIG.match(
        /passwords? (come|comes|move|moves) (across|over)|keep (their|your) passwords?|nobody (has to )?resets?|without a reset|zero[- ]downtime/i,
      )?.[0],
    ).toBeUndefined();
    expect(MIGRATE_PAGE.comes.notComing).toMatch(
      /^Passwords and second factors do not come across/,
    );
  });

  test("lists exactly the three providers the import adapters read", () => {
    expect([...MIGRATE_PAGE.from]).toEqual(["Auth0", "Amazon Cognito", "Azure AD B2C"]);
    expect(MIGRATE_PAGE.comes.rows.map((r) => r[0])).toEqual([...MIGRATE_PAGE.from]);
  });
});
