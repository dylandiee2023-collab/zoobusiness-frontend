import type {
  JSX,
} from "react";

import {
  drawerRecipe,
} from "./Drawer.recipe";

import type {
  DrawerProps,
} from "./Drawer.types";

export function Drawer({
  open,
  heading,
  children,
  placement = "right",
  size = "md",
  className = "",
  onClose,
  ...props
}: DrawerProps): JSX.Element | null {

  if (!open) {
    return null;
  }

  const styles =
    drawerRecipe(
      placement,
      size,
    );

  return (
    <>
      <div
        className={styles.overlay}
        onClick={onClose}
      />

      <aside
        className={`${styles.panel} ${className}`}
        {...props}
      >
        <header
          className={styles.header}
        >
          <h2 className="font-semibold text-lg">
            {heading}
          </h2>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
            >
              ✕
            </button>
          )}
        </header>

        <div
          className={styles.body}
        >
          {children}
        </div>
      </aside>
    </>
  );
}