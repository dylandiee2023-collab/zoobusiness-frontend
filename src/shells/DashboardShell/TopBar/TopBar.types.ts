import type { ReactNode } from "react";

export interface TopBarProps {
  logo?: ReactNode;
  search?: ReactNode;
  actions?: ReactNode;
  profile?: ReactNode;
}