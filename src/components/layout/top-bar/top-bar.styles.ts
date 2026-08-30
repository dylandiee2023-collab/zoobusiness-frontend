export const topBarStyles = {
  root: {
    position: "fixed",
    top: 0,
    right: 0,
    left: 280,
    zIndex: 30,
    height: 72,
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    boxSizing: "border-box",
    background: "white",
    borderBottom: "1px solid #E5E7EB",
    transition: "left 180ms ease",
  },
} as const;
