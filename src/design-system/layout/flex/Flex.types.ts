import type { CSSProperties } from "react";

import type { BoxProps } from "../box/Box.types";

export type FlexDirection =
  | "row"
  | "column"
  | "row-reverse"
  | "column-reverse";

export type FlexAlign =
  | "stretch"
  | "flex-start"
  | "center"
  | "flex-end"
  | "baseline";

export type FlexJustify =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";

export interface FlexProps
  extends BoxProps {
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: CSSProperties["flexWrap"];
  gap?: CSSProperties["gap"];
}