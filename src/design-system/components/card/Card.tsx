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
    none: theme.spacing[0],
    sm: theme.spacing[2],
    md: theme.spacing.card,
    lg: theme.spacing[6],
  } as const;

  const shadowMap = {
    none: theme.shadows.none,
    sm: theme.shadows.sm,
    md: theme.shadows.md,
    lg: theme.shadows.lg,
  } as const;

  return (
    <div
      {...props}
      style={{
        margin: 0,
        padding: paddingMap[padding],
        borderRadius: theme.radius.lg,
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
