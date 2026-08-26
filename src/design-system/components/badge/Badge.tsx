import type {
  JSX,
} from "react";

import {
  badgeRecipe,
} from "./Badge.recipe";

import type {
  BadgeProps,
} from "./Badge.types";

export function Badge({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: BadgeProps): JSX.Element {
  return (
    <span
      className={`${badgeRecipe(
        variant,
        size,
      )} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}