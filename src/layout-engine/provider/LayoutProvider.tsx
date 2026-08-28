import { useMemo, type ReactNode } from "react";

import { LayoutContext } from "../context/LayoutContext";
import { LayoutService } from "../services/LayoutService";
import type { LayoutType } from "../types/layout.types";

interface LayoutProviderProps {
  layout: LayoutType;
  children: ReactNode;
}

export function LayoutProvider({ layout, children }: LayoutProviderProps) {
  const value = useMemo(() => LayoutService.create(layout), [layout]);

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}
