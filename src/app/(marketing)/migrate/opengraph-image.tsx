import { MIGRATE_PAGE } from "@/config/migrate";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Qeet ID — Migrate";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogCard({
    eyebrow: "Migrate",
    title: MIGRATE_PAGE.title.join(" "),
    description: MIGRATE_PAGE.meta.description,
  });
}
