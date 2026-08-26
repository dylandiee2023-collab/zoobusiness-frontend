import {
  useContext,
} from "react";

import {
  ToolkitContext,
} from "../providers";

export function useToolkit() {
  const context =
    useContext(
      ToolkitContext,
    );

  if (
    context === null
  ) {
    throw new Error(
      "useToolkit must be used inside ToolkitProvider.",
    );
  }

  return context.toolkit;
}