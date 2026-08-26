import { createContext } from "react";
import type { ResponsiveState } from "../types/responsive.types";

export const ResponsiveContext =
  createContext<ResponsiveState | null>(null);