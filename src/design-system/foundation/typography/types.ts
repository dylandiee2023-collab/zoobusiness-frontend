export type TypographyVariant =
  | "display"
  | "heading1"
  | "heading2"
  | "heading3"
  | "body"
  | "bodySmall"
  | "caption";

export interface TypographyOptions {
  variant?: TypographyVariant;

  truncate?: boolean;

  noWrap?: boolean;
}