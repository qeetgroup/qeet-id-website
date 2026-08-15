"use client";

import { NativeSelect } from "@qeetrix/ui";
import { ChevronDownIcon } from "lucide-react";
import { useId, useState } from "react";

import { track } from "@/lib/analytics";
import { featureGroups, type PlanId, plans } from "@/lib/pricing";
import { StatusCell } from "./feature-status";

/**
 * Mobile comparison: pick one plan, then read its capabilities grouped into
 * collapsible categories. Avoids squeezing a six-column table onto a phone
 * (§17) while keeping every capability legible. Category expansion is tracked.
 */
export function ComparisonMobile() {
  const [planId, setPlanId] = useState<PlanId>("growth");
  const selectId = useId();

  return (
    <div>
      <label htmlFor={selectId} className="text-sm font-medium text-muted-foreground">
        Compare plan
      </label>
      <NativeSelect
        id={selectId}
        className="mt-2 w-full"
        value={planId}
        onChange={(e) => setPlanId(e.target.value as PlanId)}
      >
        {plans.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
            {p.badge ? ` · ${p.badge}` : ""}
          </option>
        ))}
      </NativeSelect>

      <div className="mt-6 flex flex-col gap-3">
        {featureGroups.map((group) => (
          <details
            key={group.id}
            className="group overflow-hidden rounded-2xl border border-border/60 bg-background"
            onToggle={(e) => {
              if (e.currentTarget.open) {
                track("pricing_comparison_expand", { category: group.id, plan: planId });
              }
            }}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 font-medium focus-ring-brand [&::-webkit-details-marker]:hidden">
              {group.title}
              <ChevronDownIcon
                className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <dl className="border-t border-border/60">
              {group.features.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between gap-4 border-b border-border/40 px-4 py-2.5 last:border-b-0"
                >
                  <dt className="text-sm text-muted-foreground">{f.name}</dt>
                  <dd className="flex shrink-0 items-center text-right">
                    <StatusCell value={f.values[planId]} />
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        ))}
      </div>
    </div>
  );
}
