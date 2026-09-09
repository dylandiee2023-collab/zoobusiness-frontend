import type { PropsWithChildren } from "react";

import { useEffect, useMemo } from "react";

import { PlatformContext } from "./platform-context";

import { createPlatform } from "./create-platform";

export function PlatformProvider({ children }: PropsWithChildren) {
  const platform = useMemo(() => createPlatform(), []);

  useEffect(() => {
    let active = true;

    void platform.runtime.start().catch((error: unknown) => {
      if (active) {
        console.error("ZooBusiness platform runtime failed to start", error);
      }
    });

    return () => {
      active = false;
      void platform.runtime.stop().catch((error: unknown) => {
        console.error("ZooBusiness platform runtime failed to stop", error);
      });
    };
  }, [platform]);

  return (
    <PlatformContext.Provider value={platform}>
      {children}
    </PlatformContext.Provider>
  );
}
