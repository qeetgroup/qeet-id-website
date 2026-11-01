import type { Metadata } from "next";
import "./home.css";
import { Hero } from "@/components/home/hero";
import {
  AuditLog,
  Closing,
  Enterprise,
  Pricing,
  Questions,
  Security,
  WaysIn,
} from "@/components/home/sections";
import { ProductJsonLd } from "@/components/seo/structured-data";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * The Qeet ID home — the product's marketing site in qeet.in's language
 * (Qeetrix tokens and components, Qeet Sans, the marketing layer): the
 * photographic hero, then six chapters — what enterprise customers ask for,
 * the audit log it is built around, every way in, security, pricing and
 * questions — and a photographic close. Copy: config/home.ts.
 */
export default function HomePage() {
  return (
    <div className="mk" id="home" data-qx-density="comfortable">
      {/* WebSite + Organization schema live in the root layout. */}
      <ProductJsonLd />
      <Reveal scope="#home" />
      <Hero />
      <Enterprise />
      <AuditLog />
      <WaysIn />
      <Security />
      <Pricing />
      <Questions />
      <Closing />
    </div>
  );
}
