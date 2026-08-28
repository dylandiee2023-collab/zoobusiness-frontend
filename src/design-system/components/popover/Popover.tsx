import type { JSX } from "react";

import { popoverRecipe } from "./Popover.recipe";

import type { PopoverProps } from "./Popover.types";

export function Popover({
  trigger,
  content,
  placement = "bottom",
  open = false,
  className = "",
  ...props
}: PopoverProps): JSX.Element {
  const styles = popoverRecipe(placement);

  return (
    <div className={`${styles.root} ${className}`} {...props}>
      {trigger}

      {open && (
        <div className={styles.panel} role="dialog">
          {content}
        </div>
      )}
    </div>
  );
}
