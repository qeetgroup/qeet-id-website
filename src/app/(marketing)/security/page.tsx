import { ArrowRightIcon, CheckIcon, MailIcon } from "@qeetrix/icons";
import { Badge } from "@qeetrix/react/badge";
import type { Metadata } from "next";
import NextLink from "next/link";
import "./security.css";
import { ContentsRail } from "@/components/security/contents-rail";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/site/reveal";
import { vars } from "@/components/site/vars";
import { STATUS } from "@/config/home";
import { SECURITY_PAGE as S } from "@/config/security";

export const metadata: Metadata = {
  title: S.meta.title,
  description: S.meta.description,
  alternates: { canonical: "/security" },
};

type Sec = (typeof S.sections)[number];

/** One section of the brief: its number, its heading, its lede, and whichever blocks it has. */
function BriefSection({ s, n }: { s: Sec; n: number }) {
  return (
    <section id={s.id} className="sb-sec" aria-labelledby={`${s.id}-title`} data-reveal>
      <p className="sb-n" aria-hidden="true">
        {String(n).padStart(2, "0")}
      </p>
      <h2 id={`${s.id}-title`} className="m-geo sb-h">
        {s.title}
      </h2>
      {"lede" in s && <p className="m-lede sb-lede">{s.lede}</p>}

      {"rules" in s && (
        <ol className="sb-rules">
          {s.rules.map((r) => (
            <li key={r.n}>
              <span className="sb-code">{r.n}</span>
              <p>{r.text}</p>
              <span className="sb-tag">
                <CheckIcon size={14} aria-hidden />
                Enforced in code
              </span>
            </li>
          ))}
        </ol>
      )}

      {"layers" in s && (
        <ol className="sb-layers">
          {s.layers.map((l, i) => (
            <li key={l.name}>
              <span className="m-caps">Layer {i + 1}</span>
              <h3 className="m-geo m-heading">{l.name}</h3>
              <p className="m-body sb-muted">{l.body}</p>
            </li>
          ))}
        </ol>
      )}

      {"rows" in s && (
        <table className="sb-table">
          <caption className="sr-only">{s.title}</caption>
          <tbody>
            {s.rows.map(([k, v]) => (
              <tr key={k}>
                <th scope="row" className="m-geo">
                  {k}
                </th>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {"items" in s && (
        <ul className="sb-items">
          {s.items.map((it) => (
            <li key={it.name}>
              <h3 className="m-geo m-heading">{it.name}</h3>
              <p className="m-body sb-muted">{it.body}</p>
            </li>
          ))}
        </ul>
      )}

      {"links" in s && (
        <ul className="sb-links">
          {s.links.map((l) => (
            <li key={l.href}>
              <NextLink href={l.href}>
                {l.label}
                <ArrowRightIcon size={16} aria-hidden />
              </NextLink>
            </li>
          ))}
        </ul>
      )}

      {"note" in s && <p className="sb-note">{s.note}</p>}
    </section>
  );
}

/**
 * /security — the trust brief: a light editorial cover with the four facts a
 * reviewer looks for first, then a document of numbered sections beside a
 * contents rail, and a dark band for reporting a vulnerability. Its own page
 * category — a document to be read, not a product page. Copy: config/security.ts.
 */
export default function SecurityPage() {
  return (
    <div className="mk" id="security" data-qx-density="comfortable">
      <Reveal scope="#security" />

      <header className="m-wrap sb-cover">
        <p className="sb-kicker m-in">
          <span className="m-rule" aria-hidden="true" />
          <span className="m-caps">{S.kicker}</span>
          <Badge tone="info" size="sm">
            {STATUS.label}
          </Badge>
        </p>
        <div className="sb-cover-head">
          <h1 className="m-geo m-display-xl sb-title">
            {S.title.map((line, i) => (
              <span key={line} className="m-line" style={vars({ "--i": i })}>
                <span className={i > 0 ? "ih-tone" : undefined}>{line}</span>
                {i < S.title.length - 1 && " "}
              </span>
            ))}
          </h1>
          <div className="sb-cover-side m-in" style={vars({ "--d": "380ms" })}>
            <p className="m-lede">{S.lede}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink size="lg" href={`mailto:${S.report.email}`} icon={MailIcon}>
                Report a vulnerability
              </ButtonLink>
              <ButtonLink size="lg" variant="soft" href="/contact">
                Talk to us
              </ButtonLink>
            </div>
          </div>
        </div>
        <dl className="sb-facts m-in" style={vars({ "--d": "520ms" })}>
          {S.facts.map((f) => (
            <div key={f.value}>
              <dt className="m-geo sb-fact-value">{f.value}</dt>
              <dd className="sb-fact-label">{f.label}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="m-wrap sb-body">
        <ContentsRail items={S.sections.map(({ id, title }) => ({ id, title }))} />
        <div className="sb-doc">
          {S.sections.map((s, i) => (
            <BriefSection key={s.id} s={s} n={i + 1} />
          ))}
        </div>
      </div>

      <section
        id="report"
        className="m-sec m-band"
        data-qx-color-scheme="dark"
        aria-labelledby="report-title"
      >
        <div className="m-wrap sb-report" data-reveal>
          <div className="space-y-6">
            <span className="m-rule" aria-hidden="true" />
            <h2 id="report-title" className="m-geo m-display-m m-title-dark">
              {S.report.title.map((l, i) => (
                <span key={l} className={i > 0 ? "block ih-tone" : "block"}>
                  {l}
                  {i < S.report.title.length - 1 && " "}
                </span>
              ))}
            </h2>
          </div>
          <div className="space-y-6">
            <p className="m-lede m-note-dark">{S.report.body}</p>
            <p className="m-body m-note-dark">{S.report.note}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink size="lg" href={`mailto:${S.report.email}`} icon={MailIcon}>
                {S.report.email}
              </ButtonLink>
              <ButtonLink size="lg" variant="soft" href={S.report.github} icon={ArrowRightIcon}>
                Qeet Group on GitHub
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
