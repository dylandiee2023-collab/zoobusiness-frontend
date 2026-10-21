import { sidebarRecipe } from "./sidebar.recipe";

export const sidebarStyles = {
  recipe: sidebarRecipe,

  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    minHeight: 0,
    overflow: "hidden",
    boxSizing: "border-box",
    background: "var(--zb-colors-surface)",
    borderRight: "1px solid var(--zb-colors-border)",
    transition: "width 180ms ease",
  },
} as const;
