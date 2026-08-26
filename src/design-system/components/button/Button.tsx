import type {
  JSX,
} from "react";

import { buttonRecipe } from "./Button.recipe";
import type { ButtonProps } from "./Button.types";

export function Button({
  variant = "solid",
  size = "md",
  loading = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`${buttonRecipe(
        variant,
        size,
      )} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}