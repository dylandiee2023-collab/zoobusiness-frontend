import type { JSX } from "react";

import { skeletonRecipe } from "./Skeleton.recipe";

import type { SkeletonProps } from "./Skeleton.types";

export function Skeleton({
  width = "100%",
  height = "1rem",
  rounded = "md",
  animated = true,
  className = "",
  style,
  ...props
}: SkeletonProps): JSX.Element {
  return (
    <div
      className={`${skeletonRecipe(rounded, animated)} ${className}`}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  );
}
