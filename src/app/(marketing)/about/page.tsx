import { ArrowRightIcon, ArrowUpRightIcon } from "@qeetrix/icons";
import { Badge } from "@qeetrix/react/badge";
import type { Metadata } from "next";
import "./about.css";
import { Chapter } from "@/components/home/chapter";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/site/reveal";
import { vars } from "@/components/site/vars";
import { ABOUT_PAGE as A } from "@/config/about";
import { STATUS } from "@/config/home";

export const metadata: Metadata = {
  title: A.meta.title,
  description: A.meta.description,
  alternates: { canonical: "/about" },
};

/**
 * /about — short: what Qeet ID is to Qeet Group, the one line on why it
 * exists, and the group's philosophy, vision and mission in its own words.
 * Copy and sources: config/about.ts.
 */
export default function AboutPage() {
  const G = A.group;
  return (
    <div className="mk" id="about" data-qx-density="comfortable">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />
      <Reveal scope="#about" />

      <section className="m-wrap ab-cover" aria-labelledby="about-title">
        <p className="ab-kicker m-in">
          <span className="m-rule" aria-hidden="true" />
          <span className="m-caps">{A.kicker}</span>
          <Badge tone="info" size="sm">
            {STATUS.label}
          </Badge>
        </p>
        <div className="ab-cover-head">
          <h1 id="about-title" className="m-geo m-display-xl ab-title">
            {A.title.map((line, i) => (
              <span key={line} className="m-line" style={vars({ "--i": i })}>
                <span className={i > 0 ? "ih-tone" : undefined}>{line}</span>
                {i < A.title.length - 1 && " "}
              </span>
            ))}
          </h1>
          <div className="ab-cover-side m-in" style={vars({ "--d": "380ms" })}>
            <p className="m-lede">{A.lede}</p>
            <p className="ab-status">{STATUS.line}</p>
          </div>
        </div>
      </section>

      {/* 01 — why it exists, in the group's words */}
      <section className="m-sec m-band" data-qx-color-scheme="dark" aria-labelledby="ab-why-title">
        <div className="m-wrap">
          <div data-reveal>
            <Chapter n="01" label={A.why.kicker} dark />
          </div>
          <figure className="ab-quote" data-reveal>
            <blockquote>
              <p id="ab-why-title" className="m-geo m-title-dark">
                {A.why.quote}
              </p>
            </blockquote>
            <figcaption className="m-caps m-kicker-dark">{A.why.attribution}</figcaption>
          </figure>
        </div>
      </section>

      {/* 02 — Qeet Group: the philosophy, the vision, the mission */}
      <section className="m-sec" aria-labelledby="ab-group-title">
        <div className="m-wrap">
          <div className="ab-group-head" data-reveal>
            <div className="space-y-5">
              <Chapter n="02" label={G.kicker} />
              <h2 id="ab-group-title" className="m-geo m-display-m">
                {G.title.map((l, i) => (
                  <span key={l} className={i > 0 ? "block ih-tone" : "block"}>
                    {l}
                    {i < G.title.length - 1 && " "}
                  </span>
                ))}
              </h2>
            </div>
            <p className="m-lede ab-framing">
              {G.positioning} <span className="ab-framing-line">{G.framing}</span>
            </p>
          </div>

          <ol className="ab-words" data-reveal>
            {G.words.map((w) => (
              <li key={w.word}>
                <span className="m-geo ab-letter" aria-hidden="true">
                  {w.word[0]}
                </span>
                <h3 className="m-geo m-heading">{w.word}</h3>
                <p className="m-body ab-muted">{w.claim}</p>
              </li>
            ))}
          </ol>

          <dl className="ab-purpose" data-reveal>
            <div>
              <dt className="m-caps">Vision</dt>
              <dd className="m-body">{G.vision}</dd>
            </div>
            <div>
              <dt className="m-caps">Mission</dt>
              <dd className="m-body">{G.mission}</dd>
            </div>
          </dl>
          <p className="ab-source" data-reveal>
            Quoted from the {G.source}.{" "}
            <a href={G.more.href}>
              {G.more.label}
              <ArrowUpRightIcon size={14} aria-hidden />
            </a>
          </p>
        </div>
      </section>

      <section className="m-sec m-sunken" aria-labelledby="ab-close-title">
        <div className="m-wrap">
          <div className="pcta" data-reveal>
            <h2 id="ab-close-title" className="m-geo m-display-m">
              {A.close.map((l, i) => (
                <span key={l} className={i > 0 ? "block ih-tone" : "block"}>
                  {l}
                  {i < A.close.length - 1 && " "}
                </span>
              ))}
            </h2>
            <div className="flex flex-wrap gap-3">
              <ButtonLink size="lg" href="/features" icon={ArrowRightIcon}>
                All features
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
