import type {
  JSX,
} from "react";

import { OverlayPortal } from "@/design-system/foundation/overlay/portal";

import {
  dropdownRecipe,
} from "./Dropdown.recipe";

import type {
  DropdownProps,
} from "./Dropdown.types";

export function Dropdown({
  open,
  items,
  onValueChange,
  className = "",
  ...props
}: DropdownProps): JSX.Element | null {
  if (!open) {
    return null;
  }

  return (
    <OverlayPortal>
      <div
        className={`${dropdownRecipe()} ${className}`}
        {...props}
      >
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            disabled={item.disabled}
            className="flex w-full items-center px-4 py-3 text-left transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              if (!item.disabled) {
                onValueChange?.(item.value);
              }
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </OverlayPortal>
  );
}