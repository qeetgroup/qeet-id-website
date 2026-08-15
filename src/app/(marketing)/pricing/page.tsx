import type { Metadata } from "next";

import { ButtonLink } from "@/components/marketing/button-link";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { ComparisonSection } from "@/components/marketing/pricing/comparison-table";
import { ContactSalesButton } from "@/components/marketing/pricing/contact-sales-button";
import { EnterpriseSection } from "@/components/marketing/pricing/enterprise-section";
import { PricingPlans } from "@/components/marketing/pricing/pricing-plans";
import { PricingCalculator } from "@/components/marketing/pricing-calculator";
import { Section, SectionHeader } from "@/components/marketing/section";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  PricingOffersJsonLd,
} from "@/components/marketing/structured-data";
import { SIGN_UP_URL } from "@/lib/links";
import { pricingFaqs } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Identity infrastructure that scales with you. Free for developers, predictable per-plan pricing for growing teams, and custom contracts for enterprise — no SSO tax.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing | Qeet ID",
    description:
      "Free for developers. Predictable plans for growing teams. Custom contracts for enterprise — no SSO tax.",
    url: "https://id.qeet.in/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Qeet ID",
    description:
      "Free for developers. Predictable plans for growing teams. Custom contracts for enterprise — no SSO tax.",
  },
};

export default function PricingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Pricing", url: "/pricing" },
        ]}
      />
      <PricingOffersJsonLd />

      <PageHero
        eyebrow="Pricing"
        title="Identity infrastructure"
        titleAccent="that scales with you"
        subtitle="Authentication, authorization, SSO, MFA, passkeys, organizations and enterprise identity — priced on monthly active users, with enterprise SSO included on paid plans. No SSO tax."
        cta={
          <>
            <ButtonLink size="lg" href={SIGN_UP_URL} className="h-11 px-5">
              Start building free
            </ButtonLink>
            <ContactSalesButton
              size="lg"
              variant="outline"
              source="pricing_hero"
              className="h-11 px-5"
            >
              Talk to sales
            </ContactSalesButton>
          </>
        }
      >
        <p className="mt-2 text-sm text-muted-foreground">
          No credit card required · Free up to 1,000 MAU
        </p>
      </PageHero>

      <Section innerClassName="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:py-20 xl:max-w-[88rem]">
        <PricingPlans />
      </Section>

      <PricingCalculator />

      <Section muted innerClassName="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <ComparisonSection />
      </Section>

      <EnterpriseSection />

      <Section innerClassName="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* FAQPage rich-result data — mirrors the visible accordion below. */}
        <FaqJsonLd items={pricingFaqs} />
        <SectionHeader align="left" title="Pricing" titleAccent="questions" />
        <FaqAccordion items={pricingFaqs} />
      </Section>
    </>
  );
}
