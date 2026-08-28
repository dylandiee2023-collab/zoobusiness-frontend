import type { POSShellProps } from "./POSShell.types";
import { POS_SHELL_STYLE } from "./POSShell.styles";

export function POSShell({ children }: POSShellProps) {
  return <main style={POS_SHELL_STYLE}>{children}</main>;
}
