import type { PropsWithChildren } from "react";

import { useEffect, useMemo, useState } from "react";

import { PlatformContext } from "./platform-context";
import { createPlatform } from "./create-platform";

export function PlatformProvider({ children }: PropsWithChildren) {
  const platform = useMemo(() => createPlatform(), []);
  const [, setAuthenticationVersion] = useState(0);

  useEffect(() => {
    let active = true;

    void platform.authentication.hydrate().finally(() => {
      if (active) {
        setAuthenticationVersion((version) => version + 1);
      }
    });

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
