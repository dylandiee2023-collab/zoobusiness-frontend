import type { HTMLAttributes } from "react";

export interface SpinnerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  size?: "sm" | "md" | "lg" | "xl";

  thickness?: "thin" | "normal" | "thick";
}
