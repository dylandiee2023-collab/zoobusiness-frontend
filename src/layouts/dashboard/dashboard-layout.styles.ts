export const dashboardLayoutStyles = {
  root: {
    minHeight: "100vh",
    width: "100%",
  },

  sidebar: {
    width: 280,
  },

  content: {
    minWidth: 0,
    minHeight: "100vh",
    transition: "margin-left 180ms ease",
  },

  main: {
    paddingTop: 24,
    minWidth: 0,
  },
} as const;
