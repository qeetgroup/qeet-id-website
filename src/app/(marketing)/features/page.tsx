import { ArrowRightIcon, ArrowUpRightIcon } from "@qeetrix/icons";
import { Badge } from "@qeetrix/react/badge";
import type { Metadata } from "next";
import NextLink from "next/link";
import "../product/[slug]/capability.css";
import "./features.css";
import { Chapter } from "@/components/home/chapter";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/site/reveal";
import { vars } from "@/components/site/vars";
import { CAPABILITIES, CAPABILITY_PAGES } from "@/config/capabilities";
import { STATUS } from "@/config/home";
import { PRODUCT_INDEX as P } from "@/config/product-index";
import { DOCS_BASE_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: P.meta.title,
  description: P.meta.description,
  alternates: { canonical: "/features" },
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

/** A capability's own items — the names of its tabs, read from its page. */
function itemsOf(slug: keyof typeof CAPABILITY_PAGES) {
  const tabs = CAPABILITY_PAGES[slug].sections.find((s) => s.kind === "tabs");
  return tabs && tabs.kind === "tabs" ? tabs.items.map((t) => t.name) : [];
}

/**
 * /features — the product's index: every capability (each row read from its
 * page), the standards Qeet ID implements, and what is not in 1.0, said once.
 * The capability pages' language (their hero, chapters and bands).
 */
export default function FeaturesPage() {
  return (
    <div className="mk" id="features" data-qx-density="comfortable">
      <Reveal scope="#features" />
      <section className="cp-hero" data-qx-color-scheme="dark" aria-labelledby="features-title">
        <div className="mhero-grid m-wrap" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
        <div className="m-wrap cp-hero-inner">
          <p className="cp-crumbs m-in">
            <span className="m-caps m-kicker-dark">{P.kicker}</span>
            <Badge tone="info" size="sm">
              {STATUS.label}
            </Badge>
          </p>
          <div className="cp-hero-head">
            <h1 id="features-title" className="m-geo m-display-l cp-title">
              {P.title.map((line, i) => (
                <span key={line} className="m-line" style={vars({ "--i": i })}>
                  <span className={i > 0 ? "cp-title-tone" : undefined}>{line}</span>
                  {i < P.title.length - 1 && " "}
                </span>
              ))}
            </h1>
            <div className="cp-hero-side m-in" style={vars({ "--d": "420ms" })}>
              <p className="m-lede cp-lede">{P.lede}</p>
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
        </div>
      </section>

      {/* 01 — the six capabilities, each row read from its page. */}
      <section className="m-sec" aria-labelledby="fx-caps-title">
        <div className="m-wrap">
          <div className="space-y-5" data-reveal>
            <Chapter n="01" label={P.capabilities.kicker} />
            <Title lines={P.capabilities.title} id="fx-caps-title" />
          </div>
          <ul className="fx-caps">
            {CAPABILITIES.map(({ slug, name, line, icon: Icon }, i) => (
              <li key={slug} data-reveal style={vars({ "--i": i % 2 })}>
                <NextLink href={`/product/${slug}`} className="fx-cap">
                  <span className="ih-icon">
                    <Icon size={22} aria-hidden />
                  </span>
                  <span className="fx-cap-head">
                    <span className="m-geo fx-cap-name">{name}</span>
                    <span className="fx-cap-line">{line}</span>
                  </span>
                  <span className="fx-cap-items">
                    {itemsOf(slug).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </span>
                  <span className="fx-cap-go">
                    Explore <ArrowRightIcon size={16} aria-hidden />
                  </span>
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 02 — the standards, as a reference table. */}
      <section className="m-sec m-sunken" aria-labelledby="fx-std-title">
        <div className="m-wrap">
          <div className="m-sec-head" data-reveal>
            <div className="space-y-5">
              <Chapter n="02" label={P.standards.kicker} />
              <Title lines={P.standards.title} id="fx-std-title" />
            </div>
            <p className="m-lede m-sec-note">{P.standards.lede}</p>
          </div>
          <div className="fx-std">
            {P.standards.groups.map((g) => (
              <div key={g.name} className="cp-table-wrap" data-reveal>
                <table className="cp-table fx-std-table">
                  <caption className="m-caps">{g.name}</caption>
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">Standard</th>
                      <th scope="col">What it is for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.rows.map(([spec, use]) => (
                      <tr key={spec}>
                        <th scope="row" className="m-geo">
                          {spec}
                        </th>
                        <td>{use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — what is not in 1.0, once, plainly. */}
      <section className="m-sec m-band" data-qx-color-scheme="dark" aria-labelledby="fx-not-title">
        <div className="m-wrap">
          <div className="space-y-5" data-reveal>
            <Chapter n="03" label={P.notYet.kicker} dark />
            <Title lines={P.notYet.title} id="fx-not-title" dark />
          </div>
          <ul className="cp-points fx-not" data-reveal>
            {P.notYet.items.map((p) => (
              <li key={p.name}>
                <h3 className="m-geo m-heading m-title-dark">{p.name}</h3>
                <p className="m-body m-note-dark">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="m-sec" aria-labelledby="fx-close-title">
        <div className="m-wrap">
          <div className="pcta cp-close" data-reveal>
            <h2 id="fx-close-title" className="m-geo m-display-m">
              {P.close.map((l, i) => (
                <span key={l} className={i > 0 ? "block ih-tone" : "block"}>
                  {l}
                  {i < P.close.length - 1 && " "}
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
