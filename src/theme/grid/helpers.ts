import type {
  CSSProperties,
} from "react";

import type {
  Breakpoint,
} from "@/theme/media";

import {
  grids,
} from "./primitives";

export function getGrid(
  breakpoint: Breakpoint,
) {
  return grids[
    breakpoint
  ];
}

export function getGridStyle(
  breakpoint: Breakpoint,
): CSSProperties {
  const grid =
    getGrid(
      breakpoint,
    );

  return {
    display: "grid",
    gridTemplateColumns:
      `repeat(${grid.columns}, minmax(0, 1fr))`,
    gap:
      `${grid.gap}px`,
  };
}