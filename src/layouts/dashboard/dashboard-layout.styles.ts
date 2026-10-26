export const dashboardLayoutStyles = {
  root: {
    position: "relative",
    height: "100dvh",
    minHeight: "100dvh",
    width: "100%",
    overflow: "hidden",
  },
  sidebar: {
    width: 280,
  },
  content: {
    minWidth: 0,
    height: "100dvh",
    minHeight: "100dvh",
    overflow: "hidden",
    transition: "margin-left 180ms ease",
  },
  main: {
    boxSizing: "border-box",
    paddingTop: 72,
    paddingBottom: 24,
    minWidth: 0,
    minHeight: 0,
  },
} as const;
