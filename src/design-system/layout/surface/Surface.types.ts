import type { CSSProperties } from "react";

import type { BoxProps } from "../box";

export interface SurfaceProps extends BoxProps {
  background?: CSSProperties["background"];
  shadow?: CSSProperties["boxShadow"];
  radius?: CSSProperties["borderRadius"];
  border?: CSSProperties["border"];
  padding?: CSSProperties["padding"];
}
