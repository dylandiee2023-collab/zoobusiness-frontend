export interface MenuItem {
  readonly id: string;

  readonly label: string;

  readonly icon?: string;

  readonly path?: string;

  readonly parentId?: string;

  readonly order: number;

  readonly permissions?: readonly string[];

  readonly children?: readonly MenuItem[];
}
