import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  "primary" | "secondary" | "outline" | "ghost" | "destructive";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;

  size?: ButtonSize;

  fullWidth?: boolean;

  loading?: boolean;

  disabled?: boolean;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  children?: ReactNode;
}
