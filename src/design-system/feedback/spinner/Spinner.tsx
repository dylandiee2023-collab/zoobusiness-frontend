import { forwardRef } from "react";

import { spinnerRecipe } from "./Spinner.recipe";
import { useTheme } from "@/theme/hooks";

import type { SpinnerProps } from "./Spinner.types";

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  function Spinner(
    { size, color, label, fullScreen, className, style, ...props },
    ref,
  ) {
    const { theme } = useTheme();

    const recipe = spinnerRecipe(theme, {
      ...props,

      ...(size !== undefined && {
        size,
      }),

      ...(color !== undefined && {
        color,
      }),

      ...(label !== undefined && {
        label,
      }),

      ...(fullScreen !== undefined && {
        fullScreen,
      }),
    });

    const spinner = (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={label ?? "Loading"}
        className={className}
        style={{
          ...recipe.style,
          ...style,
        }}
      >
        <span
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          {label ?? "Loading"}
        </span>
      </div>
    );

    if (!fullScreen) {
      return spinner;
    }

    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: theme.colors.background,
          zIndex: 9999,
        }}
      >
        {spinner}
      </div>
    );
  },
);

Spinner.displayName = "Spinner";
