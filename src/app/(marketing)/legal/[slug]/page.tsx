import { InfoIcon } from "@qeetrix/icons";
import { Badge } from "@qeetrix/react/badge";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../legal.css";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { InlineText } from "@/components/site/inline-text";
import { Reveal } from "@/components/site/reveal";
import { DRAFT_NOTE, LEGAL_PAGE as L, LEGAL_DOCS, type LegalDoc } from "@/config/legal";
import { longDate } from "@/lib/dates";
import { headingId } from "@/lib/inline";

export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_DOCS.map((d) => ({ slug: d.slug }));
}

const find = (slug: string) => LEGAL_DOCS.find((d) => d.slug === slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const doc = find((await params).slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/legal/${doc.slug}` },
  };
}

/**
 * /legal/[slug] — the four legal pages in one shell: where it sits, the
 * title, the date and the draft note, then the text in one measured column
 * with the other documents and this one's contents in a rail. Words and their
 * sources: config/legal.ts.
 */
export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const doc = find((await params).slug);
  if (!doc) notFound();

  return (
    <div className="mk" id="legal" data-qx-density="comfortable">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: doc.title, url: `/legal/${doc.slug}` },
        ]}
      />
      <Reveal scope="#legal" />

      <header className="m-wrap lg-head">
        <p className="lg-kicker m-in">
          <span className="m-rule" aria-hidden="true" />
          <span className="m-caps">{L.kicker}</span>
          <Badge tone="warning" size="sm">
            {L.draft}
          </Badge>
        </p>
        <h1 className="m-geo lg-title">
          <span className="m-line">
            <span>{doc.title}</span>
          </span>
        </h1>
        <p className="lg-updated m-in">
          {L.updated} <time dateTime={doc.updated}>{longDate(doc.updated)}</time>
        </p>
        <p className="lg-draft m-in">
          <InfoIcon size={18} aria-hidden />
          <span>{DRAFT_NOTE}</span>
        </p>
      </header>

      <div className="m-wrap lg-body">
        <nav className="lg-rail" aria-label={L.documents}>
          <ul className="lg-docs">
            {LEGAL_DOCS.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/legal/${d.slug}`}
                  aria-current={d.slug === doc.slug ? "page" : undefined}
                >
                  {d.short}
                </Link>
              </li>
            ))}
          </ul>
          {doc.sections.length > 2 && (
            <>
              <p className="m-caps lg-rail-label">{L.contents}</p>
              <ol className="lg-toc">
                {doc.sections.map((s) => (
                  <li key={s.heading}>
                    <a href={`#${headingId(s.heading)}`}>{s.heading}</a>
                  </li>
                ))}
              </ol>
            </>
          )}
        </nav>

        <div className="lg-main">
          <p className="m-lede lg-intro">{doc.intro}</p>
          {doc.subprocessors && <Providers doc={doc} />}
          {doc.sections.map((s, i) => (
            <section key={s.heading} className="lg-section" aria-labelledby={headingId(s.heading)}>
              <h2 id={headingId(s.heading)} className="m-geo">
                <span className="lg-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.heading}
              </h2>
              {s.body.map((p) => (
                <p key={p}>
                  <InlineText text={p} />
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

/** The providers: a table on a wide screen, a list of the same on a phone. */
function Providers({ doc }: { doc: LegalDoc }) {
  const T = L.table;
  return (
    <>
      <table className="lg-table">
        <caption className="sr-only">{doc.title}</caption>
        <thead>
          <tr>
            <th scope="col">{T.name}</th>
            <th scope="col">{T.does}</th>
            <th scope="col">{T.where}</th>
            <th scope="col">{T.state}</th>
          </tr>
        </thead>
        <tbody>
          {doc.subprocessors?.map((s) => (
            <tr key={s.name}>
              <th scope="row" className="m-geo">
                {s.name}
              </th>
              <td>{s.does}</td>
              <td>{s.where}</td>
              <td>
                <span className="lg-state" data-used={s.state === "Used" || undefined}>
                  {s.state}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="lg-cards">
        {doc.subprocessors?.map((s) => (
          <li key={s.name}>
            <p className="m-geo m-heading">{s.name}</p>
            <dl>
              <div>
                <dt>{T.does}</dt>
                <dd>{s.does}</dd>
              </div>
              <div>
                <dt>{T.where}</dt>
                <dd>{s.where}</dd>
              </div>
              <div>
                <dt>{T.state}</dt>
                <dd>
                  <span className="lg-state" data-used={s.state === "Used" || undefined}>
                    {s.state}
                  </span>
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}
