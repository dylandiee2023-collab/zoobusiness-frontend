import type { CSSProperties } from "react";

import type { Theme } from "@/theme/types";

import type { FocusRingOptions } from "./types";

export function createFocusRing(
  theme: Theme,
  options: FocusRingOptions = {},
): CSSProperties {
  return {
    outlineStyle: "solid",
    outlineWidth: theme.borders.focus,
    outlineColor: theme.colors.primary,
    outlineOffset: options.offset ?? 2,
  };
}