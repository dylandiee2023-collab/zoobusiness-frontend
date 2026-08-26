export const topBarStyles = {
  root: {
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    padding: "0 20px",

    borderBottom: "1px solid #E5E7EB",

    background: "#FFFFFF",

    position: "sticky",

    top: 0,

    zIndex: 1000,
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  center: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
} as const;