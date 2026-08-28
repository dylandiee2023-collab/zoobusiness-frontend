import type { AuthShellProps } from "./AuthShell.types";
import { AUTH_SHELL_STYLE } from "./AuthShell.styles";

export function AuthShell({ children }: AuthShellProps) {
  return <main style={AUTH_SHELL_STYLE}>{children}</main>;
}
