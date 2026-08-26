import type {
  JSX,
} from "react";

import {
  spinnerRecipe,
} from "./Spinner.recipe";

import type {
  SpinnerProps,
} from "./Spinner.types";

export function Spinner({
  size = "md",
  thickness = "normal",
  className = "",
  ...props
}: SpinnerProps): JSX.Element {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`${spinnerRecipe(
        size,
        thickness,
      )} ${className}`}
      {...props}
    />
  );
}