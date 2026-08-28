import type { ReactNode } from "react";

export interface SidebarProps {
  header?: ReactNode;
  navigation?: ReactNode;
  footer?: ReactNode;
  collapsed?: boolean;
}
