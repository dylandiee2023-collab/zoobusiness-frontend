export const dashboardLayoutStyles = {
  root: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    minHeight: "100vh",
  },

  sidebar: {
    minWidth: 0,
  },

  content: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    minHeight: "100vh",
  },

  main: {
    flex: 1,
    minWidth: 0,
  },
} as const;
