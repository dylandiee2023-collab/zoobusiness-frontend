import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface ModalProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "title"
  > {
  open: boolean;

  title?: ReactNode;

  children?: ReactNode;

  footer?: ReactNode;

  size?: "sm" | "md" | "lg" | "xl";

  onClose?: () => void;
}