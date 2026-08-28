import { motion } from "@/theme/tokens";

export const semanticMotion = {
  hover: motion.duration.fast,
  press: motion.duration.instant,
  transition: motion.duration.normal,
  modal: motion.duration.slower,

  easing: motion.easing.easeInOut,
} as const;
