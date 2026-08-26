import type { MarketplaceShellProps } from "./MarketplaceShell.types";
import { MARKETPLACE_SHELL_STYLE } from "./MarketplaceShell.styles";

export function MarketplaceShell({
  children,
}: MarketplaceShellProps) {
  return (
    <main style={MARKETPLACE_SHELL_STYLE}>
      {children}
    </main>
  );
}