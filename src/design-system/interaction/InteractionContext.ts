import { createContext } from "react";

import type {
  InteractionController,
} from "./InteractionController";

export const InteractionContext =
  createContext<InteractionController | null>(
    null,
  );