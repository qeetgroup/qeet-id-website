"use client";

import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from "@qeetrix/icons";
import { Toggle, ToggleGroup } from "@qeetrix/react/toggle";
import { useState } from "react";
import { ButtonLink } from "@/components/site/button-link";
import { formatPlanPrice } from "@/lib/pricing/display";
import { formatCount } from "@/lib/pricing/format";
import { plans } from "@/lib/pricing/plans";
import type { BillingPeriod } from "@/lib/pricing/types";

type Copy = {
  period: { label: string; monthly: string; yearly: string; saving: string };
  cta: { free: { label: string }; paid: { label: string; href: string } };
};

/**
 * The four plans as one ruled board, with a monthly / yearly switch (a Qeetrix
 * segmented ToggleGroup). Prices come from lib/pricing — the billing
 * catalogue's — so the board cannot disagree with it. The highlighted plan
 * carries the Ember bar; there is no "most popular" badge (decided 2026-10-29).
 */
export function PlanBoard({ copy, docsHref }: { copy: Copy; docsHref: string }) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  return (
    <div className="pr-plans">
      <h2 className="sr-only">Plans</h2>
      <div className="pr-period">
        <ToggleGroup
          variant="segmented"
          aria-label={copy.period.label}
          value={[period]}
          onValueChange={(v) => {
            // A segmented switch always has one side pressed.
            if (v[0]) setPeriod(v[0] as BillingPeriod);
          }}
        >
          <Toggle value="monthly">{copy.period.monthly}</Toggle>
          <Toggle value="yearly">{copy.period.yearly}</Toggle>
        </ToggleGroup>
        <span className="pr-saving">{copy.period.saving}</span>
      </div>
      <ul className="pr-board">
        {plans.map((p) => {
          const price = formatPlanPrice(p, period);
          const free = p.price.monthly === 0;
          return (
            <li key={p.id} data-highlight={p.highlighted ? "" : undefined}>
              <h3 className="m-caps">{p.name}</h3>
              <p className="pr-audience">{p.audience}</p>
              <p className="pr-price" aria-label={price.srLabel}>
                <span className="m-geo">{price.main}</span>
                {price.period && <span className="pr-per">{price.period}</span>}
              </p>
              <p className="pr-sub">{price.sub ?? " "}</p>
              <p className="pr-mau">
                {p.mau ? `${formatCount(p.mau)} monthly active users` : "Set by contract"}
              </p>
              <ButtonLink
                href={free ? docsHref : copy.cta.paid.href}
                variant={p.highlighted ? "solid" : "soft"}
                icon={free ? ArrowUpRightIcon : ArrowRightIcon}
              >
                {free ? copy.cta.free.label : copy.cta.paid.label}
              </ButtonLink>
              <ul className="pr-highlights">
                {p.highlights.map((h) => (
                  <li key={h}>
                    <CheckIcon size={16} aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
