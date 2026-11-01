"use client";

import { useEffect } from "react";

/**
 * qeet.in's scroll reveal. Content is visible in the HTML; this only marks
 * blocks below the fold `pending`, then `shown` as they arrive (CSS in
 * styles/marketing.css). Above-the-fold blocks are left alone, and nothing is
 * touched under reduced motion — no hydration-time read of the preference, so
 * no mismatch (the old site's React #418).
 */
export function Reveal({ scope }: { scope: string }) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.querySelector(scope);
    if (!root) return;
    const show = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        (e.target as HTMLElement).dataset.reveal = "shown";
        observer.unobserve(e.target);
      }
    };
    const inset = new IntersectionObserver(show, { rootMargin: "0px 0px -8% 0px" });
    const edge = new IntersectionObserver(show);
    for (const el of root.querySelectorAll<HTMLElement>("[data-reveal]")) {
      if (el.getBoundingClientRect().top <= innerHeight) continue;
      el.dataset.reveal = "pending";
      ("revealEdge" in el.dataset ? edge : inset).observe(el);
    }
    return () => {
      inset.disconnect();
      edge.disconnect();
    };
  }, [scope]);
  return null;
}
