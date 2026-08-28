import type { HTMLAttributes, ReactNode } from "react";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;

  heading: ReactNode;

  description?: ReactNode;

  action?: ReactNode;
}
