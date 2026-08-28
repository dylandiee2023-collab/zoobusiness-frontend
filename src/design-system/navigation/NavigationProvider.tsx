import { useState, type PropsWithChildren } from "react";

import { NavigationContext } from "./NavigationContext";

import { NavigationController } from "./NavigationController";

export function NavigationProvider({ children }: PropsWithChildren) {
  const [controller] = useState(() => new NavigationController());

  return (
    <NavigationContext.Provider value={controller}>
      {children}
    </NavigationContext.Provider>
  );
}
