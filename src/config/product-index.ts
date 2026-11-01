/**
 * /features — every capability on one page, the standards Qeet ID implements,
 * and what is not in 1.0. The capability rows are read from
 * config/capabilities.ts (no new claims here); the standards are PRODUCT.md's
 * implemented list; each "not in 1.0" line cites its decision or issue.
 */
export const PRODUCT_INDEX = {
  meta: {
    title: "Product — every capability",
    description:
      "Authentication, enterprise SSO, directory sync, authorization, the audit log and identities for AI agents — and the standards Qeet ID implements.",
  },
  kicker: "Product",
  title: ["Everything in Qeet ID.", "Six capabilities, one identity."],
  lede: "Authentication, enterprise single sign-on, directory sync, authorization, the audit log and identities for software — one platform, decided on the server, each organisation its own tenant.",

  capabilities: { kicker: "Capabilities", title: ["Six capabilities.", "Each with its own page."] },

  /** PRODUCT.md, implemented — the OAuth table, federation, MFA, authorization and platform sections. */
  standards: {
    kicker: "Standards",
    title: ["The specifications", "it implements."],
    lede: "Open standards, so Qeet ID works with what your customers already run — listed here with what each one is for.",
    groups: [
      {
        name: "Sign-in",
        rows: [
          ["WebAuthn", "Passkeys"],
          ["TOTP (RFC 6238)", "Authenticator-app codes"],
          ["OpenID Connect", "Sign-in for your apps, and with an organisation's own provider"],
          ["SAML 2.0", "Single sign-on, as service provider and as identity provider"],
        ],
      },
      {
        name: "OAuth 2.0",
        rows: [
          ["Authorization code + PKCE", "S256 only, with refresh tokens"],
          ["Device grant (RFC 8628)", "Sign-in on a TV or a command-line tool"],
          ["Token exchange (RFC 8693)", "Delegation and down-scoping"],
          ["CIBA", "Approval on a person's own device (poll mode)"],
          ["Resource indicators (RFC 8707)", "Tokens for one named resource"],
          ["Introspection (RFC 7662)", "Is this token still good?"],
          ["Revocation (RFC 7009)", "End a refresh token"],
          ["Protected resource metadata (RFC 9728)", "How a resource describes itself"],
        ],
      },
      {
        name: "Directory and access",
        rows: [
          ["SCIM 2.0", "Users and groups from an organisation's directory"],
          ["LDAP", "LDAP and Active Directory"],
          ["AuthZEN", "A standard access-decision API"],
        ],
      },
      {
        name: "Tokens and platform",
        rows: [
          ["JWT, ES256 + JWKS", "Signed tokens and their public keys"],
          ["W3C Verifiable Credentials", "Issue, verify and revoke"],
          ["OpenAPI 3.1", "The REST API, described end to end"],
          ["HMAC-SHA256 webhooks", "Signed events, with retries and back-off"],
          ["OpenTelemetry · Prometheus", "Traces and metrics"],
        ],
      },
    ],
  },

  /** What the record says is not in 1.0 — said once, plainly, in one place. */
  notYet: {
    kicker: "Not in 1.0",
    title: ["What is not in 1.0.", "Said plainly."],
    items: [
      { name: "Custom sign-in domains", body: "Recorded, but not yet served (QTID-118)." },
      { name: "Scheduled directory sync", body: "A sync runs when it is started (QTID-140)." },
      {
        name: "Published SDKs",
        body: "React, Node and Go SDKs are not published yet; the APIs are standard.",
      },
      {
        name: "Service accounts",
        body: "The client-credentials grant is withdrawn for 1.0; API keys and agents cover machines.",
      },
      {
        name: "Brokered agent calls",
        body: "Agents cannot yet call third-party services through Qeet ID, and a sponsor does not yet limit an agent.",
      },
      {
        name: "Authorization server metadata",
        body: "RFC 8414 metadata is not served; OpenID Connect discovery is.",
      },
    ],
  },

  close: ["Start with the docs,", "or with a conversation."],
} as const;
