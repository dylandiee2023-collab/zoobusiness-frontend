import { useSidebar } from "../context";

export function SidebarContent() {
  const { state, actions } = useSidebar();

  if (state.mode === "hidden") {
    return null;
  }

  return (
    <nav aria-label="Sidebar navigation">
      {state.groups.map((group) => (
        <section key={group.id}>
          <button
            type="button"
            onClick={() => actions.toggleGroup(group.id)}
          >
            {state.mode === "expanded" && group.title}
          </button>

          {group.expanded && (
            <div>
              {group.items.map((item) => (
                <a
                  key={item.id}
                  href={item.route}
                  aria-label={item.title}
                >
                  {state.mode === "expanded" && item.title}
                </a>
              ))}
            </div>
          )}
        </section>
      ))}
    </nav>
  );
}