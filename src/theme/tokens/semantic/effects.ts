import { effects } from "@/theme/tokens";

export const semanticEffects = {
  glassBlur: effects.blur.lg,

  glass: {
    backgroundOpacity: "70%",
    borderOpacity: "60%",
    primaryGlow: "20%",
    infoGlow: "10%",
    gradientStop: "40%",
  },
} as const;
