import { QeetLogo } from "@qeetrix/icons";
import { cn } from "@qeetrix/ui";

type QeetMarkProps = {
  /** Pixel size of the square mark. */
  size?: number;
  className?: string;
};

// Theme-aware Qeet mark: the dark artwork on light surfaces, the light
// artwork on dark surfaces. Each logo is an <img> that cannot see the theme,
// so both render and the `dark:` utilities written here (in app source, so the
// app's Tailwind build emits them) show the one that matches.
export function QeetMark({ size = 28, className }: QeetMarkProps) {
  return (
    <>
      <QeetLogo height={size} aria-label="Qeet" className={cn("block dark:hidden", className)} />
      <QeetLogo
        variant="dark"
        height={size}
        aria-label="Qeet"
        className={cn("hidden dark:block", className)}
      />
    </>
  );
}
