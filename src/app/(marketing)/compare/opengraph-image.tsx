import { COMPARE_INDEX } from "@/config/compare";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Qeet ID — Compare";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogCard({
    eyebrow: "Compare",
    title: COMPARE_INDEX.title.join(" "),
    description: COMPARE_INDEX.meta.description,
  });
}
