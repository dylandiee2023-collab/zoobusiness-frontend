import type { JSX } from "react";

import { commandPaletteRecipe } from "./CommandPalette.recipe";

import type { CommandPaletteProps } from "./CommandPalette.types";

export function CommandPalette({
  open,
  commands,
  query = "",
  placeholder = "Type a command...",
  onQueryChange,
  onCommandSelect,
  onClose,
  className = "",
  ...props
}: CommandPaletteProps): JSX.Element | null {
  if (!open) {
    return null;
  }

  const styles = commandPaletteRecipe();

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div className={`${styles.root} ${className}`} {...props}>
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          className={styles.input}
          onChange={(event) => onQueryChange?.(event.target.value)}
        />

        <div className={styles.list}>
          {commands.map((command) => (
            <button
              key={command.id}
              type="button"
              disabled={command.disabled}
              className={[
                styles.item,
                command.disabled ? styles.disabled : "",
              ].join(" ")}
              onClick={() => onCommandSelect?.(command.id)}
            >
              <div>
                <div className={styles.title}>{command.title}</div>

                {command.description && (
                  <div className={styles.description}>
                    {command.description}
                  </div>
                )}
              </div>

              {command.shortcut && (
                <kbd className={styles.shortcut}>{command.shortcut}</kbd>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
