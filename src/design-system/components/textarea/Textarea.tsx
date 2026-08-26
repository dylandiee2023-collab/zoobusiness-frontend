import type {
  JSX,
} from "react";

import {
  textareaRecipe,
} from "./Textarea.recipe";

import type {
  TextareaProps,
} from "./Textarea.types";

export function Textarea({
  size = "md",
  error = false,
  rows = 4,
  className = "",
  ...props
}: TextareaProps): JSX.Element {
  return (
    <textarea
      rows={rows}
      className={`${textareaRecipe(
        size,
        error,
      )} ${className}`}
      {...props}
    />
  );
}