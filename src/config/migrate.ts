/**
 * /migrate — moving to Qeet ID from Auth0, Amazon Cognito or Azure AD B2C.
 * Every word lives here.
 *
 * Sources: qeet-id-context FLOWS/tenant-management.md "IdP migration" (no
 * vendor exports a portable password, so imported people arrive with no
 * credential and sign in by passkey, magic link or an administrator-triggered
 * reset) and qeet-id-server `develop` internal/identity/users/import_adapters.go
 * (what each adapter reads), 1076eeea (roles, ids returned), 0e3db0df (roles
 * take the plan's seats), ea57c1ff (a code and a field per refused row).
 */
export const MIGRATE_PAGE = {
  meta: {
    title: "Migrate from Auth0, Cognito or Azure AD B2C",
    description:
      "Qeet ID reads each provider's own user export and brings your people across — with what comes, what does not, and the move step by step.",
  },
  kicker: "Migrate",
  title: ["Bring your people.", "Leave the old provider."],
  lede: "Qeet ID reads the user export of Auth0, Amazon Cognito and Azure AD B2C and brings every person across — with what comes, what does not, and the move step by step.",
  from: ["Auth0", "Amazon Cognito", "Azure AD B2C"],

  comes: {
    kicker: "What comes across",
    title: ["Each provider's own file.", "Read as it is."],
    columns: ["From", "The file", "What comes across"],
    rows: [
      [
        "Auth0",
        "Its user export, one JSON record per line",
        "Email, name (or the nickname), phone",
      ],
      [
        "Amazon Cognito",
        "A CSV in Cognito's user-import layout, columns matched by name",
        "Email, name (or the given and family names), phone",
      ],
      [
        "Azure AD B2C",
        "The Microsoft Graph list of users",
        "Email (from the sign-in identity, the mail or the user principal name), display name, mobile phone",
      ],
    ],
    /** FLOWS/tenant-management.md: no vendor exports a portable password */
    notComing:
      "Passwords and second factors do not come across — no provider exports them in a form another can use.",
  },

  steps: {
    kicker: "The move",
    title: ["Five steps.", "In this order."],
    items: [
      {
        where: "Your old provider",
        name: "Export your users",
        body: "Use the provider's own export: Auth0's user export, a Cognito user CSV, or the Microsoft Graph list of your B2C users.",
      },
      {
        where: "Qeet ID console",
        name: "Import them into an organisation",
        /** develop ea57c1ff, 1076eeea */
        body: "Each row becomes a person. A row that cannot be read, or has no email, is reported with its line and the reason, and the rest carry on. Everyone imported can be given a role, and their ids come back.",
      },
      {
        where: "Your people",
        name: "Choose how they sign in first",
        /** FLOWS/tenant-management.md "IdP migration" */
        body: "Passwords cannot come across, so imported people sign in with a passkey or a magic link — or set a password through a reset you send.",
      },
      {
        where: "Your customers' IT",
        name: "Bring your enterprise customers",
        body: "Their SAML or OpenID Connect connections are set up again through the admin portal, and their directories pointed at Qeet ID over SCIM.",
        more: { label: "Enterprise SSO", href: "/product/enterprise-sso" },
      },
      {
        where: "Your applications",
        name: "Point your apps at Qeet ID",
        /** QID-010: no SDK is published */
        body: "Qeet ID speaks standard OpenID Connect and SAML, so an app changes its issuer, client ID and secret. SDKs for React, Node and Go are not published yet.",
        more: { label: "Quickstart", href: "docs:quickstart" },
      },
    ],
  },

  know: {
    kicker: "Good to know",
    title: ["Small things,", "before the big day."],
    items: [
      /** develop ea57c1ff: a code and a field per refused row */
      {
        name: "A bad row stops nothing",
        body: "It is reported with its line, its code and the field at fault.",
      },
      /** import_adapters.go normalizePhone */
      {
        name: "Phones are tidied, not completed",
        body: "Formatting is removed; a missing country code is not added.",
      },
      /** develop 0e3db0df */
      {
        name: "Roles take seats",
        body: "A role given during an import counts against the plan's seats.",
      },
      /** FLOWS/tenant-management.md: the import runs inline, with no progress (QTID-123) */
      {
        name: "One request per file",
        body: "Each file is imported in a single request, so a very large export is best split.",
      },
    ],
  },

  close: ["Planning a move?", "Talk to us first."],
} as const;
