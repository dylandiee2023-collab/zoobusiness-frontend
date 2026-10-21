import { sidebarRecipe } from "./sidebar.recipe";

export const sidebarStyles = {
  recipe: sidebarRecipe,

  root: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 40,
    height: "100dvh",
    overflow: "hidden",
    background: "var(--zb-colors-surface)",
    borderRight: "1px solid var(--zb-colors-border)",
    transition: "width 180ms ease",
  },
} as const;
