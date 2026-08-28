import type { HTMLAttributes, ReactElement } from "react";

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children: ReactElement;
}
