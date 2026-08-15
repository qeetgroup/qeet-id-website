import { cn } from "@qeetrix/ui";

import { Reveal } from "@/components/marketing/motion";
import { SectionHeader } from "@/components/marketing/section";
import { featureGroups, plans } from "@/lib/pricing";
import { ComparisonMobile } from "./comparison-mobile";
import { FeatureLegend, StatusCell } from "./feature-status";

/**
 * Full feature comparison. Desktop renders a real, sticky-header `<table>` with
 * the recommended (highlighted) plan column tinted; mobile swaps to a per-plan
 * collapsible view (`ComparisonMobile`) so nothing becomes unreadably small
 * (§8/§17). Both read the same authoritative `featureGroups` config.
 */
export function ComparisonSection() {
  return (
    <>
      <SectionHeader
        eyebrow="Compare"
        title="Every capability,"
        titleAccent="side by side"
        subtitle="Cross-checked against what Qeet ID actually ships. Where a capability is metered or gated, we say so."
      />

      <Reveal className="mt-8 flex justify-center lg:justify-end">
        <FeatureLegend />
      </Reveal>

      {/* Desktop / tablet: real table with a sticky header row. */}
      <Reveal className="mt-6 hidden overflow-x-auto rounded-2xl border border-border/60 bg-background lg:block">
        <table className="w-full min-w-4xl border-collapse text-left text-sm">
          <caption className="sr-only">
            Feature availability across the Free, Starter, Growth, Pro and Enterprise plans
          </caption>
          <thead className="sticky top-0 z-10 bg-background/95 backdrop-blur">
            <tr className="border-b border-border/60">
              <th scope="col" className="w-[28%] px-4 py-4 font-medium">
                Feature
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  scope="col"
                  className={cn(
                    "px-4 py-4 text-center font-medium",
                    plan.highlighted && "bg-brand/5",
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-base font-semibold",
                      plan.highlighted && "text-gradient-brand",
                    )}
                  >
                    {plan.name}
                  </span>
                  {plan.badge && (
                    <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wider text-brand-text">
                      {plan.badge}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureGroups.map((group) => (
              <FeatureGroupRows key={group.id} group={group} />
            ))}
          </tbody>
        </table>
      </Reveal>

      {/* Mobile: per-plan collapsible view. */}
      <Reveal className="mt-8 lg:hidden">
        <ComparisonMobile />
      </Reveal>
    </>
  );
}

function FeatureGroupRows({ group }: { group: (typeof featureGroups)[number] }) {
  return (
    <>
      <tr className="bg-muted/40">
        <th
          scope="colgroup"
          colSpan={plans.length + 1}
          className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {group.title}
        </th>
      </tr>
      {group.features.map((feature) => (
        <tr key={feature.id} className="border-t border-border/60">
          <th scope="row" className="px-4 py-3 text-left align-middle font-medium">
            {feature.name}
            {feature.description && (
              <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                {feature.description}
              </span>
            )}
          </th>
          {plans.map((plan) => (
            <td
              key={plan.id}
              className={cn("px-4 py-3 text-center align-middle", plan.highlighted && "bg-brand/5")}
            >
              <span className="inline-flex items-center justify-center">
                <StatusCell value={feature.values[plan.id]} />
              </span>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
