import type { ReactNode } from "react";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type Radius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export type ColorScheme =
  "primary" | "secondary" | "success" | "warning" | "danger" | "neutral";

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}
