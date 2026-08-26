import {
  useContext,
} from "react";

import {
  InteractionContext,
} from "./InteractionContext";

export function useInteraction() {
  const controller =
    useContext(
      InteractionContext,
    );

  if (!controller) {
    throw new Error(
      "useInteraction must be used inside InteractionProvider.",
    );
  }

  return controller;
}