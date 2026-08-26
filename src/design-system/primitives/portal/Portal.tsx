import { createPortal } from "react-dom";

import type { PortalProps } from "./Portal.types";

export function Portal({
  children,
  container,
  disabled,
}: PortalProps) {
  if (disabled) {
    return <>{children}</>;
  }

  const target =
    container ?? document.body;

  return createPortal(children, target);
}