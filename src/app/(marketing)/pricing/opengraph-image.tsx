import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Qeet ID — Pricing";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogCard({
    eyebrow: "Pricing",
    title: "Identity infrastructure that scales with you.",
    description:
      "Free for developers. Predictable plans as you grow. Enterprise SSO included — no SSO tax.",
  });
}
