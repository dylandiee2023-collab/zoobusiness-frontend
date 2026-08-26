import { useMemo } from "react";
import type { PropsWithChildren } from "react";

import { OverlayContext } from "../context";
import { OverlayRegistry } from "../registry";
import { OverlayManager } from "../manager";

export function OverlayProvider({
  children,
}: PropsWithChildren) {
  const value = useMemo(() => {
    const registry = new OverlayRegistry();

    const manager = new OverlayManager(
      registry,
    );

    return {
      manager,
    };
  }, []);

  return (
    <OverlayContext.Provider
      value={value}
    >
      {children}
    </OverlayContext.Provider>
  );
}