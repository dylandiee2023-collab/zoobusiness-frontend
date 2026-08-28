import type { HTMLAttributes } from "react";

export interface ComboboxItem {
  value: string;

  label: string;

  disabled?: boolean;
}

export interface ComboboxProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  items: ComboboxItem[];

  value?: string;

  placeholder?: string;

  disabled?: boolean;

  searchable?: boolean;

  onValueChange?: (value: string) => void;
}
