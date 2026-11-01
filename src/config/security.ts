/**
 * /security — the trust brief. Every word lives here.
 *
 * Sources: qeet-id-context/SECURITY.md (§1 invariants, §6 tokens and keys, §7
 * data protection, §9 fail-open decisions, §10 threat surface, §12 known
 * gaps), qeet-context/SECURITY.md §11 (vulnerability reporting) and
 * qeet-id-server `develop`. Where develop is ahead of the record it is cited.
 *
 * What is deliberately NOT here: the invariants that are not yet held (I3, I4,
 * I5, I8 — QTID-829, -779, -19, -817) and the open gaps behind them. They are
 * written down in the record; a public page does not publish unfixed
 * weaknesses. The page says that more rules exist and are not yet fully held.
 */
export const SECURITY_PAGE = {
  meta: {
    title: "Security",
    description:
      "The rules Qeet ID never breaks, two layers of tenant isolation, the algorithms and keys, the threats it is built against and the trade-offs it makes on purpose.",
  },
  kicker: "Security",
  title: ["Security you can", "check for yourself."],
  lede: "The rules Qeet ID never breaks, how one organisation is kept from another, the algorithms and keys, the threats it is built against and the trade-offs it makes on purpose — written for the security team that has to say yes.",

  facts: [
    { value: "ES256", label: "The only signing algorithm accepted" },
    /** develop ea57c1ff (migration 0160) — newer than SECURITY.md §2 and ADR-0019; confirm with the owner */
    { value: "2 layers", label: "Of tenant isolation: the application and the database" },
    /** SECURITY.md §3: the same hasher protects passwords, API-key and agent secrets, recovery codes */
    { value: "Argon2id", label: "For every secret a person or a machine proves" },
    { value: "SHA-256", label: "A hash chain through each tenant's audit log" },
  ],

  sections: [
    {
      id: "rules",
      title: "The rules it never breaks",
      lede: "Written down as rules, not goals — a change that breaks one is a defect, not a trade-off. These six are enforced in code today.",
      /** SECURITY.md §1, the rows marked "Code"; I10's gap (QTID-805) fixed on develop 4883af3c */
      rules: [
        {
          n: "I1",
          text: "Tenant scope comes from the authenticated principal — never from a request's path, body or header.",
        },
        {
          n: "I2",
          text: "Authorization is decided on the server. No client is an authority, and a route without a policy is refused.",
        },
        {
          n: "I6",
          text: "Every token carries a key ID, and one with a missing or unknown ID is rejected. ES256 only — no algorithm negotiation.",
        },
        {
          n: "I7",
          text: "Credentials the platform only verifies are never returned and are kept only as hashes — passwords, API-key and agent secrets, recovery codes, client secrets, session and refresh tokens.",
        },
        {
          n: "I9",
          text: "Agent tokens are short-lived and re-minted, never refreshed — a minute to an hour, with the agent checked on every request.",
        },
        {
          n: "I10",
          text: "Access across organisations needs explicit membership. There is no platform-wide administrator.",
        },
      ],
      note: "Four more rules are written down and not yet fully held; they are being closed.",
    },
    {
      id: "isolation",
      title: "One organisation, kept from another",
      lede: "Every organisation in Qeet ID is its own tenant. Two layers keep them apart, so one mistake in one place is not enough.",
      layers: [
        {
          name: "In the application",
          /** SECURITY.md §2: EnforceTenantScope + RequireTenant */
          body: "Every authenticated route passes a guard: a tenant named in the path must be the caller's own, and the tenant is read only from the authenticated principal.",
        },
        {
          name: "In the database",
          /** develop ea57c1ff: qeet_app role, qeet.tenant_id per acquire, tenant_isolation policy on 54 tables, 26 account-level tables listed + test */
          body: "PostgreSQL row-level security on every organisation-owned table — 54 of them. Connections run as a role the policies bind, with the tenant set on each one; the 26 account-level tables are listed with their reasons, and a test keeps the list honest.",
        },
      ],
      /** develop ea57c1ff: postgres.AcrossTenants for switch, create organisation, own invitations, own export and deletion */
      note: "The few flows that cross organisations by design — switching organisation, accepting your own invitation, exporting or deleting your own data — say so explicitly in the code.",
    },
    {
      id: "tokens",
      title: "Tokens and keys",
      /** SECURITY.md §6, §4 */
      rows: [
        ["Algorithm", "ES256 (ECDSA P-256), the only method accepted"],
        ["Key ID", "The RFC 7638 thumbprint of each key; a missing or unknown one is rejected"],
        [
          "Key store",
          "Private keys encrypted under the deployment key, each one candidate, active or retired",
        ],
        [
          "Rotation",
          "A new key is published before it signs, and an old one stays published, verify-only, through a grace period — 30 days by default",
        ],
        [
          "Lifetimes",
          "Access tokens 10 minutes; refresh tokens 30 days, rotated on use — and a reused one revokes the session",
        ],
        [
          "Custom claims",
          "A tenant's hook adds claims only under its own namespace, so it can never shadow scope or tenant",
        ],
      ],
    },
    {
      id: "data",
      title: "Data protection",
      /** SECURITY.md §7 */
      rows: [
        [
          "Secrets vault",
          "AES-256-GCM with a random nonce, and a key derived per tenant and per purpose (HKDF)",
        ],
        ["Key provider", "AWS KMS unwraps the data key at start-up in the managed deployment"],
        [
          "Hashed secrets",
          "Passwords, API-key and agent secrets and recovery codes, with Argon2id — shown once",
        ],
        ["Audit integrity", "A SHA-256 hash chain per tenant, walked end to end by /verify"],
        ["Randomness", "The operating system's cryptographic source, and nothing else"],
        ["Transport", "TLS, terminated at the edge"],
      ],
    },
    {
      id: "threats",
      title: "What it is built against",
      /** SECURITY.md §10 (the breached-password check is on by default on develop, STATUS.md 5.5) */
      rows: [
        [
          "Credential stuffing",
          "Per-account lockout, password-spraying protection per network, and a breached-password check",
        ],
        [
          "Session theft",
          "Refresh rotation with reuse detection, and each organisation's maximum age and idle timeout",
        ],
        ["Cross-tenant access", "The application guard and row-level security, above"],
        ["Token replay", "Short access lifetimes, key-ID enforcement and introspection"],
        [
          "A malicious tenant hook",
          "Its claims kept in their own namespace, and its requests HMAC-signed",
        ],
        [
          "SAML assertion forgery",
          "Signature, issuer, audience and conditions checked; each assertion ID used once, against a 24-hour replay ledger",
        ],
        [
          "A compromised agent",
          "Short-lived tokens, a status check on every request, and suspend, decommission or stop-all",
        ],
      ],
    },
    {
      id: "trade-offs",
      title: "Trade-offs, made on purpose",
      lede: "Two places where Qeet ID chooses staying up over strictness — decided, written down, and here with the reason.",
      /** SECURITY.md §9: ADR-0007, ADR-0011 */
      items: [
        {
          name: "The rate limiter fails open",
          body: "If its store cannot be reached, requests go unlimited for that time — a store outage should not lock every organisation out.",
        },
        {
          name: "Sign-in hooks fail open by default",
          body: "A tenant's broken hook should not break its sign-in. A hook can be set to fail closed instead.",
        },
      ],
    },
    {
      id: "compliance",
      title: "Compliance and privacy",
      items: [
        {
          name: "SOC 2 and ISO 27001",
          /** PRODUCT.md: evidence generation is not certification; develop eacf7816 */
          body: "Live control-state evidence for both frameworks, each failing control with its owner and the fix. Evidence is not certification.",
        },
        {
          name: "GDPR",
          body: "Erasure with a grace period that keeps the audit trail intact, data export, and retention that purges on schedule.",
        },
      ],
      links: [
        { label: "Data processing agreement", href: "/legal/dpa" },
        { label: "Subprocessors", href: "/legal/subprocessors" },
        { label: "Privacy policy", href: "/legal/privacy" },
      ],
    },
    {
      id: "not-yet",
      title: "Not done yet",
      lede: "Qeet ID is in development. These are still ahead, and said here rather than left out.",
      /** SECURITY.md §12 — operational, not engineering */
      items: [
        { name: "An external penetration test", body: "Not yet run (QTID-687)." },
        { name: "The OpenID conformance suite", body: "Not yet run." },
        {
          name: "Customer-managed keys",
          body: "Bring-your-own-key through AWS KMS is not live yet.",
        },
      ],
    },
  ],

  /** qeet-context/SECURITY.md §11 — no acknowledgement or remediation targets are published for Qeet ID yet */
  report: {
    title: ["Found something?", "Tell us privately."],
    body: "Write to security@qeet.in, or use GitHub's private vulnerability reporting on the affected repository. Please don't open a public issue or put exploit details in a public pull request.",
    note: "A break in tenant isolation is the most serious kind of report Qeet ID recognises.",
    email: "security@qeet.in",
    github: "https://github.com/qeetgroup",
  },
} as const;
