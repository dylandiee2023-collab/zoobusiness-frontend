import type { PropsWithChildren } from "react";

import { OverlayPortal } from "../portal";

export interface TooltipProps extends PropsWithChildren {
  open: boolean;
}

export function Tooltip({ open, children }: TooltipProps) {
  if (!open) {
    return null;
  }

  return (
    <OverlayPortal>
      <div role="tooltip" data-overlay="tooltip">
        {children}
      </div>
    </OverlayPortal>
  );
}
