import { BLOG_PAGE } from "@/config/blog";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Qeet ID — Blog";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogCard({
    eyebrow: "Engineering",
    title: BLOG_PAGE.title.join(" "),
    description: BLOG_PAGE.meta.description,
  });
}
