import type { CSSProperties, JSX } from "react";

import { scrollAreaRecipe } from "./ScrollArea.recipe";

import type { ScrollAreaProps } from "./ScrollArea.types";

export function ScrollArea({
  children,
  orientation = "vertical",
  scrollbar = "auto",
  maxHeight,
  maxWidth,
  className = "",
  style,
  ...props
}: ScrollAreaProps): JSX.Element {
  const styles = scrollAreaRecipe();

  const overflow =
    orientation === "horizontal"
      ? styles.horizontal
      : orientation === "both"
        ? styles.both
        : styles.vertical;

  const css: CSSProperties = {
    ...style,
    maxHeight,
    maxWidth,
  };

  return (
    <div className={[styles.root, className].join(" ")} style={css} {...props}>
      <div
        className={[
          styles.viewport,
          scrollbar === "hidden" ? styles.hidden : overflow,
          scrollbar !== "hidden" ? styles.scrollbar : "",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
