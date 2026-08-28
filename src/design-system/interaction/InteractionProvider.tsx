import { useMemo } from "react";

import { InteractionContext } from "./InteractionContext";

import { InteractionRegistry } from "./InteractionRegistry";

import { InteractionController } from "./InteractionController";

interface InteractionProviderProps {
  children: React.ReactNode;
}

export function InteractionProvider({ children }: InteractionProviderProps) {
  const controller = useMemo(() => {
    const registry = new InteractionRegistry();

    return new InteractionController(registry);
  }, []);

  return (
    <InteractionContext.Provider value={controller}>
      {children}
    </InteractionContext.Provider>
  );
}
