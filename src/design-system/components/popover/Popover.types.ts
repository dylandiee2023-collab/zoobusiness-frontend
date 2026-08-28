import type { HTMLAttributes, ReactNode } from "react";

export interface PopoverProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "content"
> {
  trigger: ReactNode;

  content: ReactNode;

  open?: boolean;

  placement?: "top" | "bottom" | "left" | "right";
}
