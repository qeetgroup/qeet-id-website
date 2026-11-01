import { ArrowRightIcon, ArrowUpRightIcon } from "@qeetrix/icons";
import type { Metadata } from "next";
import Link from "next/link";
import "./contact.css";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { Reveal } from "@/components/site/reveal";
import { vars } from "@/components/site/vars";
import { CONTACT_PAGE as C } from "@/config/contact";

export const metadata: Metadata = {
  title: C.meta.title,
  description: C.meta.description,
  alternates: { canonical: "/contact" },
};

/**
 * /contact — a directory: four addresses, each with what it is for, set as
 * ruled rows with the address large. Email only. Copy: config/contact.ts.
 */
export default function ContactPage() {
  return (
    <div className="mk" id="contact" data-qx-density="comfortable">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />
      <Reveal scope="#contact" />

      <section className="m-wrap ct-cover" aria-labelledby="contact-title">
        <p className="ct-kicker m-in">
          <span className="m-rule" aria-hidden="true" />
          <span className="m-caps">{C.kicker}</span>
        </p>
        <div className="ct-cover-head">
          <h1 id="contact-title" className="m-geo m-display-xl ct-title">
            {C.title.map((line, i) => (
              <span key={line} className="m-line" style={vars({ "--i": i })}>
                <span className={i > 0 ? "ih-tone" : undefined}>{line}</span>
                {i < C.title.length - 1 && " "}
              </span>
            ))}
          </h1>
          <p className="m-lede ct-lede m-in" style={vars({ "--d": "380ms" })}>
            {C.lede}
          </p>
        </div>

        <ul className="ct-list m-in" style={vars({ "--d": "520ms" })}>
          {C.channels.map((c, i) => (
            <li key={c.id} className="ct-row">
              <span className="ct-n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="ct-what">
                <h2 className="m-geo m-heading">{c.name}</h2>
                <p className="ct-body">{c.body}</p>
                {"more" in c && (
                  <Link href={c.more.href} className="ct-more">
                    {c.more.label}
                    <ArrowRightIcon size={16} aria-hidden />
                  </Link>
                )}
              </div>
              <a className="m-geo ct-email" href={`mailto:${c.email}`}>
                {c.email}
                <ArrowUpRightIcon size={22} aria-hidden className="ct-email-arrow" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="m-sec m-sunken" aria-labelledby="ct-else-title">
        <div className="m-wrap">
          <h2 id="ct-else-title" className="m-caps ct-else-title" data-reveal>
            {C.elsewhere.kicker}
          </h2>
          <ul className="ct-else" data-reveal>
            {C.elsewhere.items.map((e) => (
              <li key={e.href}>
                <a href={e.href} className="ct-else-link">
                  <span className="m-geo m-heading">
                    {e.label}
                    <ArrowUpRightIcon size={18} aria-hidden />
                  </span>
                  <span className="ct-body">{e.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
