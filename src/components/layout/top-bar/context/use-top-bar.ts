import { useContext } from "react";

import { TopBarContext } from "./top-bar.context";

export function useTopBar() {
  const context = useContext(TopBarContext);

  if (context === null) {
    throw new Error("TopBarProvider is missing.");
  }

  return context;
}
