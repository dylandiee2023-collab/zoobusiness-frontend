import { opacity } from "@/theme/tokens";

export const semanticOpacity = {
  disabled: opacity[50],
  overlay: opacity[60],
  backdrop: opacity[70],
  hover: opacity[90],
} as const;
