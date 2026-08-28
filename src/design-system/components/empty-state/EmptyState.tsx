import type { JSX } from "react";

import { Heading } from "@/design-system/typography";

import { emptyStateRecipe } from "./EmptyState.recipe";

import type { EmptyStateProps } from "./EmptyState.types";

export function EmptyState({
  icon,
  heading,
  description,
  action,
  className = "",
  ...props
}: EmptyStateProps): JSX.Element {
  const styles = emptyStateRecipe();

  return (
    <div className={`${styles.root} ${className}`} {...props}>
      {icon && <div className={styles.icon}>{icon}</div>}

      <Heading as="h3" className={styles.heading}>
        {heading}
      </Heading>

      {description && <p className={styles.description}>{description}</p>}

      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
