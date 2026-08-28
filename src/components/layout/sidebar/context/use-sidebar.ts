import { useContext } from "react";

import { SidebarContext } from "./sidebar.context";

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (context === null) {
    throw new Error("SidebarProvider is missing.");
  }

  return context;
}
