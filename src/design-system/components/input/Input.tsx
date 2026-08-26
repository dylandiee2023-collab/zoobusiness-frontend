import type {
  JSX,
} from "react";

import { inputRecipe } from "./Input.recipe";
import type { InputProps } from "./Input.types";

export function Input({
  size = "md",
  error = false,
  className = "",
  ...props
}: InputProps): JSX.Element {
  return (
    <input
      className={`${inputRecipe(
        size,
        error,
      )} ${className}`}
      {...props}
    />
  );
}