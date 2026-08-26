import {
  forwardRef,
} from "react";

import {
  useTheme,
} from "@/theme/hooks";

import {
  linkRecipe,
} from "./Link.recipe";

import type {
  LinkProps,
} from "./Link.types";

export const Link = forwardRef<
  HTMLAnchorElement,
  LinkProps
>(function Link(
  {
    style,
    children,
    underline = false,
    external = false,
    target,
    rel,
    ...props
  },
  ref,
) {

  const { theme } =
    useTheme();

  const recipe =
    linkRecipe(
      theme,
      {
        ...props,
        underline,
      },
    );

  return (
    <a
      ref={ref}
      target={
        external
          ? "_blank"
          : target
      }
      rel={
        external
          ? "noopener noreferrer"
          : rel
      }
      {...props}
      style={{
        ...recipe.style,
        ...style,
      }}
    >
      {children}
    </a>
  );
});

Link.displayName =
  "Link";