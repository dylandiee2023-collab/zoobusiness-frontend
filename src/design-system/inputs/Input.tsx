import { forwardRef } from "react";

import { useTheme } from "@/theme/hooks";

import { inputRecipe } from "./Input.recipe";

import type { InputProps } from "./Input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { style, fullWidth, invalid, ...props },
  ref,
) {
  const { theme } = useTheme();

  const recipeProps: InputProps = {
    ...props,
    ...(fullWidth !== undefined ? { fullWidth } : {}),
    ...(invalid !== undefined ? { invalid } : {}),
  };
  const recipe = inputRecipe(theme, recipeProps);

  return (
    <input
      ref={ref}
      {...props}
      aria-invalid={invalid || undefined}
      style={{
        ...recipe.style,
        ...style,
      }}
    />
  );
});

Input.displayName = "Input";
