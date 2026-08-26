import {
  useMemo,
  type PropsWithChildren,
} from "react";

import { createAppShell } from "../createAppShell";
import { AppShellContext } from "./AppShellContext";

export function AppShellProvider({
  children,
}: PropsWithChildren) {
  const appShell = useMemo(
    () => createAppShell(),
    [],
  );

  return (
    <AppShellContext.Provider value={appShell}>
      {children}
    </AppShellContext.Provider>
  );
}