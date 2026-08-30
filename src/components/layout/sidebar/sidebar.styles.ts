import { sidebarRecipe } from "./sidebar.recipe";

export const sidebarStyles = {
  recipe: sidebarRecipe,

  root: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 40,
    height: "100vh",
    overflow: "hidden",
    background: "white",
    borderRight: "1px solid #E5E7EB",
    transition: "width 180ms ease",
  },
} as const;
