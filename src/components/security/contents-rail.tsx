"use client";

import { useEffect, useState } from "react";

/**
 * The brief's contents, held beside the text on a wide screen: numbered links
 * to its sections, the one being read marked (aria-current), the way qeet.in's
 * article rail does it. Hidden below 1000px, where the sections simply follow.
 */
export function ContentsRail({ items }: { items: readonly { id: string; title: string }[] }) {
  const [current, setCurrent] = useState(items[0]?.id ?? "");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="sb-rail" aria-label="On this page">
      <p className="m-caps">On this page</p>
      <ol>
        {items.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`} aria-current={current === item.id ? "true" : undefined}>
              <span className="sb-rail-n">{String(i + 1).padStart(2, "0")}</span>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
