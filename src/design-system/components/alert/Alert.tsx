import type {
  JSX,
} from "react";

import {
  alertRecipe,
} from "./Alert.recipe";

import type {
  AlertProps,
} from "./Alert.types";

export function Alert({
  variant = "info",
  title,
  children,
  className = "",
  ...props
}: AlertProps): JSX.Element {
  return (
    <div
      role="alert"
      className={`${alertRecipe(
        variant,
      )} ${className}`}
      {...props}
    >
      {title && (
        <div className="mb-2 font-semibold">
          {title}
        </div>
      )}

      {children && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}