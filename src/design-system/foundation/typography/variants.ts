import type { TypographyState } from "./createTypography";

export function isHeading(
  typography: TypographyState,
): boolean {
  return (
    typography.variant === "heading1" ||
    typography.variant === "heading2" ||
    typography.variant === "heading3"
  );
}

export function isDisplay(
  typography: TypographyState,
): boolean {
  return typography.variant === "display";
}