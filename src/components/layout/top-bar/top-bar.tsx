import { MenuButton } from "./components/menu-button";
import { topBarStyles } from "./top-bar.styles";

export function TopBar() {
  return (
    <header style={topBarStyles.root}>
      <MenuButton />
    </header>
  );
}
