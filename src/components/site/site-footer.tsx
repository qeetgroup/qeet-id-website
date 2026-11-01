import { ArrowRightIcon, ArrowUpIcon, ArrowUpRightIcon } from "@qeetrix/icons";
import NextLink from "next/link";
import { STATUS } from "@/config/home";
import { BrandMark } from "./brand-mark";
import { ButtonLink } from "./button-link";
import { Reveal } from "./reveal";
import { DOCS, FOOTER_COLUMNS } from "./site-nav";
import { ThemeSwitch } from "./theme-switch";

/**
 * The Qeet ID footer — qeet.in's (`.ft`), always dark: the product and its
 * line, the product's state where qeet.in has its newsletter, the link columns
 * (with the Qeet Group column tying the product to the group site), the legal
 * row, and "Qeet Group" set at the width of the page as the signature — the
 * same sign-off as qeet.in, so the product is recognisably the group's.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="site-footer" className="ft" data-qx-color-scheme="dark">
      <Reveal scope="#site-footer" />
      <div className="m-wrap">
        <div className="ft-top">
          <div className="space-y-6">
            <p className="ft-brand">
              <BrandMark height={36} />
              <span className="m-geo" style={{ fontSize: "1.875rem" }}>
                Qeet ID
              </span>
            </p>
            {/* The organisation profile's line for Qeet ID (qeet.in SPOTLIGHT). */}
            <p className="m-lede max-w-[30rem]">
              The auth platform engineers wish they&rsquo;d had.
            </p>
            <ButtonLink variant="ghost" icon={ArrowRightIcon} href="/contact">
              Talk to us
            </ButtonLink>
          </div>
          <div className="space-y-5 lg:self-end">
            <div className="space-y-2">
              <p className="m-caps">Status</p>
              <h2 className="m-geo m-heading">{STATUS.label}</h2>
              <p className="m-body">{STATUS.line}</p>
            </div>
            <ButtonLink href={DOCS.href} icon={ArrowUpRightIcon}>
              {DOCS.label}
            </ButtonLink>
          </div>
        </div>

        <nav className="ft-cols" aria-label="Footer">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h2 className="m-caps">{col.heading}</h2>
              <ul>
                {col.items.map((item) => {
                  const external = item.href.startsWith("http");
                  return (
                    <li key={item.label}>
                      {external ? (
                        <a href={item.href} className="ft-link">
                          {item.label}
                          <ArrowUpRightIcon size={14} aria-hidden />
                        </a>
                      ) : (
                        <NextLink href={item.href} className="ft-link">
                          {item.label}
                        </NextLink>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="ft-legal">
          <p className="ft-copy">© {year} Qeet Group</p>
          <p className="ft-based">A Qeet Group business · Based in India</p>
          <span className="ft-legal-tools">
            <ThemeSwitch />
            <a href="#main" className="inline-flex items-center gap-1.5">
              Back to top <ArrowUpIcon size={14} aria-hidden />
            </a>
          </span>
        </div>
      </div>
      <div className="m-wrap" aria-hidden="true">
        {/* The group's name, as qeet.in signs off: every Qeet product site ends on
            the organisation (decided 2026-10-29). */}
        <p className="m-geo ft-mark" data-text="Qeet Group" data-reveal data-reveal-edge="" />
      </div>
    </footer>
  );
}
