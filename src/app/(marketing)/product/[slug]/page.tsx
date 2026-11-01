import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "./capability.css";
import {
  CapabilityHero,
  CapabilitySection,
  Close,
  Related,
} from "@/components/capability/sections";
import { Reveal } from "@/components/site/reveal";
import { CAPABILITY_PAGES, type CapabilitySlug } from "@/config/capabilities";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(CAPABILITY_PAGES).map((slug) => ({ slug }));
}

function pageFor(slug: string) {
  return slug in CAPABILITY_PAGES ? CAPABILITY_PAGES[slug as CapabilitySlug] : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const page = pageFor((await params).slug);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: `/product/${page.slug}` },
  };
}

/**
 * A capability page — one template for the six (config/capabilities.ts): a
 * dark hero with the capability's path drawn across it, its chapters in order
 * (each a tabs, split, ruler, points, table or plans block), the other
 * capabilities, and a close.
 */
export default async function CapabilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const page = pageFor((await params).slug);
  if (!page) notFound();
  return (
    <div className="mk" id="capability" data-qx-density="comfortable">
      <Reveal scope="#capability" />
      <CapabilityHero page={page} />
      {page.sections.map((section, i) => (
        <CapabilitySection key={section.kicker} section={section} n={i + 1} />
      ))}
      <Related current={page.slug} />
      <Close page={page} />
    </div>
  );
}
