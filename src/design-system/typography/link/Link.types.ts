import type { AnchorHTMLAttributes } from "react";

import type { TypographyProps } from "@/design-system/typography/base";

export interface LinkProps
  extends
    TypographyProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof TypographyProps> {
  underline?: boolean;

  external?: boolean;
}
