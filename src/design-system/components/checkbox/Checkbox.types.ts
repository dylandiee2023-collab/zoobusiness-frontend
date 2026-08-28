import type { InputHTMLAttributes } from "react";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  size?: "sm" | "md" | "lg";

  label?: string;

  error?: boolean;
}
