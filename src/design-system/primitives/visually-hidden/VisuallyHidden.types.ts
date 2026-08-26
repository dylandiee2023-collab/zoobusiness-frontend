import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface VisuallyHiddenProps
  extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}