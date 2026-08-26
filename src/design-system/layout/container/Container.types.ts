import type { CSSProperties } from "react";

import type { BoxProps } from "../box";

export interface ContainerProps
  extends BoxProps {
  maxWidth?: CSSProperties["maxWidth"];
  padding?: CSSProperties["padding"];
  center?: boolean;
}