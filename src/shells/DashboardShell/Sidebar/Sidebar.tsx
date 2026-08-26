import type { SidebarProps } from "./Sidebar.types";

export function Sidebar({
  header,
  navigation,
  footer,
}: SidebarProps) {
  return (
    <>
      {header}
      {navigation}
      {footer}
    </>
  );
}