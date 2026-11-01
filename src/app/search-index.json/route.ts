import { buildSearchIndex } from "@/lib/search/build-index";

/*
 * The search index as a static JSON file — fetched once per document, only
 * when the search popup first opens, and cacheable — rather than put into
 * every page's payload (qeet.in learned that one at 60 KB).
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex(), {
    headers: { "Cache-Control": "public, max-age=0, s-maxage=3600, must-revalidate" },
  });
}
