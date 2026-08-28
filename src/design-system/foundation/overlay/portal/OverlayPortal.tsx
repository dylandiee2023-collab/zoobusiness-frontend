import { createPortal } from "react-dom";
import type { PropsWithChildren } from "react";

export function OverlayPortal({ children }: PropsWithChildren) {
  return createPortal(children, document.body);
}
