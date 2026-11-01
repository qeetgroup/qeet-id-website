import { QeetLogo } from "@qeetrix/icons";

/**
 * The Qeet mark, from @qeetrix/icons, as on qeet.in: the artwork has fixed
 * fills, so both variants are rendered and CSS shows the one drawn for the
 * surrounding scheme (`data-qx-color-scheme`). Decorative — the link or heading
 * around it carries the name.
 */
export function BrandMark({ height }: { height: number }) {
  return (
    <>
      <span className="on-light-only">
        <QeetLogo height={height} />
      </span>
      <span className="on-dark-only">
        <QeetLogo variant="dark" height={height} />
      </span>
    </>
  );
}
