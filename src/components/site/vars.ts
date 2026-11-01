import type { CSSProperties } from "react";

/** Custom properties as a style object (motion delays, indices). */
export function vars(values: Record<`--${string}`, string | number>): CSSProperties {
  return values as CSSProperties;
}
