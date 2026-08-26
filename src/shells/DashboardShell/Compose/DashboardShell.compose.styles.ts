export const DASHBOARD_SHELL_COMPOSE_STYLE = {
  display: "grid",

  gridTemplateColumns: "280px 1fr",

  gridTemplateRows: "72px 1fr auto",

  gridTemplateAreas: `
    "sidebar topbar"
    "sidebar content"
    "sidebar footer"
  `,

  width: "100vw",

  height: "100vh",

  overflow: "hidden",
} as const;