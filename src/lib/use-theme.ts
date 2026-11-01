"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

export type Theme = "light" | "dark";

/**
 * The active theme, read from `data-qx-color-scheme` on <html> — Qeetrix's
 * own switch, set before first paint by the script in app/layout.tsx. As on
 * qeet.in (lib/use-theme.ts): the theme lives on a DOM node, so it is external
 * state, subscribed to rather than mirrored. The server snapshot is null, so
 * callers can render a neutral placeholder until hydration.
 */
function getThemeSnapshot(): Theme | null {
  if (typeof document === "undefined") return null;
  return document.documentElement.getAttribute("data-qx-color-scheme") === "dark"
    ? "dark"
    : "light";
}

function subscribe(callback: () => void) {
  if (typeof document === "undefined") return () => {};
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-qx-color-scheme"],
  });
  return () => observer.disconnect();
}

export function useTheme(): Theme | null {
  return useSyncExternalStore<Theme | null>(subscribe, getThemeSnapshot, () => null);
}

/** Switch the theme now, and remember the choice. */
export function setTheme(next: Theme) {
  document.documentElement.setAttribute("data-qx-color-scheme", next);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage can be unavailable (private mode, quota); the switch still works.
  }
}
