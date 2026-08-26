import type {
  JSX,
} from "react";

import {
  breadcrumbRecipe,
} from "./Breadcrumb.recipe";

import type {
  BreadcrumbProps,
} from "./Breadcrumb.types";

export function Breadcrumb({
  items,
  separator = "/",
  className = "",
  ...props
}: BreadcrumbProps): JSX.Element {
  const styles =
    breadcrumbRecipe();

  return (
    <nav
      className={`${styles.nav} ${className}`}
      aria-label="Breadcrumb"
      {...props}
    >
      <ol className={styles.list}>
        {items.map(
          (
            item,
            index,
          ) => (
            <li
              key={index}
              className="flex items-center gap-2"
            >
              {item.href ? (
                <a
                  href={item.href}
                  className={
                    item.active
                      ? styles.active
                      : styles.item
                  }
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={
                    item.active
                      ? styles.active
                      : styles.item
                  }
                >
                  {item.label}
                </span>
              )}

              {index <
                items.length -
                  1 && (
                <span
                  className={
                    styles.separator
                  }
                >
                  {separator}
                </span>
              )}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}