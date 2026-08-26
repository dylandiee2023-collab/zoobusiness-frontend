import type {
  Menu,
  MenuType,
} from "@/dashboard/foundation";

import {
  getMenu,
} from "@/dashboard/foundation";

export interface MenuEngine {
  current: MenuType;

  exists(): boolean;

  resolve(): Menu;

  is(
    menu: MenuType,
  ): boolean;
}

export function createMenuEngine(
  menu: MenuType,
): MenuEngine {
  return {
    current: menu,

    exists(): boolean {
      return !!getMenu(menu);
    },

    resolve(): Menu {
      return getMenu(menu);
    },

    is(
      target: MenuType,
    ): boolean {
      return menu === target;
    },
  };
}