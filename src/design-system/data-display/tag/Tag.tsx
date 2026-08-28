import { forwardRef } from "react";

import { useTheme } from "@/theme/hooks";

import { tagRecipe } from "./Tag.recipe";

import type { TagProps } from "./Tag.types";

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { variant, size, rounded, className, style, children, ...props },
  ref,
) {
  const { theme } = useTheme();

  const recipe = tagRecipe(theme, {
    ...props,

    ...(variant !== undefined && {
      variant,
    }),

    ...(size !== undefined && {
      size,
    }),

    ...(rounded !== undefined && {
      rounded,
    }),
  });

  return (
    <span
      ref={ref}
      className={className}
      style={{
        ...recipe.style,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
});

Tag.displayName = "Tag";
