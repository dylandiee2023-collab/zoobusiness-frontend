import type { JSX } from "react";

import { menuRecipe } from "./Menu.recipe";

import type { MenuProps } from "./Menu.types";

export function Menu({
  items,
  onValueChange,
  className = "",
  ...props
}: MenuProps): JSX.Element {
  const styles = menuRecipe();

  return (
    <div className={`${styles.root} ${className}`} {...props}>
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
          onClick={() => {
            if (!item.disabled) {
              onValueChange?.(item.id);
            }
          }}
        >
          {item.icon}

          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
