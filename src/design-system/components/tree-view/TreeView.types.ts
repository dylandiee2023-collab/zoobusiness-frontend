import type { HTMLAttributes, ReactNode } from "react";

export interface TreeNode {
  id: string;

  label: ReactNode;

  icon?: ReactNode | undefined;

  disabled?: boolean | undefined;

  expanded?: boolean | undefined;

  children?: TreeNode[] | undefined;
}

export interface TreeViewProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  nodes: TreeNode[];

  selectedId?: string | undefined;

  expandOnClick?: boolean | undefined;

  onValueChange?: (id: string) => void;
}
