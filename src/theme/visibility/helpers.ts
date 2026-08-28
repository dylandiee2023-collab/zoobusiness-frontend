import type { CSSProperties } from "react";

import type { Breakpoint } from "@/theme/media";

import { breakpointOrder } from "@/theme/media";

import type { VisibilityOptions } from "./types";

function isVisible(
  breakpoint: Breakpoint,
  options: VisibilityOptions,
): boolean {
  const current = breakpointOrder.indexOf(breakpoint);

  if (options.showFrom) {
    const minimum = breakpointOrder.indexOf(options.showFrom);

    if (current < minimum) {
      return false;
    }
  }

  if (options.hideFrom) {
    const maximum = breakpointOrder.indexOf(options.hideFrom);

    if (current >= maximum) {
      return false;
    }
  }

  return true;
}

export function getVisibilityStyle(
  breakpoint: Breakpoint,
  options: VisibilityOptions,
): CSSProperties {
  return {
    display: isVisible(breakpoint, options) ? undefined : "none",
  };
}
