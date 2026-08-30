import { Brand } from "@/components/brand";

import { useSidebar } from "../../context";

import { sidebarHeaderStyles } from "./sidebar-header.styles";
import type { SidebarHeaderProps } from "./sidebar-header.types";

export function SidebarHeader({
  showLogo = true,
  showBrand = true,
}: SidebarHeaderProps) {
  const { state } = useSidebar();

  return (
    <header style={sidebarHeaderStyles.root}>
      <Brand
        collapsed={state.mode === "collapsed"}
        hidden={state.mode === "hidden"}
        showLogo={showLogo}
        showName={showBrand}
      />
    </header>
  );
}
