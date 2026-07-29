import { cn } from "@qeetrix/ui";
import { CheckIcon } from "lucide-react";
import type { Metadata } from "next";
import { BezelCard } from "@/components/marketing/blocks/bezel-card";
import { ButtonLink } from "@/components/marketing/button-link";
import { tiers } from "@/components/marketing/data/pricing";
import { BorderBeam } from "@/components/marketing/effects/border-beam";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { Reveal, Stagger, StaggerItem } from "@/components/marketing/motion";
import { PageHero } from "@/components/marketing/page-hero";
import { PricingCalculator } from "@/components/marketing/pricing-calculator";
import { Section, SectionHeader } from "@/components/marketing/section";
import { FaqJsonLd } from "@/components/marketing/structured-data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Free for developers. Per-MAU pricing for growing teams. Custom contracts for enterprise.",
  alternates: { canonical: "/pricing" },
};

const compare = [
  {
    feature: "Monthly active users",
    free: "10,000",
    starter: "25,000",
    pro: "100,000 + metered",
    enterprise: "Unlimited",
  },
  { feature: "Social providers", free: "All", starter: "All", pro: "All", enterprise: "All" },
  { feature: "Passkeys / WebAuthn", free: "✓", starter: "✓", pro: "✓", enterprise: "✓" },
  {
    feature: "MFA (TOTP, SMS, Email OTP)",
    free: "TOTP only",
    starter: "All",
    pro: "All",
    enterprise: "All",
  },
  {
    feature: "Enterprise SSO (SAML/OIDC)",
    free: "—",
    starter: "—",
    pro: "✓ Included",
    enterprise: "✓ + enforcement",
  },
  {
    feature: "SCIM / LDAP directory sync",
    free: "—",
    starter: "—",
    pro: "—",
    enterprise: "✓",
  },
  {
    feature: "RBAC roles",
    free: "3",
    starter: "Unlimited",
    pro: "Unlimited + ABAC",
    enterprise: "Unlimited + ABAC/ReBAC",
  },
  {
    feature: "Audit log retention",
    free: "7 days",
    starter: "30 days",
    pro: "90 days + export",
    enterprise: "Custom + SIEM",
  },
  {
    feature: "Custom branding & domain",
    free: "—",
    starter: "✓",
    pro: "✓",
    enterprise: "✓",
  },
  {
    feature: "Data residency & BYOK",
    free: "—",
    starter: "—",
    pro: "—",
    enterprise: "✓",
  },
  {
    feature: "Support",
    free: "Community",
    starter: "Email, 48h",
    pro: "Priority + chat, 24h",
    enterprise: "24/7 + named CSM",
  },
  { feature: "Uptime SLA", free: "—", starter: "99.9%", pro: "99.95%", enterprise: "99.99%" },
];

const faq = [
  {
    q: "What counts as a Monthly Active User?",
    a: "Any unique end-user who signs in or refreshes a session within a calendar month. Machine-to-machine tokens are not counted.",
  },
  {
    q: "Can I switch plans anytime?",
    a: "Yes. Upgrades take effect immediately; downgrades take effect at the next billing cycle.",
  },
  {
    q: "Do you offer non-profit or open-source discounts?",
    a: "We offer 50% off the Pro plan for registered non-profits and 100% off for verified open-source projects.",
  },
  {
    q: "Is there a self-hosted option?",
    a: "Yes, on Enterprise contracts. We ship a Kubernetes deploy with a Helm chart and a DR runbook, monitored by your team.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing."
        titleAccent="Real free tier."
        subtitle="Free up to 10,000 MAU, no card required. Enterprise SSO is included on Pro — no SSO tax. Predictable per-MAU pricing as you grow."
      />

      <Section innerClassName="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Stagger staggerDelay={0.1} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t) => (
            <StaggerItem key={t.name} className="h-full">
              <BezelCard featured={t.featured} className="gap-6 p-7 shadow-xl shadow-black/5">
                {t.featured && (
                  <BorderBeam
                    size={280}
                    duration={9}
                    colorFrom="var(--brand-500)"
                    colorTo="var(--brand-300)"
                  />
                )}
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold tracking-tight">{t.name}</h3>
                  {t.featured && (
                    <span className="rounded-full bg-(image:--brand-gradient) px-2 py-0.5 text-xs font-medium text-brand-foreground">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{t.description}</p>
                <div className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      "font-display text-4xl font-semibold tracking-tight",
                      t.featured && "text-gradient-brand",
                    )}
                  >
                    {t.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{t.period}</span>
                </div>
                <ButtonLink
                  size="lg"
                  variant={t.featured ? "default" : "outline"}
                  className="w-full"
                  href={t.cta.href}
                >
                  {t.cta.label}
                </ButtonLink>
                <ul className="flex flex-col gap-2.5 border-t border-border/60 pt-6 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </BezelCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <PricingCalculator />

      <Section muted innerClassName="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeader title="Compare" titleAccent="plans" />

        <Reveal className="mt-12 overflow-hidden rounded-2xl border border-border/60 bg-background">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Feature comparison across Free, Starter, Pro, and Enterprise plans
            </caption>
            <thead>
              <tr className="border-b border-border/60 bg-muted/40 text-xs uppercase tracking-widest text-muted-foreground">
                <th scope="col" className="px-4 py-3 font-medium">
                  Feature
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Free
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Starter
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  <span className="text-gradient-brand font-semibold">Pro</span>
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {compare.map((row, i) => (
                <tr
                  key={row.feature}
                  className={cn(i !== compare.length - 1 && "border-b border-border/60")}
                >
                  <th scope="row" className="px-4 py-3 text-left font-medium">
                    {row.feature}
                  </th>
                  <td className="px-4 py-3 text-muted-foreground">{row.free}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.starter}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.pro}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Section>

      <Section innerClassName="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* FAQPage rich-result data — mirrors the visible accordion below. */}
        <FaqJsonLd items={faq} />
        <SectionHeader align="left" title="Pricing" titleAccent="FAQ" />
        <FaqAccordion items={faq} />
      </Section>
    </>
  );
}
