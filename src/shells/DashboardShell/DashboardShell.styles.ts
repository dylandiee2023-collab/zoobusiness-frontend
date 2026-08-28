export const DASHBOARD_SHELL_STYLE = {
  display: "grid",

  gridTemplateColumns: "280px 1fr",

  gridTemplateRows: "72px 1fr",

  gridTemplateAreas: `
    "sidebar topbar"
    "sidebar content"
  `,

  width: "100vw",

  height: "100vh",

  overflow: "hidden",
} as const;
