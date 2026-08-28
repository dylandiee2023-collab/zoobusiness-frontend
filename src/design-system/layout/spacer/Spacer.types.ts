import type { CSSProperties } from "react";

import type { BoxProps } from "../box";

export interface SpacerProps extends BoxProps {
  size?: CSSProperties["width"];
  direction?: "horizontal" | "vertical";
}
