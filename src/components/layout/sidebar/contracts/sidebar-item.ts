export interface SidebarItem {
  readonly id: string;

  readonly title: string;

  readonly icon: string;

  readonly route: string;

  readonly badge?: number;

  readonly permissions?: readonly string[];

  readonly active?: boolean;
}