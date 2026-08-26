import { componentSizes } from "@/theme/tokens";

export const semanticComponentSizes = {
  button: componentSizes.button,
  input: componentSizes.input,
  avatar: componentSizes.avatar,

  navbarHeight: componentSizes.lg,
  sidebarWidth: "280px",
  collapsedSidebarWidth: "80px",

  topbarHeight: "64px",
  bottomNavigationHeight: "72px",
} as const;