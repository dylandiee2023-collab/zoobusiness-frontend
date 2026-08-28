import type { CSSProperties } from "react";

import type { BoxProps } from "../box";

export interface GridProps extends BoxProps {
  columns?: CSSProperties["gridTemplateColumns"];
  rows?: CSSProperties["gridTemplateRows"];
  areas?: CSSProperties["gridTemplateAreas"];
  autoRows?: CSSProperties["gridAutoRows"];
  autoColumns?: CSSProperties["gridAutoColumns"];
  autoFlow?: CSSProperties["gridAutoFlow"];
  gap?: CSSProperties["gap"];
  rowGap?: CSSProperties["rowGap"];
  columnGap?: CSSProperties["columnGap"];
  justifyItems?: CSSProperties["justifyItems"];
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  alignContent?: CSSProperties["alignContent"];
}
