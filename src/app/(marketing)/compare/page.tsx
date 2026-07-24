import { ArrowRightIcon, CheckIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Reveal, Stagger, StaggerItem } from "@/components/marketing/motion";
import { PageHero } from "@/components/marketing/page-hero";
import { Section, SectionHeader } from "@/components/marketing/section";

export const metadata: Metadata = {
  title: "Compare Qeet ID",
  description:
    "Honest, side-by-side comparisons of Qeet ID against the whole identity field — Auth0, Clerk, WorkOS, Stytch, Cognito, Firebase, Supabase, Keycloak, Zitadel and more — on features, deployment model, and pricing, verified against what we ship.",
};

const competitors = [
  {
    slug: "auth0",
    name: "Auth0",
    category: "Enterprise CIAM",
    tagline:
      "The Okta-owned market leader for federation. Compare on self-hosting, transparent per-MAU pricing, and the no-SSO-tax model.",
  },
  {
    slug: "okta",
    name: "Okta",
    category: "Enterprise CIAM",
    tagline:
      "The workforce-identity giant behind Auth0. Compare on developer ergonomics, transparent per-MAU pricing, and self-hosting.",
  },
  {
    slug: "entra",
    name: "Microsoft Entra External ID",
    category: "Enterprise CIAM",
    tagline:
      "Azure's CIAM, formerly Azure AD B2C. Compare on open-source code, portable deployment, and pricing you can read without a calculator.",
  },
  {
    slug: "ping",
    name: "Ping Identity",
    category: "Enterprise CIAM",
    tagline:
      "Enterprise federation and access management. Compare on a lighter footprint, an open-source core, and linear per-MAU pricing.",
  },
  {
    slug: "clerk",
    name: "Clerk",
    category: "Developer-first auth",
    tagline:
      "The polished React-first auth-as-a-service. Compare on self-hosting, multi-tenant B2B defaults, and owning your own database.",
  },
  {
    slug: "descope",
    name: "Descope",
    category: "Developer-first auth",
    tagline:
      "Drag-and-drop, no-code auth flows. Compare on open-source code, self-hosting, and a lower entry price.",
  },
  {
    slug: "propelauth",
    name: "PropelAuth",
    category: "B2B auth",
    tagline:
      "B2B-first auth with org management. Compare on open-source code, self-hosting, and a tamper-evident audit trail.",
  },
  {
    slug: "frontegg",
    name: "Frontegg",
    category: "B2B auth",
    tagline:
      "A B2B user-management platform. Compare on transparent pricing, open-source code, and self-hosting.",
  },
  {
    slug: "workos",
    name: "WorkOS",
    category: "Enterprise-readiness APIs",
    tagline:
      "SSO / SCIM / Audit APIs you bolt onto your own user store. Compare when you want the user store, MFA, and admin in one place.",
  },
  {
    slug: "stytch",
    name: "Stytch",
    category: "Passwordless + fraud",
    tagline:
      "A passwordless-first API with strong device intelligence. Compare on the built-in admin UI, B2B multi-tenancy, and self-hosting.",
  },
  {
    slug: "cognito",
    name: "AWS Cognito",
    category: "Platform / hyperscaler",
    tagline:
      "AWS's managed user pools. Compare on developer experience, a real admin UI, and no single-cloud lock-in.",
  },
  {
    slug: "firebase",
    name: "Firebase Auth",
    category: "Platform / hyperscaler",
    tagline:
      "Google's client-first auth. Compare on enterprise SSO without a premium tier, RBAC / ABAC, and self-hosting.",
  },
  {
    slug: "supabase",
    name: "Supabase Auth",
    category: "Platform / hyperscaler",
    tagline:
      "Postgres-native auth in the Supabase stack. Compare on standalone identity, enterprise SSO, and a verifiable audit log.",
  },
  {
    slug: "keycloak",
    name: "Keycloak",
    category: "Open source",
    tagline:
      "The incumbent open-source IdP. Compare on a managed option, modern DX, and a lighter operational footprint.",
  },
  {
    slug: "zitadel",
    name: "Zitadel",
    category: "Open source",
    tagline:
      "Open-source identity billed by DAU. Compare on MAU-based pricing, a passkeys-first UX, and first-party SDKs.",
  },
  {
    slug: "authentik",
    name: "Authentik",
    category: "Open source",
    tagline:
      "Open-source IdP from homelab to enterprise. Compare on a managed cloud, B2B multi-tenancy, and CIAM ergonomics.",
  },
  {
    slug: "ory",
    name: "Ory",
    category: "Open source",
    tagline:
      "Composable open-source identity APIs. Compare on an all-in-one product, an admin UI, and MAU (not aDAU) pricing.",
  },
  {
    slug: "fusionauth",
    name: "FusionAuth",
    category: "Open source",
    tagline:
      "Source-available auth, free to self-host. Compare on a fully open-source (MIT) core and transparent pricing.",
  },
  {
    slug: "supertokens",
    name: "SuperTokens",
    category: "Open source",
    tagline:
      "Open-source auth with a free self-host tier. Compare on built-in enterprise SSO, an admin UI, and multi-tenancy.",
  },
];

const edges = [
  "Open-source core, self-hostable down to air-gapped — you own your data and deployment.",
  "Both an OIDC and a SAML IdP, with SCIM Users + Groups, and no “SSO tax.”",
  "A tamper-evident, hash-chained audit log with a /verify endpoint most platforms don't ship.",
  "Refresh-token theft detection, per-account lockout, and a prod boot-gate — secure by default.",
  "Three first-party SDKs — React, Node, and Go — and a 100%-route-covered OpenAPI spec, guarded in CI.",
  "Linear per-MAU pricing with a real 25,000-MAU free tier — no tier-jump surprises.",
];

export default function ComparePage() {
  return (
    <>
      <PageHero
        eyebrow="Compare"
        title="Qeet ID vs."
        titleAccent="the field"
        subtitle="We've put together honest, side-by-side comparisons against the identity platforms you've probably already evaluated. Each one is verified against what Qeet ID actually ships today — gaps included — and against the competitor's public docs."
      />

      <Section innerClassName="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <Stagger staggerDelay={0.08} className="grid gap-4 sm:grid-cols-2">
          {competitors.map((c) => {
            const inner = (
              <>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium uppercase tracking-widest text-brand-text">
                    {c.category}
                  </span>
                  {c.slug && (
                    <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                  )}
                </div>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  Qeet ID <span className="text-muted-foreground">vs.</span> {c.name}
                </h2>
                <p className="text-sm text-muted-foreground">{c.tagline}</p>
              </>
            );
            return (
              <StaggerItem key={c.name} className="h-full">
                {c.slug ? (
                  <Link
                    href={`/compare/${c.slug}`}
                    className="group flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-card p-6 transition-colors hover:border-brand/50 focus-ring-brand"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-card p-6">
                    {inner}
                  </div>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <Section muted innerClassName="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <SectionHeader
            align="left"
            eyebrow="Positioning"
            title="Where Qeet ID"
            titleAccent="wins"
            subtitle="The developer experience of Clerk, the enterprise model of WorkOS, and an audit log nobody else ships — open-source and without the SSO tax."
          />
          <Stagger staggerDelay={0.07} className="grid gap-3 sm:grid-cols-2">
            {edges.map((e) => (
              <StaggerItem key={e}>
                <div className="flex h-full items-start gap-2.5 rounded-xl border border-border/60 bg-background p-4 text-sm">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <CheckIcon className="size-3" aria-hidden />
                  </span>
                  <span>{e}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section innerClassName="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-sm text-muted-foreground text-balance">
            Comparisons reflect publicly-available product information at the time of writing, and
            Qeet ID&apos;s implemented status as of mid-2026. We try hard to be accurate — and to be
            candid about where we&apos;re still building. Spotted something inaccurate?{" "}
            <Link href="/contact" className="underline">
              Let us know
            </Link>
            .
          </p>
        </Reveal>
      </Section>
    </>
  );
}
