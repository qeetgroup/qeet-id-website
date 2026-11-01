import Link from "next/link";
import { parseInline } from "@/lib/inline";

/** mailto: and other sites are plain anchors; the site's own pages go through Next. */
const external = (href: string) => /^(https?:|mailto:)/.test(href);

/** A line of text with its `code`, **strong** and [link](href) runs. */
export function InlineText({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((r, i) => {
        const key = `${i}-${r.text}`;
        if (r.kind === "code") return <code key={key}>{r.text}</code>;
        if (r.kind === "strong") return <strong key={key}>{r.text}</strong>;
        if (r.kind === "link") {
          return external(r.href) ? (
            <a key={key} href={r.href}>
              {r.text}
            </a>
          ) : (
            <Link key={key} href={r.href}>
              {r.text}
            </Link>
          );
        }
        return <span key={key}>{r.text}</span>;
      })}
    </>
  );
}
