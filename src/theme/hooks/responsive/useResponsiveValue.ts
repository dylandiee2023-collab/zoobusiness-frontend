import type {
  Breakpoint,
} from "@/theme/media";

import {
  useBreakpoint,
} from "./useBreakpoint";

export interface ResponsiveValues<T> {
  mobile: T;
  mobileLg?: T;
  tablet?: T;
  laptop?: T;
  desktop?: T;
  wide?: T;
}

const breakpointOrder = [
  "mobile",
  "mobileLg",
  "tablet",
  "laptop",
  "desktop",
  "wide",
] as const satisfies readonly Breakpoint[];

export function useResponsiveValue<T>(
  values: ResponsiveValues<T>,
): T {
  const breakpoint =
    useBreakpoint();

  const currentIndex =
    breakpointOrder.indexOf(
      breakpoint,
    );

  for (
    let index = currentIndex;
    index >= 0;
    index--
  ) {
    const key =
      breakpointOrder[index];

    if (!key) {
      continue;
    }

    const value =
      values[key];

    if (value !== undefined) {
      return value;
    }
  }

  return values.mobile;
}