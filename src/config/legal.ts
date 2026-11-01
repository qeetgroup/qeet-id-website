/**
 * /legal/[slug] — the four legal pages, as data, one shell.
 *
 * These are placeholder drafts, not reviewed by counsel, and say so at the top
 * of each page. What they state as fact is checked:
 *   - this website — no analytics, no cookies, one localStorage key for the
 *     theme (app/layout.tsx STORAGE_KEY), fonts and images self-hosted;
 *   - the service — qeet-id-context/DEPENDENCIES.md §2 for every provider,
 *     qeet-id-deploy terraform for the region (variables.tf aws_region
 *     "ap-south-2" — Hyderabad), RDS storage_encrypted, and the optional
 *     providers off by default (copilot_provider "", breached_password_check
 *     false; no Twilio credentials, so SMS stays on its log-only fallback),
 *     and Expo's public push service, which push approvals use by default
 *     (server config.go EXPO_PUSH_URL);
 *   - contacts — the addresses qeet.in publishes (support@ for privacy and
 *     terms, as qeet.in's own legal pages use).
 * Dropped as untrue: a tenant-chosen data-residency region, a Data Protection
 * Officer, privacy@/dpo@/legal@ addresses, and the subprocessors the service
 * does not use (Google Cloud, Cloudflare, Datadog, Resend).
 *
 * Text format: paragraphs; inline `code`, **strong**, [links](href)
 * (lib/inline.ts).
 */

export type LegalSection = { heading: string; body: readonly string[] };

export type Subprocessor = {
  name: string;
  does: string;
  where: string;
  /** Whether the 1.0 deployment uses it, or what switches it on. */
  state: string;
};

export type LegalDoc = {
  slug: "privacy" | "terms" | "dpa" | "subprocessors";
  title: string;
  /** The short name, for the rail. */
  short: string;
  description: string;
  /** ISO date this page last changed. */
  updated: string;
  intro: string;
  sections: readonly LegalSection[];
  subprocessors?: readonly Subprocessor[];
};

export const DRAFT_NOTE =
  "A placeholder draft. It describes how Qeet ID is set up today, but it has not been reviewed by counsel, and Qeet ID is not yet in service. It will be replaced before 1.0.";

const PRIVACY: LegalDoc = {
  slug: "privacy",
  title: "Privacy policy",
  short: "Privacy",
  description:
    "What this website and the Qeet ID service process, why, where, and the rights you have over it.",
  updated: "2026-10-30",
  intro:
    "This policy covers two things: this website, id.qeet.in, and the Qeet ID service that organisations use to sign their people in.",
  sections: [
    {
      heading: "This website",
      body: [
        "The website has no analytics, no advertising trackers and no cookies. Its fonts and images are served from the site itself, not from third parties.",
        "It keeps one value in your browser's local storage — `qeetid-web-theme`, your light or dark choice — which never leaves your device. Our hosting provider keeps standard request logs (IP address, user agent, time) for a short period as part of running the site.",
      ],
    },
    {
      heading: "Data the service processes",
      body: [
        "For the organisations that use it, Qeet ID processes account data (name, email address, phone number where given, organisation), authentication data (sign-in events, devices, IP addresses) and the audit trail of what happened in each organisation. We do not sell personal data.",
      ],
    },
    {
      heading: "How it is used",
      body: [
        "To sign people in and keep them signed in, to decide what they may do, to protect accounts from abuse, to keep the audit trail each organisation relies on, to meet legal obligations, and to write to you about your account.",
      ],
    },
    {
      heading: "Legal bases",
      body: [
        "Where the GDPR applies: the performance of a contract, our legitimate interest in running a secure service, your consent where it is needed, and compliance with legal obligations.",
      ],
    },
    {
      heading: "Where it is kept",
      body: [
        "The service runs on Amazon Web Services in the Asia Pacific (Hyderabad) region, and its database is encrypted at rest. The providers involved are listed on the [subprocessors page](/legal/subprocessors). Where data crosses borders, it does so with the safeguards the law requires.",
      ],
    },
    {
      heading: "Retention",
      body: [
        "Personal data is kept while an account is active and for as long as the service needs it, then deleted. Each organisation sets its own retention, and erasure requests run after a grace period — while the audit trail itself is kept intact.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "Depending on where you are, you may have the right to access, correct, delete or export your personal data, and to object to or restrict some processing. If your account belongs to an organisation, that organisation decides first; you can also write to [support@qeet.in](mailto:support@qeet.in).",
      ],
    },
    {
      heading: "Contact",
      body: [
        "Questions about this policy, or about how data is handled, go to [support@qeet.in](mailto:support@qeet.in).",
      ],
    },
  ],
};

const TERMS: LegalDoc = {
  slug: "terms",
  title: "Terms of service",
  short: "Terms",
  description:
    "The terms for using Qeet ID's services: accounts, acceptable use, fees, termination and liability.",
  updated: "2026-10-30",
  intro:
    "These terms govern access to and use of Qeet ID's services. By using the services, you agree to them.",
  sections: [
    {
      heading: "Agreement",
      body: [
        "By accessing or using Qeet ID (the “services”), you agree to these terms and the policies they refer to. If you use the services on behalf of an organisation, you confirm that you may bind it.",
      ],
    },
    {
      heading: "Accounts and access",
      body: [
        "You are responsible for the credentials used to reach your account, and for what happens under it. Tell us promptly of any use you did not authorise.",
      ],
    },
    {
      heading: "Acceptable use",
      body: [
        "Do not misuse the services: do not interfere with how they run, reach them other than through the interfaces and instructions we provide, or use them to break the law.",
      ],
    },
    {
      heading: "Fees and payment",
      body: [
        "Paid plans are billed in advance, monthly or yearly, at the prices on the [pricing page](/pricing). Fees are not refundable except where the law requires it or an order form says so.",
      ],
    },
    {
      heading: "Termination",
      body: [
        "You may stop using the services at any time. We may suspend or end access for a breach of these terms, with notice where we can give it.",
      ],
    },
    {
      heading: "Disclaimers and liability",
      body: [
        "The services are provided “as is”. To the extent the law allows, our total liability arising from these terms is limited to what you paid us in the twelve months before the claim.",
      ],
    },
    {
      heading: "Contact",
      body: ["Questions about these terms go to [support@qeet.in](mailto:support@qeet.in)."],
    },
  ],
};

const DPA: LegalDoc = {
  slug: "dpa",
  title: "Data processing addendum",
  short: "DPA",
  description: "How Qeet ID processes personal data on behalf of the organisations that use it.",
  updated: "2026-10-30",
  intro:
    "This addendum forms part of the agreement between you, the controller, and Qeet ID, the processor, for the personal data Qeet ID processes on your behalf.",
  sections: [
    {
      heading: "Roles",
      body: [
        "You are the controller of the personal data processed through the services; Qeet ID is the processor, acting on your documented instructions.",
      ],
    },
    {
      heading: "Scope and purpose",
      body: [
        "Qeet ID processes personal data to provide the services as you configure them: authentication, authorization, sessions, directory sync and the audit log.",
      ],
    },
    {
      heading: "Confidentiality",
      body: ["Everyone authorised to process the data is bound by confidentiality."],
    },
    {
      heading: "Security measures",
      body: [
        "Encryption in transit and at rest, each organisation's data kept apart in the application and in the database, least-privilege access, and a tamper-evident audit log — as the [security page](/security) describes.",
      ],
    },
    {
      heading: "Subprocessors",
      body: [
        "You authorise Qeet ID to use the providers on the [subprocessors page](/legal/subprocessors). Qeet ID will give notice before adding one, and remains responsible for them.",
      ],
    },
    {
      heading: "Requests and breaches",
      body: [
        "Qeet ID will help you answer requests from the people whose data you hold, and will tell you without undue delay after becoming aware of a personal data breach that affects your data.",
      ],
    },
    {
      heading: "Deletion and return",
      body: [
        "When the agreement ends, Qeet ID will delete or return personal data as you instruct, subject to the retention the law requires.",
      ],
    },
  ],
};

const SUBPROCESSORS: LegalDoc = {
  slug: "subprocessors",
  title: "Subprocessors",
  short: "Subprocessors",
  description:
    "The providers Qeet ID's service is built on, what each does, where, and whether the 1.0 deployment uses it.",
  updated: "2026-10-30",
  intro:
    "The providers Qeet ID's service is built on, from its dependency record. Qeet ID is not yet in service, so this is the list for 1.0: what each provider does, where, and whether the deployment uses it.",
  sections: [
    {
      heading: "Changes",
      body: [
        "We will give notice before a provider is added. To ask about this list, write to [support@qeet.in](mailto:support@qeet.in).",
      ],
    },
  ],
  subprocessors: [
    {
      name: "Amazon Web Services",
      does: "Runs the service — its servers, its database, its keys and settings — and sends its email",
      where: "Asia Pacific (Hyderabad)",
      state: "Used",
    },
    {
      name: "Vercel",
      does: "Hosts the console, the hosted sign-in pages, this website and the docs",
      where: "Global",
      state: "Used",
    },
    {
      name: "Twilio",
      does: "Sends SMS codes",
      where: "—",
      state: "Not set up yet",
    },
    {
      name: "Expo",
      does: "Delivers push approvals to the Qeet ID authenticator app",
      where: "—",
      state: "Used",
    },
    {
      name: "Stripe and Razorpay",
      does: "Take payment for paid plans",
      where: "—",
      state: "When billing is switched on",
    },
    {
      name: "Anthropic or OpenAI",
      does: "Answer questions in the console's assistant",
      where: "—",
      state: "Off unless switched on",
    },
  ],
};

export const LEGAL_DOCS: readonly LegalDoc[] = [PRIVACY, TERMS, DPA, SUBPROCESSORS];

export const LEGAL_PAGE = {
  kicker: "Legal",
  updated: "Last updated",
  draft: "Draft",
  contents: "On this page",
  documents: "Legal",
  table: { name: "Provider", does: "What it does", where: "Where", state: "In 1.0" },
} as const;
