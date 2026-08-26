import { createContext } from "react";
import type { LayoutState } from "../types/layout.types";

export const LayoutContext =
  createContext<LayoutState | null>(null);