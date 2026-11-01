/**
 * The home page's words, in one place (as qeet.in keeps its own in
 * config/organisation.ts), so a copy review is a review of this file.
 *
 * Every product statement is checked against qeet-id-context/PRODUCT.md and
 * SECURITY.md: Qeet ID is in development, 1.0 is planned for real users on
 * 1 February 2027, production is stopped, and no SDK is published. Lines kept
 * from the previous site are marked "existing"; everything else is new and was
 * shown for approval with the mock-up.
 */
import {
  ArrowLeftRightIcon,
  AtSignIcon,
  BotIcon,
  BuildingComplexIcon,
  FingerprintPatternIcon,
  FolderSyncIcon,
  GlobeIcon,
  KeyRoundIcon,
  KeySquareIcon,
  LifeBuoyIcon,
  LinkIcon,
  MailIcon,
  MessageSquareTextIcon,
  MonitorSmartphoneIcon,
  PlugIcon,
  ScrollTextIcon,
  SmartphoneNfcIcon,
  TimerIcon,
  TvIcon,
  WaypointsIcon,
} from "@qeetrix/icons";

/** Decided 2026-10-29: "In development", with the planned 1.0 date. */
export const STATUS = {
  label: "In development",
  /** The date is held together (no-break spaces) so it never wraps mid-date. */
  line: "Qeet ID is in development. 1.0 is planned for 1\u00a0February\u00a02027.",
} as const;

export const HERO = {
  kicker: "Qeet ID",
  /** existing — approved by the user (2026-10-29) */
  lines: ["One identity.", "Every platform."],
  /** new — the enterprise framing (every item implemented, PRODUCT.md) */
  lede: "Enterprise SSO, SCIM provisioning, passkeys, fine-grained authorization and an audit log you can verify — in one identity platform.",
  /** The open standards it speaks (PRODUCT.md, implemented) — not customer logos. */
  standards: ["SAML 2.0", "OpenID Connect", "OAuth 2.0", "SCIM 2.0", "WebAuthn", "LDAP", "AuthZEN"],
} as const;

export const ENTERPRISE = {
  kicker: "Enterprise",
  /** new */
  title: ["Everything enterprise", "customers ask for."],
  /** new */
  lede: "Single sign-on, directory sync, a setup portal for your customer's IT team, fine-grained access and an audit trail you can verify — the questions in every security review, answered in the product.",
  /** PRODUCT.md, all `implemented`. Each cell links to the capability page that covers it. */
  items: [
    {
      icon: PlugIcon,
      title: "Single sign-on",
      href: "/product/enterprise-sso",
      body: "SAML 2.0 as both service provider and identity provider, and OpenID Connect.",
    },
    {
      icon: FolderSyncIcon,
      title: "Directory sync",
      href: "/product/directory-sync",
      body: "SCIM 2.0 users and groups, and LDAP / Active Directory, with sync health you can see.",
    },
    {
      icon: LinkIcon,
      title: "Admin portal",
      href: "/product/enterprise-sso",
      body: "Your customer's IT team sets up SSO and SCIM through a time-limited link — no Qeet ID account needed.",
    },
    {
      icon: WaypointsIcon,
      title: "Fine-grained access",
      href: "/product/authorization",
      body: "Role-, attribute- and relationship-based checks, with the grant path traced behind every role decision.",
    },
    {
      icon: FingerprintPatternIcon,
      title: "Passkeys & MFA",
      href: "/product/authentication",
      body: "WebAuthn passkeys, TOTP, email and SMS codes and push approval, with sign-in rules per organization.",
    },
    {
      icon: MonitorSmartphoneIcon,
      title: "Sessions",
      href: "/product/authentication",
      body: "Every session visible and revocable, with session limits set per organization.",
    },
    {
      icon: ScrollTextIcon,
      title: "Audit log",
      href: "/product/audit-log",
      body: "Hash-chained and append-only, with a /verify endpoint, streamed to your SIEM.",
    },
    {
      icon: BuildingComplexIcon,
      title: "Multi-tenant",
      href: "/product/authentication",
      /** PRODUCT.md: per-tenant branding, per-organisation sign-in methods and session limits */
      body: "Every organization is its own tenant, with its own branding, sign-in rules and session limits.",
    },
  ],
  cta: { label: "All features", href: "/features" },
} as const;

/**
 * 02 — The record. The audit log is the capability the product positions itself
 * on (PRODUCT.md: SHA-256 hash-chained, with a /verify integrity walk). The
 * section explains the mechanism once; 01 already lists the feature.
 */
export const AUDIT = {
  kicker: "The audit log",
  /** new (2026-10-29) — replaces "An audit log you can verify." */
  title: ["Every change,", "on the record."],
  /** new — PRODUCT.md (hash chain, /verify) */
  lede: "Each entry carries the SHA-256 hash of the one before it, so no entry can be altered or removed without breaking the chain — and /verify walks it end to end.",
  /** Decorative: an illustration of a chain, not real data (example events). */
  ledger: [
    { seq: "1039", event: "Signed in", actor: "Person", hash: "c93d…1f" },
    { seq: "1040", event: "SSO connected", actor: "Admin portal", hash: "02be…9a" },
    { seq: "1041", event: "Group synced", actor: "SCIM", hash: "5e07…c2" },
    { seq: "1042", event: "Token issued", actor: "AI agent", hash: "f16c…47" },
  ],
  /** The first entry's predecessor, so the first link has something to point at. */
  genesis: "7a41…e0",
  /** PRODUCT.md: actor types in the trail; audit free-text search; behavioural-baseline anomaly detection. */
  facts: [
    {
      title: "Every actor named",
      body: "A person, an API key, an AI agent, SCIM, the admin portal or the system — each entry says who acted.",
    },
    {
      title: "Searchable",
      body: "Free-text search across the whole trail, not only by event type.",
    },
    {
      title: "Unusual activity flagged",
      body: "Behavioural baselines flag activity that does not fit the pattern.",
    },
  ],
  /** The blog post that explains it (src/lib/blog.ts). */
  post: { label: "How we made our audit log tamper-evident", href: "/blog/audit-log-hash-chain" },
} as const;

/**
 * 03 — Every way in: how people sign in, how they confirm it, and the
 * identities software gets. PRODUCT.md (implemented) and SECURITY.md; the
 * protocols are in the hero's strip, the enterprise features in 01.
 *
 * Lines marked "develop" come from qeet-id-server's enterprise-readiness work,
 * merged into develop on 2026-10-29 (enterprise-gap-2026-10-27/STATUS.md
 * "Done"), and are newer than qeet-id-context/PRODUCT.md.
 */
export const WAYS_IN = {
  kicker: "Sign-in",
  /** new (2026-10-29) — replaces "Speaks the standards." */
  title: ["Every way in,", "for people and software."],
  /** new */
  lede: "People sign in the way they prefer and confirm it with a second factor. Software gets an identity of its own — so an API key or an AI agent is never borrowing a person's.",
  columns: [
    {
      title: "People sign in with",
      items: [
        {
          icon: FingerprintPatternIcon,
          name: "Passkeys",
          /** owner decision: a passkey satisfies MFA on its own */
          note: "WebAuthn — and a passkey counts as multi-factor on its own.",
        },
        {
          icon: KeyRoundIcon,
          name: "Passwords",
          /** SECURITY.md: per-account lockout, password-spraying protection */
          note: "With per-account lockout and password-spraying protection.",
        },
        { icon: MailIcon, name: "Magic links", note: "A one-time sign-in link, by email." },
        {
          icon: GlobeIcon,
          name: "Social accounts",
          /** develop aa903862: native GitHub, Facebook, X, Discord and Apple; others by OIDC discovery.
           *  STATUS.md: the adapters are tested only against fake providers — try each before release. */
          note: "Google, Microsoft, Apple, GitHub, Facebook, X and Discord — or any OpenID Connect provider.",
        },
        {
          icon: AtSignIcon,
          name: "Company sign-in",
          /** develop 1ac1429e: POST /v1/sso/discovery — home-realm discovery from the address's domain */
          note: "A work address finds its organisation's single sign-on on its own.",
        },
      ],
    },
    {
      title: "And confirm with",
      items: [
        { icon: TimerIcon, name: "Authenticator apps", note: "Time-based one-time codes (TOTP)." },
        {
          icon: MessageSquareTextIcon,
          name: "Email and SMS codes",
          note: "A one-time code by email or text message.",
        },
        {
          icon: SmartphoneNfcIcon,
          name: "Push approval",
          /** owner decision: a phone links only with a pairing code */
          note: "Approve on a phone linked with a pairing code.",
        },
        { icon: LifeBuoyIcon, name: "Recovery codes", note: "For the day the phone is lost." },
      ],
    },
    {
      title: "Software signs in as",
      items: [
        { icon: KeySquareIcon, name: "API keys", note: "Scoped keys for servers and scripts." },
        {
          icon: BotIcon,
          name: "AI agents",
          /** PRODUCT.md: lifecycle, recorded sponsor, tenant-wide kill switch, short-lived tokens */
          note: "Their own identity, with a sponsor, a lifecycle, short-lived tokens and a kill switch.",
        },
        {
          icon: TvIcon,
          name: "Devices",
          /** RFC 8628 */
          note: "A TV or a command-line tool signs in with a code entered elsewhere.",
        },
        {
          icon: ArrowLeftRightIcon,
          name: "Delegation",
          /** RFC 8693 token exchange carrying an act claim */
          note: "Token exchange lets one identity act for another — and says who is acting.",
        },
      ],
    },
  ],
} as const;

/**
 * 04 — Security, as a datasheet: what a security review asks, answered with
 * the value. Every row is SECURITY.md, two notes are develop (see 03). (The start-up configuration check is
 * left out: SECURITY.md marks it "code, with gaps" — QTID-817, QTID-829.)
 */
export const SECURITY = {
  kicker: "Security",
  /** existing (heading corrected 2026-10-29) */
  title: ["Built for your", "most sensitive data."],
  /** new */
  lede: "What a security review asks, answered with the value — the algorithms, the lifetimes and the evidence.",
  rows: [
    {
      label: "Token signing",
      value: "ES256",
      note: "The only algorithm accepted — no negotiation. A token without a known key ID is rejected; public keys are published through JWKS.",
    },
    {
      label: "Access tokens",
      value: "10 minutes",
      note: "Refresh tokens last 30 days and rotate on use — reusing an old one revokes the session.",
    },
    {
      label: "Passwords",
      value: "Argon2id",
      /** develop (STATUS.md 5.5): BREACHED_PASSWORD_CHECK defaults to on; it fails open on a HIBP outage */
      note: "With OWASP-recommended parameters, and checked against known breaches by default.",
    },
    {
      label: "API keys",
      value: "Shown once",
      /** develop de4068f8: keys, service principals and agents rotate with an overlap */
      note: "Then stored only as an Argon2id hash, and rotated with an overlap.",
    },
    {
      label: "Secrets vault",
      value: "AES-256-GCM",
      note: "With a key derived for each tenant and each purpose.",
    },
    {
      label: "Privacy",
      value: "GDPR",
      note: "Erasure that keeps the audit trail intact, data export, and retention purge.",
    },
    {
      label: "Compliance",
      value: "SOC 2 · ISO 27001",
      note: "Live control-state evidence for both frameworks. Evidence is not certification.",
    },
  ],
  cta: { label: "The security overview", href: "/security" },
} as const;

/**
 * 05 — Pricing: the plans (lib/pricing/plans.ts, the billing catalogue) and a
 * staircase of what each one adds, read from the comparison table
 * (lib/pricing/features.ts) so it cannot disagree with the pricing page.
 */
export const PRICING = {
  kicker: "Pricing",
  /** new (2026-10-29) — replaces "Pricing that scales with you." */
  title: ["Free for your first", "10,000 users."],
  /** new — plans.ts (Pro: "SAML & OIDC SSO included — no SSO tax") */
  lede: "Then Starter and Pro as you grow, and Enterprise by contract. Single sign-on comes with Pro, with no charge per connection.",
  /** Feature ids in lib/pricing/features.ts, top to bottom; the label is the short name shown. */
  ladder: [
    { id: "passkeys", label: "Passkeys" },
    { id: "audit-logs", label: "Audit log" },
    { id: "webhooks", label: "Signed webhooks" },
    { id: "sso", label: "Single sign-on" },
    { id: "agent-identities", label: "AI-agent identities" },
    { id: "scim", label: "SCIM provisioning" },
    { id: "directory-sync", label: "LDAP / Active Directory" },
  ],
  cta: { label: "Full pricing and calculator", href: "/pricing" },
} as const;

/**
 * 06 — Questions the rest of the page does not answer. Each answer is checked
 * against PRODUCT.md / SECURITY.md (2026-10-29); none repeats a section above.
 */
export const FAQ = {
  kicker: "Questions",
  /** new */
  title: ["The questions", "teams ask first."],
  items: [
    {
      q: "Where is Qeet ID today?",
      a: "In development. Qeet ID 1.0 is planned for real users on 1 February 2027, and the documentation is open now.",
    },
    {
      /** qeet.in: config/organisation.ts (self-description; "Our first business") */
      q: "Who builds Qeet ID?",
      a: "Qeet Group — a technology company built on a single philosophy: that meaningful progress begins with the right question. Qeet ID is its first business.",
    },
    {
      q: "How do we integrate it?",
      a: "Through standard OpenID Connect and SAML, with hosted sign-in pages and a REST API described by OpenAPI 3.1. SDKs for React, Node and Go are not published yet.",
    },
    {
      /** FLOWS/tenant-management.md "IdP migration": no vendor exports a portable password, so imported people
       *  arrive with no credential (corrected 2026-10-29 — the old copy said nobody resets a password) */
      q: "Can we move from Auth0 or another provider?",
      a: "Yes. Qeet ID imports people from Auth0, Amazon Cognito and Azure AD B2C export files. Passwords cannot come across — no provider exports them in a portable form — so imported people sign in with a passkey or a magic link, or set a password through a reset.",
    },
    {
      /** owner decision: a refusing (deny) policy always wins over any allow */
      q: "If one policy allows and another denies, which wins?",
      a: "The deny. A refusing policy always wins over any allow, so a single refusal is enough to block access.",
    },
    {
      /** SECURITY.md: session.revoked and token.claims_change webhooks (HMAC-SHA256) */
      q: "Will our applications know when a session ends?",
      a: "Yes. Every ended session is announced to subscribed applications as a signed session.revoked webhook, and a change of roles as token.claims_change.",
    },
  ],
  /** Contact addresses (the contact page). */
  contact: {
    title: "Something we have not answered?",
    lines: [
      { label: "Talk to us", email: "partnerships@qeet.in" },
      { label: "Security questions", email: "security@qeet.in" },
    ],
  },
} as const;

/**
 * The close — qeet.in's photographic closing band. "The front door" is the
 * organisation's own line for Qeet ID (qeet.in config/organisation.ts:
 * "Qeet ID is the front door to the ecosystem").
 */
export const CLOSING = {
  /** new */
  title: ["Every product needs a front door.", "Build yours on Qeet ID."],
} as const;
