import type { ReactNode } from "react";

export interface DashboardShellComposeProps {
  topbar: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
}