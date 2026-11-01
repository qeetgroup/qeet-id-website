import { ArrowRightIcon } from "@qeetrix/icons";
import "./plan-ladder.css";
import { ButtonLink } from "@/components/site/button-link";
import { vars } from "@/components/site/vars";
import {
  AVAILABILITY_LABEL,
  allFeatures,
  formatCount,
  formatPlanPrice,
  plans,
  resolveFeatureValue,
} from "@/lib/pricing";

export type LadderRow = { readonly id: string; readonly label: string };

/** The rows of the staircase, read from the comparison table — never restated. */
function ladderRows(rows: readonly LadderRow[]) {
  return rows.map(({ id, label }) => {
    const feature = allFeatures.find((f) => f.id === id);
    if (!feature) throw new Error(`Unknown pricing feature: ${id}`);
    const cells = plans.map((p) => ({
      plan: p.name,
      ...resolveFeatureValue(feature.values[p.id]),
    }));
    const summary = cells
      .map((c) =>
        c.status === "unavailable"
          ? `not on ${c.plan}`
          : `${c.plan}: ${c.label ?? AVAILABILITY_LABEL[c.status].toLowerCase()}`,
      )
      .join("; ");
    // The grid column the feature first appears in — where its name sits.
    const start = cells.findIndex((c) => c.status !== "unavailable") + 1;
    return { label, cells, summary, start };
  });
}

/** A segment's short label: the qualifier's first part ("90-day + export" → "90-day"). */
function segmentLabel(c: { status: string; label?: string }) {
  if (c.label) return c.label.split(" + ")[0];
  return "";
}

/**
 * The plans across the top and, below them, what each one includes, as a
 * staircase — a feature starts at the plan that first includes it and runs on
 * to Enterprise. The highlighted plan carries the Ember bar. Every value comes
 * from lib/pricing, so it cannot disagree with the pricing page.
 */
export function PlanLadder({
  rows,
  cta = { label: "Full pricing and calculator", href: "/pricing" },
}: {
  rows: readonly LadderRow[];
  cta?: { label: string; href: string };
}) {
  const ladder = ladderRows(rows);
  const highlight = plans.findIndex((p) => p.highlighted);
  return (
    <div className="pl-ladder" data-reveal>
      <div className="pl-ladder-grid" style={vars({ "--hl": highlight })}>
        <ul className="pl-ladder-plans" aria-label="Plans">
          {plans.map((p) => {
            const price = formatPlanPrice(p, "monthly");
            return (
              <li key={p.id} data-highlight={p.highlighted ? "" : undefined}>
                <h3 className="m-caps">{p.name}</h3>
                <p className="pl-ladder-price" aria-label={price.srLabel}>
                  <span className="m-geo">{price.main}</span>
                  {price.period && <span className="pl-ladder-period">{price.period}</span>}
                </p>
                <p className="pl-ladder-mau">
                  {p.mau ? `${formatCount(p.mau)} users` : "Custom scale"}
                </p>
              </li>
            );
          })}
        </ul>
        <ul className="pl-ladder-rows" aria-label="What each plan includes">
          {ladder.map((r) => (
            <li key={r.label} className="pl-rung" style={vars({ "--start": r.start })}>
              <p className="pl-rung-name">
                {r.label}
                <span className="sr-only">: {r.summary}</span>
              </p>
              <div className="pl-rung-bar" aria-hidden="true">
                {r.cells.map((c) => (
                  <span key={c.plan} className="pl-seg" data-status={c.status} />
                ))}
              </div>
              {r.cells.some((c) => segmentLabel(c)) && (
                <div className="pl-rung-notes" aria-hidden="true">
                  {r.cells.map((c) => (
                    <span key={c.plan}>{c.status !== "unavailable" && segmentLabel(c)}</span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="pl-ladder-foot">
        <ul className="pl-legend" aria-hidden="true">
          <li>
            <span className="pl-seg" data-status="included" /> Included
          </li>
          <li>
            <span className="pl-seg" data-status="limited" /> Limited
          </li>
        </ul>
        <ButtonLink variant="ghost" href={cta.href} icon={ArrowRightIcon}>
          {cta.label}
        </ButtonLink>
      </div>
    </div>
  );
}
