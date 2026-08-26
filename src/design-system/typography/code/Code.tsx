import {
  forwardRef,
} from "react";

import {
  useTheme,
} from "@/theme/hooks";

import {
  codeRecipe,
} from "./Code.recipe";

import type {
  CodeProps,
} from "./Code.types";

export const Code = forwardRef<
  HTMLElement,
  CodeProps
>(function Code(
  {
    style,
    children,
    ...props
  },
  ref,
) {

  const { theme } =
    useTheme();

  const recipe =
    codeRecipe(
      theme,
      props,
    );

  return (
    <code
      ref={ref}
      style={{
        ...recipe.style,
        ...style,
      }}
      {...props}
    >
      {children}
    </code>
  );
});

Code.displayName =
  "Code";