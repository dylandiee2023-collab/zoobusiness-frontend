import { MENUS } from "./constants";

export type MenuType = keyof typeof MENUS;

export interface Menu {
  id: MenuType;
  label: string;
}
