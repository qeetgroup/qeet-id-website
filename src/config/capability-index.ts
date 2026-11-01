/**
 * The six capabilities: slug, name, icon and one line each — the Product menu,
 * the footer, the sitemap and each page's related index read this. The pages'
 * copy is config/capabilities.ts.
 */
import {
  BotIcon,
  FingerprintPatternIcon,
  FolderSyncIcon,
  PlugIcon,
  ScrollTextIcon,
  WaypointsIcon,
} from "@qeetrix/icons";

/** The six capabilities, in the order the Product menu and the related index list them. */
export const CAPABILITIES = [
  {
    slug: "authentication",
    name: "Authentication",
    icon: FingerprintPatternIcon,
    line: "Passkeys first, with passwords, magic links, social accounts and second factors.",
  },
  {
    slug: "enterprise-sso",
    name: "Enterprise SSO",
    icon: PlugIcon,
    line: "SAML and OpenID Connect, both ways, with a setup link for your customers' IT.",
  },
  {
    slug: "directory-sync",
    name: "Directory sync",
    icon: FolderSyncIcon,
    line: "SCIM 2.0 and LDAP / Active Directory, with sync health you can see.",
  },
  {
    slug: "authorization",
    name: "Authorization",
    icon: WaypointsIcon,
    line: "Roles, attributes and relationships, decided on the server — and a deny always wins.",
  },
  {
    slug: "audit-log",
    name: "Audit log",
    icon: ScrollTextIcon,
    line: "Hash-chained, verifiable end to end, and streamed to your SIEM.",
  },
  {
    slug: "ai-agents",
    name: "AI agents and machines",
    icon: BotIcon,
    line: "Identities for agents, API keys and devices, with delegation that says who acted.",
  },
] as const;

export type CapabilitySlug = (typeof CAPABILITIES)[number]["slug"];
