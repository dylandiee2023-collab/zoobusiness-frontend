import { useTheme } from "@/theme/hooks";
import type { DashboardShellProps } from "./DashboardShell.types";

export function DashboardShell({
  topbar,
  sidebar,
  content,
  footer,
}: DashboardShellProps) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${theme.componentSizes.sidebarWidth} minmax(0, 1fr)`,
        gridTemplateRows: `${theme.componentSizes.topbarHeight} minmax(0, 1fr)`,
        gridTemplateAreas: '"sidebar topbar" "sidebar content"',
        width: "100%",
        minHeight: "100dvh",
        overflow: "hidden",
        background: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      <aside style={{ gridArea: "sidebar", minWidth: 0, minHeight: 0 }}>
        {sidebar}
      </aside>
      <header style={{ gridArea: "topbar", minWidth: 0 }}>{topbar}</header>
      <main
        style={{
          gridArea: "content",
          minWidth: 0,
          minHeight: 0,
          overflow: "auto",
        }}
      >
        {content}
        {footer}
      </main>
    </div>
  );
}
