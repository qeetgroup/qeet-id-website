/**
 * /compare and /compare/[slug] — Qeet ID beside eight identity platforms, in
 * the same fifteen areas, saying where each one leads.
 *
 * Every competitor cell and verdict comes from Qeet ID's platform research
 * (qeet-id-files/research/platforms/00N-*.md — "<name> vs Qeet ID" table), which
 * reads each vendor's own documentation, pricing and release notes and freezes
 * the evidence on the date in `checked`. Verdicts follow that table's
 * assessment, re-read where Qeet ID has changed since: Qeet ID is in development,
 * so it is not credited with being "shipped", and self-hosting — an owner
 * decision of 17 Oct 2026 — is not offered. Research is revalidated by the
 * `revalidate` date; a page past it must be re-checked (compare.test.ts).
 *
 * The Qeet ID column is one set of cells, shared by every page and checked
 * against qeet-id-server `develop` (65648a7, 29 Oct 2026) and the copy the
 * rest of the site already makes — see the note on each.
 */

export type AreaId =
  | "passkeys"
  | "factors"
  | "sso"
  | "setup"
  | "scim"
  | "models"
  | "explain"
  | "agents"
  | "agent-stop"
  | "audit"
  | "siem"
  | "tokens"
  | "hosting"
  | "sdks"
  | "status";

/** Who leads in an area: the other platform, Qeet ID, neither, or each in a different way. */
export type Lead = "them" | "qeet" | "even" | "split";

/** `short` heads the index matrix's narrow, upright columns. */
export type Area = { id: AreaId; name: string; short: string; qeet: string };

export const AREA_GROUPS: readonly { name: string; areas: readonly Area[] }[] = [
  {
    name: "Sign-in",
    areas: [
      /** capabilities.ts AUTHENTICATION: "Sign up with a passkey — no password needed" */
      {
        id: "passkeys",
        name: "Passkeys",
        short: "Passkeys",
        qeet: "Passkey-first sign-up: an account can exist with no password at all.",
      },
      /** capabilities.ts (TOTP, email and SMS codes, push, recovery codes); features.ts: SMS from Starter */
      {
        id: "factors",
        name: "Second factors",
        short: "Second factors",
        qeet: "TOTP, email and SMS codes, push approval and recovery codes. SMS from the Starter plan.",
      },
    ],
  },
  {
    name: "Enterprise",
    areas: [
      /** capabilities.ts ENTERPRISE_SSO; features.ts: SAML on Pro and Enterprise */
      {
        id: "sso",
        name: "Single sign-on",
        short: "Single sign-on",
        qeet: "SAML 2.0 and OpenID Connect, as service provider and as identity provider. Pro and Enterprise.",
      },
      /** capabilities.ts ENTERPRISE_SSO "Admin portal": capability-scoped, time-limited links; test before use */
      {
        id: "setup",
        name: "Set-up by the customer's IT team",
        short: "IT team set-up",
        qeet: "A single-purpose, time-limited link to an admin portal — no account needed, and the connection is tested before anyone signs in.",
      },
      /** capabilities.ts DIRECTORY_SYNC; features.ts: SCIM on Enterprise */
      {
        id: "scim",
        name: "SCIM provisioning",
        short: "SCIM",
        qeet: "SCIM 2.0 users and groups, PATCH included. Enterprise.",
      },
    ],
  },
  {
    name: "Authorization",
    areas: [
      /** capabilities.ts AUTHORIZATION: RBAC, ABAC and ReBAC over the same tenant tables */
      {
        id: "models",
        name: "Roles, attributes and relationships",
        short: "Policy models",
        qeet: "Roles, attribute policies and relationship tuples in the same store as the users — nothing to keep in sync.",
      },
      /** PRODUCT.md: explain=true grant-path tracing on RBAC and ReBAC */
      {
        id: "explain",
        name: "Why access was granted",
        short: "Explained access",
        qeet: "Ask with explain, and the answer names the role, group or relationship that granted it.",
      },
    ],
  },
  {
    name: "AI agents",
    areas: [
      /** security.ts: agent tokens a minute to an hour, re-minted, never refreshed; capabilities.ts AI_AGENTS: sponsor */
      {
        id: "agents",
        name: "Agents as their own identity",
        short: "Agent identity",
        qeet: "An agent is its own kind of identity, with a human sponsor on record and tokens of a minute to an hour that are never refreshed.",
      },
      /** capabilities.ts AI_AGENTS: kill switch for the whole tenant; security.ts: checked on every request */
      {
        id: "agent-stop",
        name: "Stopping an agent",
        short: "Stopping agents",
        qeet: "Suspend one agent or every agent in the tenant. Agents are checked on every request, so a live token stops at once.",
      },
    ],
  },
  {
    name: "Audit",
    areas: [
      /** capabilities.ts AUDIT_LOG: SHA-256 chain, /verify; develop: scheduled checkpoints */
      {
        id: "audit",
        name: "Tamper-evident audit",
        short: "Tamper evidence",
        qeet: "Each entry carries the SHA-256 hash of the one before, and a verify endpoint walks the chain end to end.",
      },
      /** capabilities.ts AUDIT_LOG sinks (Splunk HEC, Datadog, HTTP); features.ts: SIEM on Enterprise */
      {
        id: "siem",
        name: "Streaming to a SIEM",
        short: "SIEM streaming",
        qeet: "Streams to Splunk, Datadog or any HTTP endpoint. Enterprise.",
      },
    ],
  },
  {
    name: "Platform",
    areas: [
      /** develop: no DPoP, RFC 8705, PAR or private_key_jwt anywhere */
      {
        id: "tokens",
        name: "Sender-constrained tokens",
        short: "Bound tokens",
        qeet: "Not in 1.0. Bearer tokens only — no DPoP or mTLS-bound tokens.",
      },
      /** Owner decision, 17 Oct 2026: offered only as a Qeet Group service */
      {
        id: "hosting",
        name: "Where it runs",
        short: "Hosting",
        qeet: "A managed service run by Qeet Group. There is no self-hosted edition.",
      },
      /** product-index.ts "Not in 1.0": SDKs not published */
      {
        id: "sdks",
        name: "SDKs and tooling",
        short: "SDKs",
        qeet: "Not published yet. Standard OpenID Connect, SAML and SCIM work with the libraries you already use.",
      },
      /** home.ts STATUS */
      {
        id: "status",
        name: "Release status",
        short: "Release status",
        qeet: "In development. 1.0 is planned for 1 February 2027.",
      },
    ],
  },
];

export const AREAS: readonly Area[] = AREA_GROUPS.flatMap((g) => g.areas);

export type Cell = {
  /** What the other platform does, from its own documentation. */
  them: string;
  lead: Lead;
  /** For a split: who leads on what, in one line. */
  note?: string;
};

export type Source = { title: string; publisher: string; date: string };

export type Competitor = {
  slug: string;
  name: string;
  /** What it is, in a few words, for the index. */
  kind: string;
  /** One or two sentences: what it is and who it is for. */
  summary: string;
  /** Research evidence freeze (ISO date) and its revalidate-by date. */
  checked: string;
  revalidate: string;
  /** The research note the cells come from. */
  research: string;
  chooseThem: readonly string[];
  chooseQeet: readonly string[];
  /** Every area, or null where the area is not part of the platform's job. */
  cells: Record<AreaId, Cell | null>;
  sources: readonly Source[];
  /** Qeet ID's importer reads this platform's user export (config/migrate.ts). */
  migrate?: true;
};

/* ---------- 001 — Auth0, evidence frozen 2026-09-15 ---------- */

const AUTH0: Competitor = {
  slug: "auth0",
  name: "Auth0",
  kind: "Customer identity, part of Okta",
  summary:
    "Auth0 is the reference point for customer identity: the broadest developer platform in the field, run by Okta since 2021.",
  checked: "2026-09-15",
  revalidate: "2026-12-15",
  research: "Platform research 001 — Auth0",
  chooseThem: [
    "You need to go live now, on a platform that is generally available.",
    "You want SDKs, quickstarts, a CLI and a Terraform provider for every stack.",
    "You need financial-grade tokens — DPoP, mTLS and FAPI.",
    "You need a private cloud in a region of your choosing.",
  ],
  chooseQeet: [
    "You want users, roles and relationship checks in one store, with no sync to build.",
    "You need to show why access was granted — the role, group or relationship behind it.",
    "You want an audit log whose integrity you can verify yourself.",
  ],
  cells: {
    passkeys: {
      them: "Passkeys on every plan, in New Universal Login. A password path remains, and MFA still runs after a passkey by default.",
      lead: "split",
      note: "Auth0 leads on reach and mobile SDKs; Qeet ID on passkey-only accounts.",
    },
    factors: {
      them: "Push, SMS, voice, email, TOTP, WebAuthn, Duo and recovery codes — none on the Free plan.",
      lead: "them",
    },
    sso: {
      them: "SAML as service provider and identity provider, and a broad catalogue of enterprise connections; one connection on Free.",
      lead: "them",
    },
    setup: {
      them: "Self-service SSO is listed on Free; a newer embeddable set-up UI is in Early Access.",
      lead: "split",
      note: "Auth0 lets more be self-configured; Qeet ID's links are single-purpose and short-lived.",
    },
    scim: {
      them: "Inbound SCIM per connection; a group can hold only users. Outbound SCIM is a pattern built from Actions.",
      lead: "even",
    },
    models: {
      them: "Roles in Auth0; relationship checks in Auth0 FGA, a separate service. Syncing roles into FGA is “coming soon”.",
      lead: "qeet",
    },
    explain: { them: "No decision-explanation API documented.", lead: "qeet" },
    agents: {
      them: "Auth0 for AI Agents is generally available; a distinct agent principal (Agent as Principal) is in Early Access.",
      lead: "split",
      note: "Auth0 leads on multi-hop delegation; Qeet ID on a sponsor required for every agent.",
    },
    "agent-stop": {
      them: "Deleting an agent is documented; disabling one, or every agent at once, is not.",
      lead: "qeet",
    },
    audit: {
      them: "Logs are described as immutable; tamper-evidence comes from a third-party integration. Kept 1 to 30 days by plan.",
      lead: "qeet",
    },
    siem: {
      them: "Streams to Splunk, Datadog, Sumo Logic, EventBridge, Event Grid and HTTP; not on Free.",
      lead: "them",
    },
    tokens: {
      them: "DPoP, mTLS and PAR in Highly Regulated Identity, with FAPI certification.",
      lead: "them",
    },
    hosting: {
      them: "Public cloud, or a managed private cloud on Enterprise in 60+ regions. No self-hosting.",
      lead: "them",
    },
    sdks: {
      them: "30+ SDKs and quickstarts, a Terraform provider and the auth0 CLI.",
      lead: "them",
    },
    status: { them: "Generally available.", lead: "them" },
  },
  sources: [
    { title: "Pricing", publisher: "Auth0", date: "read 15 September 2026" },
    {
      title: "Multi-factor Authentication",
      publisher: "Auth0 Docs",
      date: "read 15 September 2026",
    },
    {
      title: "Passkey Authentication for Database Connections",
      publisher: "Auth0 Docs",
      date: "read 15 September 2026",
    },
    { title: "Configure Inbound SCIM", publisher: "Auth0 Docs", date: "read 15 September 2026" },
    {
      title: "Scale Enterprise Teams Securely with Roles for Auth0 FGA",
      publisher: "Auth0 Blog",
      date: "2026",
    },
    {
      title: "Agent as Principal: A Purpose-Built Identity for Agents",
      publisher: "Auth0 Blog",
      date: "30 July 2026",
    },
    {
      title: "Log Data Retention · Log Streaming",
      publisher: "Auth0 Docs",
      date: "read 15 September 2026",
    },
    { title: "Highly Regulated Identity", publisher: "Auth0 Docs", date: "read 15 September 2026" },
    {
      title: "Deployment Options · Private Cloud",
      publisher: "Auth0 Docs",
      date: "read 15 September 2026",
    },
    { title: "Changelog", publisher: "Auth0", date: "current to 8 September 2026" },
  ],
  migrate: true,
};

/* ---------- 002 — Okta, evidence frozen 2026-09-15 ---------- */

const OKTA: Competitor = {
  slug: "okta",
  name: "Okta",
  kind: "Workforce identity",
  summary:
    "Okta is a workforce identity platform: employees, their devices and the thousands of apps they use. Customer identity at Okta is Auth0.",
  checked: "2026-09-15",
  revalidate: "2026-12-15",
  research: "Platform research 002 — Okta",
  chooseThem: [
    "You are signing your own employees into the apps they work in.",
    "You need device-bound sign-in, device posture and desktop login.",
    "You need to provision accounts out to thousands of apps, or from Workday.",
    "You need access reviews and governance, generally available today.",
  ],
  chooseQeet: [
    "You are building a product, and its customers' people sign in to it.",
    "You want roles, attribute policies and relationship checks in one place, with the reason for each decision.",
    "You want each AI agent stopped within one request when it is suspended.",
  ],
  cells: {
    passkeys: {
      them: "FastPass: device-bound, phishing-resistant sign-in tied to device assurance, on desktop and mobile.",
      lead: "split",
      note: "Okta leads on device binding and desktop reach; Qeet ID on passkey-only accounts.",
    },
    factors: {
      them: "Okta Verify push and TOTP, FIDO2, SMS, voice, email and Duo.",
      lead: "them",
    },
    sso: {
      them: "SAML as service provider and identity provider, and thousands of pre-built app integrations.",
      lead: "them",
    },
    setup: null,
    scim: {
      them: "Provisions accounts out to apps, with group push, and imports from HR systems such as Workday.",
      lead: "split",
      note: "Okta leads on pushing accounts out; Qeet ID is a SCIM endpoint any directory can push to.",
    },
    models: {
      them: "Group-based app assignment and policy conditions; relationship checks are Auth0 FGA, a separate product.",
      lead: "qeet",
    },
    explain: {
      them: "Access reviews show a person's total access; a decision explanation is not documented.",
      lead: "qeet",
    },
    agents: {
      them: "Okta for AI Agents has been generally available since 29 April 2026: agents in the directory, a human owner for each one built in-house.",
      lead: "even",
    },
    "agent-stop": {
      them: "An instant kill switch is generally available; how it is enforced is not documented.",
      lead: "qeet",
    },
    audit: {
      them: "The System Log keeps 90 days on every plan; no hash chain over it is documented.",
      lead: "split",
      note: "Okta leads on the retention every customer gets; Qeet ID on a chain you can verify.",
    },
    siem: {
      them: "Streams to Amazon EventBridge and Splunk Cloud, without event filtering.",
      lead: "split",
      note: "Okta reaches further through EventBridge; Qeet ID never replays history into a new sink.",
    },
    tokens: {
      them: "Not documented for workforce sign-in; DPoP and mTLS are Auth0 features.",
      lead: "even",
    },
    hosting: {
      them: "A cell architecture across six regions, with local cells to buy. No self-hosting.",
      lead: "them",
    },
    sdks: {
      them: "SDKs, a Terraform provider, a CLI and the Okta Integration Network.",
      lead: "them",
    },
    status: { them: "Generally available.", lead: "them" },
  },
  sources: [
    {
      title: "Okta for AI Agents is Now Generally Available",
      publisher: "Okta Blog",
      date: "29 April 2026",
    },
    { title: "Okta FastPass", publisher: "Okta Docs", date: "read 15 September 2026" },
    {
      title: "Provisioning · Workday provisioning",
      publisher: "Okta Docs",
      date: "read 15 September 2026",
    },
    {
      title: "Log streaming · Log Stream API",
      publisher: "Okta Docs",
      date: "read 15 September 2026",
    },
    {
      title: "Okta + Data Residency · Cells and Data Residency",
      publisher: "Okta",
      date: "read 15 September 2026",
    },
    { title: "Plans and Pricing", publisher: "Okta", date: "read 15 September 2026" },
  ],
};

/* ---------- 003 — Microsoft Entra, evidence frozen 2026-09-16 ---------- */

const ENTRA: Competitor = {
  slug: "entra",
  name: "Microsoft Entra",
  kind: "Workforce and external identity",
  summary:
    "Microsoft Entra ID signs in the people of organisations on Microsoft's cloud; Entra External ID, the successor to Azure AD B2C, handles customers.",
  checked: "2026-09-16",
  revalidate: "2026-12-16",
  research: "Platform research 003 — Microsoft Entra",
  chooseThem: [
    "Your organisation already runs on Microsoft 365 and Azure.",
    "You need Conditional Access over users, devices, locations and risk in one policy language.",
    "You need device-bound tokens and certificate-based sign-in.",
    "You need national clouds or Microsoft's compliance estate.",
  ],
  chooseQeet: [
    "You want object-level authorization from the identity platform, not left to each application.",
    "You want one model for your customers, not separate workforce and external tenants.",
    "You want each grant traced back to the role, group or relationship behind it.",
  ],
  cells: {
    passkeys: {
      them: "Security keys and Authenticator passkeys, device-bound and synced told apart, and keys restricted by model.",
      lead: "split",
      note: "Entra leads on assurance controls and desktop reach; Qeet ID on passkey-only accounts.",
    },
    factors: {
      them: "Push with number matching, TOTP, SMS, voice, email, OATH tokens, FIDO2 and certificates.",
      lead: "them",
    },
    sso: {
      them: "A SAML identity provider, with inbound SAML and WS-Federation.",
      lead: "even",
    },
    setup: null,
    scim: {
      them: "Provisions out to apps, and in from Workday, SAP SuccessFactors or an API.",
      lead: "split",
      note: "Entra leads on HR sources; Qeet ID is a SCIM endpoint any directory can push to.",
    },
    models: {
      them: "Roles and Conditional Access; authorization over an application's own objects is left to the application.",
      lead: "qeet",
    },
    explain: {
      them: "Sign-in logs show which Conditional Access policies applied; no API explains how an entitlement was granted.",
      lead: "split",
      note: "Entra explains access policy; Qeet ID explains how an entitlement was derived.",
    },
    agents: {
      them: "Entra Agent ID is generally available, with agent blueprints and inheritable permissions.",
      lead: "them",
    },
    "agent-stop": {
      them: "An agent can be disabled; when that takes effect is not documented.",
      lead: "qeet",
    },
    audit: {
      them: "Logs kept 7 days free and 30 days on P1 and P2; immutability through Azure Storage policy, not a verifiable chain.",
      lead: "split",
      note: "Entra leads on its evidence estate; Qeet ID never deletes audit and chains it.",
    },
    siem: null,
    tokens: {
      them: "Token protection binds session tokens to the device — generally available for native apps, in preview for some web apps.",
      lead: "them",
    },
    hosting: {
      them: "Multi-tenant cloud, national clouds included. No self-hosting.",
      lead: "them",
    },
    sdks: {
      them: "Microsoft Graph SDKs, MSAL, Terraform, PowerShell, Bicep and a CLI.",
      lead: "them",
    },
    status: { them: "Generally available.", lead: "them" },
  },
  sources: [
    {
      title: "What is Microsoft Entra Agent ID?",
      publisher: "Microsoft Learn",
      date: "14 April 2026",
    },
    {
      title: "Passkeys (FIDO2) authentication method",
      publisher: "Microsoft Learn",
      date: "read 16 September 2026",
    },
    {
      title: "Token Protection in Conditional Access",
      publisher: "Microsoft Learn",
      date: "read 16 September 2026",
    },
    {
      title: "Provisioning · API-driven inbound provisioning",
      publisher: "Microsoft Learn",
      date: "read 16 September 2026",
    },
    {
      title: "Microsoft Entra data retention",
      publisher: "Microsoft Learn",
      date: "read 16 September 2026",
    },
    {
      title: "Microsoft Entra External ID FAQ",
      publisher: "Microsoft Learn",
      date: "read 16 September 2026",
    },
    {
      title: "Microsoft Entra Plans and Pricing",
      publisher: "Microsoft",
      date: "read 16 September 2026",
    },
  ],
};

/* ---------- 004 — Ping Identity, evidence frozen 2026-09-16 ---------- */

const PING: Competitor = {
  slug: "ping",
  name: "Ping Identity",
  kind: "Enterprise identity, cloud and software",
  summary:
    "Ping Identity sells identity to large enterprises and governments — PingOne in the cloud, and PingFederate and its siblings as software to run yourself.",
  checked: "2026-09-16",
  revalidate: "2026-12-16",
  research: "Platform research 004 — Ping Identity",
  chooseThem: [
    "You need to run identity yourself, in a government cloud, or both.",
    "You need the widest range of factors, offline desktop methods included.",
    "You need DPoP-bound tokens today.",
    "You need a deep attribute-policy product alongside sign-in.",
  ],
  chooseQeet: [
    "You want relationship checks next to roles and attribute policies, in the same store as your users.",
    "You need each grant traced to the role, group or relationship behind it.",
    "You want an audit log with an integrity check you can run yourself.",
  ],
  cells: {
    passkeys: {
      them: "Passkeys through a PingID FIDO2 policy; Windows and Mac login accept security keys only.",
      lead: "split",
      note: "Ping signs in desktops with security keys; Qeet ID builds sign-up around the passkey.",
    },
    factors: {
      them: "TOTP, push, SMS, email, biometrics, FIDO2, YubiKey OTP and offline desktop methods.",
      lead: "them",
    },
    sso: {
      them: "SAML in both directions across PingOne, PingFederate and PingAM, with WS-Federation and WS-Trust.",
      lead: "even",
    },
    setup: null,
    scim: { them: "SCIM, LDAP and PingIDM.", lead: "even" },
    models: {
      them: "Attribute policies in PingAuthorize; a relationship model is not documented.",
      lead: "split",
      note: "Ping leads on policy depth; Qeet ID on all three models in one store.",
    },
    explain: {
      them: "Policy evaluation is explained; how an entitlement was granted is not.",
      lead: "qeet",
    },
    agents: {
      them: "Agents have been first-class identities since 31 March 2026, generally available.",
      lead: "even",
    },
    "agent-stop": { them: "A per-agent kill switch is not documented.", lead: "qeet" },
    audit: {
      them: "90 days of user events and two years of configuration; no integrity guarantee documented.",
      lead: "qeet",
    },
    siem: { them: "Webhooks in three formats, 50 per environment.", lead: "even" },
    tokens: { them: "DPoP in PingFederate 12.0 and later.", lead: "them" },
    hosting: {
      them: "Four deployment options, customer-operated software and a government cloud among them.",
      lead: "them",
    },
    sdks: {
      them: "Published, versioned iOS, Android and JavaScript SDKs; no server SDKs named.",
      lead: "them",
    },
    status: { them: "Generally available.", lead: "them" },
  },
  sources: [
    { title: "Deployment options", publisher: "Ping Identity", date: "read 16 September 2026" },
    {
      title: "Introduction to PingFederate",
      publisher: "Ping Identity Docs",
      date: "read 16 September 2026",
    },
    {
      title: "PingFederate 12.0 release notes",
      publisher: "Ping Identity Docs",
      date: "read 16 September 2026",
    },
    {
      title: "FIDO2 authentication requirements and limitations",
      publisher: "PingID Docs",
      date: "read 16 September 2026",
    },
    {
      title: "Introduction to PingOne Authorize",
      publisher: "Ping Identity Docs",
      date: "read 16 September 2026",
    },
    {
      title: "Developer release notes — Identity for AI general availability",
      publisher: "Ping Identity",
      date: "31 March 2026",
    },
  ],
};

/* ---------- 005 — Keycloak, evidence frozen 2026-09-16 ---------- */

const KEYCLOAK: Competitor = {
  slug: "keycloak",
  name: "Keycloak",
  kind: "Open-source identity you run",
  summary:
    "Keycloak is open-source identity and access management under the Apache 2.0 licence — software you deploy, run and upgrade yourself.",
  checked: "2026-09-16",
  revalidate: "2026-12-16",
  research: "Platform research 005 — Keycloak",
  chooseThem: [
    "You want to run identity yourself, on your own infrastructure.",
    "You need the deepest standards coverage — FAPI 2.0, DPoP, PAR and mTLS.",
    "You want open-source software with no commercial gates.",
    "You have the team to triage releases and run it in high availability.",
  ],
  chooseQeet: [
    "You want identity run for you, not another system to operate.",
    "You need AI agents as their own identities, with a sponsor and a kill switch.",
    "You want relationship checks, explained decisions and a hash-chained audit log built in.",
  ],
  cells: {
    passkeys: {
      them: "Passkeys with conditional UI and a discoverable-credential policy; passkey-first sign-up is composed from flows.",
      lead: "split",
      note: "Keycloak leads on passkey policy; Qeet ID on passkey-first sign-up.",
    },
    factors: {
      them: "TOTP and HOTP, WebAuthn, recovery codes, X.509 and Kerberos; email and SMS codes need an extension.",
      lead: "split",
      note: "Keycloak reaches certificates and Kerberos; Qeet ID has email and SMS codes built in.",
    },
    sso: {
      them: "OpenID Connect and SAML brokering, with first- and post-broker login flows.",
      lead: "them",
    },
    setup: {
      them: "An outside IT team needs a delegated admin account.",
      lead: "qeet",
    },
    scim: {
      them: "SCIM is in preview, with richer filtering.",
      lead: "split",
      note: "Keycloak leads on filtering and search; its SCIM is still a preview.",
    },
    models: {
      them: "Role, regex, time and JavaScript policies; no relationship model.",
      lead: "qeet",
    },
    explain: {
      them: "No explanation API; the policy evaluation tool is a simulator.",
      lead: "qeet",
    },
    agents: {
      them: "No agent identity: no agent principal, owner or lifecycle.",
      lead: "qeet",
    },
    "agent-stop": { them: "No agent kill switch.", lead: "qeet" },
    audit: {
      them: "Events as database rows or log lines; no chaining, signing or verification.",
      lead: "qeet",
    },
    siem: {
      them: "Write an Event Listener provider to send events out.",
      lead: "qeet",
    },
    tokens: {
      them: "DPoP, PAR, JAR, JARM and mTLS; OpenID certified across eight profiles, FAPI 2.0 conformance passed.",
      lead: "them",
    },
    hosting: {
      them: "Self-hosted: container images, an Operator and published high-availability guides. You run it.",
      lead: "split",
      note: "Keycloak is software you run; Qeet ID is a service run for you.",
    },
    sdks: {
      them: "keycloak-js, Java and JavaScript admin clients, admin CLI tools and versioned documentation.",
      lead: "them",
    },
    status: { them: "Generally available — 26.7.3, August 2026.", lead: "them" },
  },
  sources: [
    { title: "Keycloak 26.7.0 released", publisher: "Keycloak", date: "9 July 2026" },
    { title: "Keycloak 26.7.3 released", publisher: "Keycloak", date: "August 2026" },
    { title: "Specifications implemented", publisher: "Keycloak", date: "read 16 September 2026" },
    {
      title: "Passkeys support in upcoming Keycloak release (26.4)",
      publisher: "Keycloak",
      date: "September 2025",
    },
    {
      title: "Authorization Services Guide",
      publisher: "Keycloak",
      date: "read 16 September 2026",
    },
    {
      title: "Concepts for multi-cluster deployments",
      publisher: "Keycloak",
      date: "read 16 September 2026",
    },
  ],
};

/* ---------- 006 — ZITADEL, evidence frozen 2026-09-16 ---------- */

const ZITADEL: Competitor = {
  slug: "zitadel",
  name: "ZITADEL",
  kind: "Open-source identity, cloud or self-hosted",
  summary:
    "ZITADEL is identity built on event sourcing, offered as ZITADEL Cloud or as software under the AGPL-3.0 licence.",
  checked: "2026-09-16",
  revalidate: "2026-12-16",
  research: "Platform research 006 — ZITADEL",
  chooseThem: [
    "You want the choice of a cloud service or running it yourself.",
    "You want every change recorded as an event, so the audit trail is the state.",
    "You want email and SMS codes as a first factor, and MFA forced per organisation.",
    "You want official Go and TypeScript SDKs today.",
  ],
  chooseQeet: [
    "You need attribute and relationship policies, not only roles.",
    "You need SCIM groups, not only users.",
    "You need AI agents as their own identities now, not on a roadmap.",
  ],
  cells: {
    passkeys: {
      them: "Passkeys are generally available, added by an existing user; sign-up starts elsewhere.",
      lead: "qeet",
    },
    factors: {
      them: "Email and SMS codes, TOTP and more, with MFA forced per organisation; recovery codes not found.",
      lead: "split",
      note: "ZITADEL forces MFA per organisation; Qeet ID adds recovery codes.",
    },
    sso: {
      them: "SAML as service provider and identity provider, both generally available; replay protection not documented.",
      lead: "split",
      note: "ZITADEL's SAML is generally available; Qeet ID documents assertion replay protection.",
    },
    setup: {
      them: "An outside IT team needs an organisation-owner account.",
      lead: "qeet",
    },
    scim: {
      them: "SCIM is in preview and covers users only — groups are explicitly unsupported.",
      lead: "qeet",
    },
    models: { them: "Roles; no attribute or relationship engine.", lead: "qeet" },
    explain: { them: "No explanation of decisions.", lead: "qeet" },
    agents: {
      them: "An agent is a service account; first-class AI identities are on the roadmap for the second half of 2026.",
      lead: "qeet",
    },
    "agent-stop": {
      them: "Checking a principal's status on every request is not documented.",
      lead: "qeet",
    },
    audit: {
      them: "Every change is an event, so the audit trail is complete by construction; no tamper evidence.",
      lead: "split",
      note: "ZITADEL leads on completeness; Qeet ID on tamper evidence.",
    },
    siem: { them: "A documented guide to stream events out.", lead: "qeet" },
    tokens: { them: "DPoP, PAR, mTLS and FAPI are not mentioned.", lead: "even" },
    hosting: {
      them: "ZITADEL Cloud, or self-hosted with an official Helm chart, highly available by default.",
      lead: "them",
    },
    sdks: {
      them: "An official Go SDK and first-party TypeScript; Java and Python incubating.",
      lead: "them",
    },
    status: { them: "Generally available — v4.17.3, 4 September 2026.", lead: "them" },
  },
  sources: [
    { title: "Releases — zitadel/zitadel", publisher: "GitHub", date: "read 16 September 2026" },
    { title: "SCIM v2 API", publisher: "ZITADEL Docs", date: "read 16 September 2026" },
    { title: "Audit trail", publisher: "ZITADEL Docs", date: "read 16 September 2026" },
    {
      title: "Fine-grained authorization",
      publisher: "ZITADEL Blog",
      date: "read 16 September 2026",
    },
    { title: "Roadmap", publisher: "ZITADEL Docs", date: "read 16 September 2026" },
    {
      title: "Identity patterns for AI: securing agents with ZITADEL",
      publisher: "ZITADEL Help Center",
      date: "read 16 September 2026",
    },
    { title: "Pricing", publisher: "ZITADEL", date: "read 16 September 2026" },
  ],
};

/* ---------- 007 — Ory, evidence frozen 2026-09-16 ---------- */

const ORY: Competitor = {
  slug: "ory",
  name: "Ory",
  kind: "Identity as components, cloud or self-hosted",
  summary:
    "Ory is identity as separate components — Kratos, Hydra, Keto, Oathkeeper and Polis — open source under Apache 2.0, or run for you as Ory Network.",
  checked: "2026-09-16",
  revalidate: "2026-12-16",
  research: "Platform research 007 — Ory",
  chooseThem: [
    "You want open-source components you can compose and run yourself.",
    "You need data kept in a choice of eight regions on Ory Network.",
    "You want a schema-backed relationship model with set algebra.",
    "You want fine-grained control over passkey behaviour, native apps included.",
  ],
  chooseQeet: [
    "You want one service, not five components to wire together.",
    "You need attribute policies, and an answer that says why access was granted.",
    "You want a tamper-evident audit log, and agents with an enforced human sponsor.",
  ],
  cells: {
    passkeys: {
      them: "Passkey-first sign-up, with discoverable credentials, conditional UI and user verification all configurable, and native-app passkeys.",
      lead: "them",
    },
    factors: {
      them: "Email and SMS codes as a first or second factor, TOTP and WebAuthn; push not found.",
      lead: "split",
      note: "Ory uses codes as a first factor; Qeet ID adds push approval.",
    },
    sso: {
      them: "SAML on Ory Network Enterprise, not in open-source Kratos; replay protection not documented.",
      lead: "split",
      note: "Ory routes matched domains to SSO compulsorily; Qeet ID documents replay protection.",
    },
    setup: {
      them: "An expiring self-service link for SSO and SCIM, with no Ory account needed.",
      lead: "even",
    },
    scim: {
      them: "SCIM users and nested groups, generally available on Ory Network Enterprise.",
      lead: "even",
    },
    models: {
      them: "Relationship checks in Keto; attribute policies cannot be expressed.",
      lead: "split",
      note: "Ory's relationship language is richer; Qeet ID adds attributes and roles in the same store.",
    },
    explain: {
      them: "A check returns a bare yes or no; expand shows the object's tree.",
      lead: "qeet",
    },
    agents: {
      them: "An agent is an OAuth client or an API key; a human sponsor is recorded, not enforced.",
      lead: "qeet",
    },
    "agent-stop": {
      them: "A five-level kill switch — which fails open and observes by default.",
      lead: "split",
      note: "Ory can block a whole class of sub-agent; Qeet ID enforces on the server.",
    },
    audit: { them: "No tamper-evident audit in any component.", lead: "qeet" },
    siem: { them: "Event streams to SNS or HTTPS, on Enterprise.", lead: "even" },
    tokens: { them: "No DPoP, PAR, JARM, mTLS or FAPI.", lead: "even" },
    hosting: {
      them: "Ory Network in eight regions, or the components self-hosted.",
      lead: "them",
    },
    sdks: {
      them: "A published, current SDK for the unified client, and React components.",
      lead: "them",
    },
    status: { them: "Generally available.", lead: "them" },
  },
  sources: [
    { title: "Ory documentation", publisher: "Ory", date: "read 16 September 2026" },
    {
      title: "Kratos configuration schema",
      publisher: "Ory (GitHub)",
      date: "read 16 September 2026",
    },
    { title: "Keto API specification", publisher: "Ory (GitHub)", date: "read 16 September 2026" },
    {
      title: "Ory Permission Language specification",
      publisher: "Ory (GitHub)",
      date: "read 16 September 2026",
    },
    { title: "@ory/argus", publisher: "npm", date: "1.2.4, 14 September 2026" },
    {
      title: "Repositories and releases",
      publisher: "Ory (GitHub)",
      date: "read 16 September 2026",
    },
  ],
};

/* ---------- 008 — WorkOS, evidence frozen 2026-09-16 ---------- */

const WORKOS: Competitor = {
  slug: "workos",
  name: "WorkOS",
  kind: "Enterprise features for B2B products",
  summary:
    "WorkOS sells the enterprise features a B2B product needs — SSO, directory sync, an admin portal, audit logs and AuthKit sign-in — as APIs.",
  checked: "2026-09-16",
  revalidate: "2026-12-16",
  research: "Platform research 008 — WorkOS",
  chooseThem: [
    "You need SSO with 31 named identity providers, monitored and rotated for you.",
    "You want published SDKs, widgets and docs built for coding agents.",
    "You want an audit-log product your app writes into, kept up to ten years.",
    "You need to ship enterprise features this quarter.",
  ],
  chooseQeet: [
    "You need more than TOTP — and MFA that applies to SSO users too.",
    "You need attribute and relationship policies, with the reason for each decision.",
    "You want a tamper-evident audit trail of the identity platform itself.",
  ],
  cells: {
    passkeys: {
      them: "Passkeys in the hosted sign-in only, with no WebAuthn policy controls.",
      lead: "qeet",
    },
    factors: {
      them: "TOTP only — and the MFA requirement does not apply to SSO users.",
      lead: "qeet",
    },
    sso: {
      them: "31 named identity providers plus generic SAML and OpenID Connect, with metadata monitoring and automatic certificate rotation.",
      lead: "them",
    },
    setup: {
      them: "An admin portal with seven set-up flows, branding and emailed links; API-created links cannot be revoked.",
      lead: "split",
      note: "WorkOS's portal does more; Qeet ID's links are single-purpose and time-limited.",
    },
    scim: {
      them: "Eight named directory providers plus generic SCIM, with two tokens for rotation.",
      lead: "split",
      note: "WorkOS leads on providers and rotation; Qeet ID is the endpoint itself, with nothing in between.",
    },
    models: {
      them: "Roles, and fine-grained authorization over a single-parent resource tree; no attribute policies.",
      lead: "qeet",
    },
    explain: { them: "Not supported.", lead: "qeet" },
    agents: {
      them: "Agent identity is in Early Access, for first-party agents — with a sponsor, a lifecycle, a kill switch and a permission ceiling.",
      lead: "split",
      note: "WorkOS adds a permission ceiling and blueprints; Qeet ID checks the agent on every request.",
    },
    "agent-stop": {
      them: "A revoked agent's access ends at its next refresh.",
      lead: "qeet",
    },
    audit: {
      them: "An audit-log product your app writes into, kept 30 days to 10 years; no chaining or signing.",
      lead: "split",
      note: "WorkOS leads on retention; Qeet ID on a chain you can verify.",
    },
    siem: {
      them: "Seven destinations, S3, Snowflake and Sentinel among them, set up by the customer's IT contact.",
      lead: "split",
      note: "WorkOS leads on destinations and self-service; Qeet ID on ordered, resumable delivery.",
    },
    tokens: null,
    hosting: { them: "A managed service only. No self-hosting.", lead: "even" },
    sdks: {
      them: "Published SDKs, embeddable widgets, an MCP server and published rate limits.",
      lead: "them",
    },
    status: { them: "Generally available.", lead: "them" },
  },
  sources: [
    { title: "Documentation", publisher: "WorkOS", date: "read 16 September 2026" },
    { title: "Pricing", publisher: "WorkOS", date: "read 16 September 2026" },
    { title: "Changelog", publisher: "WorkOS", date: "published 7 September 2026" },
    { title: "@workos-inc/node", publisher: "npm", date: "10.13.0, 31 August 2026" },
    { title: "Widgets API schema", publisher: "WorkOS", date: "read 16 September 2026" },
  ],
};

export const COMPETITORS: readonly Competitor[] = [
  AUTH0,
  OKTA,
  ENTRA,
  PING,
  KEYCLOAK,
  ZITADEL,
  ORY,
  WORKOS,
];

/** Slugs the old compare pages used that are not compared to this standard yet. */
export const RETIRED_SLUGS = [
  "authentik",
  "clerk",
  "cognito",
  "descope",
  "firebase",
  "frontegg",
  "fusionauth",
  "propelauth",
  "stytch",
  "supabase",
  "supertokens",
] as const;

export const LEAD_LABEL = (c: Competitor, lead: Lead): string =>
  ({ them: c.name, qeet: "Qeet ID", even: "Even", split: "Each, differently" })[lead];

export type Tally = Record<Lead, number> & { compared: number };

export function tally(c: Competitor): Tally {
  const t: Tally = { them: 0, qeet: 0, even: 0, split: 0, compared: 0 };
  for (const a of AREAS) {
    const cell = c.cells[a.id];
    if (!cell) continue;
    t[cell.lead] += 1;
    t.compared += 1;
  }
  return t;
}

export const COMPARE_INDEX = {
  meta: {
    title: "Compare Qeet ID",
    description:
      "Qeet ID beside Auth0, Okta, Microsoft Entra, Ping Identity, Keycloak, ZITADEL, Ory and WorkOS — fifteen areas each, from their own dated documentation.",
  },
  kicker: "Compare",
  title: ["Eight platforms.", "Where each one leads."],
  lede: "Qeet ID beside eight identity platforms, in the same fifteen areas each time — from their own documentation, dated, and plain about where they are ahead.",
  status:
    "Qeet ID is in development; 1.0 is planned for 1 February 2027. Every platform here is generally available.",
  method: {
    kicker: "How we compare",
    title: ["The same fifteen areas.", "Their documentation, dated."],
    items: [
      {
        name: "Their own words",
        body: "Each platform's facts come from its own documentation, pricing and release notes — read on the date the page gives.",
      },
      {
        name: "Ours, from the code",
        body: "Qeet ID's column is checked against its code, not its plans. What is not in 1.0 says so.",
      },
      {
        name: "Where they lead",
        body: "Every page says where the other platform is ahead. Release status always counts against Qeet ID until 1.0.",
      },
      {
        name: "Re-read in three months",
        body: "Facts are re-checked within three months of the date given. If one is out of date before then, tell us.",
      },
    ],
  },
  notYet:
    "Clerk, Amazon Cognito, Stytch, Descope, FusionAuth and others are not compared here yet — they return when their facts are checked the same way.",
  close: ["Compare it yourself.", "Start with the docs."],
} as const;
