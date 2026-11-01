import { ArrowRightIcon, ArrowUpRightIcon, InfoIcon } from "@qeetrix/icons";
import { Badge } from "@qeetrix/react/badge";
import type { Metadata } from "next";
import "../product/[slug]/capability.css";
import "./migrate.css";
import { Chapter } from "@/components/home/chapter";
import { BrandMark } from "@/components/site/brand-mark";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/site/reveal";
import { vars } from "@/components/site/vars";
import { STATUS } from "@/config/home";
import { MIGRATE_PAGE as M } from "@/config/migrate";
import { DOCS_BASE_URL, docsUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: M.meta.title,
  description: M.meta.description,
  alternates: { canonical: "/migrate" },
};

/** A display heading, one authored line per line, the second quieter. */
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

const hrefOf = (href: string) => (href.startsWith("docs:") ? docsUrl(href.slice(5)) : href);

/**
 * /migrate — the move to Qeet ID, as a playbook: a dark hero whose diagram
 * draws the three providers into one, what comes across (and what does not),
 * the five steps in order, and the small things to know. Copy: config/migrate.ts.
 */
export default function MigratePage() {
  return (
    <div className="mk" id="migrate" data-qx-density="comfortable">
      <Reveal scope="#migrate" />

      <section className="cp-hero" data-qx-color-scheme="dark" aria-labelledby="migrate-title">
        <div className="mhero-grid m-wrap" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
        <div className="m-wrap cp-hero-inner">
          <p className="cp-crumbs m-in">
            <span className="m-caps m-kicker-dark">{M.kicker}</span>
            <Badge tone="info" size="sm">
              {STATUS.label}
            </Badge>
          </p>
          <div className="cp-hero-head">
            <h1 id="migrate-title" className="m-geo m-display-l cp-title">
              {M.title.map((line, i) => (
                <span key={line} className="m-line" style={vars({ "--i": i })}>
                  <span className={i > 0 ? "cp-title-tone" : undefined}>{line}</span>
                  {i < M.title.length - 1 && " "}
                </span>
              ))}
            </h1>
            <div className="cp-hero-side m-in" style={vars({ "--d": "420ms" })}>
              <p className="m-lede cp-lede">{M.lede}</p>
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

          {/* The move: three providers drawn into one. The words carry it; the lines are decoration. */}
          <div className="mg-move" data-reveal>
            <ul className="mg-from" aria-label="Providers Qeet ID imports from">
              {M.from.map((p, i) => (
                <li key={p} className="m-geo" style={vars({ "--i": i })}>
                  {p}
                </li>
              ))}
            </ul>
            <svg
              className="mg-lines"
              viewBox="0 0 400 180"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0 30 C 180 30, 220 90, 396 90" />
              <path d="M0 90 L 396 90" />
              <path d="M0 150 C 180 150, 220 90, 396 90" />
              <path className="mg-head" d="M388 82 L 400 90 L 388 98" />
            </svg>
            <p className="mg-to">
              <BrandMark height={40} />
              <span className="m-geo">Qeet ID</span>
            </p>
          </div>
        </div>
      </section>

      {/* 01 — what comes across, and what does not */}
      <section className="m-sec" aria-labelledby="mg-comes-title">
        <div className="m-wrap">
          <div className="space-y-5" data-reveal>
            <Chapter n="01" label={M.comes.kicker} />
            <Title lines={M.comes.title} id="mg-comes-title" />
          </div>
          <div className="cp-table-wrap mt-12" data-reveal>
            <table className="cp-table mg-table">
              <caption className="sr-only">What comes across from each provider</caption>
              <thead>
                <tr>
                  {M.comes.columns.map((c) => (
                    <th key={c} scope="col" className="m-caps">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {M.comes.rows.map(([from, file, what]) => (
                  <tr key={from}>
                    <th scope="row" className="m-geo">
                      {from}
                    </th>
                    <td className="cp-default">{file}</td>
                    <td>{what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="cp-notyet" data-reveal>
            <InfoIcon size={18} aria-hidden />
            {M.comes.notComing}
          </p>
        </div>
      </section>

      {/* 02 — the move, step by step, down one rail */}
      <section className="m-sec m-sunken" aria-labelledby="mg-steps-title">
        <div className="m-wrap mg-steps-wrap">
          <div className="space-y-5 mg-steps-head" data-reveal>
            <Chapter n="02" label={M.steps.kicker} />
            <Title lines={M.steps.title} id="mg-steps-title" />
          </div>
          <ol className="mg-steps">
            {M.steps.items.map((s, i) => (
              <li key={s.name} data-reveal>
                <span className="m-geo mg-step-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mg-step-body">
                  <p className="m-caps">{s.where}</p>
                  <h3 className="m-geo mg-step-name">{s.name}</h3>
                  <p className="m-body mg-muted">{s.body}</p>
                  {"more" in s && (
                    <ButtonLink
                      variant="ghost"
                      href={hrefOf(s.more.href)}
                      icon={s.more.href.startsWith("docs:") ? ArrowUpRightIcon : ArrowRightIcon}
                    >
                      {s.more.label}
                    </ButtonLink>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 — good to know */}
      <section className="m-sec m-band" data-qx-color-scheme="dark" aria-labelledby="mg-know-title">
        <div className="m-wrap">
          <div className="space-y-5" data-reveal>
            <Chapter n="03" label={M.know.kicker} dark />
            <Title lines={M.know.title} id="mg-know-title" dark />
          </div>
          <ul className="cp-points" data-reveal>
            {M.know.items.map((k) => (
              <li key={k.name}>
                <h3 className="m-geo m-heading m-title-dark">{k.name}</h3>
                <p className="m-body m-note-dark">{k.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="m-sec" aria-labelledby="mg-close-title">
        <div className="m-wrap">
          <div className="pcta cp-close" data-reveal>
            <h2 id="mg-close-title" className="m-geo m-display-m">
              {M.close.map((l, i) => (
                <span key={l} className={i > 0 ? "block ih-tone" : "block"}>
                  {l}
                  {i < M.close.length - 1 && " "}
                </span>
              ))}
            </h2>
            <div className="flex flex-wrap gap-3">
              <ButtonLink size="lg" href="/contact" icon={ArrowRightIcon}>
                Talk to us
              </ButtonLink>
              <ButtonLink size="lg" variant="soft" href={DOCS_BASE_URL} icon={ArrowUpRightIcon}>
                Read the docs
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
