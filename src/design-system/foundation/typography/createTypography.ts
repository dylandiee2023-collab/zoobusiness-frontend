import type { Theme } from "@/theme/types";

import type {
  TypographyOptions,
  TypographyVariant,
} from "./types";

export interface TypographyState {
  variant: TypographyVariant;

  truncate: boolean;

  noWrap: boolean;

  fontFamily: string;

  fontSize: string;

  fontWeight: number;

  lineHeight: number;

  letterSpacing: string;
}

export function createTypography(
  theme: Theme,
  options: TypographyOptions = {},
): TypographyState {
  const variant =
    options.variant ?? "body";

  const token =
    theme.typography[variant];

  return {
    variant,

    truncate:
      options.truncate ?? false,

    noWrap:
      options.noWrap ?? false,

    fontFamily: token.fontFamily,

    fontSize: token.fontSize,

    fontWeight: token.fontWeight,

    lineHeight: token.lineHeight,

    letterSpacing: token.letterSpacing,
  };
}