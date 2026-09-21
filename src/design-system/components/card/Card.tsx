import type { JSX } from "react";

import { useTheme } from "@/theme/hooks";

import type { CardProps } from "./Card.types";

export function Card({
  padding = "md",
  shadow = "sm",
  bordered = true,
  style,
  children,
  ...props
}: CardProps): JSX.Element {
  const { theme } = useTheme();

  const paddingMap = {
    none: "0px",
    sm: theme.spacing.icon,
    md: theme.spacing.card,
    lg: theme.spacing.section,
  } as const;

  const shadowMap = {
    none: "none",
    sm: theme.shadows.card,
    md: theme.shadows.dropdown,
    lg: theme.shadows.modal,
  } as const;

  return (
    <div
      {...props}
      style={{
        margin: 0,
        padding: paddingMap[padding],
        borderRadius: theme.radius.card,
        border: bordered ? `1px solid ${theme.colors.border}` : "none",
        background: theme.colors.surface,
        boxShadow: shadowMap[shadow],
        color: theme.colors.text,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
