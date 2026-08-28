import type { DashboardShellProps } from "./DashboardShell.types";

export function DashboardShell({
  topbar,
  sidebar,
  content,
  footer,
}: DashboardShellProps) {
  return (
    <>
      {topbar}
      {sidebar}
      {content}
      {footer}
    </>
  );
}
