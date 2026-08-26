import {
  createContext,
} from "react";

import type {
  NavigationController,
} from "./NavigationController";

export const NavigationContext =
  createContext<NavigationController | null>(
    null,
  );