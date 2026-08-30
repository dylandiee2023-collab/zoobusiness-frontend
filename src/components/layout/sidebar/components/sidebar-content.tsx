import { useSidebar } from "../context";
import { useResponsive } from "@/responsive";

export function SidebarContent() {
  const { state, actions } = useSidebar();
  const { isMobile } = useResponsive();

  if (state.mode === "hidden") {
    return null;
  }

  return (
    <nav aria-label="Sidebar navigation">
      {state.groups.map((group) => (
        <section key={group.id}>
          <button type="button" onClick={() => actions.toggleGroup(group.id)}>
            {!isMobile && state.mode === "expanded" && group.title}
          </button>

          {group.expanded && (
            <div>
              {group.items.map((item) => (
                <a key={item.id} href={item.route} aria-label={item.title}>
                  {!isMobile && state.mode === "expanded" && item.title}
                </a>
              ))}
            </div>
          )}
        </section>
      ))}
    </nav>
  );
}
