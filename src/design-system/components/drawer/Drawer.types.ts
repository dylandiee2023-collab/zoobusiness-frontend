import type { HTMLAttributes, ReactNode } from "react";

export interface DrawerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  open: boolean;

  heading?: ReactNode;

  children: ReactNode;

  placement?: "left" | "right" | "top" | "bottom";

  size?: "sm" | "md" | "lg" | "xl";

  onClose?: () => void;
}
