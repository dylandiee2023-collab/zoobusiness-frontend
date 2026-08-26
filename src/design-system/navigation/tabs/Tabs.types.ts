import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface TabItem {
  value: string;

  label: ReactNode;

  icon?: ReactNode;

  disabled?: boolean;
}

export interface TabsProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onChange"
  > {
  value: string;

  items: TabItem[];

  onChange?(value: string): void;
}