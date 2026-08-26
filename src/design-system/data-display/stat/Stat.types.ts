import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export type StatTrend =
  | "up"
  | "down"
  | "neutral";

export interface StatProps
  extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;

  value: ReactNode;

  helper?: ReactNode;

  icon?: ReactNode;

  trend?: StatTrend;
}