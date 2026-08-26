import type {
  JSX,
} from "react";

import {
  tabsRecipe,
} from "./Tabs.recipe";

import type {
  TabsProps,
} from "./Tabs.types";

export function Tabs({
  items,
  activeTab,
  onValueChange,
  className = "",
  ...props
}: TabsProps): JSX.Element {
  const styles =
    tabsRecipe();

  return (
    <div
      className={`${styles.root} ${className}`}
      {...props}
    >
      {items.map(
        (item) => (
          <button
            key={item.id}
            type="button"
            disabled={item.disabled}
            className={[
              styles.tab,
              activeTab ===
              item.id
                ? styles.active
                : "",
              item.disabled
                ? styles.disabled
                : "",
            ].join(" ")}
            onClick={() =>
              !item.disabled &&
              onValueChange?.(
                item.id,
              )
            }
          >
            {item.label}
          </button>
        ),
      )}
    </div>
  );
}