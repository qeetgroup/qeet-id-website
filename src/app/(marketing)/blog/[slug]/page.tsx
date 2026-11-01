import { ArrowRightIcon } from "@qeetrix/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../blog.css";
import { Prose } from "@/components/blog/prose";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/site/reveal";
import { vars } from "@/components/site/vars";
import { BLOG_PAGE } from "@/config/blog";
import { getPost, listPosts, parseBody, readingMinutes, relatedPosts } from "@/lib/blog";
import { longDate } from "@/lib/dates";

const A = BLOG_PAGE.article;

export const dynamicParams = false;

export function generateStaticParams() {
  return listPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.checked,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

/**
 * /blog/[slug] — a post: where it sits, the title and standfirst, the byline
 * with the day the post was checked against the code; then one measured
 * column with, on a wide screen, its contents beside it; then the end note,
 * where its subject lives on the site, and the other posts.
 */
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const blocks = parseBody(post.body);
  const headings = blocks.flatMap((b) => (b.kind === "h2" ? [b] : []));
  const related = relatedPosts(post.slug);
  const minutes = readingMinutes(post);

  return (
    <div className="mk" id="post" data-qx-density="comfortable">
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        url={`/blog/${post.slug}`}
        datePublished={post.publishedAt}
        author={post.author}
        image={`/blog/${post.slug}/opengraph-image`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <Reveal scope="#post" />

      <article aria-labelledby="post-title">
        <header className="m-wrap bp-head">
          <p className="bp-kicker m-in">
            <span className="m-rule" aria-hidden="true" />
            <Link href="/blog" className="m-caps bp-crumb">
              {A.crumb}
            </Link>
            <span className="m-caps bp-kind">
              {A.kind} · {post.topic}
            </span>
          </p>
          <h1 id="post-title" className="m-geo bp-title">
            <span className="m-line">
              <span>{post.title}</span>
            </span>
          </h1>
          <p className="bp-dek m-in" style={vars({ "--d": "320ms" })}>
            {post.description}
          </p>
          <dl className="bp-byline m-in" style={vars({ "--d": "460ms" })}>
            <div>
              <dt>{A.by}</dt>
              <dd>{post.author}</dd>
            </div>
            <div>
              <dt>{A.published}</dt>
              <dd>
                <time dateTime={post.publishedAt}>{longDate(post.publishedAt)}</time>
              </dd>
            </div>
            <div>
              <dt>{A.length}</dt>
              <dd>{minutes} min read</dd>
            </div>
            <div>
              <dt>{A.checked}</dt>
              <dd>
                <time dateTime={post.checked}>{longDate(post.checked)}</time>
              </dd>
            </div>
          </dl>
        </header>

        <div className="m-wrap bp-body">
          <aside className="bp-rail" aria-label={A.contents}>
            <div className="bp-rail-inner">
              <p className="m-caps">{A.contents}</p>
              <ol>
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ol>
              <p className="m-caps bp-rail-lives">{A.lives}</p>
              <Link href={post.more.href} className="bp-rail-link">
                {post.more.label}
                <ArrowRightIcon size={16} aria-hidden />
              </Link>
            </div>
          </aside>

          <div className="bp-main">
            <Prose blocks={blocks} />
            <footer className="bp-end">
              <span className="bp-end-mark" aria-hidden="true" />
              <p>
                {A.end} <time dateTime={post.checked}>{longDate(post.checked)}</time>. {A.wrong}{" "}
                <Link href="/contact">{A.tell}</Link>.
              </p>
              <ButtonLink variant="soft" href={post.more.href} icon={ArrowRightIcon}>
                {post.more.label}
              </ButtonLink>
            </footer>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="m-sec m-sunken" aria-labelledby="bp-keep-title">
          <div className="m-wrap">
            <h2 id="bp-keep-title" className="m-geo m-display-m" data-reveal>
              {A.keep}
            </h2>
            <ul className="bl-more" data-reveal>
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="bl-row">
                    <span className="bl-row-meta">
                      <span className="m-caps">{p.topic}</span>
                      <span>{readingMinutes(p)} min read</span>
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

      <section className="m-sec" aria-labelledby="bp-close-title">
        <div className="m-wrap">
          <div className="pcta" data-reveal>
            <h2 id="bp-close-title" className="m-geo m-display-m">
              {BLOG_PAGE.close.map((l, i) => (
                <span key={l} className={i > 0 ? "block ih-tone" : "block"}>
                  {l}
                  {i < BLOG_PAGE.close.length - 1 && " "}
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
