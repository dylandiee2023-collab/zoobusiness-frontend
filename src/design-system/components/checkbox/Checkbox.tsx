import type { JSX } from "react";

import { checkboxRecipe } from "./Checkbox.recipe";

import type { CheckboxProps } from "./Checkbox.types";

export function Checkbox({
  size = "md",
  label,
  className = "",
  ...props
}: CheckboxProps): JSX.Element {
  return (
    <label className="inline-flex items-center gap-2">
      <input
        type="checkbox"
        className={`${checkboxRecipe(size)} ${className}`}
        {...props}
      />

      {label && <span>{label}</span>}
    </label>
  );
}
