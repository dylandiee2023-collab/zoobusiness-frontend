import type { CSSProperties } from "react";

import type { Breakpoint } from "@/theme/media";

import { typography } from "./primitives";

export function getTypography(breakpoint: Breakpoint) {
  return typography[breakpoint];
}

export function getTypographyStyle(breakpoint: Breakpoint): CSSProperties {
  const value = getTypography(breakpoint);

  return {
    fontSize: `${value.fontSize}px`,
    lineHeight: `${value.lineHeight}px`,
  };
}
