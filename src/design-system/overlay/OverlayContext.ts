import { createContext } from "react";

import type { OverlayContextValue } from "./Overlay.types";

export const OverlayContext =
  createContext<OverlayContextValue | null>(
    null,
  );