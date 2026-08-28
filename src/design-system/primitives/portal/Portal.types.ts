import type { HTMLAttributes, ReactNode } from "react";

export interface PortalProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;

  container?: Element | DocumentFragment | null;

  disabled?: boolean;
}
