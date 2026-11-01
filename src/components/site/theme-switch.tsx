"use client";

import { MoonIcon, SunIcon } from "@qeetrix/icons";
import { setTheme, useTheme } from "@/lib/use-theme";

/**
 * qeet.in's theme toggle: one icon button, light ↔ dark. The theme is one
 * attribute, `data-qx-color-scheme` on <html> (lib/use-theme). Before
 * hydration it renders a same-sized placeholder, so the bar does not shift.
 */
export function ThemeSwitch({ className = "mh-icon" }: { className?: string }) {
  const theme = useTheme();
  if (!theme) return <span aria-hidden="true" className={className} />;
  const dark = theme === "dark";
  return (
    <button
      type="button"
      className={className}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? <SunIcon size={18} aria-hidden /> : <MoonIcon size={18} aria-hidden />}
    </button>
  );
}
