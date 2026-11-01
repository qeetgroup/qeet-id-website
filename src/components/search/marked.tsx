import type { ReactNode } from "react";

/** The query's first match in `text`, marked — so a reader sees why a result came up. */
export function Marked({ text, q }: { text: string; q: string }): ReactNode {
  const at = q ? text.toLowerCase().indexOf(q) : -1;
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark>{text.slice(at, at + q.length)}</mark>
      {text.slice(at + q.length)}
    </>
  );
}
