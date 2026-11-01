import { describe, expect, test } from "bun:test";

import { goTarget } from "@/lib/go";

const env = {
  CONSOLE_URL: "http://console.test.id.qeet.localhost",
  DOCS_URL: "http://docs.test.id.qeet.localhost/",
};

describe("goTarget", () => {
  test("forwards to the configured console with path and query", () => {
    expect(goTarget("console", ["sign-up"], "?plan=starter", env)).toBe(
      "http://console.test.id.qeet.localhost/sign-up?plan=starter",
    );
  });

  test("keeps nested docs paths and drops a trailing slash on the origin", () => {
    expect(goTarget("docs", ["docs", "getting-started", "quickstart"], "", env)).toBe(
      "http://docs.test.id.qeet.localhost/docs/getting-started/quickstart",
    );
  });

  test("falls back to production when the container sets nothing", () => {
    expect(goTarget("console", ["sign-in"], "", {})).toBe("https://console.id.qeet.in/sign-in");
    expect(goTarget("docs", [], "", {})).toBe("https://docs.qeet.in/");
  });

  test("re-encodes path segments so they cannot change the target", () => {
    expect(goTarget("console", ["a/b", "..", "x?y"], "", env)).toBe(
      "http://console.test.id.qeet.localhost/a%2Fb/../x%3Fy",
    );
  });

  test("refuses anything that is not a known app", () => {
    expect(goTarget("evil.example", ["x"], "", env)).toBeNull();
    expect(goTarget("__proto__", [], "", env)).toBeNull();
  });
});
