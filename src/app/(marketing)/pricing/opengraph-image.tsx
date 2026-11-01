import { PRICING_PAGE } from "@/config/pricing-page";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Qeet ID — Pricing";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogCard({
    eyebrow: "Pricing",
    title: PRICING_PAGE.title.join(" "),
    description: PRICING_PAGE.meta.description,
  });
}
