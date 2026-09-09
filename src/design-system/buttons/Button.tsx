import { forwardRef } from "react";

import { buttonRecipe } from "./Button.recipe";

import { useTheme } from "@/theme/hooks";

import {
  createAria,
  createFocusRing,
} from "@/design-system/foundation/accessibility";

import type { ButtonProps } from "./Button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      style,
      children,
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      variant,
      size,
      fullWidth,
      ...props
    },
    ref,
  ) {
    const { theme } = useTheme();

    const recipeProps: ButtonProps = {
      ...props,
      ...(variant !== undefined ? { variant } : {}),
      ...(size !== undefined ? { size } : {}),
      ...(fullWidth !== undefined ? { fullWidth } : {}),
      loading,
      ...(disabled !== undefined ? { disabled } : {}),
    };
    const recipe = buttonRecipe(theme, recipeProps);

    const aria = createAria({
      disabled: disabled ?? false,
      busy: loading,
    });
    const focusRing = createFocusRing(theme);

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        {...aria}
        {...props}
        style={{
          ...recipe.style,
          ...focusRing,
          ...style,
        }}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  },
);

Button.displayName = "Button";
