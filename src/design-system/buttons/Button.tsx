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
      ...props
    },
    ref,
  ) {
    const { theme } = useTheme();

    const recipe = buttonRecipe(theme, {
      ...props,
      loading,
      ...(disabled !== undefined && {
        disabled,
      }),
    });

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
