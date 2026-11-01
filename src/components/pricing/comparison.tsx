import { CheckIcon } from "@qeetrix/icons";
import { Badge } from "@qeetrix/react/badge";
import { AVAILABILITY_LABEL, featureGroups, plans, resolveFeatureValue } from "@/lib/pricing";
import type { PlanFeatureValue } from "@/lib/pricing/types";

type Copy = { beta: string; roadmap: string };

/** One cell: a tick, the qualifier, or a dash — always with its words for a screen reader. */
function Cell({ value }: { value: PlanFeatureValue }) {
  const v = resolveFeatureValue(value);
  if (v.status === "unavailable")
    return (
      <span className="pr-none">
        <span aria-hidden="true">—</span>
        <span className="sr-only">Not included</span>
      </span>
    );
  if (v.status === "included" && !v.label)
    return (
      <span className="pr-yes">
        <CheckIcon size={18} aria-hidden />
        <span className="sr-only">Included</span>
      </span>
    );
  return <span className="pr-label">{v.label ?? AVAILABILITY_LABEL[v.status]}</span>;
}

/**
 * The full comparison, one table per group (lib/pricing/features.ts): plan
 * columns with a sticky header, the feature's note under its name, and a row
 * that is not in 1.0 said so across the whole row rather than ticked.
 */
export function Comparison({ copy }: { copy: Copy }) {
  return (
    <div className="pr-compare">
      {featureGroups.map((g) => (
        // A named section with a tab stop, so the table can be scrolled sideways by keyboard on a phone.
        <section
          key={g.id}
          className="pr-table-wrap"
          data-reveal
          aria-label={`${g.title} — features by plan`}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable region must be focusable (WCAG 2.1.1).
          tabIndex={0}
        >
          <table className="pr-table">
            <caption>
              <span className="m-geo pr-group">{g.title}</span>
              {g.summary && <span className="pr-group-note">{g.summary}</span>}
            </caption>
            <thead>
              <tr>
                <th scope="col" className="sr-only">
                  Feature
                </th>
                {plans.map((p) => (
                  <th
                    key={p.id}
                    scope="col"
                    className="m-caps"
                    data-highlight={p.highlighted ? "" : undefined}
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {g.features.map((f) => (
                <tr key={f.id} data-maturity={f.maturity}>
                  <th scope="row">
                    <span className="pr-fname">
                      {f.name}
                      {f.maturity === "beta" && (
                        <Badge tone="neutral" size="sm">
                          {copy.beta}
                        </Badge>
                      )}
                      {f.maturity === "roadmap" && (
                        <Badge tone="warning" size="sm">
                          {copy.roadmap}
                        </Badge>
                      )}
                    </span>
                    {f.description && <span className="pr-fnote">{f.description}</span>}
                  </th>
                  {f.maturity === "roadmap" ? (
                    <td colSpan={plans.length} className="pr-roadmap">
                      {copy.roadmap}
                    </td>
                  ) : (
                    plans.map((p) => (
                      <td key={p.id} data-highlight={p.highlighted ? "" : undefined}>
                        <Cell value={f.values[p.id]} />
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}
