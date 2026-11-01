"use client";

import { Input } from "@qeetrix/react/input";
import { useId, useState } from "react";
import { MAU_PRESETS, recommendPlan } from "@/lib/pricing/calculator";
import { formatPlanPrice } from "@/lib/pricing/display";
import { formatCount, formatCurrency } from "@/lib/pricing/format";
import { resolveAnnualTotal } from "@/lib/pricing/plans";

type Copy = { label: string; fits: string; above: string; perMonth: string; yearly: string };

/**
 * How many people sign in each month → the plan that fits, and its price by
 * the month and the year. A labelled number field and preset buttons (exact,
 * and announced as a number — a log slider would only announce its position).
 * Above Pro's allowance there is no published figure, so it says so.
 */
export function Calculator({ copy }: { copy: Copy }) {
  const [raw, setRaw] = useState("25000");
  const id = useId();
  const mau = Math.max(0, Math.round(Number(raw.replace(/[^\d]/g, "")) || 0));
  const plan = recommendPlan(mau);
  const monthly = formatPlanPrice(plan, "monthly");
  const annual = resolveAnnualTotal(plan);

  return (
    <div className="pr-calc">
      <div className="pr-calc-in">
        <label htmlFor={id} className="m-caps">
          {copy.label}
        </label>
        <Input
          id={id}
          inputMode="numeric"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          aria-describedby={`${id}-result`}
          className="pr-calc-field"
        />
        <ul className="pr-presets" aria-label="Examples">
          {MAU_PRESETS.map((p) => (
            <li key={p.label}>
              <button
                type="button"
                aria-pressed={mau === p.mau}
                onClick={() => setRaw(String(p.mau))}
              >
                {p.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div id={`${id}-result`} className="pr-calc-out" aria-live="polite">
        <p className="m-caps">
          {formatCount(mau)} · {copy.fits}
        </p>
        <p className="m-geo pr-calc-plan">{plan.name}</p>
        {plan.price.custom ? (
          <p className="m-body pr-muted">{copy.above}</p>
        ) : (
          <>
            <p className="pr-calc-price">
              <span className="m-geo">{monthly.main}</span> {copy.perMonth}
            </p>
            {annual ? (
              <p className="m-body pr-muted">
                {copy.yearly.replace(
                  "{price}",
                  formatCurrency(annual, { currency: plan.price.currency }),
                )}
              </p>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
