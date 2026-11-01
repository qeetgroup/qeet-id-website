/** Dates as the site writes them. */

/** "15 September 2026", held together (no-break spaces) so it never wraps mid-date. */
export function longDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const month = new Date(Date.UTC(y, m - 1, d)).toLocaleString("en-GB", {
    month: "long",
    timeZone: "UTC",
  });
  return `${d}\u00a0${month}\u00a0${y}`;
}
