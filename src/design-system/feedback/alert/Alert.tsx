import { forwardRef } from "react";

import { alertRecipe } from "./Alert.recipe";
import { useTheme } from "@/theme/hooks";

import type { AlertProps } from "./Alert.types";

export const Alert = forwardRef<
  HTMLDivElement,
  AlertProps
>(function Alert(
  {
    heading,
    children,
    icon,
    className,
    style,
    closable,
    onClose,
    ...props
  },
  ref,
) {
  const { theme } = useTheme();

  const recipe = alertRecipe(theme, {
    ...props,

    ...(closable !== undefined && {
      closable,
    }),

    ...(onClose !== undefined && {
      onClose,
    }),
  });

  return (
    <div
      ref={ref}
      role="alert"
      className={className}
      style={{
        ...recipe.style,
        ...style,
      }}
    >
      {icon && <div>{icon}</div>}

      <div
        style={{
          flex: 1,
        }}
      >
        {heading && (
          <div
            style={{
              fontWeight: 600,
              marginBottom: children ? 4 : 0,
            }}
          >
            {heading}
          </div>
        )}

        {children}
      </div>

      {closable && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close alert"
          style={{
            background: "transparent",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            fontSize: 18,
            lineHeight: 1,
            padding: 0,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
});

Alert.displayName = "Alert";