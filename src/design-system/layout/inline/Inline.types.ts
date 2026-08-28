import type { CSSProperties } from "react";

import type { FlexProps } from "../flex";

export interface InlineProps extends Omit<FlexProps, "direction"> {
  spacing?: CSSProperties["gap"];
}
