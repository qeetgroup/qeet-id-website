import { PRODUCT_INDEX } from "@/config/product-index";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Qeet ID — Product";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogCard({
    eyebrow: "Product",
    title: PRODUCT_INDEX.title.join(" "),
    description: PRODUCT_INDEX.meta.description,
  });
}
