import {
  breakpoints,
} from "@/theme/tokens/breakpoints";

export function createMediaQuery(
  query: string,
): string {
  return `@media ${query}`;
}

export function minWidth(
  breakpoint: keyof typeof breakpoints,
): string {
  return createMediaQuery(
    `(min-width:${breakpoints[breakpoint]}px)`,
  );
}

export function maxWidth(
  breakpoint: keyof typeof breakpoints,
): string {
  return createMediaQuery(
    `(max-width:${breakpoints[breakpoint] - 0.02}px)`,
  );
}