import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface TabItem {
  id: string;

  label: ReactNode;

  disabled?: boolean;
}

export interface TabsProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onChange"
  > {
  items: TabItem[];

  activeTab: string;

  onValueChange?: (
    id: string,
  ) => void;
}