export type BusinessCategory = "retail" | "digital-content";

export type PermissionCode = string;

export type NavigationPlacement = "sidebar" | "topbar" | "mobile" | "user-menu";

export interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly route?: string;
  readonly permission?: PermissionCode;
  readonly businessCategories?: readonly BusinessCategory[];
  readonly placement: NavigationPlacement;
  readonly children?: readonly NavigationItem[];
}

export interface NavigationContext {
  readonly businessCategory: BusinessCategory;
  readonly permissions: ReadonlySet<PermissionCode>;
}
