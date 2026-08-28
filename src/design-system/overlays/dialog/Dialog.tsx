import { forwardRef } from "react";

import { useTheme } from "@/theme/hooks";

import { dialogRecipe } from "./Dialog.recipe";

import type { DialogProps } from "./Dialog.types";

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  { open, className, style, children, ...props },
  ref,
) {
  const { theme } = useTheme();

  const recipe = dialogRecipe(theme, {
    open,
    children,
    ...props,
  });

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      className={className}
      style={{
        ...recipe.style,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
});

Dialog.displayName = "Dialog";
