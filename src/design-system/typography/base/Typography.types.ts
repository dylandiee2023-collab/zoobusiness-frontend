import type {
  CSSProperties,
  ElementType,
} from "react";

import type {
  BoxProps,
} from "@/design-system/layout/box";

export interface TypographyProps
  extends BoxProps<ElementType> {

  color?: CSSProperties["color"];

  size?: CSSProperties["fontSize"];

  weight?: CSSProperties["fontWeight"];

  lineHeight?: CSSProperties["lineHeight"];

  letterSpacing?: CSSProperties["letterSpacing"];

  align?: CSSProperties["textAlign"];

  transform?: CSSProperties["textTransform"];

  decoration?: CSSProperties["textDecoration"];

  truncate?: boolean;
}