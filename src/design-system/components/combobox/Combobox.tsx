import { useMemo, useState, type JSX } from "react";

import { comboboxRecipe } from "./Combobox.recipe";

import type { ComboboxProps } from "./Combobox.types";

export function Combobox({
  items,
  value,
  placeholder = "Search...",
  searchable = true,
  disabled = false,
  onValueChange,
  className = "",
  ...props
}: ComboboxProps): JSX.Element {
  const styles = comboboxRecipe();

  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()),
      ),
    [items, query],
  );

  return (
    <div className={`${styles.root} ${className}`} {...props}>
      {searchable && (
        <input
          type="text"
          value={query}
          disabled={disabled}
          placeholder={placeholder}
          className={styles.input}
          onChange={(event) => setQuery(event.target.value)}
        />
      )}

      <div className={styles.panel}>
        {filtered.map((item) => (
          <button
            key={item.value}
            type="button"
            disabled={item.disabled}
            className={[
              styles.item,
              value === item.value ? styles.selected : "",
              item.disabled ? styles.disabled : "",
            ].join(" ")}
            onClick={() => onValueChange?.(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
