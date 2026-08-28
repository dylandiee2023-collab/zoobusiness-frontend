import { MENUS } from "./constants";
import type { MenuType } from "./types";

export function getMenu(menu: MenuType) {
  return MENUS[menu];
}

export function isDashboardMenu(menu: MenuType): boolean {
  return menu === "dashboard";
}

export function isSalesMenu(menu: MenuType): boolean {
  return menu === "sales";
}

export function isProductsMenu(menu: MenuType): boolean {
  return menu === "products";
}

export function isInventoryMenu(menu: MenuType): boolean {
  return menu === "inventory";
}

export function isPurchasesMenu(menu: MenuType): boolean {
  return menu === "purchases";
}

export function isFinanceMenu(menu: MenuType): boolean {
  return menu === "finance";
}

export function isReportsMenu(menu: MenuType): boolean {
  return menu === "reports";
}

export function isSettingsMenu(menu: MenuType): boolean {
  return menu === "settings";
}
