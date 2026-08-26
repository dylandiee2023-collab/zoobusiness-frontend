import { useCallback, useMemo, useState } from "react";

import { OverlayContext } from "./OverlayContext";
import type { OverlayItem } from "./Overlay.types";

interface OverlayProviderProps {
  children: React.ReactNode;
}

export function OverlayProvider({
  children,
}: OverlayProviderProps) {
  const [stack, setStack] = useState<OverlayItem[]>([]);

  const register = useCallback((overlay: OverlayItem) => {
    setStack((previous) => [...previous, overlay]);
  }, []);

  const unregister = useCallback((id: string) => {
    setStack((previous) =>
      previous.filter((overlay) => overlay.id !== id),
    );
  }, []);

  const closeTop = useCallback(() => {
    setStack((previous) => {
      const top = previous.at(-1);

      top?.close();

      return previous;
    });
  }, []);

  const value = useMemo(
    () => ({
      stack,
      register,
      unregister,
      closeTop,
    }),
    [stack, register, unregister, closeTop],
  );

  return (
    <OverlayContext.Provider value={value}>
      {children}
    </OverlayContext.Provider>
  );
}