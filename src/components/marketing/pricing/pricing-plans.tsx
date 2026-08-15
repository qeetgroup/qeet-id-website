"use client";

import { SegmentedControl, SegmentedControlItem } from "@qeetrix/ui";
import { useEffect, useState } from "react";

import { Stagger, StaggerItem } from "@/components/marketing/motion";
import { track } from "@/lib/analytics";
import {
  ANNUAL_SAVINGS_RATE,
  annualBillingAvailable,
  type BillingPeriod,
  formatPlanPrice,
  plans,
  resolvePlanCtaHref,
} from "@/lib/pricing";
import { PlanCard } from "./plan-card";

const SAVINGS_PCT = Math.round(ANNUAL_SAVINGS_RATE * 100);

/**
 * The interactive pricing grid: a Monthly/Yearly billing toggle wired to all
 * five plan cards. The toggle only renders when annual billing is actually
 * configured (§6 — degrade safely if annual isn't finalised). Owns the billing
 * period so every card reprices in lock-step, and instruments the meaningful
 * interactions through the analytics shim.
 */
export function PricingPlans() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const showToggle = annualBillingAvailable();

  useEffect(() => {
    track("pricing_page_view");
  }, []);

  function onPeriodChange(next: string) {
    const value: BillingPeriod = next === "yearly" ? "yearly" : "monthly";
    setPeriod(value);
    track("pricing_billing_toggle", { period: value });
  }

  return (
    <div>
      {showToggle && (
        <div className="mb-10 flex flex-col items-center gap-2">
          <SegmentedControl
            value={period}
            onValueChange={onPeriodChange}
            aria-label="Billing period"
            size="lg"
          >
            <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
            <SegmentedControlItem value="yearly">
              <span className="inline-flex items-center gap-1.5">
                Yearly
                <span className="rounded-full bg-brand/15 px-1.5 py-0.5 text-[10px] font-semibold text-brand-text">
                  -{SAVINGS_PCT}%
                </span>
              </span>
            </SegmentedControlItem>
          </SegmentedControl>
          <p aria-live="polite" className="text-xs text-muted-foreground">
            {period === "yearly"
              ? "Two months free — billed annually on Starter, Growth and Pro."
              : `Save ~${SAVINGS_PCT}% with annual billing.`}
          </p>
        </div>
      )}

      <Stagger
        staggerDelay={0.08}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        {plans.map((plan) => (
          <StaggerItem key={plan.id} className="h-full">
            <PlanCard
              plan={plan}
              period={period}
              price={formatPlanPrice(plan, period)}
              ctaHref={resolvePlanCtaHref(plan)}
              onCtaClick={() =>
                track("pricing_plan_cta_click", { plan: plan.id, period, target: plan.cta.target })
              }
            />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
