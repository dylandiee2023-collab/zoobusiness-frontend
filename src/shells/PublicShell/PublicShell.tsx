import type { PublicShellProps } from "./PublicShell.types";
import { PUBLIC_SHELL_STYLE } from "./PublicShell.styles";

export function PublicShell({
  children,
}: PublicShellProps) {
  return (
    <main style={PUBLIC_SHELL_STYLE}>
      {children}
    </main>
  );
}