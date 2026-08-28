import type { HTMLAttributes, ReactNode } from "react";

export interface DropdownItem {
  label: ReactNode;

  value: string;

  disabled?: boolean;
}

export interface DropdownProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "onSelect"
> {
  open: boolean;

  items: DropdownItem[];

  onValueChange?: (value: string) => void;
}
