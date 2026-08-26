import type { BlankShellProps } from "./BlankShell.types";
import { BLANK_SHELL_STYLE } from "./BlankShell.styles";

export function BlankShell({
  children,
}: BlankShellProps) {
  return (
    <div style={BLANK_SHELL_STYLE}>
      {children}
    </div>
  );
}