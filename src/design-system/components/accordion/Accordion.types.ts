import type { HTMLAttributes, ReactNode } from "react";

export interface AccordionItem {
  id: string;

  title: ReactNode;

  content: ReactNode;

  disabled?: boolean;
}

export interface AccordionProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  items: AccordionItem[];

  expanded?: string;

  onValueChange?: (id: string) => void;
}
