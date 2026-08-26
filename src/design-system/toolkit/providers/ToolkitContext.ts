import {
  createContext,
} from "react";

import type {
  Toolkit,
} from "../contracts";

export interface ToolkitContextValue {
  toolkit: Toolkit;
}

export const ToolkitContext =
  createContext<ToolkitContextValue | null>(
    null,
  );