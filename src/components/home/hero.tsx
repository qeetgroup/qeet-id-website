import { ArrowUpRightIcon } from "@qeetrix/icons";
import { Badge } from "@qeetrix/react/badge";
import Image from "next/image";
import { ButtonLink } from "@/components/site/button-link";
import { vars } from "@/components/site/vars";
import { HERO, STATUS } from "@/config/home";
import { MEDIA } from "@/config/media";
import { DOCS_BASE_URL } from "@/lib/links";

function Copy() {
  return (
    <div className="ih-hero-copy">
      <p className="m-in flex flex-wrap items-center gap-4">
        <span className="m-rule m-draw" aria-hidden="true" style={vars({ "--d": "300ms" })} />
        <span className="m-caps m-kicker-dark">{HERO.kicker}</span>
        <Badge tone="info" size="sm">
          {STATUS.label}
        </Badge>
      </p>
      <h1 id="hero-title" className="m-geo m-display-xl ih-title">
        {HERO.lines.map((line, i) => (
          <span key={line} className="m-line" style={vars({ "--i": i })}>
            <span>{line}</span>
            {i < HERO.lines.length - 1 && " "}
          </span>
        ))}
      </h1>
      <p className="m-lede m-in ih-lede" style={vars({ "--d": "450ms" })}>
        {HERO.lede}
      </p>
      <div className="m-in flex flex-wrap gap-3" style={vars({ "--d": "560ms" })}>
        <ButtonLink size="lg" href={DOCS_BASE_URL} icon={ArrowUpRightIcon}>
          Read the docs
        </ButtonLink>
        <ButtonLink size="lg" variant="soft" href="/contact">
          Talk to us
        </ButtonLink>
      </div>
      <p className="m-in ih-status" style={vars({ "--d": "640ms" })}>
        {STATUS.line}
      </p>
    </div>
  );
}

/** The open standards it speaks, along the foot (no customer logos to show). */
function Standards() {
  return (
    <div className="m-wrap">
      <div className="ih-std m-in" style={vars({ "--d": "820ms" })}>
        <p className="m-caps m-kicker-dark">Built on open standards</p>
        <ul aria-label="Standards Qeet ID speaks">
          {HERO.standards.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * The hero — qeet.in's photographic hero (approved 2026-10-29). The gateway
 * that stands for Qeet ID on qeet.in runs full-bleed in monochrome, set off to
 * the right on a wide screen so the gate stands clear of the headline; the
 * open standards it speaks run along the foot.
 */
export function Hero() {
  const photo = MEDIA.gateway;
  return (
    <section
      className="ih-hero ih-hero-gate"
      data-qx-color-scheme="dark"
      aria-labelledby="hero-title"
    >
      <div className="ih-photo" aria-hidden="true">
        <Image
          className="ih-photo-img m-mono"
          src={photo.src}
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="m-wrap ih-gate">
        <Copy />
        <p
          className="ih-caption ih-gate-caption m-in"
          aria-hidden="true"
          style={vars({ "--d": "900ms" })}
        >
          {photo.caption}
        </p>
      </div>
      <Standards />
    </section>
  );
}
