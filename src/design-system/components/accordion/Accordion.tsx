import type { JSX } from "react";

import { accordionRecipe } from "./Accordion.recipe";

import type { AccordionProps } from "./Accordion.types";

export function Accordion({
  items,
  expanded,
  onValueChange,
  className = "",
  ...props
}: AccordionProps): JSX.Element {
  const styles = accordionRecipe();

  return (
    <div className={`${styles.root} ${className}`} {...props}>
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
          <button
            type="button"
            disabled={item.disabled}
            className={`${styles.trigger} ${
              item.disabled ? styles.disabled : ""
            }`}
            onClick={() => !item.disabled && onValueChange?.(item.id)}
          >
            <span>{item.title}</span>

            <span>{expanded === item.id ? "−" : "+"}</span>
          </button>

          {expanded === item.id && (
            <div className={styles.content}>{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}
