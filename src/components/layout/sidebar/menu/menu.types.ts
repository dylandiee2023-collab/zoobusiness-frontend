export interface MenuItem {
  readonly id: string;

  readonly title: string;

  readonly icon: string;

  readonly route: string;

  readonly badge?: number;

  readonly permissions?: readonly string[];
}

export interface MenuGroup {
  readonly id: string;

  readonly title: string;

  readonly icon: string;

  readonly expanded?: boolean;

  readonly items: readonly MenuItem[];
}
