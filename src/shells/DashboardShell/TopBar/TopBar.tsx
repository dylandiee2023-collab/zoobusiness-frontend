import type { TopBarProps } from "./TopBar.types";

export function TopBar({
  logo,
  search,
  actions,
  profile,
}: TopBarProps) {
  return (
    <>
      {logo}
      {search}
      {actions}
      {profile}
    </>
  );
}