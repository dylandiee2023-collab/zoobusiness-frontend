import type {
  JSX,
} from "react";

import {
  tooltipRecipe,
} from "./Tooltip.recipe";

import type {
  TooltipProps,
} from "./Tooltip.types";

export function Tooltip({
  children,
  content,
  placement = "top",
  open = true,
  className = "",
  ...props
}: TooltipProps): JSX.Element {

  const styles =
    tooltipRecipe(
      placement,
    );

  return (
    <div
      className={`${styles.root} ${className}`}
      {...props}
    >
      {children}

      {open && (
        <div
          role="tooltip"
          className={styles.tooltip}
        >
          {content}
        </div>
      )}
    </div>
  );
}