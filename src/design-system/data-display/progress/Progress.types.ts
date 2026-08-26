import type { HTMLAttributes } from "react";

export type ProgressSize =
  | "sm"
  | "md"
  | "lg";

export interface ProgressProps
  extends HTMLAttributes<HTMLDivElement> {
  value: number;

  max?: number;

  size?: ProgressSize;

  rounded?: boolean;

  striped?: boolean;

  animated?: boolean;

  color?: string;
}