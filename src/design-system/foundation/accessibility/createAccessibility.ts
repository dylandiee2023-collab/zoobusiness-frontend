import type { CSSProperties } from "react";

import type { Theme } from "@/theme/types";

import { createAria } from "./createAria";
import { createFocusRing } from "./createFocusRing";

import type { AriaOptions } from "./types";

export interface AccessibilityResult {
  aria: Record<string, unknown>;
  focusRing: CSSProperties;
}

export interface AccessibilityOptions extends AriaOptions {
  focusOffset?: number;
}

export function createAccessibility(
  theme: Theme,
  options: AccessibilityOptions = {},
): AccessibilityResult {
  return {
    aria: createAria(options),

    focusRing:
      options.focusOffset === undefined
        ? createFocusRing(theme)
        : createFocusRing(theme, {
            offset: options.focusOffset,
          }),
  };
}
