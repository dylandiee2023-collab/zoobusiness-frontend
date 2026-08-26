import { SidebarHeader } from "./components/sidebar-header";
import { useSidebar } from "./context";

export function Sidebar() {
  const { state } = useSidebar();

  if (state.mode === "hidden") {
    return null;
  }

  return (
    <aside>
      <SidebarHeader />

      {/* SidebarContent */}

      {/* SidebarFooter */}
    </aside>
  );
}