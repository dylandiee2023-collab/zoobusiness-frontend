import type { AppIconName } from "@/design-system/icons";

export type PermissionCode = string;

export type NavigationPlacement =
  | "sidebar"
  | "topbar"
  | "mobile"
  | "user-menu";

export interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly icon: AppIconName;
  readonly route?: string;
  readonly permission?: PermissionCode;
  readonly placement: NavigationPlacement;
  readonly children?: readonly NavigationItem[];
}

export interface NavigationContext {
  readonly permissions: ReadonlySet<PermissionCode>;
}
