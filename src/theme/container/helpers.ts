import type {
  CSSProperties,
} from "react";

import type {
  Breakpoint,
} from "@/theme/media";

import {
  containers,
} from "./primitives";

import type {
  ContainerOptions,
} from "./types";

export function getContainer(
  breakpoint: Breakpoint,
) {
  return containers[
    breakpoint
  ];
}

export function getContainerStyle(
  breakpoint: Breakpoint,
  options: ContainerOptions = {},
): CSSProperties {
  const container =
    getContainer(
      breakpoint,
    );

  return {
    width: "100%",
    maxWidth:
      options.fluid
        ? "100%"
        : `${container.maxWidth}px`,
    paddingInline:
      `${container.padding}px`,
    marginInline:
      options.centered === false
        ? undefined
        : "auto",
  };
}