import type { ReactNode } from "react";

export interface AuthShellProps {
  readonly children: ReactNode;

  readonly glass?: boolean;
}
