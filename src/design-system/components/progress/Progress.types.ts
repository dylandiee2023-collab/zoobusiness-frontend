import type {
  HTMLAttributes,
} from "react";

export interface ProgressProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "children"
  > {
  value: number;

  max?: number;

  size?: "sm" | "md" | "lg";

  rounded?: boolean;

  striped?: boolean;

  animated?: boolean;
}