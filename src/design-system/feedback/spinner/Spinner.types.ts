import type { HTMLAttributes } from "react";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;

  color?: string;

  label?: string;

  fullScreen?: boolean;
}
