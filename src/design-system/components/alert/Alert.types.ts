import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface AlertProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "title"
  > {
  variant?:
    | "info"
    | "success"
    | "warning"
    | "danger";

  title?: ReactNode;

  children?: ReactNode;
}