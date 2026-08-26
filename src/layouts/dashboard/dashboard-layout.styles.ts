export const dashboardLayoutStyles = {
  root: {
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    minHeight: "100vh",
  },

  sidebar: {
    borderRight:
      "1px solid #E5E7EB",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
} as const;