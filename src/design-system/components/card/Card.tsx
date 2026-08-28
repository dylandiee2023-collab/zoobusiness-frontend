import type { JSX } from "react";

import type { CardProps } from "./Card.types";

import { cardRecipe } from "./Card.recipe";

export function Card({
  padding = "md",
  shadow = "sm",
  bordered = true,
  className = "",
  children,
  ...props
}: CardProps): JSX.Element {
  return (
    <div
      className={`${cardRecipe(padding, shadow, bordered)} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
