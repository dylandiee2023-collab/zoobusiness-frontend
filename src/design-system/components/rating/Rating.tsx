import type { JSX } from "react";

import { ratingRecipe } from "./Rating.recipe";

import type { RatingProps } from "./Rating.types";

export function Rating({
  value = 0,
  max = 5,
  readonly = false,
  disabled = false,
  icon,
  onValueChange,
  className = "",
  ...props
}: RatingProps): JSX.Element {
  const styles = ratingRecipe();

  return (
    <div className={[styles.root, className].join(" ")} {...props}>
      {Array.from(
        {
          length: max,
        },
        (_, index) => {
          const star = index + 1;

          const active = star <= value;

          return (
            <button
              key={star}
              type="button"
              disabled={disabled || readonly}
              className={[
                styles.button,
                active ? styles.active : styles.inactive,
                disabled ? styles.disabled : "",
              ].join(" ")}
              onClick={() => onValueChange?.(star)}
            >
              {icon ?? "★"}
            </button>
          );
        },
      )}
    </div>
  );
}
