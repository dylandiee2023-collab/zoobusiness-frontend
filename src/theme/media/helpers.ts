import { breakpoints } from "@/theme/tokens/breakpoints";

import { createMediaQuery } from "./createMediaQuery";
import { breakpointOrder } from "./constants";
import type { Breakpoint } from "./types";

export function up(
  breakpoint: Breakpoint,
): string {
  return createMediaQuery(
    `(min-width:${breakpoints[breakpoint]}px)`,
  );
}

export function down(
  breakpoint: Breakpoint,
): string {
  return createMediaQuery(
    `(max-width:${breakpoints[breakpoint] - 0.02}px)`,
  );
}

export function between(
  min: Breakpoint,
  max: Breakpoint,
): string {
  return createMediaQuery(
    `(min-width:${breakpoints[min]}px) and (max-width:${breakpoints[max] - 0.02}px)`,
  );
}

export function only(
  breakpoint: Breakpoint,
): string {
  const index =
    breakpointOrder.indexOf(
      breakpoint,
    );

  const nextBreakpoint =
    breakpointOrder[index + 1];

  if (!nextBreakpoint) {
    return up(
      breakpoint,
    );
  }

  return between(
    breakpoint,
    nextBreakpoint,
  );
}