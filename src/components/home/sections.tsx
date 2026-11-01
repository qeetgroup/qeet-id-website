import { ArrowRightIcon, ArrowUpRightIcon, CircleCheckIcon } from "@qeetrix/icons";
import { Accordion, AccordionItem } from "@qeetrix/react/accordion";
import Image from "next/image";
import NextLink from "next/link";
import { FaqJsonLd } from "@/components/seo/structured-data";
import { ButtonLink } from "@/components/site/button-link";
import { PlanLadder } from "@/components/site/plan-ladder";
import { vars } from "@/components/site/vars";
import { AUDIT, CLOSING, ENTERPRISE, FAQ, PRICING, SECURITY, WAYS_IN } from "@/config/home";
import { MEDIA } from "@/config/media";
import { DOCS_BASE_URL } from "@/lib/links";
import { Chapter } from "./chapter";

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
      {/* One authored line per line, as qeet.in sets its display headings. */}
      {lines.map((l, i) => (
        <span key={l} className={i > 0 ? "block ih-tone" : "block"}>
          {l}
          {i < lines.length - 1 && " "}
        </span>
      ))}
    </h2>
  );
}

/**
 * 01 — Enterprise: the eight things an enterprise customer's security review
 * asks about, as a capability board — a ruled grid (Qeetrix §12) whose cells
 * take the Ember bar on hover (§11), each with its icon in a tile and each a
 * link to the capability page that covers it.
 */
export function Enterprise() {
  return (
    <section className="m-sec" aria-labelledby="enterprise-title">
      <div className="m-wrap">
        <div className="m-sec-head" data-reveal>
          <div className="space-y-5">
            <Chapter n="01" label={ENTERPRISE.kicker} />
            <Title lines={ENTERPRISE.title} id="enterprise-title" />
          </div>
          <p className="m-lede m-sec-note">{ENTERPRISE.lede}</p>
        </div>
        <ul className="ih-board">
          {ENTERPRISE.items.map(({ icon: Icon, title, body, href }, i) => (
            <li key={title} className="ih-board-cell" data-reveal style={vars({ "--i": i % 4 })}>
              <NextLink href={href} className="ih-board-link">
                <span className="ih-icon">
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="m-geo m-heading">{title}</h3>
                <p className="m-card-sub">{body}</p>
              </NextLink>
            </li>
          ))}
        </ul>
        <div className="mt-10" data-reveal>
          <ButtonLink variant="ghost" href={ENTERPRISE.cta.href} icon={ArrowRightIcon}>
            {ENTERPRISE.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/**
 * 02 — The record: how the audit log works, drawn as a ledger whose entries
 * each carry the hash of the one before (the rail draws in once, left to
 * right, when the section arrives), then three facts 01 does not state.
 */
export function AuditLog() {
  return (
    <section className="m-sec m-band" data-qx-color-scheme="dark" aria-labelledby="audit-title">
      <div className="m-wrap">
        <div className="m-sec-head" data-reveal>
          <div className="space-y-5">
            <Chapter n="02" label={AUDIT.kicker} dark />
            <Title lines={AUDIT.title} id="audit-title" dark />
          </div>
          <p className="m-lede m-sec-note m-note-dark">{AUDIT.lede}</p>
        </div>
        {/* An illustration of the chain (example events); the lede says what it shows. */}
        <ol className="ih-ledger" aria-hidden="true" data-reveal>
          {AUDIT.ledger.map((e, i) => (
            <li key={e.seq} className="ih-entry" style={vars({ "--i": i })}>
              <span className="ih-entry-node" />
              <span className="ih-entry-seq">No. {e.seq}</span>
              <span className="m-geo ih-entry-event">{e.event}</span>
              <span className="ih-entry-actor">{e.actor}</span>
              <span className="ih-entry-hash">
                <span>prev</span> {i === 0 ? AUDIT.genesis : AUDIT.ledger[i - 1].hash}
              </span>
              <span className="ih-entry-hash">
                <span>hash</span> <b>{e.hash}</b>
              </span>
            </li>
          ))}
          <li className="ih-entry ih-entry-verify" style={vars({ "--i": AUDIT.ledger.length })}>
            <span className="ih-entry-node">
              <CircleCheckIcon size={18} />
            </span>
            <span className="ih-entry-seq">GET /verify</span>
            <span className="m-geo ih-entry-event">Chain intact</span>
            <span className="ih-entry-actor">Every link checked, end to end</span>
          </li>
        </ol>
        <div className="ih-facts" data-reveal>
          {AUDIT.facts.map((f) => (
            <div key={f.title} className="ih-fact">
              <h3 className="m-geo m-heading m-title-dark">{f.title}</h3>
              <p className="m-body m-note-dark">{f.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10" data-reveal>
          <ButtonLink variant="soft" href={AUDIT.post.href} icon={ArrowRightIcon}>
            {AUDIT.post.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/**
 * 03 — Every way in: three columns read as an index — how people sign in, how
 * they confirm it, and the identities software gets. The software column is set
 * dark: it is the part most identity products do not have.
 */
export function WaysIn() {
  return (
    <section className="m-sec" aria-labelledby="ways-title">
      <div className="m-wrap">
        <div className="m-sec-head" data-reveal>
          <div className="space-y-5">
            <Chapter n="03" label={WAYS_IN.kicker} />
            <Title lines={WAYS_IN.title} id="ways-title" />
          </div>
          <p className="m-lede m-sec-note">{WAYS_IN.lede}</p>
        </div>
        <div className="ih-ways">
          {WAYS_IN.columns.map((c, ci) => (
            <div
              key={c.title}
              className="ih-way"
              data-qx-color-scheme={ci === 2 ? "dark" : undefined}
              data-reveal
              style={vars({ "--i": ci })}
            >
              <h3 className="m-caps ih-way-title">
                <span aria-hidden="true">{String(ci + 1).padStart(2, "0")}</span>
                {c.title}
              </h3>
              <ul>
                {c.items.map(({ icon: Icon, name, note }) => (
                  <li key={name} className="ih-way-item">
                    <Icon size={24} aria-hidden className="ih-way-icon" />
                    <div className="space-y-1">
                      <h4 className="m-geo ih-way-name">{name}</h4>
                      <p className="m-card-sub">{note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 04 — Security, as a datasheet: the heading holds its place on a wide screen
 * while the rows go by — label, value, note — the way a security team reads.
 */
export function Security() {
  return (
    <section className="m-sec m-sunken" aria-labelledby="security-title">
      <div className="m-wrap ih-sheet-wrap">
        <div className="ih-sheet-head space-y-6" data-reveal>
          <Chapter n="04" label={SECURITY.kicker} />
          <Title lines={SECURITY.title} id="security-title" />
          <p className="m-lede">{SECURITY.lede}</p>
          <ButtonLink variant="soft" href={SECURITY.cta.href} icon={ArrowRightIcon}>
            {SECURITY.cta.label}
          </ButtonLink>
        </div>
        <dl className="ih-sheet">
          {SECURITY.rows.map((r) => (
            <div key={r.label} className="ih-sheet-row" data-reveal>
              <dt className="m-caps">{r.label}</dt>
              <dd className="m-geo ih-sheet-value">{r.value}</dd>
              <dd className="m-body ih-sheet-note">{r.note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/**
 * 05 — Pricing: the four plans across the top, and below them what each one
 * adds, as a staircase — a feature starts at the plan that first includes it
 * and runs on to Enterprise. Pro, the highlighted plan, carries the Ember bar.
 */
export function Pricing() {
  return (
    <section className="m-sec" aria-labelledby="pricing-title">
      <div className="m-wrap">
        <div className="m-sec-head" data-reveal>
          <div className="space-y-5">
            <Chapter n="05" label={PRICING.kicker} />
            <Title lines={PRICING.title} id="pricing-title" />
          </div>
          <p className="m-lede m-sec-note">{PRICING.lede}</p>
        </div>
        <PlanLadder rows={PRICING.ladder} cta={PRICING.cta} />
      </div>
    </section>
  );
}

/**
 * 06 — Questions the page has not answered, numbered, with who to write to
 * beside them. The FAQPage data carries the same words as the accordion.
 */
export function Questions() {
  return (
    <section className="m-sec m-sunken" aria-labelledby="faq-title">
      <FaqJsonLd items={[...FAQ.items]} />
      <div className="m-wrap ih-faq">
        <div className="ih-faq-head space-y-8" data-reveal>
          <div className="space-y-5">
            <Chapter n="06" label={FAQ.kicker} />
            <Title lines={FAQ.title} id="faq-title" />
          </div>
          <div className="ih-ask">
            <h3 className="m-geo m-heading">{FAQ.contact.title}</h3>
            <ul>
              {FAQ.contact.lines.map((l) => (
                <li key={l.email}>
                  <span className="m-caps">{l.label}</span>
                  <a href={`mailto:${l.email}`}>{l.email}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ih-qs" data-reveal>
          <Accordion>
            {FAQ.items.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={item.q}
                headingLevel={3}
                title={
                  <span className="ih-q">
                    <span className="ih-q-n" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.q}
                  </span>
                }
              >
                <p className="m-body ih-a">{item.a}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/**
 * The close — qeet.in's photographic closing band: the archway (arches within
 * arches) behind one statement in the organisation's own words for Qeet ID,
 * and the two actions. The status is not repeated; the hero carries it.
 */
export function Closing() {
  const photo = MEDIA.archway;
  return (
    <section className="ih-close" data-qx-color-scheme="dark" aria-labelledby="closing-title">
      <Image
        className="ih-close-img m-mono"
        src={photo.src}
        alt=""
        fill
        sizes="100vw"
        quality={60}
      />
      <div className="m-wrap ih-close-inner">
        <div className="ih-close-copy space-y-10" data-reveal>
          <span className="m-rule" aria-hidden="true" />
          <h2 id="closing-title" className="m-geo m-display-l ih-close-title">
            {CLOSING.title.map((l, i) => (
              <span key={l} className={i > 0 ? "block ih-close-tone" : "block"}>
                {l}
                {i < CLOSING.title.length - 1 && " "}
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
        <p className="ih-caption ih-close-caption" aria-hidden="true">
          {photo.caption}
        </p>
      </div>
    </section>
  );
}
