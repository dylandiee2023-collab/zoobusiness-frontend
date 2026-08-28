export interface MenuItem {
  id: string;

  label: string;

  icon?: string;

  path?: string;

  children?: readonly MenuItem[];
}

export interface MenuEngineContract {
  getMenu(): readonly MenuItem[];

  register(item: MenuItem): void;

  unregister(id: string): void;

  clear(): void;
}
