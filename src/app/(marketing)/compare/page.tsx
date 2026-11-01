import { ArrowRightIcon, ArrowUpRightIcon, InfoIcon } from "@qeetrix/icons";
import { Badge } from "@qeetrix/react/badge";
import type { Metadata } from "next";
import Link from "next/link";
import "./compare.css";
import "../product/[slug]/capability.css";
import { LeadMark, TallyStrip } from "@/components/compare/lead";
import { Chapter } from "@/components/home/chapter";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/site/reveal";
import { vars } from "@/components/site/vars";
import {
  AREA_GROUPS,
  COMPARE_INDEX as C,
  COMPETITORS,
  LEAD_LABEL,
  type Lead,
} from "@/config/compare";
import { STATUS } from "@/config/home";
import { longDate } from "@/lib/dates";
import { DOCS_BASE_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: C.meta.title,
  description: C.meta.description,
  alternates: { canonical: "/compare" },
};

const KEY: readonly { lead: Lead; label: string }[] = [
  { lead: "them", label: "The other platform leads" },
  { lead: "qeet", label: "Qeet ID leads" },
  { lead: "even", label: "Even" },
  { lead: "split", label: "Each leads differently" },
];

/**
 * /compare — eight platforms in the same fifteen areas: one matrix to read
 * across (a list of strips on a phone), then how the comparisons are made.
 * Copy and verdicts: config/compare.ts.
 */
export default function CompareIndexPage() {
  return (
    <div className="mk" id="compare" data-qx-density="comfortable">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Compare", url: "/compare" },
        ]}
      />
      <Reveal scope="#compare" />

      <section className="m-wrap cx-cover" aria-labelledby="cx-title">
        <p className="cx-kicker m-in">
          <span className="m-rule" aria-hidden="true" />
          <span className="m-caps">{C.kicker}</span>
          <Badge tone="info" size="sm">
            {STATUS.label}
          </Badge>
        </p>
        <div className="cx-cover-head">
          <h1 id="cx-title" className="m-geo m-display-xl cx-title">
            {C.title.map((line, i) => (
              <span key={line} className="m-line" style={vars({ "--i": i })}>
                <span className={i > 0 ? "ih-tone" : undefined}>{line}</span>
                {i < C.title.length - 1 && " "}
              </span>
            ))}
          </h1>
          <div className="cx-cover-side m-in" style={vars({ "--d": "380ms" })}>
            <p className="m-lede">{C.lede}</p>
            <p className="cx-status">
              <InfoIcon size={18} aria-hidden />
              <span>{C.status}</span>
            </p>
          </div>
        </div>

        <ul className="cx-key m-in" style={vars({ "--d": "520ms" })} aria-label="Key">
          {KEY.map((k) => (
            <li key={k.lead}>
              <LeadMark lead={k.lead} />
              {k.label}
            </li>
          ))}
          <li>
            <LeadMark lead={null} />
            Not compared
          </li>
        </ul>

        {/* Wide screens: the matrix, to read across and down. */}
        <div className="cx-matrix-wrap m-in" style={vars({ "--d": "600ms" })}>
          <table className="cx-matrix">
            <caption className="sr-only">
              Who leads in each of fifteen areas, for eight platforms compared with Qeet ID
            </caption>
            <colgroup>
              <col className="cx-col-name" />
              {AREA_GROUPS.flatMap((g) => g.areas.map((a) => <col key={a.id} />))}
            </colgroup>
            <thead>
              <tr className="cx-matrix-groups">
                <td />
                {AREA_GROUPS.map((g) => (
                  <th key={g.name} scope="colgroup" colSpan={g.areas.length} className="m-caps">
                    {g.name}
                  </th>
                ))}
              </tr>
              <tr className="cx-matrix-areas">
                <th scope="col" className="m-caps">
                  Platform
                </th>
                {AREA_GROUPS.flatMap((g) =>
                  g.areas.map((a, i) => (
                    <th key={a.id} scope="col" data-first={i === 0 || undefined}>
                      <span className="cx-up" aria-hidden="true">
                        {a.short}
                      </span>
                      <span className="sr-only">{a.name}</span>
                    </th>
                  )),
                )}
              </tr>
            </thead>
            <tbody>
              {COMPETITORS.map((c) => (
                <tr key={c.slug}>
                  <th scope="row">
                    <Link href={`/compare/${c.slug}`} className="cx-matrix-name">
                      <span className="m-geo">{c.name}</span>
                      <ArrowRightIcon size={16} aria-hidden />
                    </Link>
                    <span className="cx-matrix-kind">{c.kind}</span>
                  </th>
                  {AREA_GROUPS.flatMap((g) =>
                    g.areas.map((a, i) => {
                      const lead = c.cells[a.id]?.lead ?? null;
                      return (
                        <td key={a.id} data-first={i === 0 || undefined}>
                          <LeadMark lead={lead} />
                          <span className="sr-only">
                            {lead ? LEAD_LABEL(c, lead) : "Not compared"}
                          </span>
                        </td>
                      );
                    }),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phones: one strip per platform. */}
        <ul className="cx-cards">
          {COMPETITORS.map((c) => (
            <li key={c.slug}>
              <Link href={`/compare/${c.slug}`} className="cx-other">
                <span className="cx-other-head">
                  <span className="m-geo m-heading">{c.name}</span>
                  <ArrowRightIcon size={18} aria-hidden className="cx-other-arrow" />
                </span>
                <span className="cx-other-kind">{c.kind}</span>
                <TallyStrip c={c} />
                <span className="cx-other-count">Checked {longDate(c.checked)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 01 — how the comparisons are made */}
      <section
        className="m-sec m-band"
        data-qx-color-scheme="dark"
        aria-labelledby="cx-method-title"
      >
        <div className="m-wrap">
          <div className="space-y-5" data-reveal>
            <Chapter n="01" label={C.method.kicker} dark />
            <h2 id="cx-method-title" className="m-geo m-display-m m-title-dark">
              {C.method.title.map((l, i) => (
                <span key={l} className={i > 0 ? "block ih-tone" : "block"}>
                  {l}
                  {i < C.method.title.length - 1 && " "}
                </span>
              ))}
            </h2>
          </div>
          <ul className="cp-points" data-reveal>
            {C.method.items.map((m) => (
              <li key={m.name}>
                <h3 className="m-geo m-heading m-title-dark">{m.name}</h3>
                <p className="m-body m-note-dark">{m.body}</p>
              </li>
            ))}
          </ul>
          <p className="cx-notyet m-note-dark" data-reveal>
            <InfoIcon size={18} aria-hidden />
            {C.notYet}
          </p>
        </div>
      </section>

      <section className="m-sec" aria-labelledby="cx-close-title">
        <div className="m-wrap">
          <div className="pcta" data-reveal>
            <h2 id="cx-close-title" className="m-geo m-display-m">
              {C.close.map((l, i) => (
                <span key={l} className={i > 0 ? "block ih-tone" : "block"}>
                  {l}
                  {i < C.close.length - 1 && " "}
                </span>
              ))}
            </h2>
            <div className="flex flex-wrap gap-3">
              <ButtonLink size="lg" href={DOCS_BASE_URL} icon={ArrowUpRightIcon}>
                Read the docs
              </ButtonLink>
              <ButtonLink size="lg" variant="soft" href="/contact">
                Talk to us
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
