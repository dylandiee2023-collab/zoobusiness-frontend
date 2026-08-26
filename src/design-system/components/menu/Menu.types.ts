import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface MenuItem {
  id: string;

  label: ReactNode;

  icon?: ReactNode;

  disabled?: boolean;

  danger?: boolean;
}

export interface MenuProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onSelect"
  > {
  items: MenuItem[];

  onValueChange?: (
    id: string,
  ) => void;
}