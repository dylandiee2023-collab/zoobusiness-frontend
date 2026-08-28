import type { JSX } from "react";

import { OverlayPortal } from "@/design-system/foundation/overlay/portal";

import { modalRecipe } from "./Modal.recipe";

import type { ModalProps } from "./Modal.types";

export function Modal({
  open,
  title,
  footer,
  size = "md",
  children,
  className = "",
  onClose,
  ...props
}: ModalProps): JSX.Element | null {
  if (!open) {
    return null;
  }

  return (
    <OverlayPortal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className={`${modalRecipe(size)} ${className}`} {...props}>
          {title && (
            <div className="border-b px-6 py-4 text-lg font-semibold">
              {title}
            </div>
          )}

          <div className="p-6">{children}</div>

          {footer && <div className="border-t px-6 py-4">{footer}</div>}

          {onClose && (
            <button
              type="button"
              className="absolute right-4 top-4"
              onClick={onClose}
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </OverlayPortal>
  );
}
