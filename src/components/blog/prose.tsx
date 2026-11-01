import { InlineText } from "@/components/site/inline-text";
import type { BlogBlock } from "@/lib/blog";

/**
 * A code sample: its caption and language above, the code below. A long line
 * scrolls inside the block, which takes focus so a keyboard can scroll it too.
 */
export function CodeSample({
  text,
  lang,
  caption,
}: {
  text: string;
  lang?: string;
  caption?: string;
}) {
  const label = caption ?? (lang ? `${lang} code` : "Code");
  return (
    <figure className="bp-code">
      {(caption || lang) && (
        <figcaption>
          {caption && <span>{caption}</span>}
          {lang && <span className="bp-code-lang">{lang}</span>}
        </figcaption>
      )}
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: a scrolling region must be reachable by keyboard */}
      <pre tabIndex={0} aria-label={label}>
        <code>{text}</code>
      </pre>
    </figure>
  );
}

/** A post's body, block by block. */
export function Prose({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="bp-prose">
      {blocks.map((b, i) => {
        const key = `${b.kind}-${i}`;
        switch (b.kind) {
          case "h2":
            return (
              <h2 key={key} id={b.id} className="m-geo">
                {b.text}
              </h2>
            );
          case "ul":
            return (
              <ul key={key}>
                {b.items.map((item) => (
                  <li key={item}>
                    <InlineText text={item} />
                  </li>
                ))}
              </ul>
            );
          case "code":
            return <CodeSample key={key} text={b.text} lang={b.lang} caption={b.caption} />;
          default:
            return (
              <p key={key}>
                <InlineText text={b.text} />
              </p>
            );
        }
      })}
    </div>
  );
}
