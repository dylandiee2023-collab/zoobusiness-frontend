import type { SelectHTMLAttributes, ReactNode } from "react";

export interface SelectOption {
  label: ReactNode;

  value: string;

  disabled?: boolean;
}

export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  options: SelectOption[];

  size?: "sm" | "md" | "lg";

  error?: boolean;
}
