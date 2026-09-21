import type { ReactNode } from "react";

export interface AuthShellProps {
  readonly children: ReactNode;

  readonly glass?: boolean;

  /**
   * Optional route-owned footer content.
   * The shell owns placement; routes own navigation.
   */
  readonly footer?: ReactNode;
}
