import {
  createContext,
} from "react";

import type {
  OverlayManager,
} from "../manager";

export interface OverlayContextValue {
  manager: OverlayManager;
}

export const OverlayContext =
  createContext<
    OverlayContextValue | null
  >(null);