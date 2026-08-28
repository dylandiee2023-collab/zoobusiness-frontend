import type { ReactNode } from "react";

export interface DashboardShellProps {
  topbar: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
}
