import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, InfoIcon } from "@qeetrix/icons";
import { Badge } from "@qeetrix/react/badge";
import { Tabs, TabsList, TabsPanel } from "@qeetrix/react/tabs";
import NextLink from "next/link";
import type { ReactNode } from "react";
import { CapabilityTab } from "@/components/capability/capability-tab";
import { Chapter } from "@/components/home/chapter";
import { ButtonLink } from "@/components/site/button-link";
import { PlanLadder } from "@/components/site/plan-ladder";
import { vars } from "@/components/site/vars";
import { CAPABILITIES, type CapabilityPage, type Section, type Tone } from "@/config/capabilities";
import { STATUS } from "@/config/home";
import { docsUrl } from "@/lib/links";
import { allFeatures, plans, resolveFeatureValue } from "@/lib/pricing";

/** A display heading set one authored line per line, the second quieter (as the home's). */
function Title({
  lines,
  id,
  dark = false,
}: {
  lines: readonly string[];
  id: string;
  dark?: boolean;
}) {
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

/** Where a feature starts, in words: "On every plan" / "From Pro" (lib/pricing). */
function planLine(featureId: string) {
  const feature = allFeatures.find((f) => f.id === featureId);
  if (!feature) throw new Error(`Unknown pricing feature: ${featureId}`);
  const first = plans.findIndex(
    (p) => resolveFeatureValue(feature.values[p.id]).status !== "unavailable",
  );
  return first <= 0 ? "On every plan" : `From ${plans[first].name}`;
}

const TONE: Record<Tone, string> = {
  light: "m-sec",
  sunken: "m-sec m-sunken",
  dark: "m-sec m-band",
};

/** A chapter: its band, its number and kicker, and its title (with a lede beside it, if any). */
function Chapterd({
  section,
  n,
  lede,
  children,
}: {
  section: Section;
  n: number;
  lede?: string;
  children: ReactNode;
}) {
  const dark = section.tone === "dark";
  const id = `sec-${n}-title`;
  const head = (
    <div className="space-y-5">
      <Chapter n={String(n).padStart(2, "0")} label={section.kicker} dark={dark} />
      <Title lines={section.title} id={id} dark={dark} />
    </div>
  );
  return (
    <section
      className={TONE[section.tone]}
      data-qx-color-scheme={dark ? "dark" : undefined}
      aria-labelledby={id}
    >
      <div className="m-wrap">
        {lede ? (
          <div className="m-sec-head" data-reveal>
            {head}
            <p className="m-lede m-sec-note">{lede}</p>
          </div>
        ) : (
          <div data-reveal>{head}</div>
        )}
        {children}
      </div>
    </section>
  );
}

function NotYet({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="cp-notyet" data-reveal>
      <InfoIcon size={18} aria-hidden />
      {text}
    </p>
  );
}

/**
 * The hero — a dark interior hero (the bar floats over it): the crumb and the
 * status, the headline, and the capability's path drawn across the page, step
 * by step, the way the record describes it. The path is content, not
 * decoration: an ordered list a screen reader reads as such.
 */
export function CapabilityHero({ page }: { page: CapabilityPage }) {
  return (
    <section className="cp-hero" data-qx-color-scheme="dark" aria-labelledby="cap-title">
      <div className="mhero-grid m-wrap" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
      <div className="m-wrap cp-hero-inner">
        <div className="cp-crumbs m-in">
          <nav aria-label="Breadcrumb">
            <ol>
              <li>
                <NextLink href="/features">Product</NextLink>
              </li>
              <li aria-current="page">{page.name}</li>
            </ol>
          </nav>
          <Badge tone="info" size="sm">
            {STATUS.label}
          </Badge>
        </div>
        <div className="cp-hero-head">
          <h1 id="cap-title" className="m-geo m-display-l cp-title">
            {page.title.map((line, i) => (
              <span key={line} className="m-line" style={vars({ "--i": i })}>
                <span className={i > 0 ? "cp-title-tone" : undefined}>{line}</span>
                {i < page.title.length - 1 && " "}
              </span>
            ))}
          </h1>
          <div className="cp-hero-side m-in" style={vars({ "--d": "420ms" })}>
            <p className="m-lede cp-lede">{page.lede}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink size="lg" href={docsUrl(page.docs)} icon={ArrowUpRightIcon}>
                Read the docs
              </ButtonLink>
              <ButtonLink size="lg" variant="soft" href="/contact">
                Talk to us
              </ButtonLink>
            </div>
          </div>
        </div>
        <ol className="cp-path" aria-label={page.pathLabel} data-reveal>
          {page.path.map((step, i) => (
            <li key={step.name} className="cp-step" style={vars({ "--i": i })}>
              <span className="cp-step-node" aria-hidden="true" />
              <span className="cp-step-n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="m-geo cp-step-name">{step.name}</p>
              <p className="cp-step-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * Tabs — one Qeetrix tab per item (the Ember bar slides to the chosen one).
 * Every panel stays in the page, hidden until chosen, so search and
 * find-in-page still reach it.
 */
function TabsSection({ section, n }: { section: Extract<Section, { kind: "tabs" }>; n: number }) {
  return (
    <Chapterd section={section} n={n}>
      <Tabs defaultValue={section.items[0].id} className="cp-tabs" data-reveal>
        <TabsList aria-label={section.label}>
          {section.items.map((m) => (
            <CapabilityTab key={m.id} value={m.id}>
              {m.name}
            </CapabilityTab>
          ))}
        </TabsList>
        {section.items.map((m) => (
          <TabsPanel key={m.id} value={m.id} keepMounted className="cp-panel">
            <div className="cp-panel-main">
              <h3 className="m-geo cp-statement">{m.statement}</h3>
              <p className="m-lede">{m.body}</p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink variant="soft" href={docsUrl(m.docs)} icon={ArrowUpRightIcon}>
                  {m.name} in the docs
                </ButtonLink>
                {m.more && (
                  <ButtonLink variant="ghost" href={m.more.href} icon={ArrowRightIcon}>
                    {m.more.label}
                  </ButtonLink>
                )}
              </div>
            </div>
            <div className="cp-panel-side">
              <ul className="cp-facts">
                {m.facts.map((f) => (
                  <li key={f}>
                    <CheckIcon size={18} aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              {m.feature && (
                <p className="cp-plan">
                  <span className="m-caps">Plans</span>
                  {planLine(m.feature)}
                </p>
              )}
            </div>
          </TabsPanel>
        ))}
      </Tabs>
      <NotYet text={section.notYet} />
    </Chapterd>
  );
}

/** Split — a numbered list on the left, icon cards on the right, and closing notes. */
function SplitSection({ section, n }: { section: Extract<Section, { kind: "split" }>; n: number }) {
  return (
    <Chapterd section={section} n={n}>
      <div className="cp-factors">
        <div data-reveal>
          <h3 className="m-caps cp-factors-head">{section.leftTitle}</h3>
          <ol className="cp-when">
            {section.left.map((w, i) => (
              <li key={w.name}>
                <span className="m-geo cp-when-n" aria-hidden="true">
                  {i + 1}
                </span>
                <div className="space-y-1">
                  <h4 className="m-geo m-heading">{w.name}</h4>
                  <p className="m-body cp-muted">{w.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div data-reveal style={vars({ "--i": 1 })}>
          <h3 className="m-caps cp-factors-head">{section.rightTitle}</h3>
          <ul className="cp-how">
            {section.right.map(({ icon: Icon, name, body }) => (
              <li key={name}>
                <span className="ih-icon">
                  <Icon size={22} aria-hidden />
                </span>
                <h4 className="m-geo m-heading">{name}</h4>
                <p className="m-card-sub">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {section.notes && (
        <ul className="cp-notes" data-reveal>
          {section.notes.map((note) => (
            <li key={note} className="m-geo">
              {note}
            </li>
          ))}
        </ul>
      )}
      <NotYet text={section.notYet} />
    </Chapterd>
  );
}

/** Minutes → a position on the ruler (log scale, 1 minute to 1 year). */
const rulerAt = (minutes: number) =>
  `${((Math.log10(minutes) / Math.log10(525600)) * 100).toFixed(2)}%`;

/**
 * Ruler — lifetimes drawn to scale on the dark band (a log ruler from a minute
 * to a year), then what ends one sooner.
 */
function RulerSection({ section, n }: { section: Extract<Section, { kind: "ruler" }>; n: number }) {
  return (
    <Chapterd section={section} n={n}>
      <figure className="cp-ruler" data-reveal>
        <ol className="cp-marks">
          {section.marks.map((m, i) => (
            <li key={m.name} style={vars({ "--at": rulerAt(m.minutes), "--i": i })}>
              <span className="m-geo cp-mark-value">{m.value}</span>
              <span className="m-caps m-kicker-dark">{m.name}</span>
              <span className="cp-mark-note">{m.note}</span>
            </li>
          ))}
        </ol>
        <div className="cp-axis" aria-hidden="true">
          {section.scale.map((t) => (
            <span key={t.label} style={vars({ "--at": rulerAt(t.minutes) })}>
              {t.label}
            </span>
          ))}
        </div>
        <figcaption className="sr-only">
          Lifetimes on a scale from one minute to one year.
        </figcaption>
      </figure>
      <div className="cp-ends" data-reveal>
        <h3 className="m-caps m-kicker-dark">{section.endsTitle}</h3>
        <ul>
          {section.ends.map((e) => (
            <li key={e.name}>
              <h4 className="m-geo m-heading m-title-dark">{e.name}</h4>
              <p className="m-body m-note-dark">{e.body}</p>
            </li>
          ))}
        </ul>
        <p className="m-body m-note-dark cp-webhook">{section.webhook}</p>
      </div>
    </Chapterd>
  );
}

/** Points — four statements across the dark band. */
function PointsSection({
  section,
  n,
}: {
  section: Extract<Section, { kind: "points" }>;
  n: number;
}) {
  return (
    <Chapterd section={section} n={n}>
      <ul className="cp-points" data-reveal>
        {section.items.map((p) => (
          <li key={p.name}>
            <h3 className="m-geo m-heading m-title-dark">{p.name}</h3>
            <p className="m-body m-note-dark">{p.body}</p>
          </li>
        ))}
      </ul>
    </Chapterd>
  );
}

/** Table — a plain settings table: setting, default, what each organisation can do. */
function TableSection({ section, n }: { section: Extract<Section, { kind: "table" }>; n: number }) {
  return (
    <Chapterd section={section} n={n} lede={section.lede}>
      <div className="cp-table-wrap" data-reveal>
        <table className="cp-table">
          <caption className="sr-only">{section.title.join(" ")}</caption>
          <thead>
            <tr>
              {section.columns.map((c) => (
                <th key={c} scope="col" className="m-caps">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map(([setting, value, can]) => (
              <tr key={setting}>
                <th scope="row" className="m-geo">
                  {setting}
                </th>
                <td className="cp-default">{value}</td>
                <td>{can}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NotYet text={section.notYet} />
    </Chapterd>
  );
}

/** Plans — the shared staircase, with this capability's rows. */
function PlansSection({ section, n }: { section: Extract<Section, { kind: "plans" }>; n: number }) {
  return (
    <Chapterd section={section} n={n}>
      <div className="mt-12">
        <PlanLadder rows={section.rows} />
      </div>
    </Chapterd>
  );
}

/** One chapter of a capability page, numbered in page order. */
export function CapabilitySection({ section, n }: { section: Section; n: number }) {
  switch (section.kind) {
    case "tabs":
      return <TabsSection section={section} n={n} />;
    case "split":
      return <SplitSection section={section} n={n} />;
    case "ruler":
      return <RulerSection section={section} n={n} />;
    case "points":
      return <PointsSection section={section} n={n} />;
    case "table":
      return <TableSection section={section} n={n} />;
    case "plans":
      return <PlansSection section={section} n={n} />;
  }
}

/** The other capabilities, as an index — the way on through the product. */
export function Related({ current }: { current: string }) {
  const others = CAPABILITIES.filter((c) => c.slug !== current);
  return (
    <section className="m-sec" aria-labelledby="related-title">
      <div className="m-wrap">
        <h2 id="related-title" className="m-caps" data-reveal>
          Also in Qeet ID
        </h2>
        <ul className="cp-related" data-reveal>
          {others.map(({ slug, name, line, icon: Icon }) => (
            <li key={slug}>
              <NextLink href={`/product/${slug}`} className="cp-related-link">
                <Icon size={24} aria-hidden className="cp-related-icon" />
                <span className="m-geo cp-related-name">{name}</span>
                <span className="cp-related-line">{line}</span>
                <ArrowRightIcon size={18} aria-hidden className="cp-related-arrow" />
              </NextLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The close — the dark band, with the capability's docs and a conversation. */
export function Close({ page }: { page: CapabilityPage }) {
  return (
    <section className="m-sec m-band" data-qx-color-scheme="dark" aria-labelledby="close-title">
      <div className="m-wrap">
        <div className="pcta cp-close" data-reveal>
          <h2 id="close-title" className="m-geo m-display-m m-title-dark">
            {page.close.map((l, i) => (
              <span key={l} className={i > 0 ? "block ih-tone" : "block"}>
                {l}
                {i < page.close.length - 1 && " "}
              </span>
            ))}
          </h2>
          <div className="flex flex-wrap gap-3">
            <ButtonLink size="lg" href={docsUrl(page.docs)} icon={ArrowUpRightIcon}>
              Read the docs
            </ButtonLink>
            <ButtonLink size="lg" variant="soft" href="/contact">
              Talk to us
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
