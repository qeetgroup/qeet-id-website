/**
 * Client-safe search primitives — types, labels and scoring (qeet.in's, so the
 * two sites search alike). No filesystem or config imports, so the browser
 * loads nothing else; the server-only index builder is lib/search/build-index.ts.
 */

export type SearchEntry = {
  type: "page" | "capability" | "section" | "post" | "legal";
  title: string;
  description: string;
  url: string;
  /** Lowercase, pre-joined haystack for case-insensitive substring matching. */
  haystack: string;
  /** For a section: the page it is on, shown beside its kind. */
  parent?: string;
};

/** Visible label for each kind of result. */
export const SEARCH_TYPE_LABEL: Record<SearchEntry["type"], string> = {
  page: "Page",
  capability: "Product",
  section: "Section",
  post: "Blog",
  legal: "Legal",
};

/** "Qeet-ID" and "qeet id" both → "qeetid": spacing and hyphens never decide a match. */
const compact = (s: string) => s.replace(/[\s\-_.]+/g, "");

/** The query's words (2+ letters), compacted. */
const wordsOf = (q: string) =>
  q
    .split(/\s+/)
    .filter((w) => w.length >= 2)
    .map(compact)
    .filter(Boolean);

/**
 * Score an entry against a lowercased query. Higher is better.
 * - title.startsWith(q)  → 100  (best — likely the intent)
 * - title.includes(q)    →  60
 * - description match    →  30
 * - body match           →  10
 * - otherwise, word by word, spacing and hyphens ignored: the entry must
 *   contain every one of `words`; 8 per word in the title, 4 elsewhere, capped
 *   at 9 so a word-by-word match never outranks a whole-phrase one.
 * - no match             →   0
 */
export function scoreEntry(
  entry: SearchEntry,
  q: string,
  words: readonly string[] = wordsOf(q),
): number {
  if (!q) return 0;
  const title = entry.title.toLowerCase();
  if (title.startsWith(q)) return 100;
  if (title.includes(q)) return 60;
  if (entry.description.toLowerCase().includes(q)) return 30;
  if (entry.haystack.includes(q)) return 10;
  if (words.length === 0) return 0;
  const ctitle = compact(title);
  const chay = compact(entry.haystack);
  let score = 0;
  for (const w of words) {
    if (ctitle.includes(w)) score += 8;
    else if (chay.includes(w)) score += 4;
    else return 0;
  }
  return Math.min(score, 9);
}

/**
 * Every entry scored, best first. A query word that occurs nowhere on the site
 * (a typo) is set aside rather than ruling everything out; the other words are
 * all required.
 */
export function rankEntries(
  index: readonly SearchEntry[],
  query: string,
): Array<SearchEntry & { score: number }> {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const known = wordsOf(q).filter((w) =>
    index.some(
      (e) => compact(e.haystack).includes(w) || compact(e.title.toLowerCase()).includes(w),
    ),
  );
  return index
    .map((e) => ({ ...e, score: scoreEntry(e, q, known) }))
    .filter((e) => e.score > 0)
    .sort((a, b) => b.score - a.score);
}
