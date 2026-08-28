import { forwardRef } from "react";

import { useTheme } from "@/theme/hooks";

import { progressRecipe } from "./Progress.recipe";

import type { ProgressProps } from "./Progress.types";

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    {
      value,
      max,
      size,
      rounded,
      striped,
      animated,
      color,
      className,
      style,
      ...props
    },
    ref,
  ) {
    const { theme } = useTheme();

    const recipe = progressRecipe(theme, {
      value,

      ...props,

      ...(max !== undefined && {
        max,
      }),

      ...(size !== undefined && {
        size,
      }),

      ...(rounded !== undefined && {
        rounded,
      }),

      ...(striped !== undefined && {
        striped,
      }),

      ...(animated !== undefined && {
        animated,
      }),

      ...(color !== undefined && {
        color,
      }),
    });

    return (
      <div
        ref={ref}
        className={className}
        style={{
          ...recipe.style,
          ...style,
        }}

        {...props}
      >
        <div
          style={{
            height: "100%",

            width: `${Math.min(
              100,
              Math.max(0, (value / (max ?? 100)) * 100),
            )}%`,

            background: color ?? theme.colors.primary,

            transition: "width 200ms ease",

            ...(striped && {
              backgroundImage:
                "linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)",

              backgroundSize: "1rem 1rem",
            }),

            ...(animated && {
              animation: "progress-stripes 1s linear infinite",
            }),
          }}
        />
      </div>
    );
  },
);

Progress.displayName = "Progress";
