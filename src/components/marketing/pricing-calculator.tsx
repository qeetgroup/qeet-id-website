"use client";

import { Slider } from "@qeetrix/ui";
import { ArrowRightIcon } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { ButtonLink } from "@/components/marketing/button-link";
import { track } from "@/lib/analytics";
import {
  clampMau,
  formatCount,
  formatPlanPrice,
  MAU_PRESETS,
  MAX_MAU,
  MIN_MAU,
  mauToSlider,
  recommendPlan,
  resolvePlanCtaHref,
  roundFriendly,
  sliderToMau,
} from "@/lib/pricing";

/**
 * A usage estimator that recommends a plan from expected MAU (§12). It is a
 * *recommender*, not a metered-bill calculator — Qeet ID doesn't bill paid-tier
 * overages today, so we don't invent per-MAU math. All the maths lives in the
 * pure, unit-tested `@/lib/pricing/calculator` helpers; this component is just
 * the slider UI wired to them.
 */
export function PricingCalculator() {
  const [sliderValue, setSliderValue] = useState(() => mauToSlider(10_000));
  const inputId = useId();
  const mau = useMemo(() => roundFriendly(sliderToMau(sliderValue)), [sliderValue]);
  const plan = recommendPlan(mau);
  const price = formatPlanPrice(plan, "monthly");

  // Track only when the recommendation actually changes, not on every scrub.
  const lastPlan = useRef(plan.id);
  useEffect(() => {
    if (lastPlan.current !== plan.id) {
      lastPlan.current = plan.id;
      track("pricing_calculator_interaction", { mau, plan: plan.id });
    }
  }, [plan.id, mau]);

  function setMau(value: number) {
    setSliderValue(mauToSlider(clampMau(value)));
  }

  return (
    <section className="border-b border-border/60" aria-labelledby="calc-heading">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-text">
            Find your plan
          </p>
          <h2
            id="calc-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            How many users are you planning for?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Estimate your monthly active users and we&apos;ll point you to the plan that fits.
          </p>
        </div>

        <div className="mt-12 grid gap-6 rounded-2xl border border-border/60 bg-background p-6 sm:p-10 lg:grid-cols-[3fr_2fr] lg:gap-10">
          {/* Input column */}
          <div>
            <label className="text-sm font-medium text-muted-foreground" htmlFor={inputId}>
              Monthly active users
            </label>
            <div className="mt-1 flex items-baseline gap-3">
              <input
                id={inputId}
                className="w-44 border-0 bg-transparent font-display text-4xl font-semibold tracking-tight outline-none [appearance:textfield] focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none sm:text-5xl"
                type="number"
                inputMode="numeric"
                min={MIN_MAU}
                max={MAX_MAU}
                value={mau}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  if (Number.isFinite(next)) setMau(next);
                }}
              />
              <span className="text-sm text-muted-foreground">MAU / month</span>
            </div>

            <div className="mt-8">
              <Slider
                value={[sliderValue]}
                onValueChange={(values) =>
                  setSliderValue(Array.isArray(values) ? (values[0] ?? 0) : (values as number))
                }
                min={0}
                max={100}
                step={0.5}
                aria-label="Expected monthly active users"
              />
              <div className="mt-4 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
                {MAU_PRESETS.map((p) => (
                  <button
                    key={p.mau}
                    type="button"
                    className="rounded-md px-2 py-1 transition-colors hover:bg-muted hover:text-foreground focus-ring-brand"
                    onClick={() => setMau(p.mau)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result column */}
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-6 sm:p-8">
            <p className="text-xs text-muted-foreground">Recommended plan</p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="font-display text-2xl font-semibold tracking-tight text-gradient-brand">
                {plan.name}
              </span>
              <span className="rounded-full bg-brand/15 px-2.5 py-1 text-xs font-medium text-brand-text">
                {plan.mau == null ? "Custom scale" : `up to ${formatCount(plan.mau)} MAU`}
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="font-display text-4xl font-semibold tracking-tight">
                {price.main}
              </span>
              {price.period && (
                <span className="text-sm text-muted-foreground">{price.period}</span>
              )}
            </div>

            <p className="mt-3 text-sm text-muted-foreground">{plan.tagline}</p>

            <div className="mt-6">
              <ButtonLink
                href={resolvePlanCtaHref(plan)}
                className="w-full"
                onClick={() =>
                  track("pricing_plan_cta_click", {
                    plan: plan.id,
                    period: "monthly",
                    source: "calculator",
                  })
                }
              >
                {plan.cta.label} <ArrowRightIcon className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          A guide, not a quote — MAU allowances reset monthly and machine-to-machine tokens
          don&apos;t count. Above 100,000 MAU, talk to sales for volume pricing.
        </p>
      </div>
    </section>
  );
}
