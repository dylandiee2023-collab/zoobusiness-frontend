import type { ErrorShellProps } from "./ErrorShell.types";
import { ERROR_SHELL_STYLE } from "./ErrorShell.styles";

export function ErrorShell({ children }: ErrorShellProps) {
  return <main style={ERROR_SHELL_STYLE}>{children}</main>;
}
