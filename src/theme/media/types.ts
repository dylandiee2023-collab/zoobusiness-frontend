import type {
  breakpoints,
} from "@/theme/tokens/breakpoints";

export type Breakpoint =
  keyof typeof breakpoints;

export type MediaQuery = string;

export type BreakpointOrder =
  readonly Breakpoint[];

export interface MediaQueryBuilder {
  up(
    breakpoint: Breakpoint,
  ): MediaQuery;

  down(
    breakpoint: Breakpoint,
  ): MediaQuery;

  between(
    min: Breakpoint,
    max: Breakpoint,
  ): MediaQuery;

  only(
    breakpoint: Breakpoint,
  ): MediaQuery;
}