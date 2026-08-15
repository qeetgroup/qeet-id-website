import {
  Building2Icon,
  FileCheck2Icon,
  HeadsetIcon,
  KeyRoundIcon,
  ScrollTextIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/marketing/motion";
import { Section } from "@/components/marketing/section";
import { ContactSalesButton } from "./contact-sales-button";

/**
 * Enterprise section (§13). Every capability listed is implemented in the Qeet
 * ID server (federation / security / operations contexts). We deliberately
 * avoid unsupported claims: no data-residency guarantee, and compliance is
 * framed as evidence tooling + in-progress audits rather than certifications.
 */
const pillars = [
  {
    icon: Building2Icon,
    title: "Federation at scale",
    body: "SAML 2.0 and OIDC SSO, SCIM provisioning, and LDAP/AD directory sync via a self-serve Admin Portal.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Governance & enforcement",
    body: "SSO/MFA enforcement, IP allow/deny policies, adaptive threat detection and step-up on sensitive actions.",
  },
  {
    icon: ScrollTextIcon,
    title: "Auditability",
    body: "Hash-chained, tamper-evident audit logs with a /verify endpoint, custom retention and SIEM streaming.",
  },
  {
    icon: KeyRoundIcon,
    title: "Key control",
    body: "Bring your own key (AWS KMS envelope encryption) for the secrets and token vaults, or self-host entirely.",
  },
  {
    icon: FileCheck2Icon,
    title: "Compliance evidence",
    body: "GDPR export & erasure today, plus live SOC 2 / ISO 27001 control evidence. Independent audits are in progress.",
  },
  {
    icon: HeadsetIcon,
    title: "Dedicated support",
    body: "A named CSM, white-glove onboarding, security reviews and a custom SLA — all on a contract sized to you.",
  },
];

export function EnterpriseSection() {
  return (
    <Section muted innerClassName="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 sm:p-12">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-(image:--brand-gradient)"
          />
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-brand-text">
              Enterprise
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Identity for organizations with demanding requirements
            </h2>
            <p className="mt-4 text-muted-foreground text-balance sm:text-lg">
              Scale, security and governance on a commercial agreement built around your environment
              — with the deployment, controls and support your teams require.
            </p>
          </div>

          <Stagger staggerDelay={0.06} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-background p-5">
                  <span className="inline-flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Icon className="size-4.5" aria-hidden />
                  </span>
                  <h3 className="font-medium">{title}</h3>
                  <p className="text-sm text-muted-foreground">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ContactSalesButton size="lg" source="enterprise_section">
              Talk to sales
            </ContactSalesButton>
            <p className="text-sm text-muted-foreground">
              Custom contracts, security reviews and deployment options — let&apos;s scope it
              together.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
