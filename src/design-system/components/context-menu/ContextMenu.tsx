import type { JSX } from "react";

import { contextMenuRecipe } from "./ContextMenu.recipe";

import type { ContextMenuProps } from "./ContextMenu.types";

export function ContextMenu({
  open,
  items,
  x,
  y,
  onValueChange,
  onClose,
  className = "",
  ...props
}: ContextMenuProps): JSX.Element | null {
  if (!open) {
    return null;
  }

  const styles = contextMenuRecipe();

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div
        className={`${styles.menu} ${className}`}
        style={{
          left: x,
          top: y,
        }}
        {...props}
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={item.disabled}
            className={[
              styles.item,
              item.danger ? styles.danger : "",
              item.disabled ? styles.disabled : "",
            ].join(" ")}
            onClick={() => onValueChange?.(item.id)}
          >
            <span className={styles.left}>
              {item.icon}
              {item.label}
            </span>

            {item.shortcut && (
              <kbd className={styles.shortcut}>{item.shortcut}</kbd>
            )}
          </button>
        ))}
      </div>
    </>
  );
}
