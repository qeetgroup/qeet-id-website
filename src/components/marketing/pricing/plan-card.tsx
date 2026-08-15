import { cn } from "@qeetrix/ui";
import { CheckIcon } from "lucide-react";

import { BezelCard } from "@/components/marketing/blocks/bezel-card";
import { ButtonLink } from "@/components/marketing/button-link";
import { BorderBeam } from "@/components/marketing/effects/border-beam";
import {
  type BillingPeriod,
  formatCount,
  type PriceDisplay,
  type PricingPlan,
} from "@/lib/pricing";

type PlanCardProps = {
  plan: PricingPlan;
  price: PriceDisplay;
  ctaHref: string;
  period: BillingPeriod;
  /** Fired on CTA click (analytics). Optional so the card works server-side. */
  onCtaClick?: () => void;
  /** Compact spacing for the condensed homepage grid. */
  compact?: boolean;
  className?: string;
};

/**
 * A single pricing plan card. Presentational and hook-free so it renders in both
 * the server homepage section and the client (billing-toggle-driven) pricing
 * grid. The highlighted plan gets the warm bezel + animated border beam to make
 * the recommended upgrade path unmistakable without gimmicks.
 */
export function PlanCard({
  plan,
  price,
  ctaHref,
  period,
  onCtaClick,
  compact,
  className,
}: PlanCardProps) {
  const mauLabel = plan.mau == null ? "Custom scale" : `${formatCount(plan.mau)} MAU`;

  return (
    <BezelCard
      featured={plan.highlighted}
      shellClassName={cn(
        "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1",
        plan.highlighted && "lg:scale-[1.03]",
      )}
      className={cn(compact ? "gap-4 p-5" : "gap-4 p-6", className)}
    >
      {plan.highlighted && (
        <BorderBeam
          size={260}
          duration={9}
          colorFrom="var(--brand-500)"
          colorTo="var(--brand-300)"
        />
      )}

      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display text-lg font-semibold tracking-tight">{plan.name}</h3>
        {plan.badge && (
          <span className="shrink-0 rounded-full bg-(image:--brand-gradient) px-2.5 py-0.5 text-[11px] font-medium text-brand-foreground shadow-sm shadow-brand/30">
            {plan.badge}
          </span>
        )}
      </div>

      <p className="min-h-10 text-sm text-muted-foreground">{plan.tagline}</p>

      {/* Price */}
      <div>
        <div className="flex items-baseline gap-1.5">
          <span
            className={cn(
              "font-display text-4xl font-semibold tracking-tight",
              plan.highlighted && "text-gradient-brand",
            )}
          >
            {price.main}
          </span>
          {price.period && <span className="text-sm text-muted-foreground">{price.period}</span>}
          <span className="sr-only">{price.srLabel}</span>
        </div>
        <p className="mt-1 min-h-4 text-xs text-muted-foreground">{price.sub ?? " "}</p>
      </div>

      {/* MAU allowance */}
      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-sm">
        <span className="font-medium">{mauLabel}</span>
        {plan.mau != null && <span className="text-muted-foreground">included</span>}
      </div>

      <ButtonLink
        size="lg"
        variant={plan.highlighted ? "default" : "outline"}
        className="w-full"
        href={ctaHref}
        onClick={onCtaClick}
        data-plan={plan.id}
        data-period={period}
      >
        {plan.cta.label}
      </ButtonLink>

      <ul className="flex flex-col gap-2.5 border-t border-border/60 pt-5 text-sm">
        {plan.highlights.map((f) => (
          <li key={f} className="flex gap-2">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
            <span className="text-muted-foreground">{f}</span>
          </li>
        ))}
      </ul>
    </BezelCard>
  );
}
