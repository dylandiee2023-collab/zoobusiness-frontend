import type { JSX } from "react";

import { selectRecipe } from "./Select.recipe";

import type { SelectProps } from "./Select.types";

export function Select({
  options,
  size = "md",
  error = false,
  className = "",
  ...props
}: SelectProps): JSX.Element {
  return (
    <select className={`${selectRecipe(size, error)} ${className}`} {...props}>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
