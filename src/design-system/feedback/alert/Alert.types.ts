import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export type AlertVariant =
  | "success"
  | "info"
  | "warning"
  | "error";

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;

  heading?: ReactNode;

  children?: ReactNode;

  icon?: ReactNode;

  closable?: boolean;

  onClose?: () => void;

  fullWidth?: boolean;
}