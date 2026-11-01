/**
 * The capability pages (/product/<slug>) — one template, six pages. Every word
 * lives here, so a copy review is a review of this file.
 *
 * Each statement is checked against qeet-id-context (PRODUCT.md, SECURITY.md,
 * FLOWS/*) and qeet-id-server `develop`, which is newer than the record (the
 * enterprise-readiness work, merged 2026-10-29). A note cites its source:
 * "develop <commit>", "PLAN <item>" (enterprise-gap-2026-10-27/PLAN.md, done)
 * or the record's section. What the record says is not in 1.0 is said so on
 * the page ("notYet"), never left implied.
 */
import type { IconProps } from "@qeetrix/icons";
import {
  ActivityIcon,
  FileCheckIcon,
  LifeBuoyIcon,
  LockIcon,
  MessageSquareTextIcon,
  RepeatIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  SmartphoneNfcIcon,
  TextSearchIcon,
  TimerIcon,
  UserCheckIcon,
  UsersIcon,
} from "@qeetrix/icons";
import type { ComponentType } from "react";
import type { LadderRow } from "@/components/site/plan-ladder";
import type { TabIconId } from "@/config/capability-icons";

/* ---------------------------------------------------------------- types */

/** An icon from @qeetrix/icons (the same shape @qeetrix/react's components take). */
type QeetrixIcon = ComponentType<IconProps<"outline">>;

export type Tone = "light" | "sunken" | "dark";
type Lines = readonly string[];
type Named = { readonly name: string; readonly body: string };

export type TabItem = {
  readonly id: TabIconId;
  readonly name: string;
  readonly statement: string;
  readonly body: string;
  readonly facts: Lines;
  /** A page of the Qeet ID docs (lib/links docsUrl). */
  readonly docs: string;
  /** A feature id in lib/pricing/features.ts — the "Plans" line; left out where the table has no row. */
  readonly feature?: string;
  readonly more?: { readonly label: string; readonly href: string };
};

type Head = { readonly tone: Tone; readonly kicker: string; readonly title: Lines };

export type Section =
  | (Head & {
      readonly kind: "tabs";
      /** The tab list's accessible name. */
      readonly label: string;
      readonly items: readonly TabItem[];
      readonly notYet?: string;
    })
  | (Head & {
      readonly kind: "split";
      readonly leftTitle: string;
      readonly left: readonly Named[];
      readonly rightTitle: string;
      readonly right: readonly (Named & { readonly icon: QeetrixIcon })[];
      readonly notes?: Lines;
      readonly notYet?: string;
    })
  | (Head & {
      readonly kind: "ruler";
      readonly marks: readonly {
        readonly minutes: number;
        readonly value: string;
        readonly name: string;
        readonly note: string;
      }[];
      readonly scale: readonly { readonly minutes: number; readonly label: string }[];
      readonly endsTitle: string;
      readonly ends: readonly Named[];
      readonly webhook: string;
    })
  | (Head & { readonly kind: "points"; readonly items: readonly Named[] })
  | (Head & {
      readonly kind: "table";
      readonly lede: string;
      readonly columns: readonly [string, string, string];
      readonly rows: readonly (readonly [string, string, string])[];
      readonly notYet?: string;
    })
  | (Head & { readonly kind: "plans"; readonly rows: readonly LadderRow[] });

export type CapabilityPage = {
  readonly slug: string;
  readonly name: string;
  readonly docs: string;
  readonly meta: { readonly title: string; readonly description: string };
  readonly title: Lines;
  readonly lede: string;
  /** The hero's diagram: five steps, read as an ordered list. */
  readonly pathLabel: string;
  readonly path: readonly Named[];
  readonly sections: readonly Section[];
  readonly close: Lines;
};

/* ---------------------------------------------------------------- index */

// The six capabilities' names, icons and one-liners live in their own small
// module, so the header (a client component) can list them without the copy.
export { CAPABILITIES, type CapabilitySlug } from "@/config/capability-index";

import type { CapabilitySlug } from "@/config/capability-index";

/* ------------------------------------------------------- authentication */

/**
 * PRODUCT.md "Authentication" + "Multi-factor", FLOWS/authentication.md,
 * FLOWS/mfa.md, FLOWS/sessions.md, SECURITY.md; the three gaps the record lists
 * (QTID-801, -802, -826) are fixed on develop. Approved 2026-10-29.
 */
const AUTHENTICATION = {
  slug: "authentication",
  name: "Authentication",
  docs: "authentication",
  meta: {
    title: "Authentication — passkeys first",
    description:
      "Passkeys, passwords, magic links, social accounts and company single sign-on, with second factors, risk checks and sessions each organisation controls.",
  },
  title: ["Passkeys first.", "Every other way, too."],
  /** FLOWS/authentication.md: "Every method below is decided in qeet-id-server. The UIs render" */
  lede: "Passkeys, passwords, magic links, social accounts and company single sign-on — with second factors, risk checks and sessions each organisation sets. Every decision is made on the server; the sign-in pages only show it.",
  pathLabel: "How one sign-in passes through Qeet ID",
  path: [
    /** develop 1ac1429e: home-realm discovery */
    {
      name: "Identify",
      body: "An email address — and a work address goes straight to its company's single sign-on.",
    },
    {
      name: "Prove",
      body: "A passkey, a password, a magic link, a social account or single sign-on.",
    },
    {
      name: "Check",
      body: "Account status, lockout, password spraying and risk — before any session exists.",
    },
    {
      name: "Confirm",
      body: "A second factor, when the organisation, the risk or the action asks for one.",
    },
    /** SECURITY.md: ES256 only; access 10 minutes */
    {
      name: "Session",
      body: "Tokens signed with ES256: ten minutes of access at a time, renewed, and revocable.",
    },
  ],
  sections: [
    {
      kind: "tabs",
      tone: "light",
      kicker: "Ways in",
      title: ["Five ways in.", "Each one decided on the server."],
      label: "Ways to sign in",
      items: [
        {
          id: "passkeys",
          name: "Passkeys",
          statement: "The strongest way in is also the quickest.",
          body: "WebAuthn passkeys, from the first sign-up: someone can create an account with a passkey and never set a password. A passkey counts as multi-factor on its own, so nobody who uses one is asked for a code.",
          facts: [
            "Sign up with a passkey — no password needed",
            "A passkey neither requires nor is required by a password",
            /** develop 3471aa9a */
            "An admin can see and remove a member's passkeys",
          ],
          docs: "authentication/passkeys",
          feature: "passkeys",
        },
        {
          id: "passwords",
          name: "Passwords",
          statement: "For the people who still want one.",
          /** SECURITY.md (Argon2id, OWASP parameters; Qeet ID's own legacy bcrypt hashes upgraded after the next
           *  verification). Imported people bring no password (FLOWS/tenant-management.md "IdP migration"). */
          body: "Hashed with Argon2id at the parameters OWASP recommends. Older bcrypt hashes still verify, and are upgraded to Argon2id at the next sign-in.",
          facts: [
            /** SECURITY.md: lockout limits an organisation may tune within platform bounds */
            "Per-account lockout, which each organisation can tune",
            /** develop 6eb814f6 */
            "Password-spraying protection that counts the accounts targeted",
            /** develop (STATUS.md 5.5): BREACHED_PASSWORD_CHECK on by default */
            "Checked against known breaches by default",
            /** develop 11f6d6d7 */
            "Reset links go only to the account's own address",
          ],
          docs: "authentication",
          feature: "email-password",
        },
        {
          id: "magic-links",
          name: "Magic links",
          statement: "One link, by email, and you're in.",
          body: "A sign-in link sent by email and finished on the hosted sign-in page — for the people and the products where a password is one thing too many.",
          facts: [
            /** develop 11f6d6d7 */
            "Sent only to the account's own address",
            "Finished on the hosted sign-in page",
          ],
          docs: "authentication/magic-links",
          feature: "passwordless",
        },
        {
          id: "social",
          name: "Social accounts",
          statement: "The account people already have.",
          /** develop aa903862 — tested only against fake providers (STATUS.md): try each before release */
          body: "Google, Microsoft, Apple, GitHub, Facebook, X and Discord — or an organisation's own OpenID Connect provider. GitHub, Facebook, X, Discord and Apple sign in through their own flows; the rest by OpenID Connect discovery.",
          facts: [
            /** develop 868a2ac3 (QTID-801) */
            "A second factor still applies where the organisation requires one",
            /** develop aa903862: an address not said to be verified never adopts an existing account */
            "An address the provider does not vouch for never takes over an account",
          ],
          docs: "authentication",
          feature: "social",
        },
        {
          id: "company",
          name: "Company sign-in",
          statement: "A work address finds its own way in.",
          /** develop 1ac1429e (POST /v1/sso/discovery) */
          body: "Someone types a work address and Qeet ID finds their organisation's single sign-on from the domain alone, then sends them to it — SAML 2.0 or OpenID Connect.",
          facts: [
            /** PLAN 1.6: SSO bound to the organisation's verified domains */
            "Only for domains the organisation has verified",
            /** develop 14e982ae */
            "An organisation on single sign-on can switch the other ways off",
          ],
          docs: "enterprise",
          feature: "sso",
          more: { label: "Enterprise SSO", href: "/product/enterprise-sso" },
        },
      ],
    },
    {
      kind: "split",
      tone: "sunken",
      kicker: "Second factors",
      title: ["Asked for when it matters.", "Answered in seconds."],
      leftTitle: "When it is asked for",
      left: [
        {
          name: "The organisation requires it",
          body: "An organisation can require a second factor of every member.",
        },
        /** FLOWS/mfa.md: the sign-in is risky and the person holds no factor → emailed code */
        {
          name: "The sign-in looks risky",
          body: "Every sign-in is scored for risk; a risky one from someone with no factor gets a code by email.",
        },
        /** develop b586787d, cafb169c; the step-up catalogue */
        {
          name: "The action is sensitive",
          body: "Changing how someone signs in needs a recent sign-in — and they are emailed when it changes.",
        },
      ],
      rightTitle: "How people answer",
      right: [
        {
          icon: TimerIcon,
          name: "Authenticator apps",
          body: "Time-based one-time codes (TOTP, RFC 6238).",
        },
        /** PLAN 1.11: codes bound to their purpose */
        {
          icon: MessageSquareTextIcon,
          name: "Email and SMS codes",
          body: "A one-time code that is good only for what it was sent for.",
        },
        /** owner decision (pairing code only); develop ac3476c9 (number matching) */
        {
          icon: SmartphoneNfcIcon,
          name: "Push approval",
          body: "On a phone linked with a pairing code — and the number on the screen must match.",
        },
        {
          icon: LifeBuoyIcon,
          name: "Recovery codes",
          body: "Ten of them, each used once, shown only once.",
        },
      ],
      notes: [
        /** PLAN 1.11: push caps + number matching */
        "Push prompts are capped, so nobody can be worn down by a flood of them.",
        /** FLOWS/sessions.md: remember-device days, 30 by default */
        "A trusted device skips the second factor for the days the organisation chooses — 30 by default.",
      ],
    },
    {
      kind: "ruler",
      tone: "dark",
      kicker: "Sessions",
      title: ["Every session has an end.", "You decide when."],
      /** FLOWS/sessions.md; SECURITY.md. Positions are minutes on a log scale. */
      marks: [
        {
          minutes: 10,
          value: "10 minutes",
          name: "Access token",
          note: "Renewed while the session lives",
        },
        {
          minutes: 1440,
          value: "24 hours",
          name: "Idle timeout",
          note: "By default — an organisation sets 15 minutes or more",
        },
        {
          minutes: 43200,
          value: "30 days",
          name: "Maximum age",
          note: "By default — an organisation sets 1 hour to 365 days",
        },
      ],
      scale: [
        { minutes: 1, label: "1 min" },
        { minutes: 60, label: "1 hour" },
        { minutes: 1440, label: "1 day" },
        { minutes: 43200, label: "30 days" },
        { minutes: 525600, label: "1 year" },
      ],
      endsTitle: "What ends one sooner",
      ends: [
        { name: "Someone revokes it", body: "A person or an admin — one session, or every one." },
        { name: "The password changes", body: "Every other session of that person ends." },
        {
          name: "A refresh token is reused",
          body: "The reuse is detected and the session revoked.",
        },
        /** PLAN 1.10: SCIM suspend/delete end all sign-ins */
        { name: "Someone is offboarded", body: "A SCIM suspension ends every sign-in they have." },
      ],
      /** SECURITY.md: every ended session is announced as the signed session.revoked webhook */
      webhook: "Your applications hear about each one, as a signed session.revoked webhook.",
    },
    {
      kind: "table",
      tone: "light",
      kicker: "Per organisation",
      title: ["Your customers' admins", "set the rules."],
      lede: "Every organisation in Qeet ID is its own tenant. Its admins choose how their people sign in, within limits the platform holds.",
      columns: ["Setting", "Default", "Each organisation can"],
      rows: [
        /** develop 14e982ae */
        [
          "Sign-in methods",
          "—",
          "Choose which are offered; on single sign-on, switch the others off",
        ],
        ["Second factor", "—", "Require one of every member"],
        ["Session maximum age", "30 days", "Set 1 hour to 365 days"],
        ["Idle timeout", "24 hours", "Set 15 minutes, up to the maximum age"],
        ["Remember this device", "30 days", "Choose the days, or not allow it"],
        ["Account lockout", "Platform limits", "Tune it within the platform's bounds"],
        ["Self-registration", "Off", "Turn it on"],
        /** PRODUCT.md per-tenant branding + email templates; STATUS.md 5.5 recipient-language emails */
        [
          "Branding and email",
          "—",
          "Brand the hosted pages and write its own emails, sent in each recipient's language",
        ],
      ],
      /** PRODUCT.md: custom sign-in hostnames are recorded only for 1.0 (QTID-118) */
      notYet: "Not in 1.0: custom sign-in domains are recorded, but not yet served.",
    },
    {
      kind: "plans",
      tone: "sunken",
      kicker: "On each plan",
      /** features.ts: passkeys on all four; mfa limited (TOTP · email OTP) on Free. Adaptive MFA left out: `partial` in PRODUCT.md */
      title: ["Passkeys on every plan.", "A second factor on every plan, too."],
      rows: [
        { id: "passkeys", label: "Passkeys" },
        { id: "email-password", label: "Email and password" },
        { id: "passwordless", label: "Magic links" },
        { id: "social", label: "Social accounts" },
        { id: "account-recovery", label: "Account recovery" },
        { id: "mfa", label: "Multi-factor" },
        { id: "sms-push-otp", label: "SMS and push codes" },
        { id: "sso", label: "Company single sign-on" },
      ],
    },
  ],
  close: ["Read how it works,", "end to end."],
} as const satisfies CapabilityPage;

/* ------------------------------------------------------- enterprise SSO */

/**
 * PRODUCT.md "Enterprise federation" (SAML 2.0 SP and IdP, admin portal, the
 * tenant guard) + develop's federation work. Still in progress on develop and
 * so left out: SP certificate management and the remaining SAML IdP work
 * (STATUS.md 3.4, 3.7).
 */
const ENTERPRISE_SSO = {
  slug: "enterprise-sso",
  name: "Enterprise SSO",
  docs: "enterprise",
  meta: {
    title: "Enterprise SSO — SAML and OpenID Connect",
    description:
      "SAML 2.0 and OpenID Connect for every organisation you sell to, set up by their own IT team through a link you send.",
  },
  title: ["Their identity provider.", "Signed in to your app."],
  lede: "SAML 2.0 and OpenID Connect for every organisation you sell to — set up by their own IT team through a link you send, tested before anyone signs in, and kept current when their certificates change.",
  pathLabel: "How one single sign-on passes through Qeet ID",
  path: [
    /** develop 1ac1429e */
    {
      name: "Discover",
      body: "A work address finds its organisation's connection from the domain alone.",
    },
    {
      name: "Redirect",
      body: "To the organisation's own identity provider, by SAML 2.0 or OpenID Connect.",
    },
    /** develop: "a SAML sign-in tolerates three minutes of IdP clock drift" */
    {
      name: "Verify",
      body: "The signed answer is checked, with three minutes allowed for clock drift.",
    },
    /** develop: "single sign-on creates accounts only where the domain allows it"; "keeps a person's name, address and groups in step" */
    {
      name: "Provision",
      body: "An account is made only where the domain allows, and kept in step after.",
    },
    { name: "Session", body: "Signed in, under the organisation's own sign-in rules." },
  ],
  sections: [
    {
      kind: "tabs",
      tone: "light",
      kicker: "Connections",
      title: ["SAML or OpenID Connect.", "Either way, both ways."],
      label: "Kinds of connection",
      items: [
        {
          id: "saml-sp",
          name: "SAML connections",
          statement: "Their identity provider, trusted properly.",
          body: "Qeet ID is the service provider for each organisation's own identity provider. A connection is set up from the provider's metadata and keeps itself current, so a certificate change on their side does not break sign-in on yours.",
          facts: [
            /** develop: "can be set up from IdP metadata and keeps itself current" */
            "Set up from the IdP's metadata, and kept current",
            /** develop: "survives its identity provider's certificate rollover" */
            "Survives the IdP's certificate rollover",
            /** develop: "a SAML connection's IdP can encrypt the assertions it sends" */
            "Accepts assertions the IdP encrypts",
          ],
          docs: "enterprise",
          feature: "saml",
        },
        {
          id: "oidc-connections",
          name: "OpenID Connect",
          statement: "When the organisation runs OpenID Connect.",
          /** develop: "an organisation can sign in through its own OpenID Connect provider"; "an OpenID Connect connection counts as single sign-on" */
          body: "An organisation can sign in through its own OpenID Connect provider, and the connection counts as single sign-on — the same rules, the same discovery, the same audit trail.",
          facts: [
            "The organisation's own OpenID Connect provider",
            "Counts as single sign-on for the organisation's rules",
            /** develop: "administrators manage OpenID Connect connections behind the sso plan" */
            "Managed by the organisation's admins",
          ],
          docs: "oidc",
          feature: "sso",
        },
        {
          id: "saml-idp",
          name: "Qeet ID as the IdP",
          statement: "The other direction: apps sign in through Qeet ID.",
          /** PRODUCT.md: SAML 2.0 as both SP and IdP; an OAuth 2.0 / OIDC provider */
          body: "Qeet ID is a SAML identity provider and an OpenID Connect provider as well, so the applications an organisation already uses can sign its people in through Qeet ID.",
          facts: [
            /** develop d42d78a1 */
            "A SAML app's certificate verifies its requests or encrypts its assertions",
            /** develop: "an app signed into through Qeet gets the identifier and attributes it asked for" */
            "Each app gets the identifier and attributes it asked for",
            /** develop: "an app can be limited to the people and groups assigned to it" */
            "An app can be limited to the people and groups assigned to it",
          ],
          docs: "oidc",
          feature: "saml",
        },
        {
          id: "discovery",
          name: "Discovery",
          statement: "A work address finds its own way.",
          body: "Someone types a work address; Qeet ID finds the organisation's connection from the domain and sends them to it. On a captured domain, everyone signs in through the identity provider.",
          facts: [
            /** develop 1ac1429e */
            "Found from the address's domain alone",
            /** develop: "people on a captured domain sign in through their identity provider" */
            "People on a captured domain go to their IdP",
            /** develop 14e982ae */
            "An organisation on single sign-on can switch the other ways off",
          ],
          docs: "enterprise",
          feature: "sso",
        },
      ],
    },
    {
      kind: "split",
      tone: "sunken",
      kicker: "Admin portal",
      title: ["Their IT team sets it up.", "You send a link."],
      leftTitle: "How it goes",
      left: [
        /** PRODUCT.md: self-serve admin portal with capability-scoped time-limited links */
        {
          name: "You send a link",
          body: "Time-limited and scoped to what it may set up. Their IT team needs no Qeet ID account.",
        },
        /** develop: "the admin portal shows the addresses an identity provider needs" */
        {
          name: "They see what their IdP needs",
          body: "The addresses and identifiers to enter in their identity provider.",
        },
        /** develop: "the admin portal verifies the organisation's domains" (DNS TXT, PRODUCT.md) */
        { name: "They prove the domain", body: "A DNS record verifies the organisation's domain." },
        /** develop: "can be tested with a sign-in that signs nobody in"; 91e11902 */
        {
          name: "They test it",
          body: "A test sign-in that signs nobody in, and says what went wrong if it fails.",
        },
      ],
      rightTitle: "Safe while it is built",
      right: [
        /** develop 846e61e2; PLAN 1.14: draft connections can't sign in */
        {
          icon: FileCheckIcon,
          name: "Draft first",
          body: "A connection starts as a named draft, and a draft cannot sign anyone in.",
        },
        /** PLAN 1.6 */
        {
          icon: ShieldCheckIcon,
          name: "Verified domains only",
          body: "Single sign-on applies only to domains the organisation has verified.",
        },
        /** develop: "single sign-on creates accounts only where the domain allows it" */
        {
          icon: UserCheckIcon,
          name: "Accounts where allowed",
          body: "A sign-in creates an account only where the domain allows it.",
        },
        /** develop: "administrators map identity provider groups to their organisation's groups" */
        {
          icon: UsersIcon,
          name: "Groups in step",
          body: "The identity provider's groups map onto the organisation's own.",
        },
      ],
    },
    {
      kind: "points",
      tone: "dark",
      kicker: "Guard rails",
      title: ["One organisation's sign-in", "stays in that organisation."],
      items: [
        /** PRODUCT.md: a shared guard that keeps a federated sign-in inside its tenant */
        {
          name: "Kept inside its tenant",
          body: "A shared guard keeps every federated sign-in inside the organisation it belongs to.",
        },
        /** PLAN 1.6: no adoption of unlinked owners/admins */
        {
          name: "No quiet takeovers",
          body: "Single sign-on never adopts an owner or admin account it is not linked to.",
        },
        /** PLAN 1.14: SAML code bound to the browser */
        {
          name: "Bound to the browser",
          body: "A SAML sign-in completes only in the browser that started it.",
        },
        /** develop QTID-206, QTID-166 */
        {
          name: "Sign-out reaches the apps",
          body: "Signing out ends the app grants the session started, and the applications are told.",
        },
      ],
    },
    {
      kind: "plans",
      tone: "light",
      kicker: "On each plan",
      /** plans.ts Pro: "SAML & OIDC SSO included — no SSO tax" */
      title: ["Single sign-on from Pro.", "No charge per connection."],
      rows: [
        { id: "oidc", label: "OpenID Connect provider" },
        { id: "domain-verification", label: "Domain verification" },
        { id: "sso", label: "Single sign-on" },
        { id: "saml", label: "SAML 2.0" },
        { id: "enterprise-connections", label: "Admin portal" },
      ],
    },
  ],
  close: ["Set up your first connection."],
} as const satisfies CapabilityPage;

/* ------------------------------------------------------- directory sync */

/**
 * PRODUCT.md "Enterprise federation" (SCIM 2.0, LDAP / AD, sync health — no
 * scheduled sync yet, QTID-140) and "Tenant and user management" (groups);
 * develop's directory work; PLAN 1.2, 1.4, 1.10, 1.14, 2.1, 2.2.
 */
const DIRECTORY_SYNC = {
  slug: "directory-sync",
  name: "Directory sync",
  docs: "enterprise",
  meta: {
    title: "Directory sync — SCIM 2.0 and LDAP",
    description:
      "SCIM 2.0 and LDAP / Active Directory keep each organisation's people and groups in step with its own directory.",
  },
  title: ["Join, move, leave.", "The directory says so."],
  lede: "SCIM 2.0 and LDAP / Active Directory keep each organisation's people and groups in step with its own directory — and when someone leaves there, every sign-in they have ends here.",
  pathLabel: "How a directory change reaches Qeet ID",
  path: [
    { name: "Connect", body: "A SCIM token, or a bind to LDAP or Active Directory." },
    /** PRODUCT.md: attribute mappings */
    { name: "Provision", body: "People and groups arrive, with their attributes mapped." },
    /** PLAN 2.2 */
    { name: "Match", body: "Someone already a member is matched, never duplicated." },
    { name: "Update", body: "A move or a rename changes their groups and details here." },
    /** PLAN 1.10 */
    { name: "Offboard", body: "A suspension there ends every sign-in here." },
  ],
  sections: [
    {
      kind: "tabs",
      tone: "light",
      kicker: "Sources",
      title: ["SCIM or LDAP.", "The organisation's own directory."],
      label: "Kinds of directory",
      items: [
        {
          id: "scim",
          name: "SCIM 2.0",
          statement: "The standard enterprise directories speak.",
          body: "Users and groups over SCIM 2.0, PATCH included, so an organisation's own directory can create, change and remove its people in Qeet ID as it does at home.",
          facts: [
            "Users, groups and PATCH operations",
            /** PLAN 2.2 */
            "Existing members are matched, not duplicated",
            /** PLAN 2.1 */
            "People it provisions can sign in with SSO",
            /** develop bbc1c3c9 */
            "Its token can be rotated without breaking provisioning",
          ],
          docs: "enterprise",
          feature: "scim",
        },
        {
          id: "ldap",
          name: "LDAP / Active Directory",
          statement: "For the directory that has been there for years.",
          body: "An LDAP bridge reads people and groups from an organisation's LDAP or Active Directory, bound — like single sign-on — to the domains it has verified.",
          facts: [
            "LDAP and Active Directory",
            /** develop: "a person's directory profile can be read" */
            "A person's directory profile, readable in Qeet ID",
            /** PLAN 1.6: SAML/LDAP adoption only for verified domains */
            "Bound to the organisation's verified domains",
          ],
          docs: "enterprise",
          feature: "directory-sync",
        },
        {
          id: "groups",
          name: "Groups",
          statement: "Groups that mean the same thing everywhere.",
          body: "Groups and nested groups, group templates and imports — and identity provider groups mapped onto the organisation's own, so roles follow the directory.",
          facts: [
            "Nested groups, templates and import",
            /** develop: "a group template can be applied again with a prefix or a new top name" */
            "A template can be applied again, with a prefix or a new top name",
            /** PRODUCT.md: direct group membership only (QTID-90) */
            "Roles come from the groups a person is directly in",
          ],
          docs: "authorization",
          feature: "groups",
        },
      ],
    },
    {
      kind: "split",
      tone: "sunken",
      kicker: "Sync health",
      title: ["When a sync fails,", "you know why."],
      leftTitle: "What every connection keeps",
      left: [
        /** develop a2479fa7 */
        {
          name: "Why it failed",
          body: "Every directory event keeps its reason, and whom a sign-in was for.",
        },
        /** develop: "directory connections count the people and groups they bring in" */
        {
          name: "What it brought in",
          body: "Each connection counts the people and groups it brings.",
        },
        /** develop a2479fa7 */
        { name: "Its last request", body: "SCIM tells you the last request it received." },
      ],
      rightTitle: "What you can do",
      right: [
        /** develop: "directory alerts can be listed, changed, paused and removed" */
        {
          icon: ActivityIcon,
          name: "Alerts",
          body: "List, change, pause or remove the alerts a directory raises.",
        },
        /** PRODUCT.md retry; develop: "a directory connection that works again closes its old failures" */
        {
          icon: RepeatIcon,
          name: "Retry",
          body: "Retry what failed; a connection that works again closes its old failures.",
        },
        /** PRODUCT.md attribute mappings */
        {
          icon: SlidersHorizontalIcon,
          name: "Attribute mappings",
          body: "Map the directory's attributes onto people in Qeet ID.",
        },
        /** PRODUCT.md activity, errors */
        {
          icon: TextSearchIcon,
          name: "Activity",
          body: "Every sync's activity and errors, in one place.",
        },
      ],
      /** PRODUCT.md: no scheduled sync yet (QTID-140) */
      notYet: "Not in 1.0: directory syncs that run on a schedule.",
    },
    {
      kind: "points",
      tone: "dark",
      kicker: "Offboarding",
      title: ["When someone leaves,", "everything stops."],
      items: [
        /** PLAN 1.10 */
        {
          name: "Every sign-in ends",
          body: "A SCIM suspension or deletion ends every session they have.",
        },
        /** PLAN 1.10 */
        { name: "Their keys stop", body: "Personal API keys stop working with the person." },
        /** PLAN 1.4 (done; its org-creation policy deferred) */
        {
          name: "Owners can always leave",
          body: "Owning another organisation never blocks someone's offboarding from their own.",
        },
        /** PLAN 1.2, 1.14 */
        {
          name: "A directory cannot make an admin",
          body: "SCIM cannot add people to admin groups, change owners or lift an admin's suspension.",
        },
      ],
    },
    {
      kind: "plans",
      tone: "light",
      kicker: "On each plan",
      /** billing catalogue (plans.go): "SCIM & LDAP directory sync" on Enterprise */
      title: ["Groups from Starter.", "SCIM and LDAP on Enterprise."],
      rows: [
        { id: "groups", label: "Groups" },
        { id: "enterprise-connections", label: "Admin portal" },
        { id: "scim", label: "SCIM provisioning" },
        { id: "directory-sync", label: "LDAP / Active Directory" },
      ],
    },
  ],
  close: ["Connect your first directory."],
} as const satisfies CapabilityPage;

/* -------------------------------------------------------- authorization */

/**
 * PRODUCT.md "Authorization" (RBAC, ABAC — 13 operators, deny wins, fail-closed
 * — ReBAC, AuthZEN, explain=true grant paths; address rules were `partial`,
 * fixed on develop by QTID-354) and SECURITY.md I2; develop's authorization work.
 */
const AUTHORIZATION = {
  slug: "authorization",
  name: "Authorization",
  docs: "authorization",
  meta: {
    title: "Authorization — roles, attributes and relationships",
    description:
      "Roles, attributes and relationships, decided on the server for every caller, with the reason behind each answer.",
  },
  title: ["Who can do what.", "And why, every time."],
  lede: "Roles, attributes and relationships, decided on the server for every caller — with the reason behind each answer, and a deny that always wins.",
  pathLabel: "How one access decision is made",
  path: [
    { name: "Ask", body: "A person, an API key or an agent asks to do something." },
    { name: "Roles", body: "The roles they hold, directly or through their groups." },
    { name: "Relationships", body: "What they are to the thing they are asking about." },
    /** PLAN 2.12: a missing attribute is unknown (deny applies); the route guard sees groups, roles, MFA, IP */
    {
      name: "Conditions",
      body: "Attributes, second factor and address — a missing attribute counts as unknown.",
    },
    /** owner decision: a refusing policy always wins */
    { name: "Decide", body: "Allow or deny, with the path that granted it. A deny always wins." },
  ],
  sections: [
    {
      kind: "tabs",
      tone: "light",
      kicker: "Models",
      title: ["Roles, attributes, relationships.", "One decision."],
      label: "Ways to decide access",
      items: [
        {
          id: "roles",
          name: "Roles",
          statement: "The model everyone knows, done carefully.",
          body: "Built-in admin, member and viewer roles, and custom roles with exactly the permissions you set. Roles come from a person's groups, and every role says who holds it — directly or through a group.",
          facts: [
            /** develop 2d60d66f */
            "Built-in admin, member and viewer roles",
            /** develop 12fbe2bd */
            "Custom roles, set in one call, renamed or deleted",
            /** develop 41c74cf6 */
            "Each permission says which role or group grants it",
          ],
          docs: "authorization",
          feature: "rbac",
        },
        {
          id: "attributes",
          name: "Attributes",
          statement: "Rules about the request, not only the person.",
          body: "Attribute-based policies with thirteen operators that fail closed. A condition can require a role or a relationship beside the attributes, and a policy can be tried before it is saved.",
          facts: [
            /** PRODUCT.md 13 operators; PLAN 2.12 */
            "Thirteen operators; a missing attribute counts as unknown",
            /** develop 0fbd8e37 */
            "Every version kept whole with its author, and restorable",
            /** develop: "an ABAC evaluation can try an unsaved policy" */
            "An unsaved policy can be tried first",
          ],
          docs: "authorization",
          feature: "abac-rebac",
        },
        {
          id: "relationships",
          name: "Relationships",
          statement: "Access that follows how things connect.",
          body: "Zanzibar-style relationship tuples — this person edits that document, this team owns that project — checked recursively, with a limit on depth.",
          facts: [
            /** PRODUCT.md: recursive check with a depth cap and visited set */
            "Recursive checks, with a depth limit",
            /** develop 8dc8a209 */
            "Relationships list their object types and objects, and name the people",
            /** PRODUCT.md: explain=true grant-path tracing on RBAC and ReBAC */
            "The grant path behind every answer",
          ],
          docs: "authorization",
          feature: "abac-rebac",
        },
        {
          id: "authzen",
          name: "AuthZEN",
          statement: "Your services ask. Qeet ID decides.",
          /** PRODUCT.md AuthZEN PDP/PEP; develop: "AuthZEN answers several evaluations in one call" */
          body: "A standard AuthZEN decision point, so any of your services can ask Qeet ID whether an action is allowed — one evaluation at a time, or several in one call.",
          facts: ["A standard decision point for your services", "Several evaluations in one call"],
          docs: "authorization",
        },
        {
          id: "address-rules",
          name: "Address rules",
          statement: "Where a sign-in may come from.",
          body: "IP allow and deny rules decide every sign-in, the hosted sign-in page included — and a rule change that would lock out the admin making it is refused.",
          facts: [
            /** develop QTID-354 ("make address rules decide every sign-in"; 73911aa3) */
            "Applied to every sign-in",
            /** develop c527b4a3 */
            "A change that would lock its admin out is refused",
            /** develop: "one security-policy rule can be changed without resending the rest" */
            "One rule changed without resending the rest",
          ],
          docs: "authorization",
          feature: "security-policies",
        },
      ],
    },
    {
      kind: "split",
      tone: "sunken",
      kicker: "Explained",
      title: ["Every answer", "comes with its reason."],
      leftTitle: "What you can see",
      left: [
        /** PRODUCT.md explain=true */
        {
          name: "The grant path",
          body: "Ask with explain, and the answer traces the role or relationship that granted it.",
        },
        /** develop: "reason codes on verify, IP-check, audit-chain and authorization results" */
        { name: "The reason", body: "Every authorization result carries a code that says why." },
        /** develop 525f893a */
        {
          name: "The decisions",
          body: "The access decisions an organisation asks for are kept 30 days, and listed.",
        },
      ],
      rightTitle: "What it rules out",
      right: [
        /** owner decision */
        {
          icon: ShieldCheckIcon,
          name: "Deny wins",
          body: "A refusing policy always wins over any allow.",
        },
        /** SECURITY.md I2: a route without a policy is refused; ABAC fail-closed */
        {
          icon: LockIcon,
          name: "Fail closed",
          body: "A route without a policy is refused, and so is an error.",
        },
        /** PLAN 1.2 */
        {
          icon: UsersIcon,
          name: "No self-promotion",
          body: "Adding someone to a group checks the group's roles first.",
        },
        /** PLAN 1.3 */
        {
          icon: UserCheckIcon,
          name: "Fewer privileges only",
          body: "Admins act only on people with fewer privileges; only owners act on owners.",
        },
      ],
    },
    {
      kind: "points",
      tone: "dark",
      kicker: "Every caller",
      title: ["Machines are checked", "as closely as people."],
      items: [
        /** PRODUCT.md: machine callers by exact scope */
        {
          name: "By exact scope",
          body: "A machine caller is authorised by its exact scope, on every route.",
        },
        /** PLAN 1.1 */
        {
          name: "No wider than its maker",
          body: "A key or an agent carries only scopes its creator holds.",
        },
        /** develop: "an app can be limited to the people and groups assigned to it" */
        {
          name: "Apps see their own people",
          body: "An app can be limited to the people and groups assigned to it.",
        },
        /** PRODUCT.md auth hooks may deny; develop e8f4cab1 */
        {
          name: "Hooks can say no",
          body: "A sign-in hook can refuse a sign-in, and can be test-called before it goes live.",
        },
      ],
    },
    {
      kind: "plans",
      tone: "light",
      kicker: "On each plan",
      title: ["Roles on every plan.", "Policies from Pro."],
      rows: [
        { id: "rbac", label: "Roles and permissions" },
        { id: "groups", label: "Groups" },
        { id: "abac-rebac", label: "Attribute and relationship policies" },
        { id: "security-policies", label: "Address rules" },
        { id: "auth-hooks", label: "Sign-in hooks" },
      ],
    },
  ],
  close: ["Write your first policy."],
} as const satisfies CapabilityPage;

/* ------------------------------------------------------------ audit log */

/**
 * PRODUCT.md "Audit and compliance" (SHA-256 chain, /verify, anomaly detection,
 * search, GDPR, SIEM streaming, SOC 2 / ISO 27001 evidence — not certification)
 * and the actor types; develop's audit work; PLAN 2.3, 2.10.
 */
const AUDIT_LOG = {
  slug: "audit-log",
  name: "Audit log",
  docs: "platform/audit",
  meta: {
    title: "Audit log — hash-chained and verifiable",
    description:
      "An append-only audit log where each entry carries the SHA-256 hash of the one before — verifiable end to end, searchable, and streamed to your SIEM.",
  },
  title: ["A record that", "proves itself."],
  lede: "An append-only log where each entry carries the SHA-256 hash of the one before — verifiable end to end, searchable, and streamed to your SIEM.",
  pathLabel: "How one event becomes part of the record",
  path: [
    { name: "Act", body: "Someone or something acts: a person, a key, an agent, a sync." },
    /** develop: "audit events name what they are about"; 05c7a94d */
    { name: "Record", body: "The entry names who acted, what it was about and where from." },
    { name: "Chain", body: "It carries the SHA-256 hash of the entry before it." },
    /** PLAN 2.10: SIEM forwarding in leased batches with back-off */
    { name: "Stream", body: "It goes on to your SIEM, in batches, backing off when needed." },
    /** develop: "an organisation can read its audit chain's last verification" */
    { name: "Verify", body: "/verify walks the chain end to end; the last check stays on record." },
  ],
  sections: [
    {
      kind: "tabs",
      tone: "light",
      kicker: "The log",
      title: ["One log.", "Everything it can tell you."],
      label: "What the audit log does",
      items: [
        {
          id: "chain",
          name: "Hash chain",
          statement: "Change one entry and the chain breaks.",
          body: "Every entry carries the SHA-256 hash of the one before it, so no entry can be altered or removed without breaking the chain. /verify walks it end to end, and says why when it fails.",
          facts: [
            "Append-only, SHA-256 hash-chained",
            /** PLAN 2.3 */
            "Stays whole across server instances",
            /** develop */
            "An organisation can read its last verification",
            /** develop: reason codes on verify and audit-chain results */
            "Every check carries a reason code",
          ],
          docs: "platform/audit",
          feature: "audit-logs",
        },
        {
          id: "search",
          name: "Search and activity",
          statement: "Find the one event that matters.",
          /** develop c76adf18, e85c1a15 */
          body: "Free-text search finds the words of actions, agents, addresses and people. The activity summary totals any filter, counts every kind of actor and spans a year.",
          facts: [
            /** develop 05c7a94d */
            "Each entry says the device and where the request came from",
            /** develop 6968f14e */
            "A live activity stream carries the audit records themselves",
            /** develop ae52f06a */
            "Filtered in the query, with how many match",
          ],
          docs: "platform/audit",
          feature: "audit-logs",
        },
        {
          id: "siem",
          name: "SIEM streaming",
          statement: "Your security team's tools, fed directly.",
          /** PRODUCT.md SIEM streaming (log sinks); PLAN 2.10 */
          body: "Log sinks stream the audit trail on to your SIEM, in batches, backing off when a destination is slow.",
          facts: [
            /** develop: "a log stream destination can be sent a test event" */
            "A destination can be sent a test event",
            "Batched, with back-off",
          ],
          docs: "platform/audit",
          feature: "siem",
        },
        {
          id: "anomalies",
          name: "Anomalies",
          statement: "The unusual, flagged.",
          /** PRODUCT.md behavioural-baseline anomaly detection; develop 0a3c9fdf */
          body: "Behavioural baselines flag activity that does not fit, and bot detection catches automated sign-ins — each listed with totals, who it was and which account.",
          facts: [
            "Behavioural-baseline anomaly detection",
            "Bot detections, with who and which account",
          ],
          docs: "platform/audit",
          feature: "threat-detection",
        },
        {
          id: "evidence",
          name: "Compliance evidence",
          statement: "Evidence your auditors can read.",
          /** PRODUCT.md: evidence generation is not certification; develop eacf7816 */
          body: "Live control-state evidence for SOC 2 and ISO 27001: each control says when it started failing, who owns it and what to do. Evidence is not certification.",
          facts: [
            "Each failing control says since when, its owner and the fix",
            "External audits recorded alongside",
          ],
          docs: "platform/audit",
          feature: "compliance-evidence",
        },
        {
          id: "privacy",
          name: "Privacy",
          statement: "Erasure that keeps the record honest.",
          /** PRODUCT.md: GDPR erasure with grace-period purge, async export, retention purge */
          body: "Right-to-erasure with a grace period before the purge, data export, and retention that purges what it should — while the audit trail stays intact.",
          facts: [
            /** develop 899a500b */
            "An erasure request names its person until erased",
            /** develop 899a500b */
            "Retention says who changed it",
            /** develop 6393257e */
            "A deleted organisation's data is purged after its restore window",
          ],
          docs: "platform/audit",
          feature: "gdpr",
        },
      ],
    },
    {
      kind: "points",
      tone: "dark",
      kicker: "Each entry",
      title: ["Every entry says", "who, what, where and why."],
      items: [
        /** PRODUCT.md actor types: user, service, api_key, agent; system, scim, admin_portal, device */
        {
          name: "Who",
          body: "A person, an API key, an AI agent, SCIM, the admin portal, a linked phone or the system.",
        },
        /** develop: "audit events name what they are about, and a removed relationship" */
        {
          name: "What",
          body: "The action and what it was about — even a relationship that was removed.",
        },
        /** develop 05c7a94d */
        { name: "Where", body: "The address, and the device's operating system and type." },
        /** develop: reason codes */
        {
          name: "Why",
          body: "A reason code on every verification, address check and authorization result.",
        },
      ],
    },
    {
      kind: "plans",
      tone: "light",
      kicker: "On each plan",
      title: ["An audit log on every plan.", "SIEM streaming on Enterprise."],
      rows: [
        { id: "gdpr", label: "Erasure and export" },
        { id: "audit-logs", label: "Audit log" },
        { id: "threat-detection", label: "Anomaly and bot detection" },
        { id: "compliance-evidence", label: "Compliance evidence" },
        { id: "siem", label: "SIEM streaming" },
      ],
    },
  ],
  close: ["Verify the chain yourself."],
} as const satisfies CapabilityPage;

/* ------------------------------------------------------ AI agents, machines */

/**
 * PRODUCT.md "Machine and agent identity" + "OAuth 2.0 / OIDC provider";
 * SECURITY.md (agent tokens checked on every request); owner decisions (agents
 * never receive raw third-party tokens; client_credentials withdrawn for 1.0 —
 * so service principals are not offered here). PLAN 1.1, 1.10, 1.13, 1.15.
 */
const AI_AGENTS = {
  slug: "ai-agents",
  name: "AI agents and machines",
  docs: "concepts",
  meta: {
    title: "AI agents and machines — their own identity",
    description:
      "AI agents, API keys and devices sign in as themselves — with a sponsor on record, scopes no wider than their creator's, short-lived tokens and a kill switch.",
  },
  title: ["Software signs in", "as itself."],
  lede: "AI agents, API keys and devices sign in as themselves — with a sponsor on record, scopes no wider than their creator's, short-lived tokens, and a kill switch for the whole tenant.",
  pathLabel: "How an agent's access is made, used and ended",
  path: [
    /** PRODUCT.md recorded sponsor; PLAN 1.1 */
    { name: "Create", body: "With a sponsor on record, and scopes no wider than its creator's." },
    { name: "Mint", body: "Its own secret mints a short-lived token, again and again." },
    /** SECURITY.md: agent tokens are checked on every request */
    { name: "Act", body: "Every request checks that the agent is still active." },
    /** PRODUCT.md RFC 8693 delegation carrying an act claim */
    { name: "Delegate", body: "Acting for a person, its token says who is acting." },
    /** PRODUCT.md lifecycle + tenant-wide kill switch */
    { name: "Stop", body: "Suspend it, decommission it, or stop every agent at once." },
  ],
  sections: [
    {
      kind: "tabs",
      tone: "light",
      kicker: "Identities",
      title: ["Agents, keys and devices.", "Each its own identity."],
      label: "Kinds of machine identity",
      items: [
        {
          id: "agents",
          name: "AI agents",
          statement: "An identity made for agents, not adapted from a user.",
          body: "AI agents are a first-class identity: active, suspended or decommissioned, with a sponsor on record, a status checked on every request, and short-lived tokens minted from their own secret.",
          facts: [
            "A kill switch stops every agent in the tenant at once",
            "Tokens checked on every request, not only at expiry",
            /** develop de4068f8 */
            "Credentials rotate with an overlap and show their last use",
          ],
          docs: "concepts",
          feature: "agent-identities",
        },
        {
          id: "api-keys",
          name: "API keys",
          statement: "Keys that cannot outgrow their owner.",
          /** SECURITY.md: qk_ prefix, Argon2id-hashed, plaintext shown once; develop QTID-186 */
          body: "Scoped keys for servers and scripts, shown once and then stored only as an Argon2id hash. A key acts only for the person who created it, and stops when they leave.",
          facts: [
            /** PLAN 1.1 */
            "Scopes no wider than its creator's",
            /** develop de4068f8 */
            "Rotated with an overlap, its last use shown",
            /** PLAN 1.10 */
            "Stops working when its person is offboarded",
          ],
          docs: "api",
          feature: "api-keys",
        },
        {
          id: "delegation",
          name: "Delegation",
          statement: "Acting for someone, and saying so.",
          body: "Token exchange (RFC 8693) lets an agent or a service act for a person with a narrower token — and the token names who is acting.",
          facts: [
            /** PLAN 1.15 */
            "A token can only narrow, never widen",
            /** develop QTID-160 */
            "It never outlives the credential it came from",
            /** PRODUCT.md act claim */
            "The acting party is named in the token",
          ],
          docs: "oidc",
          feature: "oauth",
        },
        {
          id: "devices",
          name: "Devices",
          statement: "Sign in where there is no keyboard.",
          /** PRODUCT.md: Device Authorization Grant (RFC 8628), CIBA (poll mode) */
          body: "The device authorization grant (RFC 8628) signs in a TV, a terminal or a command-line tool with a code entered elsewhere; CIBA lets an app ask a person to approve from their own device.",
          facts: [
            /** develop b6fbd602 */
            "Revoking a device's sign-in ends the tokens it got",
            "CIBA, in poll mode",
          ],
          docs: "oidc",
          feature: "oauth",
        },
        {
          id: "mcp",
          name: "MCP and shadow AI",
          statement: "Know which software has standing access.",
          /** PRODUCT.md: MCP token introspection; shadow-AI review of OAuth clients with unattended machine grants */
          body: "MCP servers can introspect the tokens they are handed, and a review lists the OAuth clients holding unattended machine grants — the AI tools nobody approved.",
          facts: ["Token introspection for MCP servers", "A review of unattended machine grants"],
          docs: "concepts",
          feature: "agent-identities",
        },
        {
          id: "vault",
          name: "Token vault",
          statement: "Third-party tokens, kept from agents.",
          /** PRODUCT.md token vault; owner decision: agents never receive raw third-party tokens */
          body: "A vault holds the OAuth tokens of the third-party services people connect — and an agent is never handed one.",
          facts: [
            /** PLAN 1.13 */
            "Connecting a service is bound to the browser that started it",
          ],
          docs: "concepts",
          feature: "secrets-vault",
        },
      ],
      /** PRODUCT.md: the sponsor is recorded but does not bound authority; the brokered call is not built */
      notYet:
        "Not in 1.0: an agent's sponsor is recorded but does not limit what the agent may do, and agents cannot yet make brokered calls to third-party services.",
    },
    {
      kind: "points",
      tone: "dark",
      kicker: "Bounded",
      title: ["Machine access", "has edges you can see."],
      items: [
        /** PLAN 1.1 */
        {
          name: "No wider than its maker",
          body: "A key or an agent carries only scopes its creator holds.",
        },
        /** SECURITY.md */
        {
          name: "Checked every time",
          body: "An agent's token is checked on every request; suspend it and it stops.",
        },
        /** develop QTID-52 */
        {
          name: "Introspection is the answer",
          body: "Whether a token is still good is answered with authority.",
        },
        /** develop QTID-215 */
        {
          name: "Locked after bad secrets",
          body: "Wrong application secrets are counted, and the application locked out.",
        },
      ],
    },
    {
      kind: "plans",
      tone: "light",
      kicker: "On each plan",
      title: ["API keys on every plan.", "Agent identities from Pro."],
      rows: [
        { id: "oauth", label: "OAuth 2.0 grants" },
        { id: "api-keys", label: "API keys" },
        { id: "webhooks", label: "Signed webhooks" },
        { id: "agent-identities", label: "AI-agent identities" },
      ],
    },
  ],
  close: ["Give your first agent", "its own identity."],
} as const satisfies CapabilityPage;

/** Every capability page, by slug — the template renders whichever is asked for. */
export const CAPABILITY_PAGES = {
  authentication: AUTHENTICATION,
  "enterprise-sso": ENTERPRISE_SSO,
  "directory-sync": DIRECTORY_SYNC,
  authorization: AUTHORIZATION,
  "audit-log": AUDIT_LOG,
  "ai-agents": AI_AGENTS,
} as const satisfies Record<CapabilitySlug, CapabilityPage>;
