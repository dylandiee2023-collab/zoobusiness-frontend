import type { ElementType, ReactNode } from "react";

import type { PolymorphicProps } from "@/design-system/foundation/react";

export interface BoxOwnProps {
  children?: ReactNode;
}

export type BoxProps<T extends ElementType = "div"> = PolymorphicProps<
  T,
  BoxOwnProps
>;
