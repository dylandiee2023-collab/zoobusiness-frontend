import type { CSSProperties } from "react";

import type { VisuallyHiddenProps } from "./VisuallyHidden.types";

const hiddenStyle: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
};

export function VisuallyHidden({
  children,
  style,
  ...props
}: VisuallyHiddenProps) {
  return (
    <span
      {...props}
      style={{
        ...hiddenStyle,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
