import type { HTMLAttributes, ReactNode } from "react";

export interface ContextMenuItem {
  id: string;

  label: ReactNode;

  icon?: ReactNode;

  shortcut?: string;

  danger?: boolean;

  disabled?: boolean;
}

export interface ContextMenuProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  open: boolean;

  items: ContextMenuItem[];

  x: number;

  y: number;

  onValueChange?: (id: string) => void;

  onClose?: () => void;
}
