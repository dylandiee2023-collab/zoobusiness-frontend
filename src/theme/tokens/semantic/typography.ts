import { typography } from "@/theme/tokens";

export const semanticTypography = {
  display: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize["4xl"],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },

  heading1: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize["3xl"],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },

  heading2: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize["2xl"],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.normal,
  },

  heading3: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },

  body: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },

  bodySmall: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },

  caption: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.wide,
  },
} as const;

//type SemanticTypography = typeof semanticTypography;