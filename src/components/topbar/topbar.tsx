import type { TopBarProps } from "./topbar.types";

import { topBarStyles } from "./topbar.styles";

export function TopBar({ title }: TopBarProps) {
  return (
    <header style={topBarStyles.root}>
      <div style={topBarStyles.left}>
        ☰
        <strong>
          {" "}
          <span>ZooBUSINESS</span>{" "}
        </strong>
        {title}
      </div>

      <div style={topBarStyles.center}>🔍 Search</div>

      <div style={topBarStyles.right}>＋ 💬 🔔 🟢 🌿 👤</div>
    </header>
  );
}
