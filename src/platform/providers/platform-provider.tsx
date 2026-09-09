import type { PropsWithChildren } from "react";

import { useEffect, useMemo, useState } from "react";

import { PlatformContext } from "./platform-context";
import { createPlatform } from "./create-platform";

export function PlatformProvider({ children }: PropsWithChildren) {
  const platform = useMemo(() => createPlatform(), []);
  const [, setVersion] = useState(0);

  useEffect(() => {
    let active = true;

    const unsubscribeAuthentication = platform.authentication.subscribe(() => {
      if (active) {
        setVersion((version) => version + 1);
      }
    });

    void platform.authentication.hydrate();
    void platform.runtime.start().catch((error: unknown) => {
      if (active) {
        console.error("ZooBusiness platform runtime failed to start", error);
        setVersion((version) => version + 1);
      }
    });

    return () => {
      active = false;
      unsubscribeAuthentication();
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
