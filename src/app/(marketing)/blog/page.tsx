import { ArrowRightIcon } from "@qeetrix/icons";
import type { Metadata } from "next";
import Link from "next/link";
import "./blog.css";
import { CodeSample } from "@/components/blog/prose";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/site/reveal";
import { vars } from "@/components/site/vars";
import { BLOG_PAGE as B } from "@/config/blog";
import { listPosts, parseBody, readingMinutes } from "@/lib/blog";
import { longDate } from "@/lib/dates";

export const metadata: Metadata = {
  title: B.meta.title,
  description: B.meta.description,
  alternates: { canonical: "/blog" },
};

/**
 * /blog — the engineering notes: a light cover, the latest post set out with
 * the code it is about, then the rest as a ruled list. Each post is checked
 * against the code (lib/blog.ts); the words are in config/blog.ts.
 */
export default function BlogIndexPage() {
  const [latest, ...rest] = listPosts();
  const sample = latest ? parseBody(latest.body).find((b) => b.kind === "code") : undefined;

  return (
    <div className="mk" id="blog" data-qx-density="comfortable">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ]}
      />
      <Reveal scope="#blog" />

      <section className="m-wrap bl-cover" aria-labelledby="blog-title">
        <p className="bp-kicker m-in">
          <span className="m-rule" aria-hidden="true" />
          <span className="m-caps">{B.kicker}</span>
        </p>
        <div className="bl-cover-head">
          <h1 id="blog-title" className="m-geo m-display-xl bl-title">
            {B.title.map((line, i) => (
              <span key={line} className="m-line" style={vars({ "--i": i })}>
                <span className={i > 0 ? "ih-tone" : undefined}>{line}</span>
                {i < B.title.length - 1 && " "}
              </span>
            ))}
          </h1>
          <p className="m-lede bl-lede m-in" style={vars({ "--d": "380ms" })}>
            {B.lede}
          </p>
        </div>
      </section>

      {latest && (
        <section className="m-wrap bl-latest" aria-labelledby="bl-latest-title">
          <h2 id="bl-latest-title" className="sr-only">
            {B.latest}
          </h2>
          <div className="bl-latest-grid m-in" style={vars({ "--d": "520ms" })}>
            <div className="bl-latest-text">
              <p className="bl-row-meta">
                <span className="m-caps">{latest.topic}</span>
                <span>
                  {longDate(latest.publishedAt)} · {readingMinutes(latest)} min read
                </span>
              </p>
              <h3 className="m-geo m-display-m">
                <Link href={`/blog/${latest.slug}`} className="bl-latest-link">
                  {latest.title}
                </Link>
              </h3>
              <p className="m-body bl-row-dek">{latest.description}</p>
              <ButtonLink variant="soft" href={`/blog/${latest.slug}`} icon={ArrowRightIcon}>
                Read the post
              </ButtonLink>
            </div>
            {sample?.kind === "code" && (
              <CodeSample text={sample.text} lang={sample.lang} caption={sample.caption} />
            )}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="m-sec" aria-labelledby="bl-more-title">
          <div className="m-wrap">
            <h2 id="bl-more-title" className="m-caps bl-more-title" data-reveal>
              {B.more}
            </h2>
            <ul className="bl-more" data-reveal>
              {rest.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="bl-row">
                    <span className="bl-row-meta">
                      <span className="m-caps">{p.topic}</span>
                      <span>
                        {longDate(p.publishedAt)} · {readingMinutes(p)} min read
                      </span>
                    </span>
                    <span className="bl-row-text">
                      <span className="m-geo m-heading">{p.title}</span>
                      <span className="bl-row-dek">{p.description}</span>
                    </span>
                    <ArrowRightIcon size={20} aria-hidden className="bl-row-arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="m-sec m-sunken" aria-labelledby="bl-close-title">
        <div className="m-wrap">
          <div className="pcta" data-reveal>
            <h2 id="bl-close-title" className="m-geo m-display-m">
              {B.close.map((l, i) => (
                <span key={l} className={i > 0 ? "block ih-tone" : "block"}>
                  {l}
                  {i < B.close.length - 1 && " "}
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
