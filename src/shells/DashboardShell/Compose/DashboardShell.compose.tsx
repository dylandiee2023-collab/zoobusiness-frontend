import type { DashboardShellComposeProps } from "./DashboardShell.compose.types";
import { DASHBOARD_SHELL_COMPOSE_STYLE } from "./DashboardShell.compose.styles";

export function DashboardShellCompose({
  topbar,
  sidebar,
 content,
  footer,
}: DashboardShellComposeProps) {
  return (
    <div style={DASHBOARD_SHELL_COMPOSE_STYLE}>
      {sidebar}
      {topbar}
      {content}
      {footer}
    </div>
  );
}