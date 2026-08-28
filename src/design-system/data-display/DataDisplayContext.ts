import { createContext } from "react";

import type { DataDisplayController } from "./DataDisplayController";

export const DataDisplayContext = createContext<DataDisplayController | null>(
  null,
);
