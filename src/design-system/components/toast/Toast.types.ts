import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface ToastProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "title"
  > {
  open: boolean;

  title?: ReactNode;

  description?: ReactNode;

  variant?:
    | "info"
    | "success"
    | "warning"
    | "danger";

  onClose?: () => void;
}