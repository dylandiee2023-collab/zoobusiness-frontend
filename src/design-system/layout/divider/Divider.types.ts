import type { CSSProperties } from "react";

import type { BoxProps } from "../box";

export interface DividerProps extends BoxProps {
  orientation?: "horizontal" | "vertical";
  color?: CSSProperties["backgroundColor"];
  thickness?: CSSProperties["width"];
  length?: CSSProperties["width"];
}
