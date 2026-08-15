/**
 * Purchasable add-ons. List prices are intentionally `custom` at launch — the
 * shape exists so an add-on can go live by editing this file rather than
 * rebuilding UI (§10). `availableOn` never lists a plan that already bundles the
 * capability (e.g. SCIM isn't offered as an add-on on Enterprise).
 */

import type { AddOn } from "./types";

export const addOns: AddOn[] = [
  {
    id: "additional-mau",
    name: "Additional MAU",
    description: "Extend your plan's monthly active user allowance without changing tier.",
    price: { custom: true },
    availableOn: ["starter", "growth", "pro"],
  },
  {
    id: "enterprise-sso-saml",
    name: "Enterprise SSO (SAML)",
    description: "Add SAML 2.0 single sign-on to the Growth plan.",
    price: { custom: true },
    availableOn: ["growth"],
  },
  {
    id: "scim",
    name: "SCIM provisioning",
    description: "Automated user & group provisioning from your directory.",
    price: { custom: true },
    availableOn: ["pro"],
  },
  {
    id: "advanced-audit",
    name: "Advanced audit & SIEM streaming",
    description: "Extended retention and streaming export to your SIEM.",
    price: { custom: true },
    availableOn: ["growth", "pro"],
  },
  {
    id: "premium-support",
    name: "Premium support",
    description: "Faster response targets and a shared support channel.",
    price: { custom: true },
    availableOn: ["starter", "growth", "pro"],
  },
  {
    id: "additional-environments",
    name: "Additional environments",
    description: "Extra isolated environments beyond your plan's included set.",
    price: { custom: true },
    availableOn: ["growth", "pro"],
  },
  {
    id: "machine-identities",
    name: "High-volume machine identities",
    description: "Scale service accounts and AI-agent identities for heavy M2M workloads.",
    price: { custom: true },
    availableOn: ["growth", "pro"],
  },
  {
    id: "dedicated-infra",
    name: "Dedicated infrastructure",
    description: "Isolated, single-tenant deployment for demanding workloads.",
    price: { custom: true },
    availableOn: ["pro"],
  },
];
