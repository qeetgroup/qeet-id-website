"use client";

import { SearchIcon } from "@qeetrix/icons";
import { Dialog, DialogBody, DialogContent, DialogFooter } from "@qeetrix/react/dialog";
import { Input } from "@qeetrix/react/input";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SEARCH_COPY as C } from "@/config/search";
import { rankEntries, SEARCH_TYPE_LABEL } from "@/lib/search";
import { useSearchIndex } from "@/lib/search/use-search-index";
import { Marked } from "./marked";

/**
 * The event the header's search button (and anything else) dispatches to open
 * the popup without importing it: window.dispatchEvent(new Event(SEARCH_OPEN_EVENT)).
 */
export const SEARCH_OPEN_EVENT = "qeetid:search:open";

const SHOWN = 8;

/**
 * ⌘K / Ctrl+K search, from any page — qeet.in's popup: a Qeetrix Dialog (focus
 * held, Escape and the backdrop close it, scroll locked, focus returned), a
 * field that is a combobox over a listbox of results (arrow keys move, Enter
 * opens), the query's match marked in each result. The index is fetched the
 * first time the popup opens, never before.
 */
export function SearchPopup() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const index = useSearchIndex(open);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  const show = useCallback(() => {
    returnTo.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);
  const onOpenChange = useCallback((next: boolean) => {
    setOpen(next);
    if (!next) {
      setQuery("");
      setActive(0);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) onOpenChange(false);
        else show();
      }
    };
    addEventListener("keydown", onKey);
    addEventListener(SEARCH_OPEN_EVENT, show);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener(SEARCH_OPEN_EVENT, show);
    };
  }, [open, show, onOpenChange]);

  const q = query.trim().toLowerCase();
  const matched = useMemo(() => (index ? rankEntries(index, q) : []), [index, q]);
  const results = matched.slice(0, SHOWN);

  // A new result set starts at its first row (adjusted during render, not in an effect).
  const [seen, setSeen] = useState(q);
  if (seen !== q) {
    setSeen(q);
    setActive(0);
  }

  useEffect(() => {
    document.getElementById(`sp-row-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (url: string) => {
    onOpenChange(false);
    router.push(url);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active].url);
    }
  };

  const searching = q.length >= 2;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title={C.title}
        size="lg"
        className="sp"
        initialFocus={inputRef}
        finalFocus={returnTo}
      >
        <div className="sp-field">
          <Input
            ref={inputRef}
            type="search"
            icon={SearchIcon}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={C.placeholder}
            autoComplete="off"
            spellCheck={false}
            aria-label={C.title}
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="sp-results"
            aria-autocomplete="list"
            aria-activedescendant={results[active] ? `sp-row-${active}` : undefined}
          />
        </div>
        <DialogBody className="sp-body">
          <p className="sr-only" aria-live="polite">
            {searching && index
              ? matched.length
                ? C.results.replace("{n}", String(matched.length))
                : C.none.replace("{q}", query.trim())
              : ""}
          </p>
          {!searching && (
            <div className="sp-start">
              <p className="m-caps">{C.try}</p>
              <ul className="sp-suggest">
                {C.suggestions.map((s) => (
                  <li key={s}>
                    <button type="button" onClick={() => setQuery(s)}>
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {searching && index !== null && matched.length === 0 && (
            <p className="sp-none">{C.none.replace("{q}", query.trim())}</p>
          )}
          {results.length > 0 && (
            <div id="sp-results" role="listbox" aria-label={C.title} className="sp-results">
              {results.map((r, i) => (
                // biome-ignore lint/a11y/useKeyWithClickEvents: the combobox field owns the keyboard (arrows + Enter, aria-activedescendant); a click is the pointer's way in.
                <div
                  key={`${r.url}-${r.title}`}
                  id={`sp-row-${i}`}
                  role="option"
                  tabIndex={-1}
                  aria-selected={i === active}
                  className="sp-row"
                  onMouseMove={() => setActive(i)}
                  onClick={() => go(r.url)}
                >
                  <span className="sp-row-kind">
                    {SEARCH_TYPE_LABEL[r.type]}
                    {r.parent && <span className="sp-row-parent">· {r.parent}</span>}
                  </span>
                  <span className="m-geo sp-row-title">
                    <Marked text={r.title} q={q} />
                  </span>
                  <span className="sp-row-desc">
                    <Marked text={r.description} q={q} />
                  </span>
                </div>
              ))}
            </div>
          )}
        </DialogBody>
        <DialogFooter className="sp-foot">
          <span className="sp-hints" aria-hidden="true">
            <span>
              <kbd>↑</kbd>
              <kbd>↓</kbd> {C.hints.move}
            </span>
            <span>
              <kbd>↵</kbd> {C.hints.open}
            </span>
            <span>
              <kbd>Esc</kbd> {C.hints.close}
            </span>
          </span>
          {searching && matched.length > SHOWN && (
            <span className="sp-count">{C.results.replace("{n}", String(matched.length))}</span>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
