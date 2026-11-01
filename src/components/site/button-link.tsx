import type { IconProps } from "@qeetrix/icons";
import NextLink from "next/link";
import type { ComponentType, ReactNode } from "react";

type Glyph = ComponentType<IconProps<"outline">>;

/**
 * A link styled as a Qeetrix button — qeet.in's ButtonLink. Qeetrix's Button
 * keeps role="button" on an anchor (QTRX-8), so a link that looks like a button
 * is an <a> carrying the button's classes and data attributes. External links
 * open in the same tab, as the rest of the site's links do.
 */
export function ButtonLink({
  href,
  children,
  variant = "solid",
  tone = "brand",
  size = "md",
  icon: Icon,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "soft" | "ghost";
  tone?: "brand" | "neutral";
  size?: "sm" | "md" | "lg";
  icon?: Glyph;
  className?: string;
}) {
  const props = {
    className: className ? `qx-button ${className}` : "qx-button",
    "data-slot": "button",
    "data-variant": variant,
    "data-tone": tone,
    "data-size": size,
    "data-icon": Icon ? "" : undefined,
  };
  const inner = (
    <>
      <span className="qx-button-label" data-slot="button-label">
        {children}
      </span>
      {Icon && (
        <span className="qx-button-zone" data-slot="button-zone">
          <Icon
            size={size === "lg" ? 20 : 16}
            shape="sharp"
            className="qx-button-icon"
            aria-hidden
          />
        </span>
      )}
    </>
  );
  return /^https?:/.test(href) ? (
    <a href={href} {...props}>
      {inner}
    </a>
  ) : (
    <NextLink href={href} {...props}>
      {inner}
    </NextLink>
  );
}
