import { useMemo } from "react";

import type { PropsWithChildren } from "react";

import { createToolkit } from "../factory";

import { ToolkitContext } from "./ToolkitContext";

export function ToolkitProvider({ children }: PropsWithChildren) {
  const toolkit = useMemo(() => createToolkit(), []);

  return (
    <ToolkitContext.Provider
      value={{
        toolkit,
      }}
    >
      {children}
    </ToolkitContext.Provider>
  );
}
