import type { AppShellProps } from "./app-shell.types";

import { appShellStyles } from "./app-shell.styles";

export function AppShell({ children }: AppShellProps) {
  return <div style={appShellStyles.root}>{children}</div>;
}
