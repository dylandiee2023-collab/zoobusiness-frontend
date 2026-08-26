import type {
  JSX,
} from "react";

import { OverlayPortal } from "@/design-system/foundation/overlay/portal";

import {
  toastRecipe,
} from "./Toast.recipe";

import type {
  ToastProps,
} from "./Toast.types";

export function Toast({
  open,
  title,
  description,
  variant = "info",
  className = "",
  onClose,
  ...props
}: ToastProps): JSX.Element | null {
  if (!open) {
    return null;
  }

  return (
    <OverlayPortal>
      <div className="fixed right-6 top-6 z-50">
        <div
          className={`${toastRecipe(
            variant,
          )} ${className}`}
          {...props}
        >
          <div className="flex items-start justify-between p-4">
            <div className="flex-1">
              {title && (
                <div className="font-semibold">
                  {title}
                </div>
              )}

              {description && (
                <div className="mt-1 text-sm opacity-80">
                  {description}
                </div>
              )}
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="ml-4"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
    </OverlayPortal>
  );
}