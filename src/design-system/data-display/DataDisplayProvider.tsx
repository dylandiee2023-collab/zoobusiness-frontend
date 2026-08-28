import { useState, type PropsWithChildren } from "react";

import { DataDisplayContext } from "./DataDisplayContext";

import { DataDisplayController } from "./DataDisplayController";

export function DataDisplayProvider({ children }: PropsWithChildren) {
  const [controller] = useState(() => new DataDisplayController());

  return (
    <DataDisplayContext.Provider value={controller}>
      {children}
    </DataDisplayContext.Provider>
  );
}
