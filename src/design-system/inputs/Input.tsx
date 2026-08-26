import {
  forwardRef,
} from "react";

import {
  useTheme,
} from "@/theme/hooks";

import {
  inputRecipe,
} from "./Input.recipe";

import type {
  InputProps,
} from "./Input.types";

export const Input =
  forwardRef<
    HTMLInputElement,
    InputProps
  >(function Input(
    {
      style,
      ...props
    },
    ref,
  ) {
    const {
      theme,
    } = useTheme();

    const recipe =
      inputRecipe(
        theme,
        props,
      );

    return (
      <input
        ref={ref}
        {...props}
        style={{
          ...recipe.style,
          ...style,
        }}
      />
    );
  });

Input.displayName =
  "Input";