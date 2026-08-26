import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface ScrollAreaProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;

  orientation?:
    | "vertical"
    | "horizontal"
    | "both"
    | undefined;

  maxHeight?:
    | number
    | string
    | undefined;

  maxWidth?:
    | number
    | string
    | undefined;

  scrollbar?:
    | "auto"
    | "always"
    | "hidden"
    | undefined;
}