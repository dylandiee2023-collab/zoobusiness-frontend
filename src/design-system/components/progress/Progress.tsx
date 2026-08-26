import type {
  JSX,
} from "react";

import {
  progressRecipe,
} from "./Progress.recipe";

import type {
  ProgressProps,
} from "./Progress.types";

export function Progress({
  value,
  max = 100,
  size = "md",
  rounded = true,
  striped = false,
  animated = false,
  className = "",
  ...props
}: ProgressProps): JSX.Element {
  const styles = progressRecipe(
    size,
    rounded,
    striped,
    animated,
  );

  const percentage = Math.min(
    100,
    Math.max(
      0,
      (value / max) * 100,
    ),
  );

  return (
    <div
      className={`${styles.root} ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      {...props}
    >
      <div
        className={styles.indicator}
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
}