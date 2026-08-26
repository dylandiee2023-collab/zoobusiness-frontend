import type { Breakpoint } from "@/theme/media";

export interface TypographyScale {
  fontSize: number;
  lineHeight: number;
}

export type ResponsiveTypography =
  Record<Breakpoint, TypographyScale>;