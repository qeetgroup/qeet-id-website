import { vars } from "@/components/site/vars";
import {
  AREA_GROUPS,
  AREAS,
  type Competitor,
  LEAD_LABEL,
  type Lead,
  type Tally,
  tally,
} from "@/config/compare";

const LEADS: readonly Lead[] = ["them", "qeet", "even", "split"];

/**
 * A verdict's mark: solid ink for the other platform, solid brand for Qeet ID,
 * an outline for even, half and half for "each, differently". Shape as well
 * as colour, so it never rests on colour alone — and the words are always
 * next to it, or in the legend.
 */
export function LeadMark({ lead, i }: { lead: Lead | null; i?: number }) {
  return (
    <span
      className="cx-mark"
      data-lead={lead ?? "none"}
      aria-hidden="true"
      style={i === undefined ? undefined : vars({ "--cx-i": i })}
    />
  );
}

/** The mark and its words, for a table cell. */
export function LeadLabel({ c, lead }: { c: Competitor; lead: Lead }) {
  return (
    <span className="cx-lead-label">
      <LeadMark lead={lead} />
      {LEAD_LABEL(c, lead)}
    </span>
  );
}

/** The counts, one line each, with their marks. */
export function TallyLegend({ c, t = tally(c) }: { c: Competitor; t?: Tally }) {
  return (
    <ul className="cx-legend">
      {LEADS.map((lead) => (
        <li key={lead}>
          <LeadMark lead={lead} />
          <span className="cx-legend-n m-geo">{t[lead]}</span>
          <span>
            {lead === "them" && `${c.name} leads`}
            {lead === "qeet" && "Qeet ID leads"}
            {lead === "even" && "Even"}
            {lead === "split" && "Each leads differently"}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Fifteen marks in the order of the areas, grouped as the table is. The marks
 * are decoration for sighted readers; the label says what the strip counts.
 */
export function TallyStrip({ c, labels = true }: { c: Competitor; labels?: boolean }) {
  const t = tally(c);
  return (
    <div
      className="cx-strip"
      role="img"
      aria-label={`${c.name} leads in ${t.them} areas, Qeet ID in ${t.qeet}, ${t.even} are even and each leads differently in ${t.split}, of ${t.compared} compared.`}
    >
      {AREA_GROUPS.map((g) => (
        <div key={g.name} className="cx-strip-group" style={{ flexGrow: g.areas.length }}>
          <div className="cx-strip-marks">
            {g.areas.map((a) => (
              <LeadMark key={a.id} lead={c.cells[a.id]?.lead ?? null} i={AREAS.indexOf(a)} />
            ))}
          </div>
          {labels && <span className="cx-strip-name">{g.name}</span>}
        </div>
      ))}
    </div>
  );
}
