import { SECURITY_PAGE } from "@/config/security";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Qeet ID — Security";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogCard({
    eyebrow: "Security",
    title: SECURITY_PAGE.title.join(" "),
    description: SECURITY_PAGE.meta.description,
  });
}
