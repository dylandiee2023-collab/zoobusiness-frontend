import { sidebarHeaderRecipe } from "./sidebar-header.recipe";

export const sidebarHeaderStyles = {
  recipe: sidebarHeaderRecipe,

  root: {
    height: 72,
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "0 16px",
    boxSizing: "border-box",
    flexShrink: 0,
  },
} as const;
