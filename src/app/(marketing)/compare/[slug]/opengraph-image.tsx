import { COMPETITORS } from "@/config/compare";
import { longDate } from "@/lib/dates";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Qeet ID — Compare";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return COMPETITORS.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = COMPETITORS.find((x) => x.slug === slug);
  return ogCard({
    eyebrow: "Compare",
    title: c ? `${c.name} and Qeet ID. Where each one leads.` : "Compare Qeet ID",
    description: c
      ? `Fifteen areas, from ${c.name}'s own documentation, read on ${longDate(c.checked)}.`
      : "",
  });
}
