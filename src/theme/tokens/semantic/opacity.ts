import { opacity } from "@/theme/tokens";

export const semanticOpacity = {
  disabled: opacity[50],
  overlay: opacity[60],
  backdrop: opacity[70],
  hover: opacity[90],

  glass: {
    background: opacity[70],
    primaryGlow: opacity[20],
    infoGlow: opacity[10],
    gradientStop: opacity[40],
  },
} as const;
