import type {
  JSX,
} from "react";

import {
  switchRecipe,
} from "./Switch.recipe";

import type {
  SwitchProps,
} from "./Switch.types";

export function Switch({
  size = "md",
  label,
  className = "",
  ...props
}: SwitchProps): JSX.Element {
  const styles =
    switchRecipe(size);

  return (
    <label className="inline-flex items-center gap-3 cursor-pointer">
      <span className="relative">
        <input
          type="checkbox"
          className={`peer sr-only ${className}`}
          {...props}
        />

        <span className={styles.track} />

        <span className={styles.thumb} />
      </span>

      {label && (
        <span>{label}</span>
      )}
    </label>
  );
}