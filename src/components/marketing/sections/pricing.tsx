import { ArrowRightIcon } from "lucide-react";

import { ButtonLink } from "@/components/marketing/button-link";
import { Reveal, Stagger, StaggerItem } from "@/components/marketing/motion";
import { PlanCard } from "@/components/marketing/pricing/plan-card";
import { Section, SectionHeader } from "@/components/marketing/section";
import { formatPlanPrice, plans, resolvePlanCtaHref } from "@/lib/pricing";

/**
 * Condensed homepage pricing — the five plans from the shared pricing config,
 * shown monthly, linking out to the full `/pricing` page (with its billing
 * toggle, calculator and comparison). Server-rendered: no interactivity here,
 * so it stays light and reuses the same `PlanCard` as the pricing page.
 */
export function Pricing() {
  return (
    <Section
      muted
      id="pricing"
      innerClassName="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32 xl:max-w-[88rem]"
    >
      <SectionHeader
        eyebrow="Pricing"
        title="Pricing that scales"
        titleAccent="with you"
        subtitle="Free up to 1,000 MAU, no card required. Predictable plans as you grow — and enterprise SSO included on paid plans, with no SSO tax."
      />

      <div className="relative mt-16">
        {/* Soft brand halo behind the row for depth. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-152 max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--color-brand)/0.12,transparent_60%)] blur-3xl"
        />
        <Stagger
          staggerDelay={0.08}
          className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {plans.map((plan) => (
            <StaggerItem key={plan.id} className="h-full">
              <PlanCard
                plan={plan}
                period="monthly"
                price={formatPlanPrice(plan, "monthly")}
                ctaHref={resolvePlanCtaHref(plan)}
                compact
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Reveal className="mt-10 text-center">
        <ButtonLink variant="ghost" href="/pricing">
          See full pricing, comparison &amp; calculator <ArrowRightIcon className="size-4" />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
