import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface TooltipProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "content"
  > {
  children: ReactNode;

  content: ReactNode;

  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right";

  open?: boolean;
}