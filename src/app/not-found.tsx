import { ArrowRightIcon } from "@qeetrix/icons";
import type { Metadata } from "next";
import Link from "next/link";
import "./not-found.css";
import { Reveal } from "@/components/site/reveal";
import { SearchButton } from "@/components/site/search-button";
import { SiteShell } from "@/components/site/site-shell";
import { vars } from "@/components/site/vars";
import { NOT_FOUND as N } from "@/config/not-found";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

/**
 * Any address with no page: the site around it (the shell, so there is a
 * header, a main landmark and search), a plain sentence, search, and the
 * pages most people want.
 */
export default function NotFound() {
  return (
    <SiteShell>
      <div className="mk" id="nf" data-qx-density="comfortable">
        <Reveal scope="#nf" />
        <section className="m-wrap nf" aria-labelledby="nf-title">
          <p className="nf-kicker m-in">
            <span className="m-rule" aria-hidden="true" />
            <span className="m-caps">{N.kicker}</span>
          </p>
          <h1 id="nf-title" className="m-geo m-display-xl nf-title">
            {N.title.map((line, i) => (
              <span key={line} className="m-line" style={vars({ "--i": i })}>
                <span className={i > 0 ? "ih-tone" : undefined}>{line}</span>
                {i < N.title.length - 1 && " "}
              </span>
            ))}
          </h1>
          <div className="nf-act m-in" style={vars({ "--d": "380ms" })}>
            <p className="m-lede">{N.lede}</p>
            <SearchButton>{N.search}</SearchButton>
          </div>
          <ul className="nf-places m-in" style={vars({ "--d": "520ms" })}>
            {N.places.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="nf-place">
                  <span className="m-geo m-heading">{p.label}</span>
                  <span className="nf-note">{p.note}</span>
                  <ArrowRightIcon size={18} aria-hidden className="nf-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SiteShell>
  );
}
