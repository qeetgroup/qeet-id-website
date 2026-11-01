import { ArrowRightIcon, ArrowUpRightIcon, InfoIcon } from "@qeetrix/icons";
import { Badge } from "@qeetrix/react/badge";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../compare.css";
import { LeadLabel, TallyLegend, TallyStrip } from "@/components/compare/lead";
import { Chapter } from "@/components/home/chapter";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/site/reveal";
import { vars } from "@/components/site/vars";
import { AREA_GROUPS, COMPETITORS, type Competitor } from "@/config/compare";
import { STATUS } from "@/config/home";
import { longDate } from "@/lib/dates";
import { DOCS_BASE_URL } from "@/lib/links";

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPETITORS.map((c) => ({ slug: c.slug }));
}

const find = (slug: string) => COMPETITORS.find((c) => c.slug === slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const c = find((await params).slug);
  if (!c) return {};
  return {
    title: `${c.name} and Qeet ID compared`,
    description: `${c.name} beside Qeet ID in fifteen areas — from ${c.name}'s own documentation, read on ${longDate(c.checked)}, including where ${c.name} leads.`,
    alternates: { canonical: `/compare/${c.slug}` },
  };
}

function Title({ lines, id, dark = false }: { lines: string[]; id: string; dark?: boolean }) {
  return (
    <h2 id={id} className={dark ? "m-geo m-display-m m-title-dark" : "m-geo m-display-m"}>
      {lines.map((l, i) => (
        <span key={l} className={i > 0 ? "block ih-tone" : "block"}>
          {l}
          {i < lines.length - 1 && " "}
        </span>
      ))}
    </h2>
  );
}

/**
 * /compare/[slug] — one platform beside Qeet ID: what it is, when to choose
 * each, the fifteen areas with who leads in each, and the sources with their
 * dates. Copy and verdicts: config/compare.ts.
 */
export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = find((await params).slug);
  if (!c) notFound();
  const others = COMPETITORS.filter((o) => o.slug !== c.slug);
  const title = [`${c.name} and Qeet ID.`, "Where each one leads."];

  return (
    <div className="mk" id="compare" data-qx-density="comfortable">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Compare", url: "/compare" },
          { name: c.name, url: `/compare/${c.slug}` },
        ]}
      />
      <Reveal scope="#compare" />

      <section className="m-wrap cx-cover" aria-labelledby="cx-title">
        <p className="cx-kicker m-in">
          <span className="m-rule" aria-hidden="true" />
          <Link href="/compare" className="m-caps cx-crumb">
            Compare
          </Link>
          <Badge tone="info" size="sm">
            {STATUS.label}
          </Badge>
        </p>
        <div className="cx-cover-head">
          <h1 id="cx-title" className="m-geo m-display-xl cx-title">
            {title.map((line, i) => (
              <span key={line} className="m-line" style={vars({ "--i": i })}>
                <span className={i > 0 ? "ih-tone" : undefined}>{line}</span>
                {i < title.length - 1 && " "}
              </span>
            ))}
          </h1>
          <div className="cx-cover-side m-in" style={vars({ "--d": "380ms" })}>
            <p className="m-lede">{c.summary}</p>
            <p className="cx-status">
              <InfoIcon size={18} aria-hidden />
              <span>
                Facts about {c.name} are from its own documentation, read on {longDate(c.checked)}.{" "}
                {STATUS.line}
              </span>
            </p>
          </div>
        </div>
        <div className="cx-scale m-in" style={vars({ "--d": "520ms" })}>
          <TallyStrip c={c} />
          <TallyLegend c={c} />
        </div>
      </section>

      {/* 01 — when to choose each */}
      <section className="m-sec m-sunken" aria-labelledby="cx-choose-title">
        <div className="m-wrap">
          <div className="space-y-5" data-reveal>
            <Chapter n="01" label="Choose" />
            <Title
              lines={["Both are good choices.", "For different products."]}
              id="cx-choose-title"
            />
          </div>
          <div className="cx-choose" data-reveal>
            <Choice heading={`Choose ${c.name} when`} items={c.chooseThem} />
            <Choice heading="Choose Qeet ID when" items={c.chooseQeet} qeet />
          </div>
        </div>
      </section>

      {/* 02 — the fifteen areas */}
      <section className="m-sec" aria-labelledby="cx-areas-title">
        <div className="m-wrap">
          <div className="space-y-5" data-reveal>
            <Chapter n="02" label="Area by area" />
            <Title lines={["Fifteen areas.", "Who leads in each."]} id="cx-areas-title" />
          </div>
          <Areas c={c} />
        </div>
      </section>

      {/* 03 — moving across, where the importer reads this platform's export */}
      {c.migrate && (
        <section
          className="m-sec m-band"
          data-qx-color-scheme="dark"
          aria-labelledby="cx-move-title"
        >
          <div className="m-wrap cx-move" data-reveal>
            <div className="space-y-5">
              <Chapter n="03" label="Moving across" dark />
              <Title
                lines={[`Qeet ID reads ${c.name}'s user export.`, "Everyone comes across."]}
                id="cx-move-title"
                dark
              />
            </div>
            <div className="cx-move-side">
              <p className="m-body m-note-dark">
                Names, email addresses and phone numbers come across. Passwords do not — people sign
                in with a passkey or a magic link, or set a password through a reset.
              </p>
              <ButtonLink href="/migrate" icon={ArrowRightIcon}>
                The move, step by step
              </ButtonLink>
            </div>
          </div>
        </section>
      )}

      {/* Sources, and the other comparisons */}
      <section className="m-sec" aria-labelledby="cx-sources-title">
        <div className="m-wrap cx-sources">
          <div className="space-y-5" data-reveal>
            <Chapter n={c.migrate ? "04" : "03"} label="Sources" />
            <Title
              lines={[`Read on ${longDate(c.checked)}.`, `Re-read by ${longDate(c.revalidate)}.`]}
              id="cx-sources-title"
            />
          </div>
          <div data-reveal>
            <ol className="cx-source-list">
              {c.sources.map((s) => (
                <li key={s.title}>
                  <span className="cx-source-title">{s.title}</span>
                  <span className="cx-source-meta">
                    {s.publisher} · {s.date}
                  </span>
                </li>
              ))}
            </ol>
            <p className="cx-source-note">
              Gathered for Qeet ID's {c.research.replace("Platform research", "platform research")}.
              The Qeet ID column is checked against its code as it stood on 29 October 2026.
              Something out of date? <Link href="/contact">Tell us</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="m-sec m-sunken" aria-labelledby="cx-others-title">
        <div className="m-wrap">
          <div className="space-y-5" data-reveal>
            <Chapter n={c.migrate ? "05" : "04"} label="Other comparisons" />
            <Title
              lines={["Seven more platforms.", "The same fifteen areas."]}
              id="cx-others-title"
            />
          </div>
          <ul className="cx-others" data-reveal>
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/compare/${o.slug}`} className="cx-other">
                  <span className="cx-other-head">
                    <span className="m-geo m-heading">{o.name}</span>
                    <ArrowRightIcon size={18} aria-hidden className="cx-other-arrow" />
                  </span>
                  <span className="cx-other-kind">{o.kind}</span>
                  <TallyStrip c={o} labels={false} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="m-sec" aria-labelledby="cx-close-title">
        <div className="m-wrap">
          <div className="pcta" data-reveal>
            <h2 id="cx-close-title" className="m-geo m-display-m">
              <span className="block">Compare it yourself.</span>{" "}
              <span className="block ih-tone">Start with the docs.</span>
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

function Choice({
  heading,
  items,
  qeet = false,
}: {
  heading: string;
  items: readonly string[];
  qeet?: boolean;
}) {
  return (
    <div className="cx-choice" data-side={qeet ? "qeet" : "them"}>
      <h3 className="m-geo m-heading">{heading}</h3>
      <ul>
        {items.map((i) => (
          <li key={i} className="m-body">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The areas as a ruled list: on a wide screen four columns under one header
 * row; on a phone each area stacks, and each cell keeps its own column label.
 */
function Areas({ c }: { c: Competitor }) {
  return (
    <div className="cx-areas" data-reveal>
      <div className="cx-row cx-head" aria-hidden="true">
        <span className="m-caps">Area</span>
        <span className="m-caps">{c.name}</span>
        <span className="m-caps">Qeet ID</span>
        <span className="m-caps">Leads</span>
      </div>
      {AREA_GROUPS.map((g) => (
        <div key={g.name} className="cx-group">
          <h3 className="m-caps cx-group-name">{g.name}</h3>
          {g.areas.map((a) => {
            const cell = c.cells[a.id];
            return (
              <div key={a.id} className="cx-row">
                <h4 className="m-geo cx-area">{a.name}</h4>
                <div className="cx-cell">
                  <p className="cx-col m-caps">{c.name}</p>
                  <p>{cell ? cell.them : `Not compared — outside what ${c.name} is for.`}</p>
                </div>
                <div className="cx-cell">
                  <p className="cx-col m-caps">Qeet ID</p>
                  <p>{a.qeet}</p>
                </div>
                <div className="cx-cell cx-verdict">
                  <p className="cx-col m-caps">Leads</p>
                  {cell ? (
                    <>
                      <LeadLabel c={c} lead={cell.lead} />
                      {cell.note && <p className="cx-note">{cell.note}</p>}
                    </>
                  ) : (
                    <span className="cx-lead-label cx-none">Not compared</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
