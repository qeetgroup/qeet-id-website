import { CAPABILITY_PAGES, type CapabilitySlug } from "@/config/capabilities";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Qeet ID — a capability";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return Object.keys(CAPABILITY_PAGES).map((slug) => ({ slug }));
}

/** Each capability's sharing card: its name, its headline and its description. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const page = CAPABILITY_PAGES[(await params).slug as CapabilitySlug];
  return ogCard({
    eyebrow: page.name,
    title: page.title.join(" "),
    description: page.meta.description,
  });
}
