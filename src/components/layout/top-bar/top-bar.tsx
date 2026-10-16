import { MenuButton } from "./components/menu-button";
import { useTopBar } from "./context";
import { topBarStyles } from "./top-bar.styles";

export function TopBar() {
  const { state } = useTopBar();
  const left =
    state.sidebarMode === "expanded"
      ? 280
      : state.sidebarMode === "collapsed"
        ? 72
        : 0;

  return (
    <header className="dashboard-topbar" style={{ ...topBarStyles.root, left }}>
      <MenuButton />
    </header>
  );
}
