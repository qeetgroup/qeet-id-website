/**
 * Usage dimensions — the billing axes Qeet ID may meter in future. Only `mau`
 * is surfaced publicly at launch (`publicAtLaunch: true`); the rest are declared
 * so metering/limits can be added later without reshaping the model (§11). The
 * `mau` allowance is derived from {@link plans} so MAU has a single source.
 */

import { plans } from "./plans";
import type { PlanId, UsageDimension } from "./types";

/** Per-plan allowance helper in plan order. `null` = unlimited / custom. */
function allow(
  free: number | null,
  starter: number | null,
  growth: number | null,
  pro: number | null,
  enterprise: number | null,
): Record<PlanId, number | null> {
  return { free, starter, growth, pro, enterprise };
}

const mauIncluded = Object.fromEntries(plans.map((p) => [p.id, p.mau])) as Record<
  PlanId,
  number | null
>;

export const usageDimensions: UsageDimension[] = [
  {
    id: "mau",
    label: "Monthly active users",
    unit: "MAU",
    publicAtLaunch: true,
    included: mauIncluded,
  },
  {
    id: "organizations",
    label: "Organizations",
    unit: "orgs",
    publicAtLaunch: false,
    included: allow(1, null, null, null, null),
  },
  {
    id: "sso-connections",
    label: "SSO connections",
    unit: "connections",
    publicAtLaunch: false,
    included: allow(0, 0, 1, null, null),
  },
  {
    id: "scim-connections",
    label: "SCIM connections",
    unit: "connections",
    publicAtLaunch: false,
    included: allow(0, 0, 0, 0, null),
  },
  {
    id: "machine-identities",
    label: "Machine identities",
    unit: "identities",
    publicAtLaunch: false,
    included: allow(0, null, null, null, null),
  },
  {
    id: "api-requests",
    label: "API requests",
    unit: "req / mo",
    publicAtLaunch: false,
    included: allow(null, null, null, null, null),
  },
  {
    id: "webhook-deliveries",
    label: "Webhook deliveries",
    unit: "deliveries / mo",
    publicAtLaunch: false,
    included: allow(0, null, null, null, null),
  },
  {
    id: "audit-retention-days",
    label: "Audit log retention",
    unit: "days",
    publicAtLaunch: false,
    included: allow(7, 30, 90, 90, null),
  },
  {
    id: "environments",
    label: "Environments",
    unit: "environments",
    publicAtLaunch: false,
    included: allow(1, 1, 2, 3, null),
  },
];

/** Dimensions shown publicly at launch. */
export const publicUsageDimensions = usageDimensions.filter((d) => d.publicAtLaunch);
