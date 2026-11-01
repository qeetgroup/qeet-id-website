"use client";

import { SearchIcon } from "@qeetrix/icons";
import { SEARCH_OPEN_EVENT } from "@/components/search/search-popup";

/** A button, styled as a Qeetrix button, that opens the site search. */
export function SearchButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="qx-button"
      data-slot="button"
      data-variant="solid"
      data-tone="brand"
      data-size="lg"
      data-icon=""
      onClick={() => dispatchEvent(new Event(SEARCH_OPEN_EVENT))}
    >
      <span className="qx-button-label" data-slot="button-label">
        {children}
      </span>
      <span className="qx-button-zone" data-slot="button-zone">
        <SearchIcon size={20} shape="sharp" className="qx-button-icon" aria-hidden />
      </span>
    </button>
  );
}
