import { Menu } from "lucide-react";

import { Button } from "@/design-system/buttons";

import { useTopBar } from "../../context";

import {
  menuButtonStyles,
} from "./menu-button.styles";

import type {
  MenuButtonProps,
} from "./menu-button.types";

export function MenuButton({
  disabled = false,

  ariaLabel = "Toggle sidebar",
}: MenuButtonProps) {

  const {
    state,

    actions,
  } = useTopBar();

  return (
    <Button
      variant={
        menuButtonStyles.recipe.variant
      }

      size="md"

      disabled={disabled}

      aria-label={ariaLabel}

      aria-pressed={
        state.sidebarMode !==
        "hidden"
      }

      onClick={
        actions.toggleSidebar
      }

      onDoubleClick={
        actions.hideSidebar
      }
    >
      <Menu />
    </Button>
  );
}