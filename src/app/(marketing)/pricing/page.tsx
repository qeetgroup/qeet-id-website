import { ArrowRightIcon, InfoIcon } from "@qeetrix/icons";
import { Accordion, AccordionItem } from "@qeetrix/react/accordion";
import { Badge } from "@qeetrix/react/badge";
import type { Metadata } from "next";
import "./pricing.css";
import { Chapter } from "@/components/home/chapter";
import { Calculator } from "@/components/pricing/calculator";
import { Comparison } from "@/components/pricing/comparison";
import { PlanBoard } from "@/components/pricing/plan-board";
import { BreadcrumbJsonLd, FaqJsonLd, PricingOffersJsonLd } from "@/components/seo/structured-data";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/site/reveal";
import { vars } from "@/components/site/vars";
import { STATUS } from "@/config/home";
import { PRICING_PAGE as C } from "@/config/pricing-page";
import { DOCS_BASE_URL } from "@/lib/links";
import { pricingFaqs } from "@/lib/pricing";

export const metadata: Metadata = {
  title: C.meta.title,
  description: C.meta.description,
  alternates: { canonical: "/pricing" },
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

/**
 * /pricing — its own page category: a light cover whose centre is the plan
 * board (monthly or yearly), then the calculator, the whole comparison, the
 * questions, and Enterprise as a conversation. Every price, row and answer is
 * lib/pricing, held to the billing catalogue on qeet-id-server develop.
 */
export default function PricingPage() {
  return (
    <div className="mk" id="pricing" data-qx-density="comfortable">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Pricing", url: "/pricing" },
        ]}
      />
      <PricingOffersJsonLd />
      <FaqJsonLd items={pricingFaqs} />
      <Reveal scope="#pricing" />

      <section className="m-wrap pr-cover" aria-labelledby="pricing-title">
        <p className="pr-kicker m-in">
          <span className="m-rule" aria-hidden="true" />
          <span className="m-caps">{C.kicker}</span>
          <Badge tone="info" size="sm">
            {STATUS.label}
          </Badge>
        </p>
        <div className="pr-cover-head">
          <h1 id="pricing-title" className="m-geo m-display-xl pr-title">
            {C.title.map((line, i) => (
              <span key={line} className="m-line" style={vars({ "--i": i })}>
                <span className={i > 0 ? "ih-tone" : undefined}>{line}</span>
                {i < C.title.length - 1 && " "}
              </span>
            ))}
          </h1>
          <div className="pr-cover-side m-in" style={vars({ "--d": "380ms" })}>
            <p className="m-lede">{C.lede}</p>
            <p className="pr-status">
              <InfoIcon size={18} aria-hidden />
              {C.status}
            </p>
          </div>
        </div>
        <div className="m-in" style={vars({ "--d": "520ms" })}>
          <PlanBoard copy={{ period: C.period, cta: C.cta }} docsHref={DOCS_BASE_URL} />
        </div>
        <ul className="pr-notes">
          {C.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </section>

      <section className="m-sec m-sunken" aria-labelledby="pr-calc-title">
        <div className="m-wrap pr-calc-wrap">
          <div className="space-y-5" data-reveal>
            <Chapter n="01" label={C.calculator.kicker} />
            <Title lines={C.calculator.title} id="pr-calc-title" />
          </div>
          <div data-reveal>
            <Calculator copy={C.calculator} />
          </div>
        </div>
      </section>

      <section className="m-sec" aria-labelledby="pr-compare-title">
        <div className="m-wrap">
          <div className="m-sec-head" data-reveal>
            <div className="space-y-5">
              <Chapter n="02" label={C.compare.kicker} />
              <Title lines={C.compare.title} id="pr-compare-title" />
            </div>
            <p className="m-lede m-sec-note">{C.compare.lede}</p>
          </div>
          <Comparison copy={C.compare} />
        </div>
      </section>

      <section className="m-sec m-sunken" aria-labelledby="pr-faq-title">
        <div className="m-wrap pr-faq">
          <div className="space-y-5" data-reveal>
            <Chapter n="03" label={C.faq.kicker} />
            <Title lines={C.faq.title} id="pr-faq-title" />
          </div>
          <div data-reveal>
            <Accordion>
              {pricingFaqs.map((f) => (
                <AccordionItem key={f.q} value={f.q} title={f.q} headingLevel={3}>
                  <p className="m-body pr-muted">{f.a}</p>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="m-sec m-band" data-qx-color-scheme="dark" aria-labelledby="pr-ent-title">
        <div className="m-wrap pr-ent" data-reveal>
          <div className="space-y-6">
            <span className="m-rule" aria-hidden="true" />
            <Title lines={C.enterprise.title} id="pr-ent-title" dark />
          </div>
          <div className="space-y-8">
            <p className="m-lede m-note-dark">{C.enterprise.body}</p>
            <ButtonLink size="lg" href="/contact" icon={ArrowRightIcon}>
              {C.cta.paid.label}
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
